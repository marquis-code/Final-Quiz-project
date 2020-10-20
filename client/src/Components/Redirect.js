import React, { Component, Fragment} from 'react';
import {Button}  from 'reactstrap';

class RedirectUser extends Component{
    constructor(props){
        super(props);
        
        this.matricRef = React.createRef();
    }

    componentDidMount(){
        this.matricRef.current.focus();
    }

    redirectAdmin(){
        this.props.history.push("/adminChoice");
    }

    
    redirectUser(){
        this.props.history.push("/userChoice");
    }


    handleSubmit = (event) =>{
    event.preventDefault();
      const userMatric = this.matricRef.current.value;
      userMatric === "160708004" ? (this.redirectAdmin()) : (this.redirectUser())
    }

    render(){
        return(
        <Fragment>
           <form onSubmit={this.handleSubmit}>
           <div className="wrap-input100 input-field">
            <i className="material-icons prefix">edit</i>   
            <input type="number" 
                name="matric" 
                ref={this.matricRef}
                className="input100 form-control form-control-lg" 
                placeholder="Enter Matric to proceed"/> 
                <span className="focus-input100"></span>
            <label htmlFor="matric" className="sr-only">Matric: </label>         
            </div>
            
           <hr/>
            <Button  block={true} type="submit" className="btn btn-success mt-3">
            <i className="far fa-check-square"></i>
            <span>&nbsp;submit</span>
          </Button>
           </form>
        </Fragment>
        )
    }
}
export default RedirectUser;

