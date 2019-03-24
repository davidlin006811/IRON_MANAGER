import React, { Component } from "react";
import PropTypes from "prop-types";
import { TextFieldGroup, loginValidation } from "../../common";
import { connect } from "react-redux";
import { login } from "../../actions/auth";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      isLoading: false
    };
  }

  passValid = () => {
    const { errors, isValid } = loginValidation(this.state);
    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();
    const isValid = this.passValid();
    //console.log("isValid: ", isValid);
    if (isValid) {
      this.setState({ errors: {}, isLoading: true });
      this.props.login(this.state).then(
        res => {
          if (this.props.isAuthenticated) {
            this.context.router.history.push("/home");
          } else {
            this.setState({
              errors: { login: "incorrect username or password" },
              isLoading: false
            });
          }
        },
        err =>
          this.setState({
            errors: err,
            isLoading: false
          })
      );
    }
  };

  onChange = e => {
    this.passValid();
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, errors, isLoading } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        {errors.login && (
          <div className="alert alert-danger">{errors.login}</div>
        )}

        <TextFieldGroup
          field="email"
          label="Username"
          value={email}
          error={errors.email}
          onChange={e => {
            this.onChange(e);
          }}
        />
        <br />
        <TextFieldGroup
          field="password"
          label="Password"
          value={password}
          error={errors.password}
          onChange={e => {
            this.onChange(e);
          }}
          type="password"
        />
        <br />
        <div className="form-group">
          <button className="btn btn-primary" disabled={isLoading}>
            <h6>Log in</h6>
          </button>
        </div>
      </form>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
}
LoginForm.propTypes = {
  login: PropTypes.func.isRequired
};

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { login }
)(LoginForm);
