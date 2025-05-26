import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import LiveBets from '../components/LiveBets';

// Import images
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.png';

// Import game images
import sweetBonanza from '../assets/sweetbonaza.png';
import superAce from '../assets/superace.png';
import sugarRush from '../assets/sugarrush.jpg';
import luckyFortunes from '../assets/luckyfortunes.png';
import gatesOfOlympus from '../assets/gatesofolympus.jpg';
import fortuneGems from '../assets/fortunegems.jpg';
import cashBonanza from '../assets/cashbonanza.png';

// Import icons
import CasinoIcon from '@mui/icons-material/Casino';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import TableBarIcon from '@mui/icons-material/TableBar';
import StreamIcon from '@mui/icons-material/Stream';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

const Home: React.FC = () => {
  const [activeTab, setActiveTab] = useState('popular');
  
  const featuredGames = [
    { id: 1, title: 'Sweet Bonanza', category: 'Slots', image: sweetBonanza },
    { id: 2, title: 'Gates of Olympus', category: 'Slots', image: gatesOfOlympus },
    { id: 3, title: 'Cash Bonanza', category: 'Slots', image: cashBonanza },
    { id: 4, title: 'Super Ace', category: 'Table Games', image: superAce },
  ];
  
  const popularGames = [
    { id: 1, title: 'Sweet Bonanza', category: 'Slots', image: sweetBonanza },
    { id: 2, title: 'Gates of Olympus', category: 'Slots', image: gatesOfOlympus },
    { id: 3, title: 'Fortune Gems', category: 'Slots', image: fortuneGems },
    { id: 4, title: 'Super Ace', category: 'Table Games', image: superAce },
    { id: 5, title: 'Lucky Fortunes', category: 'Slots', image: luckyFortunes },
    { id: 6, title: 'Sugar Rush', category: 'Slots', image: sugarRush },
  ];
  
  const newGames = [
    { id: 1, title: 'Cash Bonanza', category: 'Slots', image: cashBonanza },
    { id: 2, title: 'Lucky Fortunes', category: 'Slots', image: luckyFortunes },
    { id: 3, title: 'Sugar Rush', category: 'Slots', image: sugarRush },
    { id: 4, title: 'Fortune Gems', category: 'Slots', image: fortuneGems },
  ];

  // Featured game
  const featuredGame = {
    id: 201,
    title: 'Hot Game',
    name: 'Sweet Bonanza',
    type: 'Video Slot',
    provider: 'Pragmatic Play',
    image: sweetBonanza,
    features: ['Free Spins', 'Multipliers', 'Scatter Pays']
  };
  
  // Game categories
  const gameCategories = [
    { id: 'slots', name: 'Slots', icon: <VideogameAssetIcon /> },
    { id: 'table', name: 'Table Games', icon: <TableBarIcon /> },
    { id: 'live', name: 'Live Casino', icon: <StreamIcon /> },
    { id: 'jackpot', name: 'Jackpots', icon: <EmojiEventsIcon /> },
  ];
  
  // Banners for the carousel
  const banners = [
    { id: 1, image: banner1, title: 'ELEVATE YOUR GAMEPLAY', text: 'Experience the thrill of our premium casino games.', buttonText: 'Explore Games', link: '/casino' },
    { id: 2, image: banner2, title: 'WEEKLY TOURNAMENTS', text: 'Compete for the top prizes in our exclusive weekly tournaments.', buttonText: 'Join Now', link: '/tournaments' },
    { id: 3, image: banner3, title: 'VIP REWARDS', text: 'Join our VIP program for exclusive bonuses and personalized offers.', buttonText: 'Learn More', link: '/promotions' },
  ];
  
  // Current banner (in a real app this would rotate with a carousel)
  const currentBanner = banners[0];
  
  // Function to handle playing a game
  const handlePlayGame = (gameId: number, gameTitle: string) => {
    console.log(`Playing game: ${gameTitle} (ID: ${gameId})`);
    // Here you would navigate to the game or launch the game in a modal/iframe
    alert(`Opening game: ${gameTitle}`);
  };

  // Function to handle playing a demo
  const handlePlayDemo = (gameId: number, gameTitle: string) => {
    console.log(`Playing demo for: ${gameTitle} (ID: ${gameId})`);
    // Here you would launch the demo version
    alert(`Opening demo for: ${gameTitle}`);
  };
  
  return (
    <div className="home-page">
      <section className="banner">
        <img src={currentBanner.image} alt="Casino Banner" />
        <div className="banner-content">
          <h1 className="banner-title">{currentBanner.title}</h1>
          <p className="banner-text">{currentBanner.text}</p>
          <Link to={currentBanner.link} className="btn btn-primary">{currentBanner.buttonText}</Link>
        </div>
      </section>
      
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><EmojiEventsIcon className="section-icon" /> Featured Games</h2>
          <Link to="/casino" className="section-link">View All</Link>
        </div>
        
        <div className="featured-game-card">
          <div className="featured-game-header">
            <h3>Hot Game <StarIcon className="hot-icon" /></h3>
            <button 
              className="btn btn-outline"
              onClick={() => handlePlayGame(featuredGame.id, featuredGame.name)}
            >
              Play Now!
            </button>
          </div>
          
          <div className="featured-game-content">
            <div className="featured-game-image">
              <img src={featuredGame.image} alt={featuredGame.name} />
            </div>
            <div className="featured-game-info">
              <h4 className="featured-game-title">{featuredGame.name}</h4>
              <p className="featured-game-provider">By {featuredGame.provider}</p>
              <p className="featured-game-type">{featuredGame.type}</p>
              <div className="featured-game-features">
                {featuredGame.features.map(feature => (
                  <span key={feature} className="feature-tag">{feature}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="game-grid featured-grid">
          {featuredGames.map(game => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handlePlayGame(game.id, game.title)}
            >
              <div className="game-image-container">
              <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-overlay">
                  <button 
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayGame(game.id, game.title);
                    }}
                  >
                    Play Now
                  </button>
                  <button 
                    className="demo-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayDemo(game.id, game.title);
                    }}
                  >
                    Demo
                  </button>
                </div>
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-category">{game.category}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <section className="section game-categories-section">
        <div className="game-categories">
          {gameCategories.map(category => (
            <Link 
              key={category.id}
              to={`/casino/${category.id}`}
              className="category-item"
            >
              {category.icon}
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><CasinoIcon className="section-icon" /> Casino Games</h2>
          <Link to="/casino" className="section-link">View All</Link>
        </div>
        
        <div className="tabs">
          <div className={`tab ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => setActiveTab('popular')}>
            <StarIcon className="tab-icon" /> Popular
          </div>
          <div className={`tab ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>
            <FiberNewIcon className="tab-icon" /> New Games
          </div>
          <div className={`tab ${activeTab === 'slots' ? 'active' : ''}`} onClick={() => setActiveTab('slots')}>
            <VideogameAssetIcon className="tab-icon" /> Slots
          </div>
          <div className={`tab ${activeTab === 'table' ? 'active' : ''}`} onClick={() => setActiveTab('table')}>
            <TableBarIcon className="tab-icon" /> Table Games
          </div>
          <div className={`tab ${activeTab === 'live' ? 'active' : ''}`} onClick={() => setActiveTab('live')}>
            <StreamIcon className="tab-icon" /> Live Casino
          </div>
        </div>
        
        <div className="game-grid">
          {activeTab === 'popular' && popularGames.map(game => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handlePlayGame(game.id, game.title)}
            >
              <div className="game-image-container">
              <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-overlay">
                  <button 
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayGame(game.id, game.title);
                    }}
                  >
                    Play Now
                  </button>
                  <button 
                    className="demo-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayDemo(game.id, game.title);
                    }}
                  >
                    Demo
                  </button>
                </div>
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-category">{game.category}</p>
              </div>
            </div>
          ))}
          
          {activeTab === 'new' && newGames.map(game => (
            <div 
              key={game.id} 
              className="game-card"
              onClick={() => handlePlayGame(game.id, game.title)}
            >
              <div className="game-image-container">
              <img src={game.image} alt={game.title} className="game-image" />
                <div className="game-overlay">
                  <button 
                    className="play-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayGame(game.id, game.title);
                    }}
                  >
                    Play Now
                  </button>
                  <button 
                    className="demo-btn"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the card click
                      handlePlayDemo(game.id, game.title);
                    }}
                  >
                    Demo
                  </button>
                </div>
              </div>
              <div className="game-info">
                <h3 className="game-title">{game.title}</h3>
                <p className="game-category">{game.category}</p>
              </div>
            </div>
          ))}
          
          {/* Other tabs would be populated with the appropriate games */}
        </div>
      </section>
      
      <section className="section">
        <div className="section-header">
          <h2 className="section-title"><CardGiftcardIcon className="section-icon" /> Latest Promotions</h2>
          <Link to="/promotions" className="section-link">All Promotions</Link>
        </div>
        <div className="promotions-container">
          <div className="promo-card">
            <img src={banner2} alt="Welcome Bonus" className="promo-image" />
            <div className="promo-info">
              <h3 className="promo-title">100% Welcome Bonus</h3>
              <p className="promo-description">Get up to PHP 500 on your first deposit!</p>
              <Link to="/promotions" className="btn btn-secondary">Claim Now</Link>
            </div>
          </div>
          <div className="promo-card">
            <img src={banner3} alt="Weekly Cashback" className="promo-image" />
            <div className="promo-info">
              <h3 className="promo-title">Weekly Cashback</h3>
              <p className="promo-description">Get 10% cashback on losses every week!</p>
              <Link to="/promotions" className="btn btn-secondary">Learn More</Link>
            </div>
          </div>
        </div>
      </section>
      
      <section className="section">
        <LiveBets />
      </section>
      
      <section className="app-download-banner">
        <div className="app-content">
          <div className="app-text">
            <h2>Download Our App</h2>
            <p>Play your favorite casino games anytime, anywhere!</p>
            <Link to="/download" className="download-now-btn">
              Download Now
            </Link>
            <div className="device-compatibility">
              <span>Available for iOS and Android devices</span>
            </div>
          </div>
          <div className="app-image">
            <img src={banner3} alt="Casino App" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 