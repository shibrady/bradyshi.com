import React from 'react';

const Projects = () => {
  return (
    <div className="projects-cont">
      <section className="project-section">
        <div className="project-image-cont">
          <a href="https://github.com/shibrady/bradyshi.com">
            <img src="./assets/proj_bradyshicom.png" alt="bradyshi.com"/>
          </a>
        </div>
        <div className="project-desc-cont">
          <h1>bradyshi.com</h1>
          <h2>A site created to feature whatshisname</h2>
          <h3>And house all of his rants</h3>
          <p><b>Technologies Used</b>: React, Redux, Sass, Gulp, Node</p>
        </div>
      </section>
      <section className="project-section">
        <div className="project-image-cont">
          <a href="https://www.youtube.com/watch?v=tBKmoV-hKBc">
            <img src="./assets/proj_tankymctankface.png"
              alt="Tanky McTankFace"/>
          </a>
        </div>
        <div className="project-desc-cont">
          <h1>Tanky McTankFace</h1>
          <h2>
            A group effort at understanding and
            implementing fundamentals of computer graphics,
            e.g. collision detection with bounding boxes, shadow mapping,
            texture mapping, and so on.
          </h2>
          <h3>And having fun while doing it</h3>
          <p><b>Technologies Used</b>: OpenGL, C++</p>
        </div>
      </section>
    </div>
  );
};

export default Projects;
