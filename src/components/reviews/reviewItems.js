import React, { Component } from "react";
import axios from "axios";
import * as moment from "moment";
import { ROOT } from "../../actions/types";
class ReviewItem extends Component {
  constructor(props) {
    super(props);
    this.url = `${ROOT}review/${this.props.review._id}`;
  }
  handleDelete = () => {
    axios.delete(this.url);
  };
  render() {
    const { _id, name, rating, comment, date } = this.props.review;
    const momentDate = moment(date);
    const reviewDate = momentDate.utc().format("MMMM Do YYYY");
    const positiveQty = rating > 5 ? 5 : parseInt(rating);
    let positiveStars = [],
      negativeStars = [];
    for (let i = 0; i < positiveQty; i++) {
      positiveStars.push(i);
    }
    for (let i = 0; i < 5 - positiveQty; i++) {
      negativeStars.push(i);
    }
    const positiveComponent = positiveStars.map(item => {
      const key = `positiveStar${item}`;
      return <i className="fas fa-star positive" key={key} />;
    });
    const negativeComponent = negativeStars.map(item => {
      const key = `negativeStar${item}`;
      return <i className="far fa-star negative" key={key} />;
    });
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
        <div>
          {positiveComponent}
          {negativeComponent}
        </div>
        <p className="message-date">{reviewDate}</p>
        <p>{comment}</p>
      </div>
    );
  }
}

export default ReviewItem;
