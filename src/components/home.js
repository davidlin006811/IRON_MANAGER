import React, { Component } from "react";
import { connect } from "react-redux";
import Products from "./products";
import Messages from "./messages";
import Reviews from "./reviews";
import NavBar from "./navbar";
import Footer from "./footer";
import { socket } from "../../settings";
class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const jwtToken = localStorage.getItem("jwtToken");
    // if (jwtToken !== null) {
    socket.emit("admin init", jwtToken, result => {
      console.log(result);
    });
    //  }
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
          <a
            className="btn btn-primary btn-lg btn-block"
            data-toggle="collapse"
            href="#messages"
            role="button"
            aria-expanded="false"
            aria-controls="messages"
          >
            <h2>Inquiries</h2>
          </a>
          <Messages />
          <br />
          <a
            className="btn btn-primary btn-lg btn-block"
            data-toggle="collapse"
            href="#reviews"
            role="button"
            aria-expanded="false"
            aria-controls="reviews"
          >
            <h2>Reviews</h2>
          </a>
          <Reviews />
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

export default connect(mapStateToProps)(Home);
