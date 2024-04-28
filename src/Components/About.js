// About.js

import React from 'react';
import './about.css'; // Import CSS file for styling (if needed)
import princephoto from "../assets/prince.jpg"
import gauravpandey from "../assets/gauravpandey.jpg"


const About = () => {
    return (
        <section className="about-section">
            <div className="about-content">
                <h2>About Us</h2>
                <p>Welcome to our website! We are a team of passionate individuals...</p>
                <p>Our mission is to...</p>
            </div>
            <div className="team-section">
                <h3>Meet Our Team</h3>
                <div className="team-member">
                    <img className='img1' src={princephoto} alt="Team Member 1" />
                    <div className="member-info">
                        <h4>Prince Kumar</h4>
                        <p>CEO</p>
                    </div>
                </div>
                <div className="team-member">
                    <img src={gauravpandey} alt="Team Member 2" />
                    <div className="member-info">
                        <h4>Gaurav pandey</h4>
                        <p>Developer</p>
                    </div>
                </div>
                {/* Add more team members as needed */}
            </div>
        </section>
    );
};

export default About;
