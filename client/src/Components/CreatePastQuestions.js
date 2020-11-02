import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { setPastQuestionErrors } from "./Corrections/pastQuestionErrors";
import M from 'materialize-css';

class CreatePastQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      question: "",
      answer: "",
      errors: {},
    };
    this.categoryRef = React.createRef();
  }

  componentDidMount() {
    this.categoryRef.current.focus();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateInputs = (
    question,
    category,
    answer
  ) => {
    const errors = setPastQuestionErrors(
      question,
      category,
      answer
    );
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === "");
  };

  submit = (event) => {
    event.preventDefault();
    const {
      question,
      category,
      answer,
    } = this.state;

    if (
      this.validateInputs(
        question,
        category,
        answer
      )
    ) {
      const payload = {
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer
      };

      axios({
        url: "/quiz/pastQuestions",
        method: "POST",
        data: payload,
      })
        .then(() => {
          M.toast({ 
            html: "New Past question was successfully created",
            classes: "tost-valid",
            displayLength: 1500,
          })
        /*   alert("Question was saved sucessfully"); */
          this.resetUserInput();
        })
        .catch(() => {
          M.toast({ 
            html: "!!! Something went wrong",
            classes: "tost-invalid",
            displayLength: 1500,
          })
        });
    }
  };

  resetUserInput = () => {
    this.setState({
      category: "",
      question: "",
      answer: ""
    });
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Nimelssa Online Quiz-Create Past Question page</title>
        </Helmet>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="text">Question Category:</label>
            <input
              ref={this.categoryRef}
              type="text"
              value={this.state.category}
              name="category"
              className="form-control"
              placeholder="Enter Question Category Here"
              onChange={this.handleChange}
            />
            {this.state.errors.category && (
              <div className="text-danger">{this.state.errors.category}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="text">Question:</label>
            <input
              type="text"
              name="question"
              className="form-control"
              placeholder="Enter Question here"
              value={this.state.question}
              onChange={this.handleChange}
            />
            {this.state.errors.question && (
              <div className="text-danger">{this.state.errors.question}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="text">Answer:</label>
            <input
              type="text"
              value={this.state.answer}
              className="form-control"
              name="answer"
              placeholder="Enter Answer"
              onChange={this.handleChange}
            />
            {this.state.errors.answer && (
              <div className="text-danger">{this.state.errors.answer}</div>
            )}
          </div>
          <button type="submit" className="btn btn-success mt-3">
            <i className="far fa-check-square"></i>
           <span> &nbsp;Create Question</span>
          </button>
        </form>
      </Fragment>
    );
  }
}

export default CreatePastQuestions;
