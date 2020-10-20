import React, { Fragment } from "react";
import { Helmet } from "react-helmet";

import correctNotification from '../../src/assets/audio/correct-answer.mp3';
import wrongNotification from '../../src/assets/audio/wrong-answer.mp3';
import buttonNotification from '../../src/assets/audio/button-sound.mp3';

const Questionnaire = (props) => {
const 
{CurrentQuestion,
HandleOptionClick, 
CurrentQuestionIndex, 
NumberOfQuestions,
Hints,
FiftyFifty,
HandleHints,
HandleFiftyFifty,
Time,
HandleButtonClick } = props;
/* const {Questions : {question, optionA, optionB, optionC, optionD}} = props */

/* const {Questions : [{question, optionA, optionB, optionC, optionD}]} = props */



  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa - Quiz page</title>
      </Helmet>
      <Fragment>
       <audio id="correct-sound" src={correctNotification} />
        <audio id="wrong-sound" src={wrongNotification} />
        <audio id="button-sound" src={buttonNotification} />        
      </Fragment>
     <div className="questions">
        <h2>Quiz Mode</h2>
        <div className="lifeline-container">
          <p>
            <span onClick={HandleFiftyFifty} className="mdi mdi-set-center mdi-24px lifeline-icon">
                  <span className="lifeline">{FiftyFifty}</span>
            </span>
          </p>
          <p>
            <span onClick={HandleHints}  className="mdi mdi-lightbulb-on-outline mdi-24px lifeline-icon">
                 <span className="lifeline">{Hints}</span>
            </span>
          </p>
        </div> 
        <div>
          <p>
  <span className="left">{CurrentQuestionIndex + 1} of {NumberOfQuestions}</span>
            <span className="right" >
              {Time.minutes} : {Time.seconds}
              <span className="mdi mdi-clock-outline mdi-24px lifeline-icon"></span>
            </span> 
          </p>
        </div> 
        <h5>{CurrentQuestion.question}</h5>
        <div className="options-container">
          <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionA}</p>
          <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionB}</p>
        </div>
        <div className="options-container">
          <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionC}</p>
          <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionD}</p>
        </div>
        <div className="button-container">
         <button 
          onClick={HandleButtonClick}
          id="previous-button">
            Previous
          </button>
 
          <button 
          onClick={HandleButtonClick}
          id="next-button">
            Next
          </button> 
          
          <button 
         onClick={HandleButtonClick} 
          id="quit-button">
            Quit
            </button> 
        </div>
      </div> 
    </Fragment>
  );
}

export default Questionnaire;

//Child component
