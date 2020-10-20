import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Card,
  /* CardText, */ CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

const Home = () => (
  <Fragment>
    <Helmet>
      <title>Nimelssa Quiz-Home</title>
    </Helmet>
    <div className="Home">
      <Card>
        {/* <img src="/download.png" alt="IMG" /> */}
        <CardBody>
          <CardTitle className="name-design">
            <h1 id="text1" className="cover-heading">
              Welcome To <span>NIMELSSA</span> Quiz
            </h1>
          </CardTitle>
          <br />
          <CardSubtitle>
            <Fragment>
              <h2 id="text2">Test of Speed,Intelligience and Accuracy</h2>
            </Fragment>
          </CardSubtitle>
        </CardBody>

        <CardBody>
          <Button block={true} className="mt-3">
            <span>
              <Link to="/quizInstructions" id="link1">
                Play
              </Link>
            </span>
          </Button>
          <Button block={true} className="mt-3">
            <span>
              <Link to="/redirect" id="link2">
                Register
              </Link>
            </span>
          </Button>
          <Button block={true} className="mt-3">
            <span>
              <Link to="/redirect" id="link3">
                Login
              </Link>
            </span>
          </Button>
        </CardBody>
      </Card>
    </div>
  </Fragment>
);

export default Home;
