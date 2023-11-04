from flask import Flask, request, jsonify, session, make_response
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from flask_session import Session
from config import ApplicationConfig
from models import db, User, Listing, Booking, Review
from datetime import datetime
import os
from pdb import set_trace as PDB
app = Flask(__name__)
app.config.from_object(ApplicationConfig)

Session(app)

#app.secret_key = os.urandom(16).hex()

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

@app.route("/user/", methods=["GET"])
def get_user():
    if request.method == "GET":
        user = User.query.all()
    if not user:
        return jsonify({"error": "User not found"}), 404
    user_data = [user.to_dict() for user in user]
    return jsonify(user_data)

@app.route("/user/<string:user_id>", methods=["GET"])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    user_data = user.to_dict()
    return jsonify(user_data)

@app.route("/user/<string:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    data = request.get_json()
    for field in ['email', 'password', 'first_name', 'last_name', 'phone_number']:
        if field in data:
            setattr(user, field, data[field])
    db.session.commit()
    return jsonify({'message': 'User updated successfully'})

@app.route("/user/<string:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        Listing.query.filter_by(user_id=user_id).delete()
        Booking.query.filter_by(user_id=user_id).delete()
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully'})
    else:
        return jsonify({'message': 'User not found'}, 404)
    

@app.route("/user/<string:user_id>/listings", methods=["GET"])
def get_users_listings(user_id):
   user = User.query.get(user_id)
   if not user:
       return jsonify({"error": "User not found"}), 404
   user_listings = [listing.to_dict() for listing in user.listings]
   return jsonify(user_listings)

@app.route("/user/<string:user_id>/bookings", methods=["GET"])
def get_users_booking(user_id):
   user = User.query.get(user_id)
   if not user:
       return jsonify({"error": "User not found"}), 404
   user_bookings = [booking.to_dict() for booking in user.bookings]
   return jsonify(user_bookings)

@app.route("/user/<string:user_id>/bookings/<int:listing_id>", methods=["DELETE"])
def delete_booking(listing_id, user_id):
  try:
      user_id = request.json["user_id"]
      listing_id = request.json.get("listing_id")
  except KeyError:
      return jsonify({'message': 'Missing user_id or listing_id in request body'}), 400
  booking = Booking.query.filter_by(listing_id=listing_id, user_id=user_id).first()
  if booking:
      Listing.query.filter_by(id=listing_id).delete()
      Booking.query.filter_by(id=booking.id).delete()
      db.session.delete(booking)
      db.session.commit()
      return jsonify({'message': 'Booking deleted successfully'})
  else:
      return jsonify({'message': 'Booking not found'}, 404)


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
        Booking.query.filter_by(listing_id=listing_id).delete()
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

        user_id = request.json.get("user_id")
        listing_id = request.json.get("listing_id")
        check_in_str = request.json.get("check_in")
        check_out_str = request.json.get("check_out")

    
    if not user_id or not listing_id:
        return jsonify({"error": "Unauthorized"}), 401
    
    # Extract booking details from the request
    def check_overlap(listing_id, check_in, check_out):

        bookings = Booking.query.filter_by(listing_id=listing_id).all()
        for booking in bookings:
            if check_in < booking.check_out and check_out > booking.check_in:
                return True
        return False
    data = request.json
    check_in_str = data['check_in']
    check_out_str = data['check_out']

    check_in_datetime = datetime.strptime(check_in_str, '%Y-%m-%dT%H:%M:%S.%fZ')
    check_out_datetime = datetime.strptime(check_out_str, '%Y-%m-%dT%H:%M:%S.%fZ')
    user_id = request.json["user_id"]  # Get the authenticated user's ID

    new_booking = Booking(user_id=user_id, check_in=check_in_datetime, check_out=check_out_datetime, listing_id=listing_id)
    db.session.add(new_booking)
    db.session.commit()
    return jsonify({'message': 'Booking created successfully'}), 201

@app.route("/bookings/<user_id>", methods=["GET"])
def get_user_bookings(user_id):
    # Assuming user_id is passed as a URL parameter
    user_bookings = Booking.query.filter(Booking.user_id == user_id).all()

    if not user_bookings:
        return jsonify({"message": "No bookings found for this user"}), 404

    # Convert the user's bookings to a list of dictionaries
    user_bookings_data = [booking.to_dict() for booking in user_bookings]

    return jsonify(user_bookings_data)



######################################################################favorites

@app.route('/favorites', methods=['POST'])
def add_favorite():
    # Get the user and listing data from the request
    user_id = request.json.get('user_id')
    listing_id = request.json.get('listing_id')

    # Check if the user and listing exist in the database
    user = User.query.get(user_id)
    listing = Listing.query.get(listing_id)

    if not user or not listing:
        return jsonify({'error': 'User or listing not found'}), 404

    # Check if the user has already favorited the listing
    if listing in user.favorites:
        return jsonify({'message': 'Listing is already in favorites'}), 200

    # Add the listing to the user's favorites
    user.favorites.append(listing)
    db.session.commit()

    return jsonify({'message': 'Listing added to favorites'}), 201


@app.route('/favorites/<string:user_id>', methods=['GET'])
def get_favorites(user_id):
    # Assuming user_id is passed as a URL parameter
    user = User.query.get(user_id)

    if not user:
        return jsonify({'error': 'User not found'}), 404

    # Convert the user's favorites to a list of dictionaries
    favorites_data = [listing.to_dict() for listing in user.favorites]

    return jsonify(favorites_data)

@app.route('/favorites/<string:user_id>/<int:listing_id>', methods=['DELETE'])
def remove_favorite(user_id, listing_id):
    # Assuming user_id and listing_id are passed as URL parameters
    user = User.query.get(user_id)
    listing = Listing.query.get(listing_id)

    if not user or not listing:
        return jsonify({'error': 'User or listing not found'}), 404

    # Remove the listing from the user's favorites
    user.favorites.remove(listing)
    db.session.commit()

    return jsonify({'message': 'Listing removed from favorites'})


if __name__ == "__main__":
    app.run(debug=True, port=5000)