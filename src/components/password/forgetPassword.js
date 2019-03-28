import React, { Component } from "react";
import PhoneInput from "react-phone-number-input/basic-input";
import axios from "axios";
import { ROOT } from "../../actions/types";
import { SUCCESS, ERROR } from "../../../settings";
import {
  Modal,
  TextFieldGroup,
  forgetPasswordValidataion,
  resetPasswordValidataion
} from "../../common";

class ForgetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: "",
      showModal: false,
      showTokenInput: false,
      showResetPassword: false,
      modalType: "",
      modalContent: "",
      errors: "",
      token: "",
      inputToken: "",
      newPassword: "",
      repeatPassword: ""
    };
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  validatePhone = () => {
    const { errors, isValid } = forgetPasswordValidataion(this.state);

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };
  validatePassword = () => {
    const { errors, isValid } = resetPasswordValidataion(this.state);

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
  onSubmmit = e => {
    e.preventDefault();
    if (this.validatePhone()) {
      axios
        .post(`${ROOT}forgotPassword`, { smsNumber: this.state.phone })
        .then(result => {
          //console.log(result);
          if (result.data.code) {
            this.setState({
              showModal: true,
              modalType: ERROR,
              modalContent: result.data.message,
              errors: "",
              showTokenInput: false,
              token: ""
            });
          } else {
            this.setState({
              errors: "",
              showTokenInput: true,
              token: result.data.token
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            showModal: true,
            modalType: ERROR,
            modalContent: "Failed to submit because of network or server error",
            errors: "",
            showTokenInput: false,
            token: ""
          });
        });
    }
  };
  submitToken = e => {
    e.preventDefault();
    if (this.state.token !== this.state.inputToken) {
      this.setState({
        showModal: true,
        modalType: ERROR,
        modalContent:
          "The verification code you input does not match that one you received"
      });
    } else {
      this.setState({
        showTokenInput: false,
        showResetPassword: true
      });
    }
  };
  submitPassword = e => {
    e.preventDefault();
    if (this.validatePassword()) {
      const body = {
        token: this.state.token,
        password: this.state.newPassword
      };
      axios
        .post(`${ROOT}resetPassword`, body)
        .then(result => {
          if (!result.data.code) {
            this.props.finishForgetPassword();
          } else {
            this.setState({
              showModal: true,
              modalType: ERROR,
              modalContent: result.data.message
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({
            showModal: true,
            modalType: ERROR,
            modalContent:
              "Failed to reset password because of network or server error"
          });
        });
    }
  };
  render() {
    //console.log(this.state);
    const { errors, newPassword, repeatPassword } = this.state;
    const modal = this.state.showModal ? (
      <Modal
        type={this.state.modalType}
        content={this.state.modalContent}
        closeModal={this.closeModal}
      />
    ) : null;
    let info;
    if (!this.state.showTokenInput && !this.state.showResetPassword) {
      info = (
        <form className="form-group mb-5">
          <p style={{ textAlign: "left", paddingBottom: "10px" }}>
            If you forgot your password, please enter the 10-digit phone number
            to reset your password
          </p>
          <label>Phone Number</label> &nbsp;&nbsp;
          <PhoneInput
            country="CA"
            placeholder="10-digit phone number"
            value={this.state.phone}
            onChange={phone => this.setState({ phone })}
          />
          {this.state.errors.phone && (
            <span className="help-block" style={{ color: "red" }}>
              {this.state.errors.phone}
            </span>
          )}
          <br />
          <br />
          <p>
            <button className="btn btn-success" onClick={this.onSubmmit}>
              <h6>Submit</h6>
            </button>
          </p>
        </form>
      );
    } else if (this.state.showTokenInput) {
      info = (
        <form className="form-group mb-5">
          <p style={{ textAlign: "left", paddingBottom: "10px" }}>
            A SMS was sent to your phone. Please check your phone and enter the
            code
          </p>
          <p>
            <label className="text-info">Reset Password Code</label>
          </p>
          <input
            type="text"
            name="inputToken"
            value={this.state.inputToken}
            onChange={this.onChange}
          />
          <br />
          <br />
          <p>
            <button className="btn btn-success" onClick={this.submitToken}>
              <h6>Submit</h6>
            </button>
          </p>
        </form>
      );
    } else if (this.state.showResetPassword) {
      info = (
        <form>
          <h6>Reset Password</h6>
          <br />
          <TextFieldGroup
            field="newPassword"
            label="New Password"
            value={newPassword}
            error={errors.newPassword}
            type="password"
            placeholder="Enter new password"
            onChange={this.onChange}
          />
          <TextFieldGroup
            field="repeatPassword"
            label="Repeat Password"
            value={repeatPassword}
            error={errors.repeatPassword}
            type="password"
            placeholder="Enter repeat password"
            onChange={this.onChange}
          />
          <p>
            <button className="btn btn-success" onClick={this.submitPassword}>
              <h6>Submit</h6>
            </button>
          </p>
        </form>
      );
    }
    return (
      <div className="card card-body text-center text-dark">
        {info}
        {modal}
      </div>
    );
  }
}
export default ForgetPassword;
