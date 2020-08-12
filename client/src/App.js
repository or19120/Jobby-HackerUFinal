import React, { useEffect } from "react";
import "./App.css";
import Main from "./components/layout/Main";
import Navbar from "./components/layout/Navbar";
//routing:
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
//redux provider to use the store:
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
import { setAuthToken } from "./utills/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import CreateProfile from "./components/profile/CreateProfile";
import EditProfile from "./components/profile/EditProfile";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import Profiles from "./components/allProfiles/Profiles";
import Profile from "./components/singleProfile/Profile";
import Posts from "./components/allPosts/Posts";
import Post from "./components/singlePost/Post";

//we want to see if a user is logged in every time the App component renders
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  //useEffect == componentDidMount
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <Navbar />
          {/* Navbar is permananet, for that reason it is outside of the Switch */}
          <Route path="/" exact component={Main} />
          {/* <section className="container"> */}
          <Alert />
          {/* </section> */}
          <Switch>
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/create-profile" component={CreateProfile} />
            <ProtectedRoute path="/edit-profile" component={EditProfile} />
            <ProtectedRoute path="/add-experience" component={AddExperience} />
            <ProtectedRoute path="/add-education" component={AddEducation} />
            <ProtectedRoute path="/posts" component={Posts} />
            <ProtectedRoute path="/post/:id" component={Post} />
            <Route path="/profiles" component={Profiles} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
