import React from "react";
import NavBarClient from "../navBar_Client";
import Footer from "../footer";
import LoginForm from "./loginForm";

class LoginPage extends React.Component {
  render() {
    return (
      <div style={{ height: "100%" }}>
        <NavBarClient />
        <div className="container">
          <h1>Log in</h1>
          <hr />

          <LoginForm />
          <br />
          <div className="pull-right">
            <p>
              <a href="#">forgot password</a>
            </p>
          </div>
          <br />
          <br />
          <Footer />
        </div>
      </div>
    );
  }
}

export default LoginPage;
