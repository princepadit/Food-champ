import React from "react";
import UserContext from "../assets/UserContext";

function About() {
  return (
    <div>
      <h1>Aboth Us page</h1>
      <div>
        Loggedin User
        <UserContext.Consumer>
          {({ loggedInUser }) => <h1>{loggedInUser}</h1>}
        </UserContext.Consumer>
      </div>
      <h1>{}</h1>
    </div>
  );
}

export default About;
