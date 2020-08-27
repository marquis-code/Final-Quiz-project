import React from 'react';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Home from './Components/Home';
import Register from './Components/Register';
import Quiz from './Components/Quiz';
import QuizInstructions from './Components/quiz/Quizinstructions';
import Play from './Components/quiz/play';
import QuizSummary from './Components/quiz/QuizSummary';
import Admin from './Components/Admin';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 

function App() {
  return (
   <Router>
     <Navbar/>
       <Route exact path="/" component={Home}/>
       <UnPrivateRoute exact path="/login" component={Login}/>
       <UnPrivateRoute exact path="/register" component={Register}/>
       <PrivateRoute exact path="/quiz" roles={["user","admin"]} component={Quiz} />
       <PrivateRoute exact path="/admin" roles={["admin"]} component={Admin}/>
      
       <PrivateRoute exact path="/quizSummary" roles={["user","admin"]} component={QuizSummary} />
       <PrivateRoute exact path="/play" roles={["user","admin"]} component={Play} />
       <UnPrivateRoute exact path="/quizInstructions" component={QuizInstructions} />
   </Router>
  ); 
}

export default App;
