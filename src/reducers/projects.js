function projects(state = {
  isFetching: false,
  items: [],
}, action) {
  switch (action.type) {
    case 'REQUEST_PROJECTS':
      return Object.assign({}, state, {
        isFetching: true,
      });
    case 'RECEIVE_PROJECTS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.projects,
      });
    default:
      return state;
  }
}

export default projects;
