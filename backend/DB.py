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
    res= cur.fetchone()[0]
    print("in user db", res)
    if(len(res)>0):
        return ["User", res]
    query= "Select username, password from admindb where username='{}'".format(uname)
    cur.execute(query)
    res= cur.fetchall()
    print("in admin db", res)
    if(len(res)>0):
        return ["Admin", res]
    return False

def add_user(fname, lname, uname, password):
    cur, conn= connect_to_db()
    if(cur==None):
        return "Error"
    if(check_if_exist(cur, uname) in ["User", "Admin"]):
        print("aleady there")
        return "Already Exist"
    query="Insert into userdb(firstname, lastname, username, password) values('{}','{}','{}','{}');".format(fname, lname, uname, password)
    cur.execute(query)
    close_connection(conn)


def auth_user(uname, password):
    cur, conn= connect_to_db()
    res= check_if_exist(cur, uname)
    print("auth---: ", res)

if __name__ == '__main__':
    # add_user("Ojasv", "Singh", "abc", "def")
    auth_user("abc", "def")