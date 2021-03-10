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
