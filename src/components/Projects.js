/* global process */

import React, {PropTypes} from 'react';

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchProjects(process.env.NODE_ENV == 'development' ?
      'http://localhost:8080/projects' :
      'http://bradyshi.com/api/projects');
  }

  render() {
    let projects = this.props.projects;
    return (
      <div className="projects-cont">
        {projects.map((project) => {
          if (project.image_type == 'video') {
            return (<section key={project._id} className="project-section">
              <div className="project-image-cont">
                <video controls>
                  <source src={'./assets/' + project.image_filename}
                    type="video/mp4"/>
                </video>
              </div>
              <div className="project-desc-cont">
                <h1>{project.name}</h1>
                <h2>{project.description}</h2>
                <h3>{project.subdesc}</h3>
                <p><b>Technologies Used</b>: {project.tech.join(', ')}</p>
              </div>
            </section>);
          }

          return (<section key={project._id} className="project-section">
            <div className="project-image-cont">
              <a href={project.extern}>
                <img src={'./assets/' + project.image_filename}
                  alt={project.name}/>
              </a>
            </div>
            <div className="project-desc-cont">
              <h1>{project.name}</h1>
              <h2>{project.description}</h2>
              <h3>{project.subdesc}</h3>
              <p><b>Technologies Used</b>: {project.tech.join(', ')}</p>
            </div>
          </section>);
        })}
      </div>
    );
  }
}

Projects.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchProjects: PropTypes.func.isRequired,
};

export default Projects;
