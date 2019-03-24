import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchReview } from "../../actions/reviews";
import PropTypes from "prop-types";
import { Loading } from "../../common";
import ReviewItem from "./reviewItems";
class Review extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchReview();
  }
  render() {
    const {
      reviews: { isFetching, reviewItems }
    } = this.props;
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="collapse" id="reviews">
        {reviewItems.map(item => (
          <ReviewItem review={item} key={item._id} />
        ))}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    reviews: state.reviews
  };
}
Review.propTypes = {
  fetchReview: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { fetchReview }
)(Review);
