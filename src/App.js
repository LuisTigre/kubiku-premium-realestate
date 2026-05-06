import React from 'react';

import './App.css';


function App() {
  return (
    <div className="App">
      <header className="main-header">
        <div className="container header-flex">
          <div className="logo">
            <img src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg" alt="realtor.com" height="32" />
          </div>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#" tabIndex={0}>Buy</a>
            <a href="#" tabIndex={0}>Sell</a>
            <a href="#" tabIndex={0}>Rent</a>
            <a href="#" tabIndex={0}>Mortgage</a>
            <a href="#" tabIndex={0}>Find an Agent</a>
            <a href="#" tabIndex={0}>My Home</a>
            <a href="#" tabIndex={0}>News & Insights</a>
            <a href="#" tabIndex={0}>Manage rentals</a>
            <a href="#" tabIndex={0}>Advertise</a>
          </nav>
          <div className="header-actions">
            <button className="login-btn">Log in</button>
            <button className="signup-btn">Sign up</button>
          </div>
        </div>
      </header>
      <main>
        <section className="hero-section">
          <div className="hero-bg" />
          <div className="container hero-content">
            <h1><span className="hero-main">#1 real estate site</span><br /><span className="hero-sub">REALTOR<sup>®</sup> agents recommend</span></h1>
            <div className="search-tabs" role="tablist" aria-label="Search categories">
              <button className="tab active" role="tab" aria-selected="true">Buy</button>
              <button className="tab" role="tab">Rent</button>
              <button className="tab" role="tab">Sell</button>
              <button className="tab" role="tab">Pre-approval</button>
              <button className="tab" role="tab">Just sold</button>
              <button className="tab" role="tab">Home value</button>
            </div>
            <form className="search-bar" role="search" aria-label="Property search">
              <input type="text" placeholder="City, Address, ZIP" aria-label="Search input" />
              <button type="submit" className="search-btn">Search <span role="img" aria-label="search">🔍</span></button>
            </form>
          </div>
        </section>
        <section className="browse-section">
          <div className="container">
            <h2>Browse homes in San Francisco, CA</h2>
            <div className="browse-cards">
              <div className="browse-card">
                <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="New listings" />
                <div className="browse-label">New listings <span className="browse-count">379</span></div>
              </div>
              <div className="browse-card">
                <img src="https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=400&q=80" alt="Price reduced" />
                <div className="browse-label">Price reduced <span className="browse-count">133</span></div>
              </div>
              <div className="browse-card">
                <img src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=400&q=80" alt="Open houses" />
                <div className="browse-label">Open houses <span className="browse-count">130</span></div>
              </div>
              <div className="browse-card">
                <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Recently sold" />
                <div className="browse-label">Recently sold <span className="browse-count">3,215</span></div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="main-footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} RealState. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
