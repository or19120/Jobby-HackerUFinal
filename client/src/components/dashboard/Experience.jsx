import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteExperienceOrEducation } from "../../actions/profile";
const Experience = (props) => {
  const { experience } = props;
  const dispatch = useDispatch();
  return (
    <section className="conatiner">
      <h2 className="my-2">My Experience</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Company</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {experience.map((exp) => (
            <tr key={exp._id}>
              <td>{exp.company}</td>
              <td className="hide-sm">{exp.title}</td>
              <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
                {exp.to ? (
                  <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                ) : (
                  "current"
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    dispatch(deleteExperienceOrEducation(exp._id, "experience"))
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Experience;
