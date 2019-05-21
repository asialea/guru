
export const addEducation= (user_id,start,end,school,location,degree,csrftoken) => {
  return(dispatch,getState) => {
    const token = getState().auth.token;
    let body = JSON.stringify({user_id,start,end,school,location,degree});
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'X-CSRFToken': csrftoken,
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`api/education/`, {headers,body,method:"POST",mode:"same-origin"})
    .then(res => { console.log(csrftoken);
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
                  return dispatch({type: 'ADD_EDUCATION', note: res.data});
              } else if (res.status === 401 || res.status === 403) {
                  dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                  throw res.data;
              }
          })
  }
}

export const fetchEducation = () => {
  return(dispatch,getState) => {
    const token = getState().auth.token;
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("api/education/", {headers, })
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
             if (res.status === 200) {
                 return dispatch({type: 'FETCH_EDUCATION', education: res.data});
             } else if (res.status === 401 || res.status === 403) {
                 dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                 throw res.data;
             }
         })
  }
}


export const deleteEducation = (id,csrftoken) => {
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

    return fetch(`api/education/${id}/`, {headers,body,method:"DELETE"})
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
                  return dispatch({type: 'DELETE_EDUCATION', id});
              } else if (res.status === 401 || res.status === 403) {
                  dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                  throw res.data;
              }
          })

  }
}
