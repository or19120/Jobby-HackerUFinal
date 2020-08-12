import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
const Navbar = () => {
  //checking if the user is logged in with our state.
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const loggedLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          <i className="fas fa-user"></i>
          <span className="hide-sm"> Users</span>
        </Link>
      </li>
      <li>
        <Link to="/posts">
          <i className="far fa-file"></i>
          <span className="hide-sm"> Posts</span>
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-pen"></i>
          <span className="hide-sm"> Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={() => dispatch(logout())} href="#!">
          <i className="fab fa-angellist"></i>
          {/* This classname hides the text is small screens */}
          <span className="hide-sm"> Logout</span>
        </a>
      </li>
    </ul>
  );
  const guest = (
    <ul>
      <li>
        <Link to="/profiles">Users</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fab fa-accusoft"></i> Jobby
        </Link>
      </h1>
      {!loading && (
        <React.Fragment>{isAuthenticated ? loggedLinks : guest}</React.Fragment>
      )}
    </nav>
  );
};

export default Navbar;
