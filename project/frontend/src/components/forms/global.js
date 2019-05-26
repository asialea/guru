import {getCookie} from './get_csrf'



export const csrftoken=getCookie('csrftoken');
export const headers =  {
  'Content-Type': 'application/json',
  'X-CSRFToken': global.csrftoken,
};

export const uploadConfig ={
  cloud_name: 'guruapp', upload_preset: 'pro_pic', api_key:'328295839766139',
     unsigned: true,return_delete_token:true,cropping:true,cropping_coordinates_mode:'custom',
}

export function findAndRemove(array, property, value) {
  array.forEach(function(result, index) {
    if(result[property] === value) {
      array.splice(index, 1);
    }
  });
}
