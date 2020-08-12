import React from "react";
import { Link } from "react-router-dom";
const ProfileItem = (props) => {
  const {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  } = props.profile;
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="User avatar" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          Go To Profile
        </Link>
      </div>
      <ul>
        <h2>Skills</h2>
        {skills.slice(0, 4).map((skill, i) => (
          <li className="text-primary" key={i}>
            <i className="fas fa-check"></i>
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileItem;
