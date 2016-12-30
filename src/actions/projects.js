/* global fetch */

function requestProjects() {
  return {
    type: 'REQUEST_PROJECTS',
  };
}

function receiveProjects(projects) {
  return {
    type: 'RECEIVE_PROJECTS',
    projects,
  };
}

export function fetchProjects(server) {
  return (dispatch) => {
    dispatch(requestProjects());
    return fetch(server)
      .then((response) => {
        return response.json();
      })
      .then((json) => dispatch(receiveProjects(json)));
  };
}
