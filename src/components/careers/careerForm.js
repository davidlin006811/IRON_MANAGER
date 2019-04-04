import React, { Component } from "react";
import axios from "axios";
import {
  TextFieldGroup,
  TextAreaGroup,
  careerValidation,
  Modal
} from "../../common";
import { ERROR } from "../../../settings";
import { ROOT } from "../../actions/types";

class CareerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      images: [],
      errors: {},
      isLoading: false,
      showModal: false,
      modalType: "",
      modalMessage: ""
    };
    this.url = `${ROOT}career`;
  }

  isValid = () => {
    const { errors, isValid } = careerValidation(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      let bodyFormData = new FormData();
      bodyFormData.set("title", this.state.title);
      bodyFormData.set("description", this.state.description);
      this.state.images.forEach(file => {
        bodyFormData.append("images", file);
      });
      axios
        .post(this.url, bodyFormData)
        .then(response => {
          this.setState({
            isLoading: false,
            title: "",
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

    const showModal = tooBigFiles.length > 0 ? true : false;
    this.setState({
      images: availableFiles,
      showModal: showModal,
      modalMessage: "File size could not greater than 5 MB",
      modalType: ERROR
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
    const { title, description, images, errors, isLoading } = this.state;

    const upLoadTxt =
      images.length > 0 ? `Total images: ${images.length}` : "Add images";
    const modal = this.state.showModal ? (
      <Modal
        type={this.state.modalType}
        content={this.state.modalMessage}
        closeModal={this.closeModal}
      />
    ) : null;

    return (
      <div className="card card-body text-dark">
        <h5 className="text-center">Add Career</h5>
        {errors.form && <div className="alert alert-danger">{errors.form}</div>}
        <br />
        <TextFieldGroup
          field="title"
          label="Title"
          value={title}
          error={errors.title}
          onChange={e => {
            this.onChange(e);
          }}
        />

        <TextAreaGroup
          field="description"
          label="Description"
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
            <h6> Upload Career</h6>
          </button>
        </div>
        {modal}
      </div>
    );
  }
}

export default CareerForm;
