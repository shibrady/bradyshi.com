import {connect} from 'react-redux';
import Blog from '../components/Blog';
import {fetchBlogPosts} from '../actions/blog';

const mapStateToProps = (state) => {
  return {
    isFetching: state.blog.isFetching,
    blogPosts: state.blog.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBlogPosts: (server) => {
      dispatch(fetchBlogPosts(server));
    },
  };
};

const BlogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog);

export default BlogContainer;
