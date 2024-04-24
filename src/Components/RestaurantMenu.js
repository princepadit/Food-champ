import React, { useEffect, useState } from "react";
import ShimmerMenu from "./ShimmerMenu";
import { useParams } from "react-router-dom";
import { swiggy_menu_api_URL } from "../assets/constants";
import "./restaurantMenu.css";
import RestaurantCategory from "./RestaurantCategory";
import { CDN_URL } from "../assets/constants";

function RestaurantMenu() {
  const { resId } = useParams();
  const [resInfo, setResInfo] = useState(null);
  const [showIndex,setShowIndex] = useState(null)

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(swiggy_menu_api_URL + resId);
    const json = await data.json();
    setResInfo(json.data);
  };
  const setShow = ((index) => {
    if(showIndex === index){
      setShowIndex(null)
    }
    else{         
      setShowIndex(index)
    }
  })

  if (resInfo === null) return <ShimmerMenu />;

  const { name, cuisines, costForTwoMessage, cloudinaryImageId, avgRating } =
    resInfo?.cards[2]?.card?.card?.info;
  // const { itemCards } =
  //   resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  const category =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  return (
    <div className="restaurant-menu">
      <div className="restaurant-summary">
        <img
          className="restaurant-img"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />
        <div className="restaurant-summary-details">
          <h1 className="restaurant-title">{name}</h1>
          <p className="restaurant-tags">{cuisines?.join(", ")}</p>
          <div className="restaurant-details">
            <span>Rating - {avgRating}</span>
            <div className="restaurant-rating-slash">|</div>
            <div>25 Mins</div>
            <div className="restaurant-rating-slash">|</div>
            <div>{costForTwoMessage}</div>
          </div>
        </div>
      </div>
      <div className="restaurant-menu-content">
        <div className="menu-items-container">
          <div className="menu-items-list">
            <div className="menu-title-wrap">
              {category.map((category,index) => (
                <RestaurantCategory
                  key={category?.card?.card?.title}
                  data={category?.card?.card}
                  restId = {resInfo.cards[0]?.card?.card?.info?.id}
                  showItems ={index === showIndex ? true : false}
                  setShowIndex={() => setShow(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RestaurantMenu;
// export {categoryContext};
