import React from "react";
import SuccessIcon from "../images/success.svg";
import ErrorIcon from "../images/error.svg";
import WarningIcon from "../images/warning.svg";
import InformationIcon from "../images/information.svg";
import { SUCCESS, ERROR, WARNING } from "../../settings";
class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  onDismiss = () => {
    this.props.closeModal();
  };
  render() {
    // console.log(this.props);
    let alertIcon;
    //console.log(this.props);
    //console.log(this.state);
    switch (this.props.type) {
      case SUCCESS:
        alertIcon = SuccessIcon;
        break;
      case ERROR:
        alertIcon = ErrorIcon;
        break;
      case WARNING:
        alertIcon = WarningIcon;
        break;
      default:
        alertIcon = InformationIcon;
    }

    return (
      <div className="backdrop">
        <div className="modal-window">
          <img
            src={alertIcon}
            alt="IRON Rat Customs Powder Coating Icon"
            styel={{ width: "8%" }}
          />

          <p style={{ paddingTop: "10px" }}>{this.props.content}</p>

          <div className="modal-footer">
            <button className="btn btn-info" onClick={this.onDismiss}>
              <h6>Ok, I got it</h6>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
