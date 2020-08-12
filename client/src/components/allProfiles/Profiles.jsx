import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { getAllProfiles } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
import ProfileItem from "./ProfileItem";
//this component will handle how the Users page will look like. it will render all the active profiles.
const Profiles = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProfiles());
  }, [getAllProfiles]);
  const { allProfiles, loading } = useSelector((state) => state.profile);
  return (
    <section className="container">
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          <h1 className="text-primary large">Users</h1>
          <p>Here you can browse and connect with other users!</p>
          <div className="profiles">
            {allProfiles.length > 0 ? (
              allProfiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <p>there are no profiles yet...</p>
            )}
          </div>
        </React.Fragment>
      )}
    </section>
  );
};

export default Profiles;
