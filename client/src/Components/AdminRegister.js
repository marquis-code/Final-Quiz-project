import React, { useState, useRef, useEffect, Fragment } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';
import M from 'materialize-css'

const eye = <FontAwesomeIcon icon={faEye} />;
const AdminRegister = (props) => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [user, setUser] = useState({
    username: "",
    matric: "",
    password: "",
    email: "",
    role: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  }

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", matric: "", password: "", email: "", role: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.adminRegisteration(user)
      .then((data) => {
        const { message } = data;
        setMessage(message);
        resetForm();
        if (!message.msgError) {
          M.toast({ 
            html: "Account was sucessfully created",
            classes: "tost-valid",
            displayLength: 1000,
          })
          timerID = setTimeout(() => {
            props.history.push("/adminLogin");
          }, 1000);
        }else{
          M.toast({ 
            html: "Please enter valid sign up details!!!",
            classes: "tost-invalid",
            displayLength: 2000,
          })
        }
      })
      .catch(() => {
        setMessage("Something went wrong");
      });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa Quiz - Registeration page</title>
      </Helmet>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col s12 m4 offset-m0">
            <div className="card z-depth-4">
              <div className="card-content black white-text">
                <span className="card-title">Admin Sign Up
                &nbsp;<i class="fas fa-user-plus"></i>
             <span className="sr-only">(current)</span></span>
              </div>
              <div className="card-content">
                <div
                  className="wrap-input100 input-field"
                  data-validate="Valid Name is required"
                >
                  <i className="material-icons prefix">account_box</i>
                  <input
                  autoComplete="new-password"
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter Username"
                  />
                  <span className="focus-input100"></span>
                  <label htmlFor="username" className="sr-only">
                    Username:{" "}
                  </label>
                </div>

                <div className="wrap-input100 input-field">
                  <i className="material-icons prefix">edit</i>
                  <input
                  autoComplete="new-password"
                    type="number"
                    name="matric"
                    value={user.matric}
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter Matric"
                  />
                  <span className="focus-input100"></span>
                  <label htmlFor="matric" className="sr-only">
                    Matric:{" "}
                  </label>
                </div>

                <div className="wrap-input100 input-field">
                  <i className="material-icons prefix">edit</i>
                  <input
                  autoComplete="new-password"
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter Email address"
                  />
                  <span className="focus-input100"></span>
                  <label htmlFor="email" className="sr-only">
                    Email:{" "}
                  </label>
                </div>

                <div className="wrap-input100 input-field ">
                  <i className="material-icons prefix">lock</i>
                  <input
                  autoComplete="new-password"
                   type={passwordShown ? "text" : "password"}
                    name="password"
                    value={user.password}
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter Password"
                  />
                   <i className="passEye" onClick={togglePasswordVisibility}>{eye}</i>
                  <span className="focus-input100"></span>
                  <label htmlFor="password" className="sr-only">
                    Password:{" "}
                  </label>
                  <small id="passwordHelpInline" className="form-text text-muted">
                   Your password must be at least 8 characters long and 
                   must contain at least an uppercase letter, lowercase letter, 
                   a number, and at least one non-alphanumeric symbol(e.g. !@#\$%\^&\*) 
                   and must not contain spaces or emoji.
                  </small>
                </div>

                <div className="wrap-input100 input-field">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                  autoComplete="new-password"
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter role (admin)"
                  />
                  <span className="focus-input100"></span>
                  <label htmlFor="role" className="sr-only">
                    Role:{" "}
                  </label>
                </div>
                <Button block={true} className="mt-3" type="submit">
                  <span>Register&nbsp;<i class="fas fa-user-plus"></i>
                  <span className="sr-only">(current)</span>
                  </span>
                </Button>
                <br />
                <div className="login">
                  Already Registered?
                  <Link to="/adminLogin" style={{textDecoration:"none", listStyleType:"none"}}>
                     Login
                  </Link>
                </div>
                <hr />
              </div>
            </div>
          </div>
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </Fragment>
  );
};

export default AdminRegister;
