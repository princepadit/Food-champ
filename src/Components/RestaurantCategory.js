import React, { createContext, useState } from "react";
import "./restaurantCategory.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ItemList from "./ItemList";
function RestaurantCategory({ data, restId, showItems, setShowIndex }) {
  const handleClick = () => {
    setShowIndex();
  };
  console.log(restId,"id")
  return (
    <div className="accordion">
      <div className="accordion-detials">
        <span className="title">
          {data.title} ({data?.itemCards?.length})
        </span>
        <span className="arrow">
          {!showItems && <KeyboardArrowDownIcon onClick={handleClick} />}
          {showItems && <KeyboardArrowUpIcon onClick={handleClick} />}
        </span>
      </div>
      {showItems && <ItemList items={data?.itemCards} resId={restId} />}
    </div>
  );
}
export  default RestaurantCategory;
