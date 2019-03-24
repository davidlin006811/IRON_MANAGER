import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
//import io from "socket.io-client";
import Products from "./products/index";
import NavBar from "./navbar";
import isEmpty from "../common/isEmpty";
//import SERVER_URL from "../settings.js";
import { addNewProduct } from "../actions/products";
//const m = ({ products }) => ({ products });

/*@connect(
  m,
  { addNewProduct }
)*/
//const socket = io("http://localhost:3000");
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const jwtToken = localStorage.getItem("jwtToken");

    const that = this;

    if (jwtToken !== null) {
      socket.emit("admin init", jwtToken, result => {
        console.log(result);
      });
    }

    /* socket.on("new product", data =>
      that.props.addNewProduct(data.createdProduct)
    );*/
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
Home.propTypes = {
  addNewProduct: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { addNewProduct }
)(Home);
