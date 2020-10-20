import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from 'materialize-css';
import axios from 'axios';
import { Button } from "reactstrap";
import JWT from 'jsonwebtoken';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';


const eye = <FontAwesomeIcon icon={faEye} />;

const AdminReset = ({ match, props}) => {
    const [passwordShown, setPasswordShown] = useState(false)
  const [user, setUser] = useState({
    username: '',
    token: '',
    newPassword: ''
  });


  useEffect(() => {
    let token = match.params.token;
    let { username } = JWT.decode(token);
    // console.log(name);
    if (token) {
        setUser({ ...user, username, token });
    }
}, []);

const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  }
  

const { username, token, newPassword } = user;

const handleChange = event => {
    setUser({ ...user, newPassword: event.target.value });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user });
  axios({
    url: "/admin/reset",
    method: "PUT",
    data: {newPassword, resetPasswordLink: token}
  })
    .then((responce) => {
      M.toast({ 
        html: responce.data.message,
        classes: "tost-valid",
        displayLength: 1500,
      })
      setUser({ ...user});
      props.history.push("/adminLogin");
    })
    .catch(() => {
        M.toast({ 
          html: 'RESET PASSWORD ERROR, PLEASE TRY AGAIN ',
          classes: "tost-invalid",
          displayLength: 1500,
        })
        setUser({ ...user });
    });
  };


  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa Quiz -admin reset password page</title>
      </Helmet>
      <form onSubmit={handleSubmit}>


      <div className="row">
          <div className="col s12 m4 offset-m0">
            <div className="card z-depth-4">
              <div className="card-content black white-text">
               <span className="card-title">Hello {username}, Admin Type your new password</span>
              </div>
              <div className="card-content">
              <div className="wrap-input100 input-field">
            <i className="material-icons prefix">edit</i>
                <input
                    onChange={handleChange}
                    value={newPassword}
                    type="password"
                    className="input100 form-control form-control-lg"
                    placeholder="Type new password"
                    required
                />
                <i className="passEye" onClick={togglePasswordVisibility}>{eye}</i>
                 <span className="focus-input100"></span>
                  <label htmlFor="password" className="sr-only">
                    Password:{" "}
                  </label>
            </div>

                 <Button block={true} className="mt-3" type="submit">
                  <span>Submit</span>
                </Button>
  
                <hr />
              </div>
            </div>
          </div>
        </div>
        </form>
    </Fragment>
  );
};

export default AdminReset;
