import React from 'react';

const Blog = () => {
  return (
    <div className="blog-cont">
      <div className="blog-post-snippet">
        <h1>About This Site</h1>
        <h2>An explanatory post that should probably
            be located somewhere else.</h2>
        <img src="./assets/blog_aboutsite.png"
          alt="Eww, Atom? Guess we aren't hiring you."/>
        <p>
          So, I think of the site mostly serving as a hub of
          information about whatever projects I have going on. A
          portfolio site of sorts (although not limited to web development),
          sprinkled with a handful of my latest rants.
          <br /> <br />
          At the time of writing, this site is unfinished. Its actual
          content isn't really served in a way it's eventually meant to be
          (for starters, all the content just lives in JSX).
          Redux itself is hardly used, nevermind the state concept itself
          (although I am fairly familiar with both React and Redux - most
          of my work just lives at my internship).
          And some other things are just flat out missing
          (this blog page is kind of lackluster, for one),
          so consider this site a work in progress.
        </p>
      </div>
    </div>
  );
};

export default Blog;
