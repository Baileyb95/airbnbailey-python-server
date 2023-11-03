#from dotenv import load_dotenv
#load_dotenv()
import os




class ApplicationConfig:
    #SECRET_KEY = os.environ["SECRET_KEY"]
    SECRET_KEY = os.urandom(16).hex()


    SESSION_COOKIE_SECURE = True

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"

