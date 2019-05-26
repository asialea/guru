const initialState = {
  user:null,
  isLoading:true,
};


export default function aboutUser(state=initialState, action) {

  switch (action.type) {

    case 'FETCH_ABOUTUSER':
      return {...state,user:action.aboutUser,isLoading:false};

    case 'UPDATE_ABOUTUSER':
    let aboutToUpdate = state.user
            aboutToUpdate.location = action.aboutUser.location;
            aboutToUpdate.github = action.aboutUser.github;
            aboutToUpdate.twitter_handle = action.aboutUser.twitter_handle;
            aboutToUpdate.linkedin = action.aboutUser.linkedin;
            aboutToUpdate.bio = action.aboutUser.bio;
            aboutUser = aboutToUpdate;
            return {user:aboutUser,isLoading:false};

    default:
      return state;

  }
}
