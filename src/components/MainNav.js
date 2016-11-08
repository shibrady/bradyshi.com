import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const MainNav = ({children}) => {
  return (
    <div>
      <header className="site-header">
        <div className="site-logo">
          <h1><Link to="/">Brady Shi</Link></h1>
        </div>
        <nav className="main-nav">
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </nav>
      </header>
      {children}
    </div>
  );
};

MainNav.propTypes = {
  children: PropTypes.object,
};

export default MainNav;
