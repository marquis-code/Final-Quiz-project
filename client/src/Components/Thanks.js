import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';
import {emojify} from 'react-emojione';

class Thanks extends Component{
render(){
    return(
        <Fragment>
         <div className="notFound">
         <h1 className="errorText">Congratulations   {emojify('^__^', {output: 'unicode'})}</h1>
         <h3 className="errorText">Thanks For Participating in this week's Nimelssa Online Quiz.</h3>
         <p className="errorTextParagraph">The winner will be announced by the academic committee.</p>
          <p className="errorTextParagraph">Have a great weekend.</p>
         <h3>
         <span className="right"><Link style={{textDecoration:"none", listStyleType:"none"}} to="/">Return Home</Link></span>
         </h3>
        <h3>
         <span className="left"><Link style={{textDecoration:"none", listStyleType:"none"}} to="/pastQuestionsList">Acces past questions and answers</Link></span>
        </h3>
         </div>
        </Fragment>
    )
}
}

export default Thanks;
