import React from 'react';
import {Link} from 'react-router';

const MainNav = () => {
  return (
    <div>
      <header>
        <h1>Brady Shi</h1>
        <p>Computer Engineer and Wannabe Coffee Connoisseur</p>
      </header>
      <nav>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/blog">Coffee Thoughts</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNav;
