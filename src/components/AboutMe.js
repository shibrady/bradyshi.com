import React from 'react';

const AboutMe = () => {
  return (
    <div className="about-cont">
      <section className="about-desc-cont">
        <div className="about-desc">
          <h2>Hi, I'm Brady Shi!</h2>
          <p>Currently on my last year at UC San Diego, studying
          for my bachelor{'\''}s in Computer Engineering. Somehow I{'\''}ve
          taken up a hobby for having hobbies, and am now attempting to become
          an auto-detailer, basketballer, cook, barista, and a programmer.
          Take a look at the links to the right,
          my projects, or my blog,
          and feel free to contact me about anything.</p>
        </div>
      </section>
      <div className="about-aside">
        <div className="icon-and-descriptor">
          <a href="./assets/about/Brady_Shi_Resume.pdf">
            <i className="fa fa-file-text-o fa-fw fa-3x"></i>
          </a>
          <span className="icon-descriptor">Take a look at my resume!</span>
        </div>
        <div className="icon-and-descriptor">
          <a href="https://www.linkedin.com/in/bradyshi">
            <i className="fa fa-linkedin fa-fw fa-3x"></i>
          </a>
          <span className="icon-descriptor">Or maybe my LinkedIn!</span>
        </div>
        <div className="icon-and-descriptor">
          <a href="http://tidal.com/playlist/7713f71f-98b5-4583-9946-1c23a7b21d68">
            <i className="fa fa-headphones fa-fw fa-3x"></i>
          </a>
          <span className="icon-descriptor">Judge my playlist!</span>
        </div>
        <div className="icon-and-descriptor">
          <a href="mailto:brady-shi@outlook.com">
            <i className="fa fa-envelope-o fa-fw fa-3x"></i>
          </a>
          <span className="icon-descriptor">... or just contact me.</span>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
