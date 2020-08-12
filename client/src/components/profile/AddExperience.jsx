import React, { useState } from "react";
import { addExperienceOrEducation } from "../../actions/profile";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
const AddExperience = ({ history }) => {
  const dispatch = useDispatch();
  const [toDate, setToDate] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });
  const { company, title, location, from, to, current, description } = formData;
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addExperienceOrEducation(formData, history, "experience"));
  };
  return (
    <section className="container">
      {" "}
      <h1 className="large text-primary">Add Work Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any work experience or
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form-group lg-w-50">
          <h4>*From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current, to: "" });
                setToDate(!toDate);
              }}
            />{" "}
            Current Job
          </p>
        </div>
        <div className="form-group lg-w-50">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => {
              setFormData({ ...formData, current: false, to: e.target.value });
            }}
            disabled={toDate}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            value={description}
            onChange={(e) => handleChange(e)}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" value="Add" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddExperience;
