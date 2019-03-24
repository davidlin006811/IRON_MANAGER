import React, { Component } from "react";
import axios from "axios";
import { ROOT } from "../../actions/types";
import WarningIcon from "../../images/warning.svg";
class ProductDelete extends Component {
  constructor(props) {
    super(props);
    this.url = `${ROOT}product/${this.props.product._id}`;
  }
  onDismiss = () => {
    this.props.deleteFinish();
  };
  handleDelete = () => {
    axios
      .delete(this.url)
      .then(result => {
        this.onDismiss();
      })
      .catch(err => {
        console.log(err);
        this.onDismiss();
      });
  };

  render() {
    return (
      <div className="backdrop">
        <div className="modal-window">
          <img src={WarningIcon} alt="delete Icon" styel={{ width: "10%" }} />
          <p>Are you sure to delete the product - {this.props.product.name}</p>

          <div className="modal-footer">
            <button className="btn btn-success" onClick={this.onDismiss}>
              <h6 style={{ padding: "0 10px" }}>
                No <i className="far fa-times-circle" />
              </h6>
            </button>
            <button className="btn btn-danger" onClick={this.handleDelete}>
              <h6 style={{ padding: "0 10px" }}>
                Yes <i className="far fa-check-circle" />
              </h6>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDelete;
