export const updateUser = (username,first_name,last_name,password,birth_date,github,linkedin,twitter_handle,type) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({username,first_name,last_name,password,birth_date,github,linkedin,twitter_handle,type});

      return fetch("/auth/update/", {headers, body, method: "POST"})
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
            dispatch({type: 'UPDATE_SUCCESSFUL', data: res.data });
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "REGISTRATION_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const logout = () => {
      return (dispatch, getState) => {
          dispatch({type: "USER_LOADING"});

          const token = getState().auth.token;

          let headers = {"Content-Type": "application/json",};

          if (token) {
            headers["Authorization"] = `Token ${token}`;
          };

          return fetch("/auth/logout/", {headers, body:"" ,method: "POST"})
              .then(res => {
                  console.log(res.status);
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
                      dispatch({type: 'LOGOUT_SUCCESSFUL'});
                      console.log("logout success" );
                      return res.data;
                  } else if (res.status === 403 || res.status === 401) {
                      dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                      throw res.data;
                  }
              })
      }
  }
