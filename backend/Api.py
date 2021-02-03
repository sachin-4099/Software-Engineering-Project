from flask import Flask,request, jsonify

app = Flask(__name__)

@app.route("/ping")
def ping():
    return {"reply": "pong"}

@app.route("/addUser", methods=["POST"])
def addUser():
    request= request.body()
    return request.jsonify()

if __name__=="__main__":
    app.run(debug=True)