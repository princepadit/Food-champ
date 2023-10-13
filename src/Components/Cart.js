import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
// import ItemList from "./ItemList";
import { Link } from "react-router-dom";
import emptyCart from "../assets/emptyCart.png";
import "./cart.css";
import {
  addItem,
  addRestId,
  removeItem,
  clearResId,
  clearCart,
} from "../App Store/cartSlice";
import { CDN_URL } from "../assets/constants";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { CounterContext } from "../assets/ConterProvider";

function Cart() {
  const cartItems = useSelector((store) => store.cart.items);
  const restaurantId = useSelector((store) => store.cart.id);
  const { resId, items, setresumeid, setitemsvalue } =
    useContext(CounterContext);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(clearResId());
  };
  const id = resId;
  const handleAddItem = (item) => {
    if (!restaurantId[0] || id === restaurantId[0] || id === undefined) {
      dispatch(addItem(item));
      if (id !== restaurantId[0]) {
        dispatch(addRestId(id));
      }
    } else {
      console.log("DO you want to clear the chart and change restaurant");
      dispatch(clearResId());
    }
  };
  const filteredItem = cartItems.filter(
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

  const calculateTotalCost = () => {
    let total = 0;
    filteredItem.forEach((item) => {
      total +=
        (item.card.info.price / 100) *
        cartItems.filter(
          (element) => element.card.info.id === item.card.info.id
        ).length;
    });
    return total;
  };

  return (
    <div className="cartpage">
      {/* <h1>Your Cart</h1> */}
      {filteredItem.length === 0 ? (
        <div className="empty">
          <img className="emptycart" src={emptyCart}></img>
          <h3>Your Cart is Empty</h3>
          <Link to="/">
            <button className="explore-btn">Explore Restaurants</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="clearCart" onClick={handleClearCart}>
            <button className="clear-btn"> Clear Cart</button>
          </div>
          <div className="cartItem">
            <div className="cartlayout">
              <h3>Items</h3>
              <h3>Price</h3>
              <h3>Quantity</h3>
              <h3>Total Price</h3>
            </div>
            {filteredItem.map((item) => (
              <div className="cart-items" key={item?.card?.info?.id}>
                <div className="cart-img-wrapper">
                  {item?.card?.info?.imageId && (
                    <img
                      className="cart-item-img"
                      src={CDN_URL + item?.card?.info?.imageId}
                      alt={item?.card?.info?.name}
                    />
                  )}
                  <h6 className="cart-title">{item?.card?.info?.name}</h6>
                </div>
                <p className="cart-cost">
                  {" ₹"} {item?.card?.info?.price / 100}
                </p>
                <div className="ADD-btn">
                  {
                    <div className="cart-btn">
                      <span
                        className="remove-btn"
                        onClick={() => handleRemoveItem(item.card.info.id)}
                      >
                        <RemoveIcon />
                      </span>
                      <span className="cart-count">
                        {
                          cartItems.filter(
                            (element) =>
                              element.card.info.id === item.card.info.id
                          ).length
                        }
                      </span>
                      <span
                        className="add-more-btn"
                        onClick={() => handleAddItem(item)}
                      >
                        <AddIcon />
                      </span>
                    </div>
                  }
                </div>
                <p className="item-total">
                  {" ₹ "}{" "}
                  {(item?.card?.info?.price / 100) *
                    cartItems.filter(
                      (element) => element.card.info.id === item.card.info.id
                    ).length}
                </p>
              </div>
              // </div>
            ))}
            <div className="total-cost">
              <div className="total">
                Item Total :{"   ₹ "} {calculateTotalCost()}
              </div>

              <div className="total">
                Delivery fee :{"   ₹ "} {50}
              </div>
              <div className="total">
                To Pay :{"   ₹ "} {calculateTotalCost() + 50}
              </div>
            </div>
          </div>
          <div className="proceed">
            <button className="proceed-btn">Proceed to Pay</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
