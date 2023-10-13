import React from 'react'
import "./hero.css"
import { HERO_URL } from '../assets/constants'
function Hero() {
  return (
    <div className='hero'>
        <img src={HERO_URL}></img>
    </div>
  )
}

export default Hero