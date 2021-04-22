import psycopg2
from psycopg2 import sql


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
        return None, None


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

def check_if_exist(uname):
    query = sql.SQL("Select {column} from {table} where username=%(username)s").format(
        column=sql.Identifier("password"),
        table=sql.Identifier("userdb"))
    params = {"username": uname}
    res = execute_query(query, params)
    resp = {"designation": None, "password": None}
    if (len(res) != 0):
        resp["designation"] = "User"
        resp["password"] = res[0][0]
        return resp
    query = sql.SQL("Select {column} from {table} where username=%(username)s").format(
        column=sql.Identifier("password"),
        table=sql.Identifier("admindb"))
    res = execute_query(query, params)
    if (len(res) != 0):
        resp["designation"] = "Admin"
        resp["password"] = res[0][0]
        return resp
    return resp


def add_user(fname, lname, uname, password, locking_period, upi, phone_number):
    if check_if_exist(uname).get("designation") in ["User", "Admin"]:
        print("aleady there")
        return {"Exists": True, "Success": False}
    query = sql.SQL("INSERT INTO userdb(userid, first_name, last_name, username, password, locking_period, upi, "
                    "phone_number) VALUES(DEFAULT,  %s, %s, %s, %s, %s, %s, %s)")

    print("Query ", query)
    updated = execute_insert_query(query, [fname, lname, uname, password, locking_period, upi, phone_number])
    print("updated: ", updated)
    if (updated > 0):
        return {"Exists": False, "Success": True}
    return {"Exists": False, "Success": False}


def get_user_id_from_username(uname):
    query = "select userid from userdb where username=%s;"
    return execute_query(query, [uname])[0][0]


def get_admin_id_from_username(uname):
    query = "select userid from admindb where username=%s"
    return execute_query(query, [uname])[0][0]


def auth_user(uname, password):
    res = check_if_exist(uname)
    print(res)
    result = {"status": False, "user_id": None, "designation": None}
    if (res.get("designation")):
        designation = res.get("designation")
        _password = res.get("password")
        if (_password == password):
            result["status"] = True
            if (designation == "User"):
                _userid = get_user_id_from_username(uname)
                result["user_id"] = _userid
                result["designation"] = "User"
            else:
                _userid = get_admin_id_from_username(uname)
                result["user_id"] = _userid
                result["designation"] = "Admin"
    return result


def get_merchant_from_id(id):
    query = "select * from merchants where merchant_id = %s"
    merchants = execute_query(query, [id])
    return merchants[0]


def execute_query(query, params=None):
    cur, conn = connect_to_db()
    cur.execute(query, params)
    res = cur.fetchall()
    return res


def execute_insert_query(query, params=None):
    cur, conn = connect_to_db()
    cur.execute(query, params)
    conn.commit()
    return cur.rowcount


def execute_update_query(query, params=None):
    cur, conn = connect_to_db()
    cur.execute(query, params)
    conn.commit()
    return cur.rowcount
