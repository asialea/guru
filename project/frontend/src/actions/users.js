

export const fetchUsers = () => {
  return dispatch => {
    let headers = {"Content-Type": "application/json"};
    return fetch("/api/users/", {headers, })
      .then(res => res.json())
      .then(notes => {
        return dispatch({
          type: 'FETCH_USERS',
          notes
        })
      })
  }
}
