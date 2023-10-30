from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    first_name = db.Column(db.String(32))
    last_name = db.Column(db.String(32))
    phone_number = db.Column(db.String(32))

class Booking(db.Model):
    __tablename__ = "bookings"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    check_in = db.Column(db.DateTime, nullable=False)
    check_out = db.Column(db.DateTime, nullable=False)

class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    booking_id = db.Column(db.String(32), db.ForeignKey("bookings.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)

class Listing(db.Model):
    __tablename__ = "listings"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.String(128), nullable=False)
    city = db.Column(db.String(64), nullable=False)
    state = db.Column(db.String(64), nullable=False)
    zip_code = db.Column(db.String(16), nullable=False)
    price = db.Column(db.Integer, nullable=False)  