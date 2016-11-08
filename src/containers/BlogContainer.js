import {connect} from 'react-redux';
import Blog from '../components/Blog';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

const BlogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

export default BlogContainer;
