import DB as db

def getCategory(userid):
    query= "select c.name, p.category_id, p.category_percentage from category_percentage p, category c where c.id=p.category_id and p.userid={};".format(userid)
    res = db.execute_query(query)
    response = []
    for i in res:
        temp={}
        temp['category_name']= i[0]
        temp['category_id']=i[1]
        temp['percentage']=i[2]
        response.append(temp)
    print(response)
    return response


def getMerchantList():
    query= "select merchant_name, merchant_id from merchants;"
    res = db.execute_query(query)
    response = []
    for i in res:
        temp={}
        temp['merchant_name'] = i[0]
        temp['merchant_id'] = i[1]
        response.append(temp)
    print(response)
    return response


def getCouponList(merchantid):
    query= "select couponid, coupon_desc, coupon_code from coupons where merchant_id={} and expired_at > now();".format(merchantid)
    res = db.execute_query(query)
    response = []
    for i in res:
        temp={}
        temp['coupon_id'] = i[0]
        temp['coupon_desc'] = i[1]
        temp['coupon_code'] = i[2]
        response.append(temp)
    print(response)
    return response
