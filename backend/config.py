import configparser
config = configparser.ConfigParser()
config['RAZORPAY']={'key_id':'rzp_test_5kt38WvQ1V05jk', 'key_secret':'ssjdjUGVRNW35CGH5PEiqMt4'}
with open('creds.ini', 'w') as configfile:
    config.write(configfile)
