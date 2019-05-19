
export const updateAboutUser = (location,github,linkedin,twitter_handle,bio,csrftoken) => {
  return(dispatch,getState) => {
    dispatch({type: 'USER_LOADING'});
    const token = getState().auth.token;
    let body = JSON.stringify({location,github,linkedin,twitter_handle,bio});
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/aboutUser/", {headers,body,method:"PUT",mode:"same-origin"})
      .then(res => res.json())
      .then(aboutUser => {
        return dispatch({
          type: 'UPDATE_ABOUTUSER',
          aboutUser
        })
    })
  }
} 


export const fetchAboutUser = () => {
  return(dispatch,getState) => {
    const token = getState().auth.token;
    let headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
       };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch(`/api/aboutUser/`, {headers,method:"GET"})
    .then(res => { return res.json();})
    .then(aboutUser=>{dispatch({type:'FETCH_ABOUTUSER',aboutUser:aboutUser}); return aboutUser;
    })
  }
}
