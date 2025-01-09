import React, { useEffect } from "react";
import '../styles/Home.css';
import { Link } from 'react-router-dom';
import 'aos/dist/aos.css';
import AOS from 'aos';

export const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="mainPage">
      {/* Background Image */}
      <img 
        src={require('../assets/burgerBg.jpg')} 
        alt="Burger Background" 
        className="backgroundImage" 
      />

      {/* Hero Section */}
      <div className="hero">
        <h1>Welcome to Burger Palace</h1>
        <p data-aos="fade-right">Delicious burgers, fresh ingredients, and unforgettable taste!</p>
        <div className="hero-buttons">
          <Link to='shoppingCart'><button className="primary-btn" data-aos="zoom-in" >Order Now</button></Link>
          <Link to='menu'><button className="secondary-btn" data-aos="zoom-in">View Menu</button></Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="features">
        <div className="card" data-aos="fade-up">
          <h3>Fresh Ingredients</h3>
          <p>We use only the freshest ingredients for our burgers.</p>
        </div>
        <div className="card" data-aos="fade-up" data-aos-delay="200">
          <h3>Fast Delivery</h3>
          <p>Get your burgers delivered hot and fresh to your door.</p>
        </div>
        <div className="card" data-aos="fade-up" data-aos-delay="400">
          <h3>Affordable Prices</h3>
          <p>Delicious food at prices that won't break the bank.</p>
        </div>
      </div>
    </div>
  );
};
