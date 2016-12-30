import React, {PropTypes} from 'react';
import DOMPurify from 'dompurify';

class Blog extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchBlogPosts('http://localhost:8080');
  }

  render() {
    let posts = this.props.blogPosts;
    return (
      <div className="blog-cont">
        {posts.map((post) => {
          return (
            <div key={post._id} className="blog-post-snippet">
              <h1>{post.title}</h1>
              <h2>{post.subtitle}</h2>
              <img src={'./assets/' + post.banner_filename}
                alt={post.banner_alt}/>
              <p dangerouslySetInnerHTML={{__html:
                  DOMPurify.sanitize(post.content)}}>
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

Blog.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  blogPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchBlogPosts: PropTypes.func.isRequired,
};

export default Blog;
