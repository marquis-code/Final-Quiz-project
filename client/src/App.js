import React from 'react';
import Navbar from './Components/Navbar';
import UserLogin from './Components/UserLogin';
import Home from './Components/Home';
import Register from './Components/Register';
import Forgot from './Components/Forgot';
import Reset from './Components/Reset';
import QuizInstructions from './Components/quiz/Quizinstructions';
/* import QuizSummary from './Components/quiz/QuizSummary'; */
import LandingPage from './Components/LandingPage';
import DetailPage from './Components/DetailPage';
import CreatePost from './Components/CreatePost';
import EditPost from './Components/EditPost';
import PrivateRoute from './hocs/PrivateRoute';
import UnPrivateRoute from './hocs/UnPrivateRoute';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import QuizParentComponent from './Components/QuizParentComponent'; 
import AdminLogin from './Components/AdminLogin';
import Users from './Components/Users';
import RedirectUser from './Components/Redirect';
import AdminRegister from './Components/AdminRegister';
import UserChoice from './Components/UserChoice';
import AdminChoice from './Components/AdminChoice';
import NotFound from './Components/NotFound'; 
import QuizStat from './Components/QuizStat';
import Thanks from './Components/Thanks';
import AdminForgot from './Components/AdminForgot';
import AdminReset from './Components/AdminReset';

function App() {
  return (
   <Router>
   <div className="container">
      <Navbar/>
       <Switch>
            {/* Grneral routes */}
       <Route exact path="/" component={Home}/>
       <UnPrivateRoute exact path="/redirect" component={RedirectUser}/>

            {/* User un-protected routes */}
       <UnPrivateRoute exact path="/userLogin" component={UserLogin}/>
       <UnPrivateRoute exact path="/userChoice" component={UserChoice}/>
       <UnPrivateRoute exact path="/quizInstructions" component={QuizInstructions} />
       <UnPrivateRoute exact path="/forgot" component={Forgot}/>
       <UnPrivateRoute exact path="/reset/:token" component={Reset}/>
       <UnPrivateRoute exact path="/register" component={Register}/>

       {/*  Admin Un-protected Routes only  */}
       <UnPrivateRoute exact path="/adminLogin" component={AdminLogin}/>
       <UnPrivateRoute exact path="/adminRegister" component={AdminRegister}/>
       <UnPrivateRoute exact path="/adminForgot" component={AdminForgot}/>
       <UnPrivateRoute exact path="/adminReset/:token" component={AdminReset}/>
       <UnPrivateRoute exact path="/adminChoice" component={AdminChoice}/>

         {/* User protected quiz routes */}
       <PrivateRoute exact path="/play"  roles={["user"]} component={QuizParentComponent}/>
   {/*     <PrivateRoute exact path="/quizSummary" roles={["user","admin"]} component={QuizSummary} /> */}
       <PrivateRoute exact path="/thanksPage" roles={["user"]} component={Thanks} />
   
         {/* Admin Quiz protected Routes only */}
       <PrivateRoute exact path="/landingPage" roles={["admin"]} component={LandingPage}/>
       <PrivateRoute exact path="/quiz/:id" roles={["admin"]} component={DetailPage}/>
       <PrivateRoute exact path="/questions" roles={["admin"]} component={CreatePost}/>
       <PrivateRoute exact path="/editPost/:id" roles={["admin"]} component={EditPost}/>
       <PrivateRoute exact path="/users" roles={["admin"]} component={Users}/>
       <PrivateRoute exact path="/quizStat" roles={["admin"]} component={QuizStat}/>
      
          {/* Routes for invalid request */}
        <Route path="*" component={NotFound} />
       </Switch>
     </div>
   </Router>
  ); 
}
export default App;