import React, { useState, useRef, useEffect, Fragment } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';

const eye = <FontAwesomeIcon icon={faEye} />;

const Register = (props) => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [isShown, setIsShown] = useState(false);
  const [user, setUser] = useState({
    username: "",
    matric: "",
    password: "",
    role: "",
    email: "",
  });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

const togglePasswordVisibility = () => {
  setPasswordShown(passwordShown ? false : true);
}

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setUser({ username: "", matric: "", password: "", email: "", role: "" });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user)
      .then((data) => {
        const { message } = data;
        setMessage(message);
        resetForm();
        if (!message.msgError) {
          timerID = setTimeout(() => {
            props.history.push("/userLogin");
          }, 1000);
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
                <span className="card-title">User Sign Up</span>
              </div>
              <div className="card-content">
                <div
                  className="wrap-input100 input-field"
                  data-validate="Valid Name is required"
                >
                  <i className="material-icons prefix">account_box</i>
                  <input
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
                </div>

                <div className="wrap-input100 input-field">
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    type="text"
                    name="role"
                    value={user.role}
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter role (user)"
                  />
                  <span className="focus-input100"></span>
                  <label htmlFor="role" className="sr-only">
                    Role:{" "}
                  </label>
                </div>
                <Button block={true} className="mt-3" type="submit">
                 <span> Register</span>
                </Button>
                <br />
                <div className="registerLink">
                  Already Registered?
                  <Link to="/userLogin"> Login</Link>
                </div>
                <hr />
                <Button
                  onClick={() => setIsShown(true)}
                  onDoubleClick={() => setIsShown(false)}
                  block={false}
                  className="mt-3"
                >
                <span>Click here for password instructions</span>
                </Button>
                <Fragment>
                  {isShown && (
                    <Fragment>
                      <div className="inputDiv">
                        <ul className="input-requirement">
                          <li>
                            Password must be at least 8 characters long(and not
                            more than than 12 characters)
                          </li>
                          <li>
                            Password must include at least 1 numeric character
                          </li>
                          <li>
                            Password must include at least 1 Lower Case
                            alphabetical character(a-z)
                          </li>
                          <li>
                            Password must include at least 1 Upper Case
                            alphabetical character(A-Z)
                          </li>
                          <li>
                            Password must include at least 1 non-alphanumeric
                            symbol(e.g. !@#\$%\^&\*)
                          </li>
                        </ul>
                      </div>
                    </Fragment>
                  )}
                </Fragment>
              </div>
            </div>
          </div>
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </Fragment>
  );
};

export default Register;
