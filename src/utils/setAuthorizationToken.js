import axios from "axios";

export default function setAuthorizationToken(token) {
  // console.log("token: ", token);
  if (token) {
    axios.defaults.headers.common["x-access-token"] = `${token}`;
  } else {
    delete axios.defaults.headers.common["x-access-token"];
  }
}
