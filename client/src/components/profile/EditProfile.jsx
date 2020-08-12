import React, { useState, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import { createProfile, getUserProfile } from "../../actions/profile";
import { useDispatch, useSelector } from "react-redux";
const EditProfile = (props) => {
  const { loading, info } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [socialMedia, setSocialMedia] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });
  useEffect(() => {
    //getting the logged in user and filling the form with his data.
    dispatch(getUserProfile());
    setFormData({
      company: loading || !info.company ? "" : info.company,
      website: loading || !info.website ? "" : info.website,
      location: loading || !info.location ? "" : info.location,
      status: loading || !info.status ? "" : info.status,
      skills: loading || !info.skills ? "" : info.skills,
      githubusername:
        loading || !info.githubusername ? "" : info.githubusername,
      bio: loading || !info.bio ? "" : info.bio,
      twitter: loading || !info.social ? "" : info.social.twitter,
      facebook: loading || !info.social ? "" : info.social.facebook,
      linkedin: loading || !info.social ? "" : info.social.linkedin,
      youtube: loading || !info.social ? "" : info.social.youtube,
      instagram: loading || !info.social ? "" : info.social.instagram,
    });
  }, [loading]);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProfile(formData, props.history, true));
  };

  return (
    <section className="container">
      <h1 className="large text-primary">Edit Your Profile</h1>

      <small>* = required field</small>
      <form onSubmit={(e) => handleSubmit(e)} className="form">
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Waiter">Waiter</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Tel Aviv, Israel)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (HTML,React,JavaScript)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            If you are from the high-tech industry, include your github username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => setSocialMedia(!socialMedia)}
            type="button"
            className="btn btn-dark"
          >
            {socialMedia ? "Close" : "Add Social Network Links"}
          </button>
          <span>Optional</span>
        </div>
        {socialMedia && (
          <React.Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </React.Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Create" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};
//withRouter allows us to access the "history" from props and pass it as an argument
export default withRouter(EditProfile);
