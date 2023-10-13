import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Home from "./Components/Home";
import Error from "./Components/Error";
import RestaurantMenu from "./Components/RestaurantMenu";
import Contact from "./Components/Contact";
import Cart from "./Components/Cart";
import UserContext from "./assets/UserContext";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import Store from "./App Store/Store";
import { Category } from "@mui/icons-material";
import { CounterProvider } from "./assets/ConterProvider";
// import Fun from "./Components/Fun";

function App() {
  const [userName, setUserName] = useState();
  useEffect(() => {
    const data = {
      name: "Ritik Yadav",
    };
    setUserName(data.name);
  }, []);

  return (
    <Provider store={Store}>
      <div className="App">
        <BrowserRouter>
        <CounterProvider>
          <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
            <Header />
          </UserContext.Provider>
          <Routes>
            <Route exact path="/" element={<Home />} errorElement={<Error />} />
            <Route path="/about" element={<About />} />
            {/* <UserContext.Provider value={{ categoryData: Category }}> */}
            <Route
              exact
              path="/cart"
              element={<Cart/>}
            />
            {/* </UserContext.Provider> */}
            <Route exact path="/contact" element={<Contact />} />
            <Route
              exact
              path="/restaurant/:resId"
              element={<RestaurantMenu />}
            />
          </Routes>
          </CounterProvider>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
