import React, { Component } from "react";
import axios from "axios";
import { ROOT } from "../../actions/types";
import { connect } from "react-redux";
import { fetchTheme } from "../../actions/theme";
import PropTypes from "prop-types";
import { Loading, isEmpty, Modal } from "../../common";
import { SUCCESS, ERROR } from "../../../settings";
import PresetForm from "./presetForm";
class Theme extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPreset: {},
      presets: [],
      selectedPresetIndex: 0,
      showModal: false,
      modalContent: "",
      modalType: ""
    };
  }
  selectPreset = e => {
    this.setState({
      selectedPresetIndex: e.target.value,
      selectedPreset: this.state.presets[e.target.value]
    });
  };
  applyScheme = () => {
    axios
      .patch(`${ROOT}theme`, {
        selectedPresetIndex: this.state.selectedPresetIndex
      })
      .then(result => {
        this.setState({
          showModal: true,
          modalContent: `The scheme ${
            this.state.selectedPreset.name
          } is applied successfully, please visit the client page to check to changes`,
          modalType: SUCCESS
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          showModal: true,
          modalContent: `Failed to the scheme ${
            this.state.selectedPreset.name
          } because of the network or server problem`,
          modalType: ERROR
        });
      });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
      modalContent: "",
      modalType: ""
    });
  };
  componentDidMount() {
    this.props.fetchTheme();
  }
  componentWillReceiveProps(nextProps) {
    if (!isEmpty(nextProps.theme.themeSetting)) {
      const { isFetching, themeSetting } = nextProps.theme;
      const selectedPresetIndex = themeSetting.selectedPresetIndex;

      this.setState({
        selectedPreset: themeSetting.presets[selectedPresetIndex],
        presets: themeSetting.presets,
        selectedPresetIndex: selectedPresetIndex
      });
    }
  }
  render() {
    //  console.log(this.props);
    //console.log(this.state);
    const { isFetching, themeSetting } = this.props.theme;
    const modal = this.state.showModal ? (
      <Modal
        type={this.state.modalType}
        content={this.state.modalContent}
        closeModal={this.closeModal}
      />
    ) : null;
    if (isFetching) {
      return <Loading />;
    }

    return (
      <div className="collapse" id="theme">
        <div className="card card-body text-dark">
          <label>Selected Scheme: {this.state.selectedPreset.name}</label>

          <div style={{ fontSize: "16px" }}>
            <p>
              <label className="theme-item">Background:</label>
              &nbsp; &nbsp; &nbsp;
              <span
                className="color-pad"
                style={{
                  backgroundColor: this.state.selectedPreset.background
                }}
              />
              <label className="theme-value">
                {this.state.selectedPreset.background}
              </label>
            </p>
            <p>
              <label className="theme-item">Text:</label>
              &nbsp; &nbsp; &nbsp;
              <span
                className="color-pad"
                style={{
                  backgroundColor: this.state.selectedPreset.text
                }}
              />
              <label className="theme-value">
                {this.state.selectedPreset.text}
              </label>
            </p>
            <p>
              <label className="theme-item">Link: </label>
              &nbsp; &nbsp; &nbsp;
              <span
                className="color-pad"
                style={{
                  backgroundColor: this.state.selectedPreset.link
                }}
              />
              <label className="theme-value">
                {this.state.selectedPreset.link}
              </label>
            </p>
            <p>
              <label className="theme-item">Button:</label>
              &nbsp; &nbsp; &nbsp;
              <span
                className="color-pad"
                style={{
                  backgroundColor: this.state.selectedPreset.button
                }}
              />
              <label className="theme-value">
                {this.state.selectedPreset.button}
              </label>
            </p>
            <p>
              <label className="theme-item">Button Font:</label>
              &nbsp; &nbsp; &nbsp;
              <span
                className="color-pad"
                style={{
                  backgroundColor: this.state.selectedPreset.buttonFont
                }}
              />
              <label className="theme-value">
                {this.state.selectedPreset.buttonFont}
              </label>
            </p>
          </div>
          <button
            className="btn btn-info col-sm-10 col-md-6 col-lg-3"
            onClick={this.applyScheme}
          >
            <h6>Apply Theme</h6>
          </button>
          <br />
          <div className="form-group">
            <label>Select Theme</label>

            <br />
            <select
              className="text-dark"
              onChange={this.selectPreset}
              value={this.state.selectedPresetIndex}
            >
              {this.state.presets.map((preset, index) => {
                return (
                  <option key={index} value={index}>
                    {preset.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <PresetForm />
        {modal}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    theme: state.theme
  };
}
Theme.propTypes = {
  fetchTheme: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { fetchTheme }
)(Theme);
