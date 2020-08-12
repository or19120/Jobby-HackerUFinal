import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
const Register = ({ setAlert, register }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  //collecting the isAuthenticated value from state.auth. if user is logged in we redirect him
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  //changing the state every time input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkInput()) {
      register(name, email, password);
    }
  };
  const checkInput = () => {
    //function to validate form data. avoids sending requests to the server if data isn't correct
    let flag = true;
    if (password.length < 6) {
      flag = false;
      setAlert("Password must have at least 6 characters", "danger");
    }
    if (password !== password2) {
      flag = false;
      setAlert("Passwords do not match", "danger");
    }
    const regex = RegExp("[^@]+@[^.]+..+");
    if (!regex.test(email)) {
      flag = false;
      setAlert("Email is not valid!", "danger");
    }
    if (name.length < 2) {
      flag = false;
      setAlert("Name must be at least 2 characters long", "danger");
    }
    return flag;
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={(e) => handleChange(e)}
            value={name}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
  );
};
//validation with proptypes
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};
//using connect to import the actions of redux
export default connect(null, { setAlert, register })(Register);
