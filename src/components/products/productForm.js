import React, { Component } from "react";
import axios from "axios";
import {
  TextFieldGroup,
  TextAreaGroup,
  productValidation,
  Modal
} from "../../common";

import { ROOT } from "../../actions/types";

class ProductForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      type: "",
      description: "",
      images: [],
      errors: {},
      isLoading: false,
      imageUploading: false,
      showModal: false,
      modalType: "",
      modalMessage: ""
    };
    this.url = `${ROOT}product`;
    //console.log(this.url);
  }

  isValid = () => {
    const { errors, isValid } = productValidation(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();
    //console.log(this.state);
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      let bodyFormData = new FormData();
      bodyFormData.set("name", this.state.name);
      bodyFormData.set("type", this.state.type);
      bodyFormData.set("description", this.state.description);
      this.state.images.forEach(file => {
        bodyFormData.append("images", file);
      });
      axios
        .post(this.url, bodyFormData)
        .then(response => {
          console.log(response);
          this.setState({
            isLoading: false,
            name: "",
            type: "",
            description: "",
            images: []
          });
        })
        .catch(error =>
          this.setState({
            error: error,
            isLoading: false
          })
        );
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  imgOnChange = e => {
    const files = Array.from(e.target.files);
    const availableFiles = files.filter(file => file.size <= 1024 * 1024 * 5);
    const tooBigFiles = files.filter(file => file.size > 1024 * 1024 * 5);
    console.log("too big files: ", tooBigFiles);
    const showModal = tooBigFiles.length > 0 ? true : false;
    this.setState({
      images: availableFiles,
      showModal: showModal,
      modalMessage: "File size could not greater than 5 MB",
      modalType: "error"
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      modalMessage: "",
      modalType: ""
    });
  };
  render() {
    //console.log(this.state);
    const {
      name,
      description,
      images,
      errors,
      isLoading,
      imageUploading
    } = this.state;
    //console.log("images: ", images);
    const upLoadTxt =
      images.length > 0 ? `Total images: ${images.length}` : "Add images";
    const modal = this.state.showModal ? (
      <Modal
        type={this.state.modalType}
        content={this.state.modalMessage}
        closeModal={this.closeModal}
      />
    ) : null;
    //console.log(modal);
    return (
      <div className="card card-body text-dark">
        <h5 className="text-center">Add Product</h5>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        <br />
        <TextFieldGroup
          field="name"
          label="Product Name"
          value={name}
          error={errors.name}
          onChange={e => {
            this.onChange(e);
          }}
        />

        <TextAreaGroup
          field="description"
          label="Product Description"
          value={description}
          error={errors.description}
          onChange={e => this.onChange(e)}
        />

        <div className="form-group">
          <label className="btn btn-info btn-file" style={{ fontSize: "22px" }}>
            {upLoadTxt}
            <input
              type="file"
              id="imgs"
              onChange={this.imgOnChange}
              accept="image/*"
              multiple
            />
          </label>
        </div>

        <div className="form-group">
          <button
            className="btn btn-success"
            disabled={isLoading}
            onClick={this.onSubmit}
          >
            <h6> Upload Product</h6>
          </button>
        </div>
        {modal}
      </div>
    );
  }
}

export default ProductForm;
