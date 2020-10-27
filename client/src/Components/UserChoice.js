import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Button}  from 'reactstrap';

class UserChoice extends Component {
    render() { 
        return ( 
            <Fragment>
                <div>
                    <Button  block={true} className="mt-3"><Link to='/register'><span>User Signup&nbsp;<i class="fas fa-user-plus"></i>
             <span className="sr-only">(current)</span></span></Link></Button>
                 </div><br/>

                 <div>
                    <Button block={true} className="mt-3"><Link to='/userLogin'><span>User SignIn&nbsp;<i class="fas fa-sign-in-alt"></i>
             <span className="sr-only">(current)</span></span></Link></Button>
                 </div>
            </Fragment>
         );
    }
}
 
export default UserChoice;