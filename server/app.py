from flask import Flask, request, jsonify, session, make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Listing, Booking, Review
import os

app = Flask(__name__)
app.config.from_object(ApplicationConfig)

Session(app)

app.secret_key = os.urandom(16).hex()

bcrypt = Bcrypt(app)
CORS(app, supports_credentials=True)
cross_origin(supports_credentials=True)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/@me")
def get_current_user():
    user_id = session.get("user_id")

    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    user = User.query.filter_by(id=user_id).first()
    return jsonify({
        "id": user.id,
        "email": user.email
    }) 

@app.route("/register", methods=["POST"])
def register_user():
    email = request.json["email"]
    password = request.json["password"]
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    phone_number = request.json["phone_number"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, first_name=first_name, last_name=last_name, phone_number=phone_number)
    db.session.add(new_user)
    db.session.commit()
    
    # session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login_user():
    if request.method == "POST":
        print("in login")
        email = request.json["email"]
        password = request.json["password"]

        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({"error": "Unauthorized"}), 401

        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({"error": "Unauthorized"}), 401

        return jsonify({
            "id": user.id,
            "email": user.email
        })

@app.route("/logout", methods=["DELETE"])
def logout_user():
    # session["user_id"] = None
    return jsonify({"message": "Logged out successfully"})

#####################################################

@app.route('/listings', methods=['GET'])
def listings():
    if request.method == 'GET':
        listings = Listing.query.all()
        listings_data = [listing.to_dict() for listing in listings]
        return jsonify(listings_data)
    
@app.route('/listings/<int:listing_id>', methods=['PATCH'])
def update_listing(listing_id):
    listing = Listing.query.get(listing_id)

    if not listing:
        return jsonify({'message': 'Property not found'}, 404)
    
    user_id = request.json["user_id"]

    print("HERE IS THE USER ID!!! LOOK AT ME!!!", user_id)
    
    if not User.query.filter_by(id=user_id).first():
        return jsonify({"error": "Unauthorized"}), 401

    data = request.get_json()

    # Update only the fields that are present in the request data
    for field in ['user_id', 'title', 'description', 'image_url', 'address', 'city', 'state', 'zip_code', 'price']:
        if field in data:
            setattr(listing, field, data[field])

    db.session.commit()
    return jsonify({'message': 'Property updated successfully'})

    
@app.route('/listings/<int:listing_id>', methods=['DELETE'])
def delete(listing_id):
    listing = Listing.query.get(listing_id)
    if listing:
        db.session.delete(listing)
        db.session.commit()
        return jsonify({'message': 'Property deleted successfully'})
    else:
        return jsonify({'message': 'Property not found'}, 404)
  

@app.route("/listings", methods=["POST"])

def create_listing():

    if request.method == "POST":

        user_id = request.json["user_id"]

    print("HERE IS THE USER ID!!! LOOK AT ME!!!", user_id)
    
    if not User.query.filter_by(id=user_id).first():
        return jsonify({"error": "Unauthorized"}), 401
    
    # Extract property details from the request

    title = request.json["title"]
    description = request.json["description"]
    image_url = request.json["image_url"]
    address = request.json["address"]
    city = request.json["city"]
    state = request.json["state"]
    zip_code = request.json["zip_code"]
    price = request.json["price"]
    # Add more fields as needed
    
    # Create a new listing
    new_listing = Listing(user_id=user_id, title=title, description=description, image_url=image_url, address=address, city=city, state=state, zip_code=zip_code, price=price)
    # Add more fields as needed
    db.session.add(new_listing)
    db.session.commit()
    
    return jsonify({"message": "Property listed successfully"})

######################################################################

# Booking (Create and Check Overlap)
@app.route("/bookings", methods=["POST"])

def create_booking():
    if request.method == "POST":

        user_id = request.json["user_id"]
    
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    # Extract booking details from the request
    def check_overlap(listing_id, check_in, check_out):

        bookings = Booking.query.filter_by(listing_id=listing_id).all()
        for booking in bookings:
            if check_in < booking.check_out and check_out > booking.check_in:
                return True
        return False
    
    user_id = request.json.user_id  # Get the authenticated user's ID
    data = request.json
    new_booking = Booking(user_id=user_id, check_in=data['check_in'], check_out=data['check_out'])
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({'message': 'Booking created successfully'}), 201

# # Review (Create)
# @app.route("/reviews", methods=["POST"])
# def create_review():
#     # Get user ID from the session or other authentication mechanism
#     user_id = request.json("user_id")
    
#     if not user_id:
#         return jsonify({"error": "Unauthorized"}), 401
    
#     # Extract review details from the request
#     booking_id = request.json["booking_id"]
#     rating = request.json["rating"]
#     comment = request.json["comment"]
    
#     # Create a new review
#     new_review = Review(user_id=user_id, booking_id=booking_id, rating=rating, comment=comment)
#     db.session.add(new_review)
#     db.session.commit()
    
#     return jsonify({"message": "Review posted successfully"})



if __name__ == "__main__":
    app.run(debug=True, port=5000)