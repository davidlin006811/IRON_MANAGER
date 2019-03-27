import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Modal, TextFieldGroup, changePasswordValidataion } from "../common";
import { SUCCESS, ERROR } from "../../settings";
import { ROOT } from "../actions/types";
class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassword: "",
      newPassword: "",
      repeatPassword: "",
      showModal: false,
      modalType: "",
      modalContent: "",
      errors: {}
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  vaildatePassword = () => {
    const { errors, isValid } = changePasswordValidataion(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: "",
      modalType: ""
    });
  };
  onSubmit = e => {
    e.preventDefault();
    if (this.vaildatePassword()) {
      const { isAuthenticated, user } = this.props.auth;
      if (isAuthenticated) {
        const body = {
          email: user.email,
          oldPassword: this.state.oldPassword,
          newPassword: this.state.newPassword
        };
        axios
          .post(`${ROOT}changePassword`, body)
          .then(result => {
            const oldPassword = result.data.code ? this.state.oldPassword : "";
            const newPassword = result.data.code ? this.state.newPassword : "";
            const repeatPassword = result.data.code
              ? this.state.repeatPassword
              : "";
            const messageType = result.data.code ? ERROR : SUCCESS;
            const messageContent = result.data.code
              ? "The old password does not match"
              : "Password change was done";
            this.setState({
              oldPassword: oldPassword,
              newPassword: newPassword,
              repeatPassword: repeatPassword,
              showModal: true,
              modalType: messageType,
              modalContent: messageContent,
              errors: {}
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({
              oldPassword: "",
              newPassword: "",
              repeatPassword: "",
              showModal: true,
              modalType: ERROR,
              modalContent:
                "Failed to change password because of network or server error",
              errors: {}
            });
          });
      }
    }
  };
  render() {
    const {
      oldPassword,
      newPassword,
      repeatPassword,
      showModal,
      modalType,
      modalContent,
      errors
    } = this.state;

    let modal = showModal ? (
      <Modal
        type={modalType}
        content={modalContent}
        closeModal={this.closeModal}
      />
    ) : null;
    return (
      <div className="collapse" id="changePassword">
        <div className="card card-body text-dark">
          <h5 className="text-center">Reset Password</h5>
          <form>
            <TextFieldGroup
              field="oldPassword"
              label="Old Password"
              value={oldPassword}
              error={errors.oldPassword}
              type="password"
              onChange={e => {
                this.onChange(e);
              }}
            />
            <TextFieldGroup
              field="newPassword"
              label="New Password"
              value={newPassword}
              error={errors.newPassword}
              type="password"
              onChange={e => {
                this.onChange(e);
              }}
            />

            <TextFieldGroup
              field="repeatPassword"
              label="Repeat Password"
              value={repeatPassword}
              error={errors.repeatPassword}
              type="password"
              onChange={e => {
                this.onChange(e);
              }}
            />
            <button className="btn btn-success" onClick={this.onSubmit}>
              <h6>Change Password</h6>
            </button>
          </form>
        </div>
        {modal}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}
export default connect(mapStateToProps)(ChangePassword);
