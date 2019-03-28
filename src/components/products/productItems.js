import React, { Component } from "react";
import ProductUpdate from "./productUpdate";
import ProductDelete from "./productDelete";
import { SERVER_URL } from "../../../settings";
class ProductsItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      editMode: false,
      deleteMode: false
    };
  }
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  toggleEdit = () => {
    this.setState({
      editMode: !this.state.editMode
    });
  };
  updateFinish = () => {
    this.setState({
      editMode: false
    });
  };
  enableDelete = () => {
    this.setState({
      deleteMode: true
    });
  };
  deleteFinish = () => {
    this.setState({
      deleteMode: false,
      editMode: false
    });
  };
  render() {
    const { _id, name, type, description, images } = this.props.item;
    let info;
    const productImages = images.map((image, index) => {
      const key = `productImage-${index}`;
      const imagePath = SERVER_URL + image;
      return (
        <div className="col-sm-12 col-md-4 col-lg-2 text-center" key={key}>
          <img
            src={imagePath}
            alt="product image"
            style={{ width: "90%", padding: "10px 0" }}
          />
        </div>
      );
    });
    if (this.state.toggle) {
      if (!this.state.editMode) {
        info = (
          <div className="collapse show">
            <div className="card-body text-dark" style={{ fontSize: "14px" }}>
              <div>
                <button
                  className="btn  btn-link float-right"
                  style={{ fontSize: "16px", color: "#317cf6" }}
                  onClick={this.enableDelete}
                >
                  <h6>
                    <i className="far fa-trash-alt" />
                  </h6>
                </button>
                <button
                  className="btn  btn-link float-right"
                  style={{ fontSize: "16px", color: "#317cf6" }}
                  onClick={this.toggleEdit}
                >
                  <h6>
                    <i className="far fa-edit" />
                  </h6>
                </button>
              </div>
              <p>
                <label>Name: &nbsp; </label>
                {name}
              </p>
              <p>
                <label>Type: &nbsp; </label>
                {type}
              </p>
              <p>
                <label>Description: &nbsp; </label>
                <span>{description}</span>
              </p>
              <div className="row" style={{ overflowX: "auto" }}>
                {productImages}
              </div>
            </div>
          </div>
        );
      } else {
        info = (
          <div className="collapse show">
            <div>
              <button
                className="btn  btn-link float-right"
                style={{ fontSize: "16px", color: "#317cf6" }}
                onClick={this.enableDelete}
              >
                <h6>
                  <i className="far fa-trash-alt" />
                </h6>
              </button>
              <button
                className="btn  btn-link float-right"
                style={{ fontSize: "16px", color: "#317cf6" }}
                onClick={this.toggleEdit}
              >
                <h6>
                  <i className="fas fa-times" />
                </h6>
              </button>
            </div>
            <ProductUpdate
              product={this.props.item}
              updateFinish={this.updateFinish}
            />
          </div>
        );
      }
    }
    const deleteModal = this.state.deleteMode ? (
      <ProductDelete
        product={this.props.item}
        deleteFinish={this.deleteFinish}
      />
    ) : null;

    return (
      <div className="card">
        <div className="card-header" style={{ backgroundColor: "white" }}>
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              style={{ color: "#317CF6", fontSize: "16px", fontWeight: "700" }}
              onClick={this.toggle}
            >
              {name}
            </button>
          </h5>
        </div>
        {info}

        {deleteModal}
      </div>
    );
  }
}
export default ProductsItem;
