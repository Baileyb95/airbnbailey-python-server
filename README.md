# Air BnBailey  🏠
(Mock) Air BnBailey is a web application that allows users to create an account one for business side to make listings, modify listings, and delete lisitings. The have a consumer side to add listings to the favorites. 

# Functionality
- Create : listings, users, booking, review
- Read : listings, users, booking, review
- UPDATE : listings, users, booking, review
- DELETE : listings, users, booking, review

# API routes
/Users GET, POST
/Users/id, GET, POST, PATCH, DELETE
/Listings GET, POST
/Listings/id GET, POST, PATCH, DELETE
/Reviews GET, POST
/Reviews/id  GET, POST, PATCH, DELETE
/Bookings GET, POST
/Bookings/id  GET, POST, PATCH, DELETE

# React Diagram
Route : / 
Purpose USER SIGN IN

Route : /home
Purpose lets users navigate to either their Favorited listings section or General Listings

Route: /home / listings
Purpose lets users to look at the listings posted for them to book

Route: /home /listings /id
Purpose lets users look at single listing and to allow a check out or to place in their favorites

Route /home /favorites
Purpose lets users look at all the listings they have favorited

Route /home /favorites /id
Purpose lets users look at individual listing that they have previously have favorited and see reviews/place review. 

# Stretch Goals
- Comments and reviews on homes
- Geocoding


<img width="1330" alt="Screen Shot 2023-10-26 at 8 41 28 AM" src="https://github.com/Baileyb95/AirBnBailey/assets/108492331/90c37d79-6560-482a-a2bd-c5232c481a95">
