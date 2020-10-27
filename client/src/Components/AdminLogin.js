import React, { useState, useContext, Fragment } from "react";
import AuthService from "../Services/AuthService";
import Message from "../Components/Message";
import { AuthContext } from "../Context/AuthContext";
import { Helmet } from "react-helmet";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import M from 'materialize-css';

const eye = <FontAwesomeIcon icon={faEye} />;

const AdminLogin = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [user, setUser] = useState({ matric: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.adminLogin(user).then((data) => {
      const { isAuthenticated, user, message } = data;
      setMessage(message);
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        M.toast({ 
          html: "Login Approved",
          classes: "tost-valid",
          displayLength: 1000,
        })
        props.history.push("/landingPage");
      } else {
        M.toast({ 
          html: "PLEASE ENTER VALID LOGIN DETAILS",
          classes: "tost-invalid",
          displayLength: 2000,
        })
        setMessage(message);
      }
    }).catch(() =>{
      setMessage("Something went wrong");
    })
  };

  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa Quiz - Login page</title>
      </Helmet>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col s12 m4 offset-m0">
            <div className="card z-depth-4">
              <div className="card-content black white-text">
                <span className="card-title">Admin Login
                &nbsp;<i class="fas fa-user-shield"></i>
             <span className="sr-only">(current)</span></span>
              </div>
              <div className="card-content">
                <div
                  className="wrap-input100 input-field  validate-input"
                  data-validate="Valid Matric is required"
                >
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    type="number"
                    name="matric"
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter Matric"
                    required
                  />
                  <span className="focus-input100"></span>
                  <label htmlFor="matric" className="sr-only">
                    {" "}
                    Matric:{" "}
                  </label>
                </div>

                <div
                  className="wrap-input100 input-field  validate-input"
                  data-validate="Valid Password is required"
                >
                  <i className="material-icons prefix">lock</i>
                  <input
                    type={passwordShown ? "text" : "password"}
                    name="password"
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter Password"
                    required
                  />
                  <i className="passEye" onClick={togglePasswordVisibility}>
                    {eye}
                  </i>
                  <span className="focus-input100"></span>
                  <label htmlFor="password" className="sr-only">
                    {" "}
                    Password:{" "}
                  </label>
                  <small id="passwordHelpInline" className="form-text text-muted">
                   Your password must be at least 8 characters long and 
                   must contain at least an uppercase letter, lowercase letter, 
                   a number, and at least one non-alphanumeric symbol(e.g. !@#\$%\^&\*) 
                   and must not contain spaces or emoji.
                  </small>
                </div>

                <div>
                  <Button block={true} className="mt-3" type="submit">
                    {" "}
                    <span>Sign In&nbsp;<i class="fas fa-sign-in-alt"></i>
             <span className="sr-only">(current)</span>
                      </span>{" "}
                  </Button>
                </div>
                <br />
                <div className="forgotPassword">
                  <Link to="/adminForgot" style={{textDecoration:"none", listStyleType:"none"}}> Forgot Password?</Link>
                </div>
                <br />
                <div className="signup">
                  Dont have an Account? 
                  <Link to="/adminRegister" style={{textDecoration:"none", listStyleType:"none"}}> Sign up</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </Fragment>
  );
};

export default AdminLogin;
