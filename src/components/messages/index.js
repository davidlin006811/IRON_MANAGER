import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchMessage } from "../../actions/messages";
import PropTypes from "prop-types";
import { Loading } from "../../common";
import MessageItem from "./messageItems";
class Message extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    const {
      messages: { isFetching, messageItems }
    } = this.props;
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="collapse" id="messages">
        {messageItems.map(item => (
          <MessageItem message={item} key={item._id} />
        ))}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    messages: state.messages
  };
}
Message.propTypes = {
  fetchMessage: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { fetchMessage }
)(Message);
