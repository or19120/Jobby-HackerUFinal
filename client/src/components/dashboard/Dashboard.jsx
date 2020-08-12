import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, deleteAccount } from "../../actions/profile";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import Actions from "./Actions";
import Experience from "./Experience";
import Education from "./Education";
const Dashboard = () => {
  const { info, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  //getting the user's profile
  useEffect(() => {
    dispatch(getUserProfile());
  }, []);
  return (
    <section className="container">
      {loading && info === null ? (
        <Loader />
      ) : (
        <React.Fragment>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Welcome to your dashboard{" "}
            {user && user.name}!
          </p>
          {info !== null ? (
            <React.Fragment>
              <Actions />
              {info.experience.length > 0 && (
                <Experience experience={info.experience} />
              )}
              {info.experience.length > 0 && (
                <Education education={info.education} />
              )}
              <div className="my-2">
                <button
                  onClick={() => dispatch(deleteAccount())}
                  className="btn btn-danger"
                >
                  <i className="fas fa-trash"></i> Delete Account
                </button>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className="lead">
                <i>You don't have a profile yet...</i>
              </p>
              <Link to="/create-profile" className="btn btn-success">
                Create Profile Now!
              </Link>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </section>
  );
};

export default Dashboard;
