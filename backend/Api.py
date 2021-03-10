from flask import Flask,request, jsonify, Response, json
import DB as db
import FrontendService as FrontendService

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

@app.route("/confirm_payement_merchant", methods=["POST"])
def confirmPayment():
    req = request.json
    print(req)
    username= req.get("username")
    amount = req.get("amount")
    currency = req.get("currency")
    payment_category_id= req.get("payment_category_id")
    percentage_category = req.get("percentage_category")
    coupon_id = req.get("coupon_id")
    merchant_id = req.get("merchant_id")
    PaymentService.checkCouponCodeValidity(coupon_code)
    PaymentService.generateOrderId(username, amount, currency, payment_category, percentage_category,  merchant_id)


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


if __name__=="__main__":
    app.run(debug=True)
