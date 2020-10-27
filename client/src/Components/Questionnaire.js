/* import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import classnames from 'classnames';

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
HandleButtonClick
} = props;



const [isLoading, setIsLoading] = useState(true);

useEffect(() => {

}, []);

  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa - Quiz page</title>
      </Helmet>
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
          <p onClick={HandleOptionClick}  className="option">{CurrentQuestion.optionA}</p>
          <p  onClick={HandleOptionClick} className="option">{CurrentQuestion.optionB}</p>
        </div>
        <div className="options-container">
          <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionC}</p>
          <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionD}</p>
        </div>
        <div className="button-container">
         <button 
           className={classnames('disable')}
          onClick={HandleButtonClick}
          id="previous-button">
            Previous
          </button>
 
          <button 
       className={classnames('disable')}
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
 */

import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import classnames from 'classnames';
import Loader from 'react-loader-spinner';


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
HandleButtonClick
} = props;

const QuizPage = () => {
  return(
    <Fragment>
    <Helmet>
      <title>Nimelssa - Quiz page</title>
    </Helmet>
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
        <p onClick={HandleOptionClick}  className="option">{CurrentQuestion.optionA}</p>
        <p  onClick={HandleOptionClick} className="option">{CurrentQuestion.optionB}</p>
      </div>
      <div className="options-container">
        <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionC}</p>
        <p onClick={HandleOptionClick} className="option">{CurrentQuestion.optionD}</p>
      </div>
      <div className="button-container">
       <button 
         className={classnames('disable')}
        onClick={HandleButtonClick}
        id="previous-button">
          Previous
        </button>

        <button 
     className={classnames('disable')}
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
  )
}

const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
let interval = setTimeout(() => setIsLoading(false), 2000);
return () => {
   if(interval){
     clearTimeout(interval);
     interval = 0;
   }
}
}, []);

  return isLoading ? <Loader className="loader" type="puff" color="00BFFF" height={100} width={100}/> : QuizPage();
}

export default Questionnaire;
