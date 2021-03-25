import psycopg2

def connect_to_db():
    """ Connect to the PostgreSQL database server """
    conn = None
    try:
        # read connection parameters
        conn = psycopg2.connect(
                host="localhost",
                database="swe",
                user="postgres",
                password="qwerty"
        )
        cur = conn.cursor()
        return cur, conn
    except:
        print("error")
        return None

def close_connection(conn):
    conn.commit()
    conn.close()
    print('Database connection closed.')

# create table admindb(
#       uid SERIAL PRIMARY KEY,
#       firstname VARCHAR(255) NOT NULL,
#       lastname VARCHAR(255),
#       username VARCHAR(255) NOT NULL,
#       password VARCHAR(255) NOT NULL
# );

def check_if_exist(cur, uname):
    query= "Select password from userdb where username='{}'".format(uname)
    cur.execute(query)
    res= cur.fetchone()
    print("in user db", res)
    if(res != None):
        return ["User", res[0]]
    query= "Select username, password from admindb where username='{}'".format(uname)
    cur.execute(query)
    res= cur.fetchone()
    print("in admin db", res)
    if(res != None):
        return ["Admin", res[0]]
    return ["False", None]

def add_user(fname, lname, uname, password):
    cur, conn= connect_to_db()
    if(cur==None):
        return "Error"
    if(check_if_exist(cur, uname)[0] in ["User", "Admin"]):
        print("aleady there")
        return "Already Exist"
    query="Insert into userdb(firstname, lastname, username, password) values('{}','{}','{}','{}');".format(fname, lname, uname, password)
    cur.execute(query)
    close_connection(conn)


def get_user_id_from_username(uname):
    query = "select userid from userdb where username='{}';".format(uname)
    return execute_query(query)[0][0]

def get_admin_id_from_username(uname):
    query = "select userid from admindb where username='{}';".format(uname)
    return execute_query(query)[0][0]

def auth_user(uname, password):
    cur, conn= connect_to_db()
    res= check_if_exist(cur, uname)
    op = {}
    if(res[0]=='False'):
        op["status"]=False
        return op
    _uname= res[0]
    _password= res[1]
    if(_password==password):
        op["status"]=True
        if(_uname=="User"):
            _userid = get_user_id_from_username(uname)
            op["user_id"]=_userid
            op["used_by"]="User"
        else:
            _userid = get_admin_id_from_username(uname)
            op["user_id"]=_userid
            op["used_by"]="Admin"
    else:
        op["status"]=False
    return op

def execute_query(query):
    cur, conn= connect_to_db()
    cur.execute(query)
    res= cur.fetchall()
    return res

def execute_update_query(query):
    cur, conn= connect_to_db()
    cur.execute(query)
    conn.commit()
    return cur.rowcount
