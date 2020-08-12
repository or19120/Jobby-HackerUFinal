import axios from "axios";
//this function makes sure that token is sent with every request to the server.
export const setAuthToken = (token) => {
  if (token) axios.defaults.headers.common["x-auth-token"] = token;
  else delete axios.defaults.headers.common["x-auth-token"];
};
