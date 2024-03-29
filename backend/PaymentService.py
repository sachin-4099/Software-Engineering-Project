import configparser
import json
from datetime import datetime

import razorpay
import requests

import DB as db
from Exception import DatabaseOperationException, RazorpayApiException

# username= req.get("username")
# amount = req.get("amount")
# currency = req.get("currency")
# payment_category_id= req.get("payment_category_id")
# percentage_category = req.get("percentage_category")
# coupon_id = req.get("coupon_id")
# merchant_id = req.get("merchant_id")

# class PaymentService:

# TODO: Prepared statements
#

config = configparser.ConfigParser()
config.read('creds.ini')
USER_KEY = config['RAZORPAY']['key_id']
SECRET_KEY = config['RAZORPAY']['key_secret']
client = razorpay.Client(auth=(USER_KEY, SECRET_KEY))


def validate_coupon(coupon_id):
    query = "select discount from coupons where couponid=%s and expired_at > now()"
    res = db.execute_query(query, [coupon_id])
    if len(res) > 0:
        res = float(res[0][0])
        details = {"valid": True, "discount": res}
    else:
        details = {"valid": False, "discount": None}
    return details


def confirm_payment_merchant(userid, actual_amount, order_currency, payment_category_id, category_percentage, coupon_id,
                             merchant_id):
    discount = validate_coupon(coupon_id)
    discount = discount.get("discount") if discount.get("valid") else 0
    final_discount = (actual_amount * discount) / 100
    final_savings = (actual_amount * category_percentage) / 100
    final_amt = actual_amount - final_discount + final_savings
    query = "select first_name, last_name, username, phone_number from userdb where userid=%s;"
    res = db.execute_query(query, [userid])
    fname, lname, email, phone_num = res[0][0], res[0][1], res[0][2], res[0][3]
    fullname = fname + ' ' + lname
    order_receipt = str(userid) + "__" + str(merchant_id) + "__" + datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
    notes = {
        "payment_category_id": payment_category_id,
        "category_percentage": category_percentage,
        "coupon_id": coupon_id,
        "paid_to_id": merchant_id,
        "paid_by_id": userid,
        "actual_amount": (actual_amount - final_discount) * 100
    }
    data = {
        "amount": final_amt * 100,
        "currency": order_currency,
        "receipt": order_receipt,
        "notes": notes
    }
    try:
        resp = client.order.create(data=data)
    except:
        raise RazorpayApiException("Cannot create merchant order")
    response = {
        "order_id": resp.get("id"),
        "amount": resp.get("amount_due"),
        "fullname": fullname,
        "email": email,
        "contact": phone_num
    }
    query = "insert into transaction values(%(order_id)s, %(paid_by)s, %(total_amt)s, %(currency)s, %(category_id)s, " \
            "%(amount_saved)s, %(paid_to)s, %(paid_to_type)s, %(transaction_at)s, 0) "

    print(resp)
    try:
        db.execute_insert_query(query, {"order_id": resp.get("id"), "paid_by": userid, "total_amt": final_amt,
                                        "currency": order_currency,
                                        "category_id": payment_category_id, "amount_saved": final_savings,
                                        "paid_to": merchant_id, "paid_to_type": 'M',
                                        "transaction_at": datetime.now()})
        return response
    except Exception as e:
        print(e)
        raise DatabaseOperationException(message="Database exception in merchant payment confirmation")


def confirm_payment_non_merchant(userid, actual_amount, order_currency, payment_category_id, category_percentage,
                                 payee_phone_number):
    print(actual_amount, category_percentage)
    final_savings = (actual_amount * category_percentage) / 100
    final_amt = actual_amount + final_savings
    query = "select first_name, last_name, upi, userid from userdb where phone_number=%s"
    res = db.execute_query(query, [payee_phone_number])
    if (len(res) <= 0):
        print("error in fetching user from db")
        return None
    paid_to_id = res[0][3]
    payee_fname, payee_lname, upi_id = res[0][0], res[0][1], res[0][2]
    payee_fullname = payee_fname + ' ' + payee_lname
    query = "select first_name, last_name, username, phone_number from userdb where userid=%s"
    res = db.execute_query(query, [userid])
    fname, lname, email, phone_num = res[0][0], res[0][1], res[0][2], res[0][3]
    fullname = fname + ' ' + lname
    order_receipt = str(userid) + "__" + str(upi_id) + "__" + datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
    notes = {
        "payment_category_id": payment_category_id,
        "category_percentage": category_percentage,
        "paid_to": paid_to_id,
        "paid_to_upi": upi_id,
        "paid_by": userid,
        "actual_amount": actual_amount * 100
    }
    data = {
        "amount": final_amt * 100,
        "currency": order_currency,
        "receipt": order_receipt,
        "notes": notes
    }
    try:
        resp = client.order.create(data=data)
    except:
        raise RazorpayApiException("Cannot create non merchant order")
    response = {
        "order_id": resp.get("id"),
        "amount": resp.get("amount_due"),
        "payee_fullname": payee_fullname,
        "upi_id": upi_id,
        "fullname": fullname,
        "email": email,
        "contact": phone_num
    }
    print(resp)

    query = "insert into transaction values(%(order_id)s, %(paid_by)s, %(total_amt)s, %(currency)s, %(category_id)s, " \
            "%(amount_saved)s, %(paid_to)s, %(paid_to_type)s, %(transaction_at)s, 0) "
    try:
        db.execute_insert_query(query, {"order_id": resp.get("id"), "paid_by": userid, "total_amt": final_amt,
                                        "currency": order_currency,
                                        "category_id": payment_category_id, "amount_saved": final_savings,
                                        "paid_to": paid_to_id, "paid_to_type": 'N',
                                        "transaction_at": datetime.now()})

        return response
    except Exception as e:
        print(e)
        raise DatabaseOperationException(message="Database exception in non merchant payment confirmation")


def get_transactions(userid):
    query = "select t.id, t.total_amt, t.amount_saved, t.paid_to, t.transaction_at, s.status, c.name  from " \
            "transaction t, transaction_status s, category c where t.status_id = s.status_id and c.id = t.category_id " \
            "and paid_by = %s"
    res = db.execute_query(query, [userid])
    resp = []
    for i in res:
        temp = {
            "transaction_id": i[0],
            "total_amount": i[1],
            "amount_saved": i[2],
            "actual_amount": i[1] - i[2],
            "paid_to": i[3],
            "tranaction_at": i[4],
            "transaction_status": i[5],
            "category": i[6]
        }
        resp.append(temp)
    return resp


def verify_payment_signature(payment_id, order_id, sign):
    params_dict = {
        'razorpay_order_id': order_id,
        'razorpay_payment_id': payment_id,
        'razorpay_signature': sign
    }
    result = None
    try:
        if (client.utility.verify_payment_signature(params_dict) == None): result = True
    except razorpay.errors.SignatureVerificationError:
        result = False
    return result


def success_transaction(payment_id, order_id, payment_signature):
    if verify_payment_signature(payment_id, order_id, payment_signature):
        print("Payment Signature Verified")
        # update status of transaction in DB
    else:
        print("false")
        # update status of transaction in DB
    order_details = client.order.fetch(order_id)
    print(order_details)
    notes = order_details.get("notes")
    paid_to_id = notes.get("paid_to_id")
    actual_amount = notes.get("actual_amount")
    merchant_details = db.get_merchant_from_id(paid_to_id)
    merchant_account_id = merchant_details[2]
    payload = json.dumps({
        "transfers": [
            {
                "account": merchant_account_id,
                "amount": actual_amount,
                "currency": "INR",
                "notes": notes,
            }
        ]
    })
    headers = {
        'Content-Type': 'application/json'
    }

    try:
        response = requests.post("https://api.razorpay.com/v1/payments/{}/transfers".format(payment_id),
                                 auth=(USER_KEY, SECRET_KEY), headers=headers, data=payload)
        print(response.json())
        # update DB status
        return {"success": True}
    except:
        # update DB failed
        return {"success": False}


def failed_transaction(order_id):
    # update db status
    return {"success": False}


def validate_transaction(payment_id, order_id, payment_signature, success):
    resp = None
    if (success):
        resp = success_transaction(payment_id, order_id, payment_signature)
    else:
        resp = failed_transaction(order_id)
    return resp
