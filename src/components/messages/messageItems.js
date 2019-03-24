import React, { Component } from "react";
import axios from "axios";
import * as moment from "moment";
import { ROOT } from "../../actions/types";
class MessageItem extends Component {
  constructor(props) {
    super(props);
    this.url = `${ROOT}message/${this.props.message._id}`;
  }
  handleDelete = () => {
    axios.delete(this.url);
  };
  render() {
    const { _id, name, email, content, date } = this.props.message;
    const momentDate = moment(date);
    const messageDate = momentDate.utc().format("MMMM Do YYYY");

    return (
      <div className="card card-body text-dark">
        <p>
          <i className="fas fa-user-tie" />
          &nbsp;&nbsp;{name}
          <button
            className="btn  btn-link float-right"
            style={{ fontSize: "16px", color: "#317cf6" }}
            onClick={this.handleDelete}
          >
            <h6>
              <i className="far fa-trash-alt" />
            </h6>
          </button>
        </p>
        <p className="email">{email}</p>
        <p className="message-date">{messageDate}</p>
        <p>{content}</p>
      </div>
    );
  }
}

export default MessageItem;
