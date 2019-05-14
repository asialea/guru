

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
        if (res.status === 200) {
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          throw res.data;
        }
      })
  }
}

export const fetchWork = () => {
  return(getState) => {
    const token = getState().auth.token;
    let headers = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers["Authorization"] = `Token ${token}`;
    }

    return fetch("/api/work/", {headers,method:"GET"})
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
          return res.data;
        } else if (res.status >= 400 && res.status < 500) {
          throw res.data;
        }
      })
  }
}
