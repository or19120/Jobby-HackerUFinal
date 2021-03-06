import React from "react";
import Moment from "react-moment";
import { useDispatch } from "react-redux";
import { deleteExperienceOrEducation } from "../../actions/profile";
const Education = (props) => {
  const { education } = props;
  const dispatch = useDispatch();
  return (
    <section className="conatiner">
      <h2 className="my-2">My Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degre</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {education.map((edu) => (
            <tr key={edu._id}>
              <td>{edu.school}</td>
              <td className="hide-sm">{edu.degree}</td>
              <td className="hide-sm">
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
                {edu.to ? (
                  <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                ) : (
                  "current"
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() =>
                    dispatch(deleteExperienceOrEducation(edu._id, "education"))
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

export default Education;
