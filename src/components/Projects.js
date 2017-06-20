/* global process */

import React, {PropTypes} from 'react';

class Projects extends React.Component {
  constructor(props) {
    super(props);
  }

  // Fetch projects upon opening of the projects page
  componentDidMount() {
    this.props.fetchProjects(process.env.NODE_ENV == 'development' ?
      'http://localhost:8080/projects' :
      'http://bradyshi.com/api/projects');
  }


  render() {
    let projects = this.props.projects;

    // For each project we get from the server, create a separate container
    return (
      <div className="projects-cont">
        {projects.map((project) => {
            // Return a different type of media container
            // if the project uses a video instead of an image
            let mediaElement = (project.image_type == 'video') ?
            (<video controls>
              <source src={'./assets/projects/' + project.image_filename}
                type="video/mp4"/>
            </video>) :
            (<a href={project.extern}>
              <img src={'./assets/projects/' + project.image_filename}
                alt={project.name}/>
            </a>);

            return (<section key={project._id} className="project-section">
              <div className="project-image-cont">
                {mediaElement}
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
