import React, { Component, Fragment } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Moment from 'react-moment';
import M from 'materialize-css';

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Questions: [],
    };
  }

  getQuiz = () => {
    axios
      .get("/quiz/questions")
      .then((responce) => {
        const data = responce.data;
        this.setState({ Questions: data });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  componentDidMount = () => {
    this.getQuiz();
  };

  onDelete = (id) => {
    axios
      .delete(`/quiz/questions/${id}`)
      .then(() => {
        M.toast({ 
          html: "Question was successfully deleted",
          classes: "tost-valid",
          displayLength: 1500,
        })
        this.getQuiz();
      })
      .catch(() => {
        M.toast({ 
          html: "!!! Something went wrong when fetching quiz questions ",
          classes: "tost-invalid",
          displayLength: 1500,
        })
      });
  };

  render() {
    return (
      <Fragment>
         <Helmet>
      <title>Nimelssa Quiz-Admin page</title>
    </Helmet>
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Question ID</th>
                <th scope="col">Date Created</th>
                <th scope="col">Question Category</th>
                <th scope="col">Question</th>
                <th scope="col">OptionA</th>
                <th scope="col">OptionB</th>
                <th scope="col">OptionC</th>
                <th scope="col">OptionD</th>
                <th scope="col">Answer</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Questions.map((posts, index) => (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td><Moment format="DD/MM/YYYY">{posts.date}</Moment></td>
                  <td>{posts.category}</td>
                  <td>
                    <Link to={`/quiz/${posts._id}`}>{posts.question}</Link>
                  </td>
                  <td>{posts.optionA}</td>
                  <td>{posts.optionB}</td>
                  <td>{posts.optionC}</td>
                  <td>{posts.optionD}</td>
                  <td>{posts.answer}</td>
                  <td>
                    <Link
                      className="btn btn-warning"
                      to={`/editPost/${posts._id}`}
                    >
                      <i
                        className="fa fa-pencil-square-o"
                        aria-hidden="true"
                      ></i>
                      &nbsp;Edit
                    </Link>
                    &nbsp;
                    <Link
                      className="btn btn-warning"
                      to="#"
                      onClick={() => this.onDelete(posts._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                      &nbsp;Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-success mt-3"  style={{float:"left"}}>
            <Link to="/questions"><span>Create New Question</span></Link>
          </button>
         {/*  <hr/>  */}
          <button className="btn btn-success mt-3" style={{float:"left"}}>
            <Link to="/users"><span>View All Users</span></Link>
          </button>
      {/*      <hr/>  */}
          <button className="btn btn-success mt-3" style={{float:"left"}}>
            <Link to="/quizStat"><span>View Quiz Statistics</span></Link>
          </button> 
        </div>
      </Fragment>
    );
  }
}

export default LandingPage;
