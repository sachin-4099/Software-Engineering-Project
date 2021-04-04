import DB as db


def validate_user_from_phoneNumber(phone_no):
    print(phone_no)
    query = "select first_name, last_name, upi from userdb where phone_number=%s LIMIT 1"
    res = db.execute_query(query, [phone_no])
    print(res)
    if (len(res) > 0):
        details = {"valid": True, "firstname": res[0][0], "lastname": res[0][1], "upi": res[0][2]}
    else:
        details = {"valid": False}
    return details


def update_locking_period(userid, lockingperiod):
    query = "update userdb set locking_period=%(lp)s where userid= %(uid)s"
    res = db.execute_update_query(query, {"lp": lockingperiod, "uid": userid})
    if (res):
        return {"success": True}
    else:
        return {"success": False}


def get_locking_period(userid):
    query = "select locking_period from userdb where userid = %s"
    res = db.execute_query(query, [userid])
    resp = {"user_id": userid, "locking_period": res[0][0]}
    return resp


def update_saving_percentage(userid, percentage, categoryid):
    query = "update category_percentage set category_percentage=%s where userid=%s and category_id=%s"
    res = db.execute_update_query(query, [percentage, userid, categoryid])
    if (res):
        return {"success": True}
    else:
        return {"success": False}
