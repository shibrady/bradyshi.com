import React from 'react';

const AboutMe = () => {
  return (
    <div className="about-cont">
      <section className="about-desc-cont">
        <div className="about-desc">
          <h2>Coffee and tea, and the jive and me.</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Pellentesque id arcu a velit feugiat mollis at eget nibh.
          Nulla eget pretium neque, sit amet scelerisque metus.
          Praesent vulputate tristique sodales.
          Ut at nisl quis sapien vehicula suscipit.
          Maecenas fermentum, leo vitae pretium tincidunt,
          massa augue efficitur ligula, interdum ultrices diam tellus eget urna.
          Sed aliquam facilisis sapien, posuere sagittis quam fringilla vel.
          Maecenas mollis elementum ultricies.</p>
        </div>
      </section>
      <div className="about-aside">
        <div className="icon-and-descriptor">
          <i className="fa fa-file-text-o fa-3x"></i>
          <span className="icon-descriptor">Take a look at my resume!</span>
        </div>
        <div className="icon-and-descriptor">
          <i className="fa fa-linkedin fa-3x"></i>
          <span className="icon-descriptor">Or maybe my LinkedIn!</span>
        </div>
        <div className="icon-and-descriptor">
          <i className="fa fa-headphones fa-3x"></i>
          <span className="icon-descriptor">Judge my playlist!</span>
        </div>
        <div className="icon-and-descriptor">
          <i className="fa fa-envelope-o fa-3x"></i>
          <span className="icon-descriptor">... or just contact me.</span>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
