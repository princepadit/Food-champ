import React from "react";
import "./restaurantcard.css";
import { CDN_URL } from "../assets/constants";
const RestaurantCard = ({
  cloudinaryImageId,
  name,
  cuisines,
  areaName,
  avgRating,
  costForTwo,
  sla,
}) => {
  return (
    <div className="card">
      <img src={CDN_URL + cloudinaryImageId} alt="food" />
      <h3 className="details">{name}</h3>
      <h6 className="details">{cuisines.join(", ")}</h6>
      <h5 className="details">{areaName}</h5>
      <span>
        <h4
          style={
            avgRating < 4
              ? {
                  backgroundColor: "red",
                  textDecoration: "underline",
                  textDecorationColor: "red",
                  marginTop: "-15px"
                }
              : avgRating === "--"
              ? { backgroundColor: "white", color: "black" }
              : {
                  color: "white",
                  textDecoration: "underline",
                  textDecorationColor: "green",
                  marginTop: "-15px"
                }
          }
        >
          <i className="fa-solid fa-star"></i>
          {avgRating}
        </h4>
        {/* <h4 className="details">•</h4> */}
        <h4 className="details-time">{sla?.slaString ?? "2.0 km"}</h4>
        {/* <h4 className="details">•</h4> */}
        <h4 className="details">{costForTwo ?? "₹200 for two"}</h4>
      </span>
    </div>
  );
};

export default RestaurantCard;
