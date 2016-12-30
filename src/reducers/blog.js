function blog(state = {
  isFetching: false,
  posts: [],
}, action) {
  switch (action.type) {
    case 'REQUEST_BLOGPOSTS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_BLOGPOSTS':
      return Object.assign({}, state, {
        isFetching: false,
        posts: action.posts,
      });
    default:
      return state;
  }
}

export default blog;
