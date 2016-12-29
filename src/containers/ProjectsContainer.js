import {connect} from 'react-redux';
import Projects from '../components/Projects';
import {fetchProjects} from '../actions/projects';

const mapStateToProps = (state) => {
  return {
    isFetching: state.projects.isFetching,
    projects: state.projects.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProjects: (server) => {
      dispatch(fetchProjects(server));
    },
  };
};

const ProjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);

export default ProjectsContainer;
