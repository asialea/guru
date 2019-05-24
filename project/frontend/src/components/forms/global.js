import {getCookie} from './get_csrf'


export const token = localStorage.getItem("token");
export const csrftoken=getCookie('csrftoken');
export const headers =  {
  'Content-Type': 'application/json',
  'X-CSRFToken': global.csrftoken,
};

if (token) {
  headers["Authorization"] = `Token ${token}`;
}

export const uploadConfig ={
  cloud_name: 'guruapp', upload_preset: 'pro_pic', api_key:'328295839766139',
     unsigned: true,return_delete_token:true,cropping:true,cropping_coordinates_mode:'custom',
}
