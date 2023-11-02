import React from "react";
import { Route, Link } from "react-router-dom";
import ListingPage from "./ListingPage";


function Favorites({ favorites, handleAddToFavorites, handleDeleteFromFavorites }) {
    
    console.log(favorites)
    const displayFavorites = favorites.map(post => {
            return <ListingPage 
                key={post.id}
                id={post.id}
                price={post.price}
                address={post.house.address}
                description={post.house.description}
                num_of_baths={post.house.num_of_baths}
                num_of_beds={post.house.num_of_beds}
                square_feet={post.house.square_feet}
                house_img={post.house.house_img}
                user={post.user.name}
                handleAddToFavorites={handleAddToFavorites}
                handleDeleteFromFavorites={handleDeleteFromFavorites}
                favorited={post.favorited}
                />
        })
    
        return (
            <div className="favorites">
                <div>Favorites</div>
                {displayFavorites}
            </div>
        );
    

};


export default Favorites;