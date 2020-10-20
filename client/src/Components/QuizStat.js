import React, { Component, Fragment } from 'react';
import axios from 'axios';
import QuizStatList from './QuizStatList';
import M from 'materialize-css';

class QuizStat extends Component{
constructor(props){
    super(props);
    this.state = {
        stats : []
     }
}

getStat(){
    axios.get('/admin/playerStat')
    .then((responce)=>{
    const data = responce.data;
    this.setState({
        stats : data
    });
 /*    console.log(this.state.stats); */
})
.catch(()=>{
        alert('Something went wrong when accessing the backend');
    });
}

componentDidMount(){
    this.getStat();
   }

   HandleDeleteStat = (id) =>{
       axios.delete(`/admin/deleteUserStat/${id}`)
       .then((responce) => {
        M.toast({ 
          html: 'User Statistics was successfully deleted ',
          classes: "tost-valid",
          displayLength: 1500,
        })
        this.getStat();
      })
      .catch(() => {
        M.toast({ 
          html: 'SOMETHING HAPPNED, PLEASE TRY AGAIN ',
          classes: "tost-invalid",
          displayLength: 1500,
        })
      });
   }

render(){
    const {stats} = this.state;
    return(
      <Fragment>
                  {stats.map((Stat, index)=>(
                   stats.length > 0 ? (
                    <Fragment key={index}>
                    <QuizStatList CompletedQuizStat={Stat} DeleteUserStat={this.HandleDeleteStat}  /> 
               </Fragment>
                   ) : (
                     <h1>
                         No Statistics Available...
                     </h1>
                   )
                ))} 
        </Fragment>
    )
}
}
export default QuizStat;