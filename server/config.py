#from dotenv import load_dotenv
#load_dotenv()
import os
from flask import Flask
from flask_restful import Api, Resource



class ApplicationConfig:
    #SECRET_KEY = os.environ["SECRET_KEY"]
    SECRET_KEY = os.urandom(16).hex()
    app=Flask(__name__)

    SESSION_COOKIE_SECURE = True

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"

