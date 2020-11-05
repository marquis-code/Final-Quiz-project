 import React, { Component } from 'react';
import Navbar from './Components/Navbar';
/* import Footer from './Components/Footer'; */
import UserLogin from './Components/UserLogin';
import Home from './Components/Home';
import Register from './Components/Register';
import Forgot from './Components/Forgot';
import Reset from './Components/Reset';
import QuizInstructions from './Components/quiz/Quizinstructions';
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
import Loader from 'react-loader-spinner';
import CreatePastQuestions from './Components/CreatePastQuestions';
import PastQuestions from './Components/PastQuestions';
import Complain from './Components/Complain';
import UserComplain from './Components/UserComplain';



class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading : true,
      confirmOpen : true
    }
  }

  componentDidMount(){
    this.timerHandle = setTimeout(() => this.setState({isLoading : false}), 1000);
  }

  componentWillUnmount(){
    if(this.timerHandle){
      clearTimeout(this.timerHandle);
      this.timerHandle = 0;
    }
  }

  HomePage = () => {
    return (
      <Router>
      <div className="container">
          <Navbar />
          <Switch>
         <Route exact path="/" component={Home}/>
          <UnPrivateRoute exact path="/redirect" component={RedirectUser}/>
   
          <UnPrivateRoute exact path="/userLogin" component={UserLogin}/>
          <UnPrivateRoute exact path="/userChoice" component={UserChoice}/>
          <UnPrivateRoute exact path="/quizInstructions" component={QuizInstructions} />
          <UnPrivateRoute exact path="/forgot" component={Forgot}/>
          <UnPrivateRoute exact path="/reset/:token" component={Reset}/>
          <UnPrivateRoute exact path="/register" component={Register}/>
          
   
          <UnPrivateRoute exact path="/adminLogin" component={AdminLogin}/>
          <UnPrivateRoute exact path="/adminRegister" component={AdminRegister}/>
          <UnPrivateRoute exact path="/adminForgot" component={AdminForgot}/>
          <UnPrivateRoute exact path="/adminReset/:token" component={AdminReset}/>
          <UnPrivateRoute exact path="/adminChoice" component={AdminChoice}/>
   
          <PrivateRoute exact path="/play"  roles={["user"]} component={QuizParentComponent}/>
          <PrivateRoute exact path="/pastQuestionsList"  roles={["user"]} component={PastQuestions}/>
     
          <PrivateRoute exact path="/thanksPage" roles={["user"]} component={Thanks} />
          <PrivateRoute exact path="/complain" roles={["user"]} component={Complain} />

          <PrivateRoute exact path="/landingPage" roles={["admin"]} component={LandingPage}/>
          <PrivateRoute exact path="/quiz/:id" roles={["admin"]} component={DetailPage}/>
          <PrivateRoute exact path="/questions" roles={["admin"]} component={CreatePost}/>
          <PrivateRoute exact path="/editPost/:id" roles={["admin"]} component={EditPost}/>
          <PrivateRoute exact path="/users" roles={["admin"]} component={Users}/>
          <PrivateRoute exact path="/quizStat" roles={["admin"]} component={QuizStat}/>
          <PrivateRoute exact path="/pastQuestion" roles={["admin"]} component={CreatePastQuestions}/>
          <PrivateRoute exact path="/userComplains" roles={["admin"]} component={UserComplain}/>
           <Route path="*" component={NotFound} />
          </Switch>
       {/*    <Footer /> */}
        </div>
      </Router>
     ); 
  }

  render(){
     const {isLoading} = this.state;
      return isLoading ? <Loader className="loader" type="Circles" color="00BFFF" height={100} width={100}/> : this.HomePage();
      
  }
}


export default App