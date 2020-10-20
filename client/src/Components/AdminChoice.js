import React, { Component,Fragment } from 'react';
import {Link} from 'react-router-dom';
import {Button}  from 'reactstrap';

class AdminChoice extends Component {
    render() { 
        return ( 
            <Fragment>
                <div>
                    <Button  block={true} className="mt-3"><Link to='/adminRegister'><span>Admin Sign Up</span></Link></Button>
                 </div><br/>

                 <div>
                    <Button  block={true} className="mt-3"><Link to='/adminLogin'><span>Admin Sign In</span></Link></Button>
                 </div>
            </Fragment>
         );
    }
}
 
export default AdminChoice;