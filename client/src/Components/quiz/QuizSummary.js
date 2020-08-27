import React, { Component, Fragment} from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

export class QuizSummary extends Component {
    constructor(props){
        super(props);
        this.state = {
            score: 0,
            numberOfQuestions: 0,
            numberOfAnsweredQuestions: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            hintsUsed: 0,
            fiftyFiftyUsed: 0
        };
    }
 
    componentDidMount() {
        const { state } = this.props.location;
        if (state) {
            this.setState({
                score: (state.score / state.numberOfQuestions) * 100,
                numberOfQuestions: state.numberOfQuestions,
                numberOfAnsweredQuestions: state.numberOfAnsweredQuestions,
                correctAnswers: state.correctAnswers,
                wrongAnswers: state.wrongAnswers,
                hintsUsed : state.hintsUsed,
                fiftyFiftyUsed: state.fiftyFiftyUsed
            });
        }
    };

    render (){
        const { state } = this.props.location;
        let stats, remark;
        const userScore = this.state.score;

        if(userScore <= 30){
            remark = "You need more pratice.";
        }
        else if(userScore > 30 && userScore <= 50){
            remark = " Better luck next time.";
        }
        else if(userScore <= 70 && userScore > 50) {
            remark = "You can do better.";
        }
        else if(userScore <=71 && userScore <= 84){
            remark = "You did Great.";
        }
        else{
            remark = "You're an absolute genius."
        }

        if(state !== undefined) {
            stats = (
                <Fragment>
                    <div style={{textAlign: 'center'}}>
                        <span className="mdi mdi-check-circle-outline success-icon mark"></span>
                    </div>
                    <h1>Quiz has ended!</h1>
                    <div className="container">

                        <h4>{remark}</h4> 
                        <h2>Your Score: {this.state.score.toFixed(0)}&#37;</h2>
                        <span className="stat left">Total Number Of Questions:</span>
                        <span className="right">{this.state.numberOfQuestions}</span><br />

                        <span className="stat left">Number Of Attempted Questions:</span>
                        <span className="right">{this.state.numberOfAnsweredQuestions}</span><br />

                        <span className="stat left">Number Of Correct Answers:</span>
                        <span className="right">{this.state.correctAnswers}</span><br />

                        <span className="stat left">Number Of Wrong Answers:</span>
                        <span className="right">{this.state.wrongAnswers}</span><br />

                        <span className="stat left">Hints used:</span>
                        <span className="right">{this.state.hintsUsed}</span><br />

                        <span className="stat left">50 - 50 Used:</span>
                        <span className="right">{this.state.fiftyFiftyUsed}</span>
                    </div>
                <section className="links">
                    <ul>
                        <li>
                        <Link to="/" className="button-link-bth">Back to Home </Link>
                        {/*  <Link to="/play/quiz" className="button-link-pa">Play again</Link> */}
                        </li>
                    </ul>
                    </section>    
                </Fragment>
            );
        }
        else{
            stats = (
                <section>
                    <h1 className="no-stats">No Statistics Available</h1>
                    <ul>
                        <li>
                            <Link to="/">Back to Home?</Link>
                        </li>

                        {/* <li>
                            <Link to="/play/quiz">Take a Quiz?</Link>
                        </li> */}
                    </ul>
                </section>
            );
        }
        
        return(
            <Fragment>
                <Helmet><title>NIMELSSA Online Quiz - Quiz Summary</title></Helmet>
                {stats}
            </Fragment>
        )
    }
}

export default QuizSummary