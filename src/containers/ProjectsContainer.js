import {connect} from 'react-redux';
import Projects from '../components/Projects';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const ProjectsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);

export default ProjectsContainer;
