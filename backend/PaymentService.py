import razorpay
import configparser
from pprint import pprint
import json
import DB as db
from datetime import datetime

# username= req.get("username")
# amount = req.get("amount")
# currency = req.get("currency")
# payment_category_id= req.get("payment_category_id")
# percentage_category = req.get("percentage_category")
# coupon_id = req.get("coupon_id")
# merchant_id = req.get("merchant_id")

# class PaymentService:



def validate_coupon(coupon_id):
    query = "select discount from coupons where couponid={} and expired_at > now();".format(coupon_id)
    res = db.execute_query(query)
    if(len(res)>0):
        res = res[0]
        details = {"valid": True, "discount": res[0]}
    else:
        details = {"valid": False}
    return details


def confirmPaymentMerchant(userid, actual_amount, order_currency, payment_category_id, percentage_category, coupon_id, merchant_id):
    config = configparser.ConfigParser()
    config.read('creds.ini')
    USER_KEY = config['RAZORPAY']['key_id']
    SECRET_KEY = config['RAZORPAY']['key_secret']
    client = razorpay.Client(auth=(USER_KEY, SECRET_KEY))
    discount = int(validate_coupon(coupon_id).get("discount"))
    saving_percentage =  int(percentage_category[:-1])
    final_discount = (actual_amount*discount)/100
    final_savings = (actual_amount*saving_percentage)/100
    final_amt = actual_amount - final_discount + final_savings
    query = "select firstname, lastname, username, phone_number from userdb where userid={};".format(userid)
    res = db.execute_query(query)
    fname, lname, email, phone_num = res[0][0], res[0][1], res[0][2], res[0][3]
    fullname = fname + ' ' + lname
    final_amt = actual_amount + (actual_amount*discount)/100;
    order_receipt = userid+"__"+str(merchant_id)+"__"+datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
    notes = {
        "payment_category_id": payment_category_id,
        "percentage_category": percentage_category,
        "coupon_id": coupon_id,
        "merchant_id": merchant_id,
        "userid": userid,
        "actual_amount": actual_amount
    }
    data = {
            "amount" : final_amt*100,
            "currency": order_currency,
            "receipt": order_receipt,
            "notes": notes
        }
    resp = client.order.create(data= data)
    response = {
        "order_id": resp.get("id"),
        "amount": resp.get("amount_due"),
        "fullname": fullname,
        "email": email,
        "contact": phone_num
    }
    return response


def confirmPaymentNonMerchant(userid, actual_amount, order_currency, payment_category_id, percentage_category, payee_phone_number):
    config = configparser.ConfigParser()
    config.read('creds.ini')
    USER_KEY = config['RAZORPAY']['key_id']
    SECRET_KEY = config['RAZORPAY']['key_secret']
    client = razorpay.Client(auth=(USER_KEY, SECRET_KEY))
    saving_percentage =  int(percentage_category[:-1])
    final_savings = (actual_amount*saving_percentage)/100
    final_amt = actual_amount + final_savings
    query = "select firstname, lastname, upi from userdb where phone_number={}".format(payee_phone_number)
    res = db.execute_query(query)
    payee_fname, payee_lname, upi_id = res[0][0], res[0][1], res[0][2]
    payee_fullname = payee_fname + ' ' + payee_lname
    query = "select firstname, lastname, username, phone_number from userdb where userid={};".format(userid)
    res = db.execute_query(query)
    fname, lname, email, phone_num = res[0][0], res[0][1], res[0][2], res[0][3]
    fullname = fname + ' ' + lname
    order_receipt = userid+"__"+upi_id+"__"+datetime.now().strftime("%d_%m_%Y_%H_%M_%S")
    notes = {
        "payment_category_id": payment_category_id,
        "percentage_category": percentage_category,
        "upi_id": upi_id,
        "userid": userid,
        "actual_amount": actual_amount
    }
    data = {
            "amount" : final_amt*100,
            "currency": order_currency,
            "receipt": order_receipt,
            "notes": notes
        }
    resp = client.order.create(data= data)
    response = {
        "order_id": resp.get("id"),
        "amount": resp.get("amount_due"),
        "payee_fullname": payee_fullname,
        "upi_id": upi_id,
        "fullname": fullname,
        "email": email,
        "contact": phone_num
    }
    return response
