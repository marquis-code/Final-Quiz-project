import React,{Component, Fragment} from 'react';
import axios from  'axios';
import UserComplainList from './UserComplainList';

class UserComplain extends Component{
    constructor(props){
      super(props);
      this.state = {
         complains : [],
         errorMessage : ""
      }
    }

    getComplains(){
        axios.get('/admin/allComplains')
        .then((responce)=>{
        const data = responce.data;
        this.setState({
            complains : data
        });

      })
    .catch(()=>{
           this.setState({errorMessage : "Error retrieving complains !!!!"})
        });
    }

    componentDidMount(){
     this.getComplains();
    }

    render(){
        const {complains, errorMessage} = this.state;
        return(
            <Fragment>
                {complains.map((Complain)=>(
                   complains.length > 0 ? (
                    <Fragment  key={complains.matric}>
                    <UserComplainList userComplains={Complain}/> 
               </Fragment>
                   ) : (<h2>
                      No Complains Found.....
                   </h2>)
                ))}

                   {errorMessage ? <h1>{errorMessage}</h1> : null}
            </Fragment>
        )
    }
}

export default UserComplain;
