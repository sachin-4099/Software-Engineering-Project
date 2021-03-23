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


def confirmPayment(userid, actual_amount, order_currency, payment_category_id, percentage_category, coupon_id, merchant_id):
    config = configparser.ConfigParser()
    config.read('creds.ini')
    USER_KEY = config['RAZORPAY']['key_id']
    SECRET_KEY = config['RAZORPAY']['key_secret']
    client = razorpay.Client(auth=(USER_KEY, SECRET_KEY))
    discount = int(validate_coupon(coupon_id).get("discount"))
    final_amt = actual_amount + (actual_amount*discount)/100;
    print(userid, merchant_id)
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
    }
    return response
