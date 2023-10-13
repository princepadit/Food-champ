import React from 'react';
import Restaurant from './Restaurant';
import Hero from './Hero';
import useOnlineStatus from "../assets/useOnlineStatus";


function Home() {
  const OnlineStatus = useOnlineStatus;
  if (OnlineStatus === false) {
    <h1>Oops you are offline</h1>
  }
  else{
    return (
      <div>
          <Hero/>
          <Restaurant/>
      </div>
    )
  }
}
export default Home