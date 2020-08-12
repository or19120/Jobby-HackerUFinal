import React from "react";
//this compnent will show to About of the user in th browser
const About = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className="profile-about bg-light p-2">
      {bio && (
        <React.Fragment>
          <h2 className="text-primary">{name.split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>

          <div className="line"></div>
        </React.Fragment>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, i) => (
          <div className="p-1" key={i}>
            <i className="fa fa-check"></i> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
