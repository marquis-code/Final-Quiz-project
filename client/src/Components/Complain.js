import React, { Component, Fragment } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { complainErrors } from "./Corrections/complainErrors"; 
import M from 'materialize-css';

class Complain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "",
      matric: "",
      complain: "",
      errors: {},
    };
    this.matricRef = React.createRef();
  }

  componentDidMount() {
    this.matricRef.current.focus();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  validateInputs = (level,matric,complain) => {
    const errors = complainErrors(
        level,
        matric,
        complain
    );
    this.setState({ errors: errors });
    return Object.values(errors).every((err) => err === "");
  };

  submit = (event) => {
    event.preventDefault();
    const {level,matric,complain} = this.state;

    if ( this.validateInputs(level, matric, complain)) {
      const payload = {
        level: this.state.level,
        matric: this.state.matric,
        complain: this.state.complain
    };

      axios({
        url: "/user/complain",
        method: "POST",
        data: payload,
      })
        .then(() => {
          M.toast({ 
            html: "Your Complain was successfully created",
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
        level: "",
        matric: "",
        complain: ""
    });
  };

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Nimelssa Online Quiz-Complain page</title>
        </Helmet>
        <form onSubmit={this.submit}>
          <div className="form-group">
            <label htmlFor="text">Matric:</label>
            <input
            autoComplete="new-password"
              ref={this.matricRef}
              type="number"
              value={this.state.matric}
              name="matric"
              className="form-control"
              placeholder="Enter Matric Here"
              onChange={this.handleChange}
            />
            {this.state.errors.matric && (
              <div className="text-danger">{this.state.errors.matric}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="text">Level:</label>
            <input
            autoComplete="new-password"
              type="number"
              name="level"
              className="form-control"
              placeholder="Enter Level here(e.g. 100)"
              value={this.state.level}
              onChange={this.handleChange}
            />
            {this.state.errors.level && (
              <div className="text-danger">{this.state.errors.level}</div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="text">Complain:</label>
            <textarea
            autoComplete="new-password"
              rows={3}
              type="text"
              cols={5}
              value={this.state.complain}
              className="form-control"
              name="complain"
              placeholder="Enter Complain here"
              onChange={this.handleChange}
            />
            {this.state.errors.complain && (
              <div className="text-danger">{this.state.errors.complain}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success mt-3">
            <i className="far fa-check-square"></i>
           <span> &nbsp;Submit complain</span>
          </button>
        </form>
      </Fragment>
    );
  }
}

export default Complain;
