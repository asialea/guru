

export const addWork= (user_id,company,position,location,start,end,description,csrftoken) => {
  return(dispatch,getState) => {
    const token = getState().auth.token;
    let body = JSON.stringify({user_id,company,position,location,start,end,description});
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/work/", {headers,body,method:"POST",mode:"same-origin"})
    .then(res => {
              if (res.status < 500) {
                  return res.json().then(data => {
                      return {status: res.status, data};
                  })
              } else {
                  console.log("Server Error!");
                  throw res;
              }
          })
          .then(res => {
              if (res.status === 201) {
                  return dispatch({type: 'ADD_WORK', note: res.data});
              } else if (res.status === 401 || res.status === 403) {
                  dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                  throw res.data;
              }
          })
  }
}

export const fetchWork = () => {
  return(dispatch,getState) => {
    const token = getState().auth.token;
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/work/`, {headers,method:"GET"})
    .then(res => { return res.json();})
    .then(work=>{return dispatch({type:'FETCH_WORK',work})
    })
  }
}


export const deleteWork = (id,csrftoken) => {
  return(dispatch,getState) => {
    const token = getState().auth.token;
    let headers = {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    };
    let body = JSON.stringify({id});

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/work/${id}/`, {headers,body,method:"DELETE"})
    .then(res => {
              if (res.status === 204) {
                  return {status: res.status, data: {}};
              } else if (res.status < 500) {
                  return res.json().then(data => {
                      return {status: res.status, data};
                  })
              } else {
                  console.log("Server Error!");
                  throw res;
              }
          })
          .then(res => {
              if (res.status === 204) {
                  return dispatch({type: 'DELETE_WORK', id});
              } else if (res.status === 401 || res.status === 403) {
                  dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                  throw res.data;
              }
          })

  }
}
