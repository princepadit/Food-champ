import React, { useState } from "react";
import "./header.css";
import { LOGO_URL } from "../assets/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../assets/useOnlineStatus";
import { useContext } from "react";
import UserContext from "../assets/UserContext";
import { useSelector } from "react-redux";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import { Store } from "@mui/icons-material";

function Header() {
  const OnlineStatus = useOnlineStatus();
  const [btnName, setBtnName] = useState("Login");
  const { loggedInUser } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/" className="link">
          <img className="logo" src={LOGO_URL} />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
          <Link to="/" className="link">
            <li>Online Status: {OnlineStatus ? "🟢" : "🔴"}</li>
          </Link>
          <Link to="/" className="link">
            <li>Home</li>
          </Link>
          <Link to="/about" className="link">
            <li>About</li>
          </Link>
          <Link to="/contact" className="link">
            <li>Contact Us</li>
          </Link>
          {/* <Link to="/cart" className="link">
            <li>Cart ({cartItems.length} items)</li>
          </Link> */}
          <Link to="/cart" className="cart-link">
            <li>Cart</li>
          <ShoppingBagIcon style={{fontSize: "30px", marginBottom: "10px", color:"red"}} />
            <span className="cart-total-item"> {cartItems.length} </span>
          </Link>
          <button
            className="login"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
          <Link to="/cart" className="link">
            <li>{loggedInUser}</li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Header;
