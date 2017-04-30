import _ from 'underscore';

function blog(state = {
  isFetching: false,
  posts: [],
}, action) {
  switch (action.type) {
    case 'REQUEST_BLOGPOSTS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_BLOGPOSTS': {
      let sorted = _.sortBy(action.posts, function(post) {
        return Date.parse(post.first_published);
      });

      return Object.assign({}, state, {
        isFetching: false,
        posts: sorted.reverse(),
      });
    }
    default:
      return state;
  }
}

export default blog;
