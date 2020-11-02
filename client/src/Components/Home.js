import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import {emojify} from 'react-emojione';

const Home = () => {
   return(
    <Fragment>
    <Helmet>
   <title>Nimelssa Quiz-Home</title>
 </Helmet>
    <Card>
     <CardBody>
       <CardTitle className="name-design">
         <h1 id="text1" className="cover-heading">
           Welcome to <span> NIMELSSA </span> Online Quiz
           {emojify('\u2728', {output: 'unicode'})}
         </h1>
       </CardTitle>
       <br />
       <CardSubtitle>
         <Fragment> 
         <h2 id="text3">Play, Explore and Learn</h2>
         </Fragment>
       </CardSubtitle>
     </CardBody>

     <CardBody>
       <Button block={true} className="mt-3" >
         <span>
           <Link to="/quizInstructions" id="link1" style={{textDecoration:"none", listStyleType:"none"}}>
             Play&nbsp;<i class="fas fa-paper-plane"></i>
             <span className="sr-only">(current)</span>
           </Link>
         </span>
       </Button>
       <Button block={true} className="mt-3">
         <span>
           <Link to="/redirect" id="link2" style={{textDecoration:"none", listStyleType:"none"}}>
             Register&nbsp;<i class="fas fa-user-plus"></i>
             <span className="sr-only">(current)</span>
           </Link>
         </span>
       </Button>
      <Button block={true} className="mt-3" >
         <span>
           <Link to="/redirect" id="link3" style={{textDecoration:"none", listStyleType:"none"}}>
             Login&nbsp;<i class="fas fa-sign-in-alt"></i>
             <span className="sr-only">(current)</span>
           </Link>
         </span>
       </Button>
     </CardBody>
   </Card>
 </Fragment>
   )
}

export default Home;
