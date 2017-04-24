import _ from 'underscore';

function projects(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case 'REQUEST_PROJECTS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_PROJECTS': {
      let sorted = _.sortBy(action.projects, 'ordering');
      return Object.assign({}, state, {
        isFetching: false,
        items: sorted,
      });
    }
    default:
      return state;
  }
}

export default projects;
