// src/pages/home/Home.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./home.css";

// Import images
import ulfg2logo from "../../assets/ulfg2logo.jpg";
import facdep from "../../assets/facdep.jpg";
import elecdep from "../../assets/elecdep.jpg";
import mecadep from "../../assets/mecadep.jpg";
import civdep from "../../assets/civdep.jpg";
import petrodep from "../../assets/petrodep.jpg";

const Home: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    ulfg2logo,
    facdep,
    elecdep,
    mecadep,
    civdep,
    petrodep,
  ];
  const totalImages = images.length;

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (totalImages - 2));
  };

  // Auto slide after every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, []);

  // Get 3 images to display at once
  const displayedImages = [
    images[currentIndex],
    images[currentIndex + 1],
    images[currentIndex + 2]
  ];
  return (
    <div className="home">
      {/* Image Slider */}
      <div className="carousel">
        <div className="carousel-track">
          {displayedImages.map((src, index) => (
            <img src={src} alt={`Slide ${index}`} key={index} className="carousel-slide" />
          ))}
        </div>
      </div>

      {/* Existing Home Page Content */}
      <h1>Welcome to the ULFG Portal</h1>
      <p>Explore our platform to find universities and available scholarships (bourses).</p>
      <div className="homeLinks">
        <Link to="/universities" className="homeButton">Universities List</Link>
        <Link to="/bourses" className="homeButton">Scholarships List</Link>
      </div>
    </div>
  );
};

export default Home;
