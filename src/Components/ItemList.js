import { CDN_URL } from "../assets/constants";
import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Popup from "reactjs-popup";
import { CounterContext } from "../assets/ConterProvider";
import "./itemList.css";
import {
  addItem,
  addRestId,
  removeItem,
  clearResId,
} from "../App Store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
// import { createContext } from "react";

const ItemList = ({ items, resId }) => {
  const cartItems = useSelector((store) => store?.cart?.items);
  const restaurantId = useSelector((store) => store?.cart?.id);
  const dispatch = useDispatch();
  const { setresumeid, setitemsvalue } = useContext(CounterContext);
  setresumeid(resId);
  const id = resId;

  const handleAddItem = (item) => {
    if (!restaurantId[0] || id === restaurantId[0] || id === undefined) {
      dispatch(addItem(item));
      if (id !== restaurantId[0]) {
        dispatch(addRestId(id));
      }
    } else {
      window.alert("Do you want to clear the cart and change restaurant?");
    }
  };

  const filteredItem = items.filter(
    (value, index, self) =>
      index ===
      self.findIndex((element) => element.card.info.id === value.card.info.id)
  );

  const handleRemoveItem = (id) => {
    const index = cartItems.findIndex((element) => element.card.info.id === id);
    index !== -1 && dispatch(removeItem(index));
    if (cartItems.length === 1) {
      dispatch(clearResId());
    }
  };

  return (
    <div>
      {filteredItem.map((item) => (
        <div className="menu-item" key={item?.card?.info?.id}>
          <div className="menu-item-details">
            <h3 className="item-title">{item?.card?.info?.name}</h3>
            <p className="item-cost">
              {"Rs"} {item?.card?.info?.price / 100}
            </p>
            <p className="item-desc">{item?.card?.info?.description}</p>
          </div>
          {/* <div className="dataDetails"> */}
          <Popup
            trigger={
              <div className="menu-img-wrapper">
                {item?.card?.info?.imageId && (
                  <img
                    className="menu-item-img"
                    src={CDN_URL + item?.card?.info?.imageId}
                    alt={item?.card?.info?.name}
                  />
                )}
                <button className="add-btn"> Add </button>
              </div>
            }
            modal
            nested
          >
            {(close) => (
              <div className="modal">
                <div onClick={() => close()}></div>
                <img
                  className="modal-img"
                  src={CDN_URL + item?.card?.info?.imageId}
                  alt={item?.card?.info?.name}
                  onClick={() => close()}
                />
                <div className="info">
                <h3 className="title">{item?.card?.info?.name}</h3>
                <p className="cost">
                  {"₹"} {item?.card?.info?.price / 100}
                </p>
                <p className="desc">{item?.card?.info?.description}</p>
                </div>
                <div className="button">
                  {cartItems.find(
                    (element) => element.card.info.id === item.card.info.id
                  ) ? (
                    <div className="Add-item-btn">
                      <RemoveIcon
                        onClick={() => handleRemoveItem(item?.card?.info?.id)}
                      />
                      <span>
                        {
                          cartItems.filter(
                            (element) =>
                              element.card.info.id === item.card.info.id
                          ).length
                        }
                      </span>

                      <AddIcon onClick={() => handleAddItem(item)} />
                    </div>
                  ) : (
                    <div className="Add-item-btn">
                      <span
                        className="text"
                        onClick={() => handleAddItem(item)}
                      >
                        ADD
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </Popup>
        </div>
        // </div>
      ))}
    </div>
  );
};

export default ItemList;
