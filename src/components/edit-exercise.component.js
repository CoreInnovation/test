import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
 
export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeSolution = this.onChangeSolution.bind(this);
    this.onChangeCode = this.onChangeCode.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      description: '',
      solution: '',
      code: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    let id = window.location.href.split('/')
    id = id[id.length -1];
    axios.get('http://localhost:5000/exercises/'+id)
      .then(response => {
        this.setState({
          username: response.data.username,
          description: response.data.description,
          solution: response.data.solution,
          code: response.data.code,
          duration: response.data.duration,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.username),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeSolution(e) {
    this.setState(
      {
        solution: e.target.value
      });
  }
  onChangeCode(e) {
    this.setState(
      {
        code: e.target.value
      });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      solution: this.state.solution,
      code: this.state.code,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);
    let id = window.location.href.split('/')
    id = id[id.length -1];
    axios.post('http://localhost:5000/exercises/update/'+id , exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user) {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input type="text"  
              required
              placeholder="Add Description"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group"> 
          <label>Solution: </label>
          <textarea  
              required
              placeholder="Add Solution"
              className="form-control"
              value={this.state.solution}
              onChange={this.onChangeSolution}
              />
        </div>
        <div className="form-group"> 
          <label>Complete Code: </label>
          <textarea  
              required
              placeholder="Add Complete Code"
              className="form-control"
              value={this.state.code}
              onChange={this.onChangeCode}
              />
        </div>
        {/* <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div> */}
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Update Solution" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}