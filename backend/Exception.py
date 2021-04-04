class DatabaseOperationException(Exception):

    def __init__(self, message, status_code=None, payload=None):
        self.message = message
        super().__init__(self.message)
        if status_code is None:
            self.status_code = 502
        self.payload = payload

    def to_dict(self):
        return {"status_code": self.status_code, "message": self.message, "payload": self.payload}


class RazorpayApiException(Exception):

    def __init__(self, message, status_code=None, payload=None):
        self.message = message
        super().__init__(self.message)
        if status_code is None:
            self.status_code = 500
        self.payload = payload

    def to_dict(self):
        return {"status_code": self.status_code, "message": self.message, "payload": self.payload}


class MyCustomError(Exception):
    status_code = 502

    def __init__(self, message="Error in Database operation", status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return rv
