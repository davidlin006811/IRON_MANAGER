import React from "react";
import NavBarClient from "../navBar_Client";
import Footer from "../footer";
import LoginForm from "./loginForm";
import { ForgetPassword } from "../password";
import { Modal } from "../../common";
import { SUCCESS } from "../../../settings";
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForget: false,
      showModal: false,
      modalType: "",
      modalContent: ""
    };
  }
  diplayForget = () => {
    this.setState({
      showForget: true
    });
  };
  finishForgetPassword = () => {
    this.setState({
      showForget: false,
      showModal: true,
      modalType: SUCCESS,
      modalContent:
        "Reset password successfully. Please log in with the new password"
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      modalType: "",
      modalContent: ""
    });
  };
  render() {
    //console.log(this.state);
    const modal = this.state.showModal ? (
      <Modal
        type={this.state.type}
        content={this.state.modalContent}
        closeModal={this.closeModal}
      />
    ) : null;
    const forget = this.state.showForget ? (
      <ForgetPassword finishForgetPassword={this.finishForgetPassword} />
    ) : null;
    return (
      <div style={{ height: "100%" }}>
        <NavBarClient />
        <div className="container">
          <h1>Log in</h1>
          <hr />

          <LoginForm />

          <div className="pull-right">
            <button className="btn btn-link" onClick={this.diplayForget}>
              <h6>forgot password</h6>
            </button>
          </div>

          <br />
          <br />
          {forget}
          <br />
          <br />
          <Footer />
        </div>
        {modal}
      </div>
    );
  }
}

export default LoginPage;
