import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const Home = () =>(
   <Fragment>
        <Helmet><title>Nimelssa Quiz-Home</title></Helmet>
         <div id="home">
              <section id="hero">
                  <div className="hero-container" data-aos="fade-up" data-aos-delay="150">
            
                    <div className="d-flex">
                    
                        <div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" id="container">
                    
                            <div role="main" className="inner cover" id="text">
                                <h1 className="cover-heading">Welcome To <span>NIMELSSA</span> Quiz</h1>
                                   <p className="lead">Test of Speed,Intelligience and Accuracy</p>
                                 
                                    <div className="card-footer text-muted" id="bottomDesign">
                                        <div className="play-button-container">
                                            <button className="button"  id="begin"><span><Link to="/quizInstructions">Play</Link></span></button>
                                    </div>

                                         <button className="button"  id="begin"><span><Link to="/register">Register</Link></span></button>
                                        <button className="button"  id="begin"><span><Link to="/login">Login</Link></span></button>
                                    </div> 
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
           </div> 
    </Fragment> 
)

export default Home;