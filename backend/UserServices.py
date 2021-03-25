import DB as db

def validate_user_from_phoneNumber(phone_no):
    query = "select firstname, lastname, upi from userdb where phone_number={} LIMIT 1".format(phone_no)
    res = db.execute_query(query)
    if(len(res)>0):
        res = res[0]
        details = {"valid": True, "firstname": res[0][0], "lastname": res[0][1], "upi": res[0][2]}
    else:
        details = {"valid": False}
    return details

def update_locking_period(userid, lockingperiod):
    query = "update userdb set lockingperiod={} where userid={}".format(lockingperiod, userid)
    try:
        print(3)
        db.execute_query(query)
        print(len(res))
        return {"success": True}
    except:
        return {"success": False}

def get_locking_period(userid):
    query = "select lockingperiod from userdb where userid = {}".format(userid)
    res = db.execute_query(query)
    resp = {"locking_period": res[0][0]}
    return resp

def update_saving_percentage(userid, percentage, categoryid):
    query = "update category_percentage set category_percentage={} where userid={} and category_id={}".format(percentage, userid, categoryid)
    try:
        res = db.execute_query(query)
        return {"success": True}
        print(res)
    except:
        return {"success": False}
