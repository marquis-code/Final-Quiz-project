import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Moment from "react-moment";
import { Link } from "react-router-dom";

function QuizStatList(props) {
  const { CompletedQuizStat, DeleteUserStat } = props;
  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa Quiz-Users Quiz-statistics</title>
      </Helmet>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Matric</th>
              <th scope="col">Score</th>
              {/*        <th scope="col">Number of Questions</th> */}
              <th scope="col">Questions Answered</th>
              <th scope="col">Correct Answers</th>
              <th scope="col">Wrong Answers</th>
              <th scope="col">Fifty Fifty used</th>
              <th scope="col">Hints Used</th>
              <th scope="col">Date submitted</th>
              <th scope="col">Time submitted</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{CompletedQuizStat.matric}</td>
              <td>{CompletedQuizStat.score}</td>
              {/*    <td>{CompletedQuizStat.numberOfQuestions}</td> */}
              <td>{CompletedQuizStat.numberOfAnsweredQuestions}</td>
              <td>{CompletedQuizStat.numberOfAnsweredQuestions}</td>
              <td>{CompletedQuizStat.correctAnswers}</td>
              <td>{CompletedQuizStat.fiftyFiftyUsed}</td>
              <td>{CompletedQuizStat.hintsUsed}</td>
              <td>
                <Moment format="DD/MM/YYYY">
                  {CompletedQuizStat.date}
                </Moment>
              </td>
              <td>
                <Moment trim format="hh : mm : ss a">
                  {CompletedQuizStat.date}
                </Moment>
              </td>
              <td>
                <Link
                  className="btn btn-warning"
                  to="#"
                  onClick={() => DeleteUserStat(CompletedQuizStat._id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  &nbsp;Delete
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  );
}

export default QuizStatList;
