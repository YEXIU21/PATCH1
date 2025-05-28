import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SlidingBanner.css';

// Import banner images
import banner2 from '../assets/banner2.jpg';
import banner4 from '../assets/banner4.jpg';
import banner5 from '../assets/banner5.jpg';

const SlidingBanner: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  
  // Banner data
  const banners = [
    { 
      id: 1, 
      image: banner2, 
      title: 'WEEKLY TOURNAMENTS', 
      text: 'Compete for the top prizes in our exclusive weekly tournaments.', 
      buttonText: 'Join Now', 
      link: '/tournaments' 
    },
    { 
      id: 2, 
      image: banner4, 
      title: 'PREMIUM CASINO GAMES', 
      text: 'Experience our selection of high-quality casino games with amazing rewards.', 
      buttonText: 'Play Now', 
      link: '/casino' 
    },
    { 
      id: 3, 
      image: banner5, 
      title: 'VIP REWARDS PROGRAM', 
      text: 'Join our VIP program for exclusive bonuses and personalized offers.', 
      buttonText: 'Learn More', 
      link: '/vip' 
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [banners.length]);

  // Manual navigation
  const goToBanner = (index: number) => {
    setCurrentBannerIndex(index);
  };

  // Get current banner
  const currentBanner = banners[currentBannerIndex];

  return (
    <section className="sliding-banner">
      <div className="banner-slider">
        {/* Banner Images with Animation */}
        <div className="banner-images">
          {banners.map((banner, index) => (
            <div 
              key={banner.id} 
              className={`banner-slide ${index === currentBannerIndex ? 'active' : ''}`}
            >
              <img src={banner.image} alt={banner.title} />
            </div>
          ))}
        </div>

        {/* Banner Content */}
        <div className="banner-content">
          <h1 className="banner-title">{currentBanner.title}</h1>
          <p className="banner-text">{currentBanner.text}</p>
          <Link to={currentBanner.link} className="btn btn-primary">
            {currentBanner.buttonText}
          </Link>
        </div>

        {/* Indicators */}
        <div className="banner-indicators">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              className={`indicator ${index === currentBannerIndex ? 'active' : ''}`}
              onClick={() => goToBanner(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SlidingBanner; 