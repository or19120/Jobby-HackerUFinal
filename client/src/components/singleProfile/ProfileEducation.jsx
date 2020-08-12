import React from "react";
import Moment from "react-moment";
const ProfileEducation = (props) => {
  console.log("in");
  const {
    school,
    degree,
    fieldofstudy,
    current,
    from,
    to,
    description,
  } = props.education;
  console.log(props);
  return (
    <React.Fragment>
      <h3 className="text-dark">{school}</h3>
      <p>
        <Moment format="DD/MM/YYYY">{from}</Moment> -{" "}
        {to ? <Moment format="DD/MM/YYYY">{to}</Moment> : "Current"}
      </p>
      <p>
        <b>degree:</b> {degree}
      </p>
      <p>
        <b>Field Of Study:</b> {fieldofstudy}
      </p>
      {description && (
        <p>
          <b>Description:</b> {description}
        </p>
      )}
    </React.Fragment>
  );
};

export default ProfileEducation;
