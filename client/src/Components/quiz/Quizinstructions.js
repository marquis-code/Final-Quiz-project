import React, { Fragment} from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const QuizInstructions = () => (
    <Fragment>
<Helmet><title>Nimelssa Quiz - Instructions page</title></Helmet>
 <div className="instructions container">
    <h1>NIMELSSA QUIZ RULES AND REGULATIONS</h1>
    <h2>NOTE!!! FAILURE TO COMPLY TO THE RULES WILL ATTRACT PENALITY </h2>
    <p>Ensure you read this guide from start to finish</p>
    <ul className="browser-default" id="main-list">

        <li>The quiz has a duration of 15 minutes and ends as soon as your time elapses</li>
        <li>The quiz Ends automatically as soon as browser is closed</li>
        <li>The quiz consist of 25 questions</li>
        <li>Each question has four options </li>
        <li>Select the option which best answers the question by clicking (or selecting) it</li>
        <li>Each game has two life lines namely:
            <ul id="sublist">
                <li>2 50-50 chances</li>
                <li>5 Hints</li>
            </ul>
         </li>    
         <li>
             Select a 50-50 life line by clicking the icon
             <span className="mdi mdi-set-center mdi-24px lifeline-icon"></span>
             will remove two wrong answers leaving the correct answer and one wrong answer
        </li>   
        <li>
            Use a hint by clicking the icon
            <span className="mdi mdi-lightbulb-on mdi-24px lifeline-icon"></span>
            will remove one wrong answer leaving two wrong answers and one correct answer.You can use as many hint as possible on a single question.
        </li>
        <li>The timer starts as soon as the quiz questions loads</li>   
        <li>You will be required to enter your matric number at the end of the quiz exercise</li>
         <li>Avoid refreshing your browser as this may result to restarting of the quiz</li>
         <li>Avoid taking the Quiz twice, this will result in cancellation of quiz scores</li>
        <li>Lets do this if you think you have got what it takes</li>
    </ul>
    <div>
       
      <span className="left"><Link to="/">Return back</Link></span>
      <span className="right"><Link to="/redirect">Ok, lets proceed</Link></span>
    </div>
</div>
    </Fragment>
)

export default QuizInstructions;