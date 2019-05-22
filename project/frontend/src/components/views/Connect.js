import React, { Component } from 'react';
import Navbar from './Navbar';


class Connect extends Component{

  state ={
    users:[],
  }

  uploadWidget() {
        window.cloudinary.openUploadWidget({ cloud_name: 'guruapp', upload_preset: 'ly9uxxxz', api_key:'328295839766139',
       unsigned: true, public_id:'1'},
            function(error, result) {
                console.log(result);
            });
    }

  componentDidMount(){

    fetch(`/api/users/`)
      .then(response => { return response.json();}).then(responseData => {return responseData;})
     .then (json =>this.setState({users: json})).catch(err => {
           console.log("fetch error" + err);
       });

  }

  render(){
    console.log(this.state.users);
    return(
    <div>
      <header>
        <Navbar/>
      </header>

      <div id="body">
        {this.state.users.map(el => {
              return <div key={el.id}>
                   <h3 className="main res-item">{el.username}</h3>

              </div>
          })}

          <div className="upload">
                       <button onClick={this.uploadWidget.bind(this)} className="upload-button">
                           <h1>Add Image</h1>
                       </button>
                   </div>
      </div>


    </div>
    );
  }
}

export default (Connect);
