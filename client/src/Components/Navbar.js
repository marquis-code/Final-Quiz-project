import React, {useContext } from "react";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  
  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const onClickAdminLogoutHandler = () => {
    AuthService.adminLogout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };


  const unauthenticatedNavBar = () => {
    return (
      <>
          <li className="nav-item">
           <Link className="nav-link text-white text-uppercase ml-5" to="/">
             Home&nbsp;<i className="fas fa-home"></i>
             <span className="sr-only">(current)</span>
            </Link>
          </li>
       
          <li className="nav-item " >
              <Link className="nav-link text-white text-uppercase ml-5" to="/redirect">
                Signup&nbsp;<i className="fas fa-user-plus"></i>
             <span className="sr-only">(current)</span>
              </Link>
          </li>
       
       
          <li className="nav-item" >
            <Link className="nav-link text-white text-uppercase ml-5" to="/redirect">
              Login&nbsp;<i className="fas fa-sign-in-alt"></i>
             <span className="sr-only">(current)</span>
            </Link>
          </li>
        
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
          <li className="nav-item">
             <a className="nav-link text-white text-uppercase ml-5" href="/">
               Home&nbsp;<i className="fas fa-home"></i>
               <span className="sr-only">(current)</span>
               </a>
          </li>
     

      {user.role === "admin" ? (
          <>
              <li className="nav-item" >
                <Link className="nav-link text-white text-uppercase ml-5" to="/landingPage">
                  Admin&nbsp;<i className="fas fa-user-shield"></i>
             <span className="sr-only">(current)</span>
                </Link>
              </li>
          
            <li onClick={onClickAdminLogoutHandler}>
              <Link className="nav-link text-white text-uppercase ml-5">
                Admin Logout&nbsp;<i className="fas fa-sign-out-alt"></i>
             <span className="sr-only">(current)</span>
              </Link>
            </li>
        </>
          ) : (
            <>
             <li onClick={onClickLogoutHandler}>
             <Link className="nav-link text-white text-uppercase ml-5">
               Logout&nbsp;<i className="fas fa-sign-out-alt"></i>
             <span className="sr-only">(current)</span>
               </Link>
              </li>
            </>
          ) }
     </>
    );
  }; 

  return (
<nav className="toolbar-navigation navbar navbar-expand-lg navbar-dark bg-dark">

<div className="navbar-brand ml-5"><a href="/"><img style={{height: "50px", width:"10vw"}} src='./nimelssaLogo.png' alt="logo"/></a></div>

 <button 
 style={{left:"60%", position:"relative"}}
  className="navbar-toggler" 
  type="button" 
  data-toggle="collapse" 
  data-target="#navbarSupportedContent" 
  aria-controls="navbarSupportedContent" 
  aria-expanded="false" 
  aria-label="Toggle navigation"
  >
  <span className="navbar-toggler-icon"></span>
</button> 
     
       <div className="spacer"/>

      <div className="toolbar-navigation-items collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav m-auto">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
  </nav>
  );
};

export default Navbar;