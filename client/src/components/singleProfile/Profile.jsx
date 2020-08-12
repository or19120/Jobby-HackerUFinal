import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getProfById } from "../../actions/profile";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import About from "./ProfileAbout";
import Experience from "../dashboard/Experience";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import GithubRepo from "./GithubRepo";
//this component handles how each profile looks like
const Profile = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfById(props.match.params.id));
  }, [getProfById]);
  const auth = useSelector((state) => state.auth);
  const { info, loading } = useSelector((state) => state.profile);
  return (
    <section className="container">
      {info === null || loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <Link to="/profiles" className="btn btn-primary">
            Back to profiles
          </Link>
          {/* If the user owns the profile, he will see a link to edit it */}
          {auth.isAuthenticated &&
            !auth.loading &&
            auth.user._id === info.user._id && (
              <Link to="/edit-profile" className="btn">
                Edit
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileHeader profile={info} />
            <About profile={info} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience:</h2>
              {info.experience.length > 0 ? (
                info.experience.map((exp) => (
                  <ProfileExperience key={exp._id} experience={exp} />
                ))
              ) : (
                <h4>No Data...</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education:</h2>
              {info.education.length > 0 ? (
                info.education.map((edu) => (
                  <ProfileEducation key={edu._id} education={edu} />
                ))
              ) : (
                <h4>No Data...</h4>
              )}
            </div>
            {info.githubusername && <GithubRepo name={info.githubusername} />}
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default Profile;
