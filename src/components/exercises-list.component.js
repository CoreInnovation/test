import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import $ from 'jquery';

const Exercise = props => (

  <tr>
    {/* <td>{props.exercise.username}</td> */}
    <td>
      {/* <a title="Visit Challenge on HackerRank." href="#" onClick={() => { window.open("https://www.hackerrank.com/challenges/" + props.exercise.description.trim().replace(/\s/g, '-')); }}>{props.exercise.description}</a> */}
      <div style={{ padding: "7px 0px 0px 0px" }}>
      {props.exercise.description}
      </div>
      <br>
      </br>
    </td>
    <td>
      <table>
        <tr>
          <td>
            <table>
              <tr>
                <td style={{ padding: "0px 15px 0px 0px" }}>
                <button title="Show/Hide solution below." className='btn btn-success' onClick={() => { props.testHide(props.exercise._id) }}>Show/Hide Code Solution</button>
                </td>
                <td>
                <button title="Test code on HackerRank." className='btn btn-primary' onClick={() => {
              aa();
              async function aa() {
                await navigator.clipboard.writeText(props.exercise.code); 
                if (window.confirm("Complete code has been copied to the clipboard and you will be taken to HackerRank. Simply paste all code with ctrl-v at the bottom of the HackerRank page to test.")) {
                  window.open("https://www.hackerrank.com/challenges/" + props.exercise.description.trim().replace(/\s/g, '-'));
                }; 
              } 
            }}>Test Code On HackerRank</button>
                </td>
              </tr>
            </table> 
          </td> 
        </tr>
        <tr>
          <td>
            <pre id={"solution_" + props.exercise._id} className="line-numbers" style={{ display: "none", color: "green" }}>
              <br />
              <code className="language-javascript">
                {props.exercise.solution}
              </code>
            </pre>
          </td>
        </tr>
      </table>
    </td>
    {/* <td>{props.exercise.duration}</td> */}
    <td>{props.exercise.date.substring(0, 10)}</td>
    <td>
      <table>
        <tr>
          <td>
          <Link to={"/edit/" + props.exercise._id}><button title="Edit Code Solution." className='btn btn-warning' style={{   }}>Edit</button></Link>
          </td>
          <td style={{ padding: "0px 5px 0px 5px" }}>  
          </td>
          <td>
          <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}><button  title="Delete Code Solution" className='btn btn-danger'>Delete</button></a>
          </td>
        </tr>
      </table>
      
    </td>
  </tr>
)

export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.testHide = this.testHide.bind(this);
    this.deleteExercise = this.deleteExercise.bind(this);

    this.state = { exercises: [] };
  }


  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data.sort(x => x.description) })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  testHide(id) {
    $("#solution_" + id).slideToggle();
  }

  goToPage(title) {
    console.log(title);
    let url = "https://www.hackerrank.com/challenges/" + title.toString().replace(' ', '-');
    window.open(url, '_blank');
  }

  deleteExercise(id) {

    if (window.confirm("Are you sure you want to delete this Challenge?")) 
    {
      axios.delete('http://localhost:5000/exercises/' + id)
      .then(response => { console.log(response.data) });

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
    }; 

  
  }

  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} testHide={this.testHide} key={currentexercise._id} />;
    })
  }

  render() {
    return (
      <div>
        <h3>Completed HackerRank Challenges</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              {/* <th>Username</th> */}
              <th>Description</th>
              <th>Solution</th>
              {/* <th>Duration</th> */}
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.exerciseList()}
          </tbody>
        </table>
      </div>
    )
  }
}