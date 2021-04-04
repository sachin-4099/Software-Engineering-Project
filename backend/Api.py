from flask import Flask, request, json

import DB as db
import FrontendService as FrontendService
import PaymentService as PaymentService
import UserServices as UserServices

app = Flask(__name__)

'''
TODO:
1. Widthdraw after a fixed amount of time
2. Exceptions at correct places
3. Which model used for software development
4. How did we test it?
5. 
'''


@app.route("/ping")
def ping():
    db.check_if_exist("ojasv")
    return app.response_class(
        response=json.dumps({"success": True}),
        status=200,
        mimetype='application/json'
    )


@app.route("/addUser", methods=["POST"])
def addUser():
    req = request.json
    print(req)
    fname = req.get('fname')
    lname = req.get('lname')
    uname = req.get('uname')
    password = req.get('password')
    locking_period = req.get("locking_period")
    upi = req.get("upi")
    phone_number = req.get("phone_number")
    inserted = db.add_user(fname, lname, uname, password, locking_period, upi, phone_number)
    print(inserted)
    resp = {"Success": None, "Message": None}
    if inserted.get("Exists"):
        resp["Success"] = False
        resp["Message"] = "Entry already exist"
    elif not inserted.get("Success"):
        resp["Success"] = False
        resp["Message"] = "Cannot insert into DB. Some error"
    else:
        resp["Success"] = True
        resp["Message"] = "Inserted successfully"
    return app.response_class(
        response=json.dumps(resp),
        status=200,
        mimetype='application/json'
    )


@app.route("/auth", methods=["POST"])
def authUser():
    req = request.json
    print(req)
    uname = req.get('uname')
    password = req.get('password')
    res = db.auth_user(uname, password)
    print("res", res)
    if (res.get("status")):
        return app.response_class(
            response=json.dumps(res),
            status=200,
            mimetype='application/json'
        )
    else:
        return app.response_class(
            response=json.dumps(res),
            status=401,
            mimetype='application/json'
        )


@app.route("/confirm/payment/merchant", methods=["POST"])
def confirm_payment_merchant():
    req = request.json
    userid = req.get("userid")
    amount = req.get("amount")
    currency = req.get("currency")
    payment_category_id = req.get("payment_category_id")
    category_percentage = req.get("category_percentage")
    coupon_id = req.get("coupon_id")
    merchant_id = req.get("merchant_id")
    response = PaymentService.confirm_payment_merchant(userid, amount, currency, payment_category_id,
                                                       category_percentage,
                                                       coupon_id,
                                                       merchant_id)
    return app.response_class(
        response=json.dumps(response),
        status=200,
        mimetype='application/json'
    )


@app.route("/confirm/payment/non_merchant", methods=["POST"])
def confirm_payment_non_merchant():
    req = request.json
    userid = req.get("userid")
    amount = req.get("amount")
    currency = req.get("currency")
    payment_category_id = req.get("payment_category_id")
    category_percentage = req.get("category_percentage")
    payee_phone_number = req.get("payee_phone_number")
    # payee_phone_number = payee_phone_number[1:]
    response = PaymentService.confirm_payment_non_merchant(userid, amount, currency, payment_category_id,
                                                           category_percentage, payee_phone_number)
    print(response)
    return app.response_class(
        response=json.dumps(response),
        status=200,
        mimetype='application/json'
    )


@app.route("/list/category", methods=["GET"])
def getCategory():
    userid = request.args.get('userid')
    _response = FrontendService.getCategory(userid)
    response = app.response_class(
        response=json.dumps(_response),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/list/merchant", methods=["GET"])
def getMerchantList():
    _response = FrontendService.getMerchantList()
    response = app.response_class(
        response=json.dumps(_response),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/list/coupon", methods=["GET"])
def getCouponList():
    merchant_id = request.args.get('merchant_id')
    _response = FrontendService.getCouponList(merchant_id)
    response = app.response_class(
        response=json.dumps(_response),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/validate/coupon", methods=["GET"])
def validate_coupon():
    coupon_id = request.args.get("coupon_id")
    discount = PaymentService.validate_coupon(coupon_id)
    status = 200
    if (not discount.get("valid")):
        status = 400
    response = app.response_class(
        response=json.dumps(discount),
        status=status,
        mimetype='application/json'
    )
    return response


@app.route("/update/locking_period", methods=["PUT"])
def update_locking_period():
    req = request.json
    userid = req.get("user_id")
    locking_period = req.get("locking_period")
    result = UserServices.update_locking_period(userid, locking_period)
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/list/locking_period", methods=["GET"])
def get_locking_period():
    userid = request.args.get('userid')
    result = UserServices.get_locking_period(userid)
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/update/saving_percentage", methods=["PUT"])
def update_saving_percentage():
    req = request.json
    userid = req.get("user_id")
    saving_percentage = req.get("saving_percentage")
    category_id = req.get("category_id")
    result = UserServices.update_saving_percentage(userid, saving_percentage, category_id)
    response = app.response_class(
        response=json.dumps(result),
        status=200,
        mimetype='application/json'
    )
    return response


@app.route("/validate/phone_number", methods=["GET"])
def validate_user_from_phoneNumber():
    phone_no = request.args.get('phone_no')
    user_details = UserServices.validate_user_from_phoneNumber(phone_no)
    status = 200
    if (not user_details['valid']):
        status = 400
    return app.response_class(
        response=json.dumps(user_details),
        status=status,
        mimetype='application/json'
    )


@app.route("/list/transactions", methods=["GET"])
def get_transactions():
    userid = request.args.get('userid')
    resp = PaymentService.get_transactions(userid)
    return app.response_class(
        response=json.dumps(resp),
        status=200,
        mimetype='application/json'
    )


@app.route("/validate/transaction", methods=["POST"])
def validate_transaction():
    order_id = request.json.get("order_id")
    success = request.json.get("success")
    print(success)
    resp = PaymentService.validate_transaction(order_id, success)
    return app.response_class(
        response=json.dumps(resp),
        status=200,
        mimetype='application/json'
    )


if __name__ == "__main__":
    app.run(debug=True)
