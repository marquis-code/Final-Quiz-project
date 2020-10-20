import React, {useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import { AuthContext } from "../Context/AuthContext";
import { Button } from "reactstrap";

const Navbar = (props) => {
  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  console.log(user);

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
        <Link to="/">
          <li className="nav-item nav-link">
            <Button block={false} className="mt-0">
              Home
            </Button>
          </li>
        </Link>
        <Link to="/redirect">
          <li className="nav-item nav-link">
            <Button block={false} className="mt-0">
              Login
            </Button>
          </li>
        </Link>
        <Link to="/redirect">
          <li className="nav-item nav-link">
            <Button block={false} className="mt-0">
              Register
            </Button>
          </li>
        </Link>
      </>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">
            <Button block={false} className="mt-0">
              Home
            </Button>
          </li>
        </Link>

      {user.role === "admin" ? (
          <>
              <Link to="/landingPage">
              <li className="nav-item nav-link">
                <Button block={false} className="mt-0">
                  Admin
                </Button>
              </li>
            </Link>
            
            <Button
            type="button"
            block={false}
            className="mt-4"
            onClick={onClickAdminLogoutHandler}
          >
            {" "}
            Admin Logout{" "}
          </Button>
        </>
          ) : (
            <>
          <Button
            type="button"
            block={false}
            className="mt-4"
            onClick={onClickLogoutHandler}
          >
            {" "}
            Logout{" "}
          </Button>
            </>
          ) }
     </>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/">
        <div className="navbar-brand">Nimelssa-Quiz</div>
      </Link>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
