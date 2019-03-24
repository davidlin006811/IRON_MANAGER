import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Products from "./products/index";
import NavBar from "./navbar";
import isEmpty from "../common/isEmpty";
import Footer from "./footer";
import { addNewProduct } from "../actions/products";
import { socket } from "../../settings";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken !== null) {
      socket.emit("admin init", jwtToken, result => {
        console.log(result);
      });
    }

   
  }
  componentWillReceiveProps(nextProps) {
    if (!nextProps.auth.isAuthenticated) {
      socket.emit("logout");
      this.props.history.push("/login");
    }
  }
  render() {
    console.log("props: ", this.props);
    return (
      <div>
        <NavBar />
        <div className="container">
          <h1>Admin</h1>

          <hr />

          <a
            className="btn btn-primary btn-lg btn-block"
            data-toggle="collapse"
            href="#products"
            role="button"
            aria-expanded="false"
            aria-controls="products"
          >
            <h2>Products</h2>
          </a>
          <Products />
		  <br />
		<br />
		<Footer />
        </div>
		
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(
  mapStateToProps
  
)(Home);
