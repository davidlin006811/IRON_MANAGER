import React, { Component } from "react";
import axios from "axios";
import { SketchPicker } from "react-color";
import { Modal, TextFieldGroup, themeValidation } from "../../common";
import { SUCCESS, ERROR } from "../../../settings";
import { ROOT } from "../../actions/types";
class PresetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      background: "#666",
      text: "#666",
      link: "#666",
      button: "#666",
      errors: {},
      showModal: false,
      modalType: "",
      modalContent: "",
      displayBGColorPicker: false,
      displayTextColorPicker: false,
      displayLinkColorPicker: false,
      displayBtnColorPicker: false
    };
  }
  handleDisplayColorPicker = type => {
    switch (type) {
      case "background":
        this.setState({
          displayBGColorPicker: !this.state.displayBGColorPicker
        });
        break;
      case "text":
        this.setState({
          displayTextColorPicker: !this.state.displayTextColorPicker
        });
        break;
      case "link":
        this.setState({
          displayLinkColorPicker: !this.state.displayLinkColorPicker
        });
        break;
      default:
        this.setState({
          displayBtnColorPicker: !this.state.displayBtnColorPicker
        });
    }
  };
  isValid = () => {
    const { errors, isValid } = themeValidation(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.isValid()) {
      const preset = {
        name: this.state.name,
        background: this.state.background,
        text: this.state.text,
        link: this.state.link,
        button: this.state.button
      };
      axios
        .post(`${ROOT}theme`, preset)
        .then(resutl => {
          this.setState({
            name: "",
            background: "#666",
            text: "#666",
            link: "#666",
            button: "#666",
            errors: {},
            showModal: true,
            modalType: SUCCESS,
            modalContent: `Create new theme - ${
              this.state.name
            } successfully. Please select this theme in the presets and click the 'Apply Theme' button to apply this theme`
          });
        })
        .catch(e => {
          console.log(e);
          this.setState({
            name: "",
            background: "#666",
            text: "#666",
            link: "#666",
            button: "#666",
            errors: {},
            showModal: true,
            modalType: ERROR,
            modalContent: `Failed to create the theme - ${
              this.state.name
            } because of network or server problem`
          });
        });
    }
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onChangeBgColor = color => {
    this.setState({
      background: color.hex
    });
  };
  onChangeTextColor = color => {
    this.setState({
      text: color.hex
    });
  };
  onChangeLinkColor = color => {
    this.setState({
      link: color.hex
    });
  };
  onChangeBtnColor = color => {
    this.setState({
      button: color.hex
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: "",
      modalType: ""
    });
  };
  render() {
    const { name, background, text, link, button, errors } = this.state;
    const modal = this.state.showModal ? (
      <Modal
        type={this.state.modalType}
        content={this.state.modalContent}
        closeModal={this.closeModal}
      />
    ) : null;
    return (
      <div className="card card-body text-dark">
        <h5 className="text-center">Create New Theme</h5>
        <TextFieldGroup
          field="name"
          label="Name"
          value={name}
          error={errors.name}
          onChange={e => {
            this.onChange(e);
          }}
        />
        <p>
          <label>Background</label> &nbsp;&nbsp;&nbsp;
          <span className="color-pad" style={{ backgroundColor: background }} />
        </p>
        <input
          name="background"
          value={background}
          onClick={() => {
            this.handleDisplayColorPicker("background");
          }}
          readOnly
        />

        <div className="color-picker-platte">
          {this.state.displayBGColorPicker && (
            <SketchPicker
              color={background}
              onChangeComplete={this.onChangeBgColor}
            />
          )}
        </div>
        <br />
        <p>
          <label>Text</label> &nbsp;&nbsp;&nbsp;
          <span className="color-pad" style={{ backgroundColor: text }} />
        </p>
        <input
          name="text"
          value={text}
          onClick={() => {
            this.handleDisplayColorPicker("text");
          }}
          readOnly
        />

        <div className="color-picker-platte">
          {this.state.displayTextColorPicker && (
            <SketchPicker
              color={text}
              onChangeComplete={this.onChangeTextColor}
            />
          )}
        </div>
        <br />
        <p>
          <label>Link</label> &nbsp;&nbsp;&nbsp;
          <span className="color-pad" style={{ backgroundColor: link }} />
        </p>
        <input
          name="link"
          value={link}
          onClick={() => {
            this.handleDisplayColorPicker("link");
          }}
          readOnly
        />

        <div className="color-picker-platte">
          {this.state.displayLinkColorPicker && (
            <SketchPicker
              color={link}
              onChangeComplete={this.onChangeLinkColor}
            />
          )}
        </div>
        <br />
        <p>
          <label>Button</label> &nbsp;&nbsp;&nbsp;
          <span className="color-pad" style={{ backgroundColor: button }} />
        </p>
        <input
          name="button"
          value={button}
          onClick={() => {
            this.handleDisplayColorPicker("button");
          }}
          readOnly
        />

        <div className="color-picker-platte">
          {this.state.displayBtnColorPicker && (
            <SketchPicker
              color={button}
              onChangeComplete={this.onChangeBtnColor}
            />
          )}
        </div>
        <br />
        <button className="btn btn-info" onClick={e => this.onSubmit(e)}>
          <h6>Create Theme</h6>
        </button>
        {modal}
      </div>
    );
  }
}
export default PresetForm;
