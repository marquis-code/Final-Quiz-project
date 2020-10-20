import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';

class Thanks extends Component{
render(){
    return(
        <Fragment>
         <div className="notFound">
         <h1 className="errorText">Congratulations</h1>
         <h3 className="errorText">Thanks For Participating in this week's Nimelssa Online Quiz</h3>
          <p className="errorTextParagraph">Have a great weekend</p>
          <h5>Click to return to
                <Link to="/"> Home page</Link>
          </h5>
         </div>
        </Fragment>
    )
}
}

export default Thanks;
