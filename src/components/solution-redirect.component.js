import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import $ from 'jquery';
 
export default class SolutionRedirect extends Component {
   constructor(props) {
    super(props);  
      this.state = { exercises: [] };
  }
   
  async componentDidMount() {  
    let id = window.location.href.split('/')
    id = id[id.length -1]; 
    let response = [];

    await axios.get('http://localhost:5000/exercises/')
      .then(response => {  
        
        response = response.data.filter(el => el._id == id)[0].code;

      })
      .catch((error) => {
        console.log(error);
      })
   
     console.log(response.code); 
  }
  
  render() {
    return (
      <div> 
      </div>
    )
  }
}