import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../actions/alert";
const Login = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();

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
      dispatch(login(email, password));
    }
  };
  const checkInput = () => {
    //function to validate form data. avoids sending requests to the server if data isn't correct
    let flag = true;
    if (password.length < 6) {
      flag = false;
      setAlert("Password must have at least 6 characters", "danger");
    }
    const regex = RegExp("[^@]+@[^.]+..+");
    if (!regex.test(email)) {
      flag = false;
      setAlert("Email is not valid!", "danger");
    }
    return flag;
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign In To Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Dont have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
