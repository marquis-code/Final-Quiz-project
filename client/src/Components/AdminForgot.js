import React, { useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from 'materialize-css';
import { Button } from "reactstrap";
import axios from 'axios';

const AdminForgot = (props) => {

  const [user, setUser] = useState({
    email: ""
  });

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value }); //pull out everything in the user object and override it with specific input target
  };

  const onSubmit = (e) => {
    e.preventDefault();
     
    const payload = {
      email : user.email
  }

  axios({
    url: "/admin/forgot",
    method: "PUT",
    data: payload,
  })
    .then(() => {
      M.toast({ 
        html: `Please Check ${user.email} for password reset link. RESET LINK IS VALID FOR 30 MINUTES`,
        classes: "tost-valid",
        displayLength: 3000,
      })
    })
    .catch(() => {
      M.toast({ 
        html:  "ERROR SENDING PASSWORD RESET LINK",
        classes: "tost-invalid",
        displayLength: 3000,
      })
    });
  };

  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa Quiz - Admin Forgot password page</title>
      </Helmet>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col s12 m4 offset-m0">
            <div className="card z-depth-4">
              <div className="card-content black white-text">
                <span className="card-title">Admin Forgot Password</span>
              </div>
              <div className="card-content">
        
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

                 <Button block={true} className="mt-3" type="submit">
                  Submit
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

export default AdminForgot;
