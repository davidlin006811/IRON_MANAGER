import React, { Component } from "react";
import axios from "axios";
import { TextFieldGroup, TextAreaGroup, productValidation } from "../../common";
import { ROOT } from "../../actions/types";

class ProductUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.product.name,
      description: this.props.product.description,
      errors: {},
      isLoading: false
    };
    this.url = `${ROOT}product/${this.props.product._id}`;
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
      let updateItems = {};
      if (this.props.product.name !== this.state.name) {
        updateItems.name = this.state.name;
      }
      if (this.props.product.type !== this.state.type) {
        updateItems.type = this.state.type;
      }
      if (this.props.product.description !== this.state.description) {
        updateItems.description = this.state.description;
      }
      // console.log("updateItems: ", updateItems);
      if (Object.keys(updateItems).length > 0) {
        //  console.log("submit");

        axios
          .patch(this.url, updateItems)
          .then(response => {
            // console.log(response);
            this.props.updateFinish();
          })
          .catch(error =>
            this.setState({
              error: error,
              isLoading: false
            })
          );
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    console.log(this.props);
    const { name, description, errors, isLoading } = this.state;

    return (
      <div className="card-body text-dark">
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
          <button
            className="btn btn-success"
            disabled={isLoading}
            onClick={this.onSubmit}
          >
            <h6> Upload Product</h6>
          </button>
        </div>
      </div>
    );
  }
}

export default ProductUpdate;
