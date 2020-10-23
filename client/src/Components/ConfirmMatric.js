import React, { useState, Fragment } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { Button } from "reactstrap";
import M from 'materialize-css';

const ConfirmMatric = (props) => {
const {Score, NumberOfQuestions, NumberOfAnsweredQuestions, CorrectAnswers, WrongAnswers, FiftyFiftyUsed, HintsUsed} = props
const [user, setUser] = useState({ matric: ""});

/* const quizStat = { Score, NumberOfQuestions, NumberOfAnsweredQuestions, CorrectAnswers, WrongAnswers, FiftyFiftyUsed, HintsUsed } */

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const payload = {
        matric : user.matric
      }
      axios.post({
        url: "/user/oneUser",
        method: "POST",
        data: payload 
      }).then((responce)=>{
           if(responce.status === 200){
            const playerStats = {
              matric : user.matric,
              Score, 
              NumberOfQuestions, 
              NumberOfAnsweredQuestions, 
              CorrectAnswers, 
              WrongAnswers, 
              FiftyFiftyUsed, 
              HintsUsed
            };
      
            axios({
              url: "/user/quizStat",
              method: "POST",
              data: playerStats, 
            })
              .then(() => {
                M.toast({
                  html: "Quiz data was sucessfully submitted",
                  classes: "tost-valid",
                  displayLength: 1000 
                })})
               .catch(() => {
                console.log("Something went Wrong");
              });
              setTimeout(() => {
                this.props.history.push('/thanksPage');
                    }, 1000);
           }else{
             alert('please enter a valid matric number');
           }
      }).catch((error)=>{
        console.log(error.message)
        alert('something Failed')
      }) 
  };

  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa Quiz - Matric Confirmation page</title>
      </Helmet>
      <form onSubmit={onSubmit}>
        <div className="row">
          <div className="col s12 m4 offset-m0">
            <div className="card z-depth-4">
              <div className="card-content black white-text">
                <span className="card-title">Confirm your Matric Number to confirm submission</span>
              </div>
              <div className="card-content">
                <div
                  className="wrap-input100 input-field  validate-input"
                  data-validate="Valid Matric is required"
                >
                  <i className="material-icons prefix">account_circle</i>
                  <input
                    type="number"
                    name="matric"
                    onChange={onChange}
                    className="input100 form-control form-control-lg"
                    placeholder="Enter Matric"
                  />
                  <span className="focus-input100"></span>
                  <label htmlFor="matric" className="sr-only">
                    {" "}
                    Matric:{" "}
                  </label>
                </div>

                <div>
                  <Button block={true} className="mt-3" type="submit">
                    {" "}
                    <span>Proceed</span>{" "}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default ConfirmMatric;
