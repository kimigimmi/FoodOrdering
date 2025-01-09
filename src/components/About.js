import React from "react";
import "../styles/About.css";

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <p className="about-description">
                Welcome to <strong>Hungry Delights</strong>! We are passionate about serving fresh and delicious meals made from the finest ingredients.
                Our menu is crafted with love to bring joy to your taste buds. Whether you're looking for a quick snack or a hearty meal, we have
                something for everyone.
            </p>

            <h2 className="about-subtitle">Our Mission</h2>
            <p className="about-mission">
                Our mission is to provide an exceptional dining experience with high-quality food, excellent service, and a welcoming atmosphere.
            </p>

            <h2 className="about-subtitle">Contact Us</h2>
            <div className="contact-info">
                <p>
                    <strong>Email:</strong> info@hungrydelights.com
                </p>
                <p>
                    <strong>Phone:</strong> +1 (123) 456-7890
                </p>
                <p>
                    <strong>Address:</strong> 123 Foodie Street, Gourmet City, GC 56789
                </p>
            </div>

            <h2 className="about-subtitle">Follow Us</h2>
            <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="facebook">
                    <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="twitter">
                    <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="instagram">
                    <i className="fab fa-instagram"></i>
                </a>
            </div>
        </div>
    );
};

export default About;
