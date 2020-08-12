import React from "react";
import Moment from "react-moment";
const ProfileExperience = (props) => {
  console.log("in");
  const {
    company,
    title,
    location,
    current,
    from,
    to,
    description,
  } = props.experience;
  console.log(props);
  return (
    <React.Fragment>
      <h3 className="text-dark">{company}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {to ? <Moment format="DD/MM/YYYY">{to}</Moment> : "Current"}
      </p>
      <p>
        <b>Position:</b> {title}
      </p>
      {description && (
        <p>
          <b>Description:</b> {description}
        </p>
      )}
    </React.Fragment>
  );
};

export default ProfileExperience;
