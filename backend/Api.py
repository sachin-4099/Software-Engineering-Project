from flask import Flask,request, jsonify, Response, json
import DB as db
import FrontendService as FrontendService
import PaymentService as PaymentService
import UserServices as UserServices

app = Flask(__name__)

@app.route("/ping")
def ping():
    return {"reply": "pong"}

@app.route("/addUser", methods=["POST"])
def addUser():
    req= request.json
    print(req)
    fname=req.get('fname')
    lname=req.get('lname')
    uname=req.get('uname')
    password=req.get('password')
    db.add_user(fname, lname, uname, password)
    return {"Success": True}

@app.route("/auth", methods=["POST"])
def authUser():
    req= request.json
    print(req)
    uname=req.get('uname')
    password=req.get('password')
    val = db.auth_user(uname, password)
    if(val[0]==False):
        return Response("{'success': False}", status=401, mimetype='application/json')
    else:
        return Response(jsonify("{'success': 'True'}"), status=200, mimetype='application/json')

@app.route("/confirm/payment_merchant", methods=["POST"])
def confirmPaymentMerchant():
    req = request.json
    print(req)
    userid= str(req.get("userid"))
    amount = int(req.get("amount"))
    currency = req.get("currency")
    payment_category_id= int(req.get("payment_category_id"))
    percentage_category = req.get("percentage_category")
    coupon_id = int(req.get("coupon_id"))
    merchant_id = int(req.get("merchant_id"))
    response = PaymentService.confirmPaymentMerchant(userid, amount, currency, payment_category_id, percentage_category, coupon_id,  merchant_id)
    print(type(response))
    return app.response_class(
        response=json.dumps(response),
        status=200,
        mimetype='application/json'
    )

@app.route("/confirm/payment_nonmerchant", methods=["POST"])
def confirmPaymentNonMerchant():
    req = request.json
    print(req)
    userid= str(req.get("userid"))
    amount = int(req.get("amount"))
    currency = req.get("currency")
    payment_category_id= req.get("payment_category_id")
    percentage_category = req.get("percentage_category")
    payee_phone_number = req.get("phone_number")
    payee_phone_number = payee_phone_number[1:]
    response = PaymentService.confirmPaymentNonMerchant(userid, amount, currency, payment_category_id, percentage_category, payee_phone_number)
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
    merchantid = request.args.get('merchantid')
    _response = FrontendService.getCouponList(merchantid)
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
    if(not discount.get("valid")):
        status=400
    response = app.response_class(
        response=json.dumps(discount),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route("/validate/phone_number", methods=["GET"])
def validate_user_from_phoneNumber():
    phone_no = request.args.get('phone_no')
    phone_no = phone_no[1:]
    user_details = UserServices.validate_user_from_phoneNumber(phone_no)
    status = 200
    if(not user_details['valid']):
        status = 400
    return app.response_class(
        response=json.dumps(user_details),
        status=status,
        mimetype='application/json'
    )

if __name__=="__main__":
    app.run(debug=True)
