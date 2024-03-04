import React, { useState, useEffect, useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import { swiggy_api_URL } from "../assets/constants";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import "./restaurant.css";
// import UserContext from "./assets/UserContext";
import UserContext from "../assets/UserContext";

function filterData(searchbar, restaurants) {
  const resFilterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name.toLowerCase().includes(searchbar.toLowerCase())
  );
  return resFilterData;
}

function Restaurant() { 
  const [listofrestaurants, setListofrestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchbar, setSearchbar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const {loggedInUser,setUserName} = useContext(UserContext)

  const fetchData = async () => {
    try {
      const data = await fetch(swiggy_api_URL);
      const json = await data.json();
      console.log(json, "data");
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          // initialize checkData for Swiggy Restaurant data
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      const resData = await checkJsonData(json);
      setListofrestaurants(resData);
      setFilteredRestaurant(resData);
    } catch (error) {
      console.log(error);
    }
  };

  // use searchData function and set condition if data is empty show error message
  const searchData = (searchbar, restaurants) => {
    if (searchbar !== "") {
      const filteredData = filterData(searchbar, restaurants);
      setFilteredRestaurant(filteredData);
      setErrorMessage("");
      if (filteredData?.length === 0) {
        setErrorMessage(
          `Sorry, we couldn't find any results for "${searchbar}"`
        );
      }
    } else {
      setErrorMessage("");
      setFilteredRestaurant(restaurants);
    }
  };

  if (!listofrestaurants) return null;

  return (
    <>
      <div className="search-container">
        <input
          className="searchbar"
          placeholder="Search Restaurant"
          value={searchbar}
          onChange={(e) => {
            setSearchbar(e.target.value);
            searchData(e.target.value, listofrestaurants);
          }}
        />
        <button
          className="search"
          onClick={() => {
            searchData(searchbar, listofrestaurants);
          }}
        >
          search
        </button>
        <button
          className="filter"
          onClick={() => {
            const filteredList = filteredRestaurant.filter(
              (res) => res?.info?.avgRating > 4
            );
            setFilteredRestaurant(filteredList);
          }}
        >
          Top Rated Restaurant
        </button>
      </div>
      {/* <label>Enter Your name : </label>
        <input
          className="filter"
          placeholder="Username"
          value={loggedInUser}
          onChange={(e)=>setUserName(e.target.value)}
        ></input> */}
      {errorMessage && <div className="error-container">{errorMessage}</div>}
      {listofrestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="Card-container">
          {filteredRestaurant.map((restaurant) => (
            <Link
              key={restaurant.info.id}
              to={"/restaurant/" + restaurant.info.id}
            >
              <RestaurantCard {...restaurant.info} />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
export default Restaurant;
