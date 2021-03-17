import DB as db

def validate_user_from_phoneNumber(phone_no):
    query = "select firstname, lastname, upi from userdb where phone_number={} LIMIT 1".format(phone_no)
    res = db.execute_query(query)
    if(len(res)>0):
        res = res[0]
        details = {"valid": True, "firstname": res[0], "lastname": res[1], "upi": res[2]}
    else:
        details = {"valid": False}
    return details
