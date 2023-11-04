from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

favorites_association = db.Table('favorites_association',
    db.Column('user_id', db.String(32), db.ForeignKey('users.id')),
    db.Column('listing_id', db.Integer, db.ForeignKey('listings.id'))
)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)
    first_name = db.Column(db.String(64), nullable=False)
    last_name = db.Column(db.String(64), nullable=False)
    phone_number = db.Column(db.String(16), nullable=False)

    listings = db.relationship("Listing", backref="user")
    bookings = db.relationship("Booking", backref="user")
    favorites = db.relationship("Listing", secondary=favorites_association, backref="users_who_favorited")


    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'phone_number': self.phone_number
        }


class Booking(db.Model):
    __tablename__ = "bookings"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    check_in = db.Column(db.DateTime, nullable=False)
    check_out = db.Column(db.DateTime, nullable=False)

    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    listing_id = db.Column(db.Integer, db.ForeignKey('listings.id'), nullable=False)
    listing = db.relationship("Listing", back_populates="bookings")

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'listing_id': self.listing_id,
            'check_in': self.check_in,
            'check_out': self.check_out,
            'listing': self.listing.to_dict() if self.listing else None
        }
class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    booking_id = db.Column(db.String(32), db.ForeignKey("bookings.id"), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=False)
    user=db.relationship("User", backref="reviews")
    booking=db.relationship("Booking", backref="reviews")

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'booking_id': self.booking_id,
            'rating': self.rating,
            'comment': self.comment
        }

    

class Listing(db.Model):
    __tablename__ = "listings"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(32), db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    image_url = db.Column(db.String(200), nullable=True)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(50), nullable=False)
    state = db.Column(db.String(50), nullable=False)
    zip_code = db.Column(db.String(10), nullable=False)
    price = db.Column(db.Integer, nullable=False)

    bookings = db.relationship("Booking", back_populates="listing")
    favorited_by = db.relationship("User", secondary=favorites_association, backref="listings_favorited")

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'image_url': self.image_url,
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'zip_code': self.zip_code,
            'price': self.price
        }