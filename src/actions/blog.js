/* global fetch */

function requestBlogPosts() {
  return {
    type: 'REQUEST_BLOGPOSTS',
  };
}

function receiveBlogPosts(posts) {
  return {
    type: 'RECEIVE_BLOGPOSTS',
    posts,
  };
}

export function fetchBlogPosts(server) {
  return (dispatch) => {
    dispatch(requestBlogPosts());
    return fetch(server)
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch(receiveBlogPosts(json)));
  };
}
