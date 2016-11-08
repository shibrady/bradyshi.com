import React from 'react';

const Projects = () => {
  return (
    <div className="projects-cont">
      <section className="project-section">
        <div className="project-image-cont">
          <img src="./assets/proj_bradyshicom.png" alt="bradyshi.com"/>
        </div>
        <div className="project-desc-cont">
          <h1>bradyshi.com</h1>
          <h2>A site created to feature whatshisname</h2>
          <h3>And house all of his rants</h3>
          <p><b>Technologies Used</b>: React, Redux, Sass, Gulp, Node</p>
        </div>
      </section>
    </div>
  );
};

export default Projects;
