const initialState = {
  user:null,
  isLoading:true,
};


export default function aboutUser(state=initialState, action) {

  switch (action.type) {

    case 'FETCH_ABOUTUSER':
      return {...state,user:action.aboutUser,isLoading:false};

    case 'UPDATE_ABOUTUSER':
    let aboutToUpdate = aboutUser
            aboutToUpdate.location = action.aboutUser.location;
            aboutToUpdate.github = action.aboutUser.github;
            aboutToUpdate.twitter_handle = action.aboutUser.twitter_handle;
            aboutToUpdate.linkedin = action.aboutUser.linkedin;
            aboutToUpdate.bio = action.aboutUser.bio;

            aboutUser.splice(0, 1, aboutToUpdate);
            return aboutUser;
 
    default:
      return state;

  }
}
