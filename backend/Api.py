from flask import Flask,request, jsonify, Response
import DB as db


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
        return Response("{'success': 'False'}", status=401, mimetype='application/json')
    else:
        return Response("{'success': 'True'}", status=200, mimetype='application/json')

if __name__=="__main__":
    app.run(debug=True)
