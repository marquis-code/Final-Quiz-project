import React,{Fragment} from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

function UsersList(props) {
   const {RegisteredUsers, DeleteUser} = props;
    return (
        <Fragment>
    <Helmet>
      <title>Nimelssa Quiz-Users List</title>
    </Helmet>
        <div className="container">
          <table className="table">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Matric</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                  <td>{RegisteredUsers.username}</td>
                  <td>{RegisteredUsers.matric}</td>
                  <td>{RegisteredUsers.role}</td>
                  <td>
                  <Link
                      className="btn btn-warning"
                      to="#"
                      onClick={() => DeleteUser(RegisteredUsers._id)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                      &nbsp;Delete
                    </Link>
                  </td>
               </tr>   
            </tbody> 
          </table>
        </div>
      </Fragment>
    )
}

export default UsersList;
