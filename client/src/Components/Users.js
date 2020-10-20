import React,{Component, Fragment} from 'react';
import axios from  'axios';
import UsersList from './UsersList';
import M from 'materialize-css';

class Users extends Component{
    constructor(props){
      super(props);
      this.state = {
         users : []
      }
    }

    getUser(){
        axios.get('/admin/allUsers')
        .then((responce)=>{
        const data = responce.data;
        this.setState({
            users : data
        });
  /*       console.log(this.state.users) */
    })
    .catch(()=>{
            alert('Something went wrong when accessing the back end');
        });
    }

    componentDidMount(){
     this.getUser();
    }


    onDelete = (id) =>{
        axios
          .delete(`/admin/deleteUser/${id}`)
          .then((responce) => {
            M.toast({ 
              html: 'User was successfully deleted ',
              classes: "tost-valid",
              displayLength: 1500,
            })
            this.getUser();
          })
          .catch(() => {
            M.toast({ 
              html: 'SOMETHING HAPPNED, PLEASE TRY AGAIN ',
              classes: "tost-invalid",
              displayLength: 1500,
            })
          });
      };

    render(){
        const {users} = this.state;
        return(
            <Fragment>
                {users.map((User)=>(
                   users.length > 0 ? (
                    <Fragment  key={users.matric}>
                    <UsersList DeleteUser={this.onDelete}  RegisteredUsers={User}/> 
               </Fragment>
                   ) : (<h2>
                      No User Found.....
                   </h2>)
                ))}
            </Fragment>
        )
    }
}

export default Users;
