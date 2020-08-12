import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const Main = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Welcome to Jobby!</h1>
          <p className="lead">
            Meet new people, uplaod your experience, share posts and get to know
            other professionals!
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Main;
