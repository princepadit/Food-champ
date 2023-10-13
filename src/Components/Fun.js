import React from "react";
import Cart from "./Cart"
class Fun extends React.Component {
  constructor(props) {
    super(props)
    console.log("Parent Constructor");
  }

  componentDidMount() {
    console.log("Parent ComponentDidMount");
  }
  render() {
    console.log("Parent Render");
    return (
      <div>
        <Cart name={"Ritik Yadav"} location={"Kharagpur"}/>
        <Cart name={"Hemant"} location={"Jamshedpur"}/>
      </div>
    );
  }
}

export default Fun;
