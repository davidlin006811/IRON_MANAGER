import React, { Component } from "react";
import { SERVER_URL } from "../../../settings";
import Candidate from "./candidate";
import CareerDelete from "./careerDelete";

class CareerItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      deleteMode: false
    };
  }
  toggle = () => {
    this.setState({
      toggle: !this.state.toggle
    });
  };
  handleDelete = () => {
    this.setState({
      deleteMode: true
    });
  };
  deleteFinish = () => {
    this.setState({
      deleteMode: false
    });
  };

  render() {
    const { _id, title, description, images, candidates } = this.props.career;
    const careerImages = images.map((image, index) => {
      const key = `careerImage-${index}`;
      const imagePath = SERVER_URL + image;
      return (
        <div className="col-sm-12 col-md-4 col-lg-2 text-center" key={key}>
          <img
            src={imagePath}
            alt="career image"
            style={{ width: "90%", padding: "10px 0" }}
          />
        </div>
      );
    });
    const candidatesComp = candidates.map(candidate => {
      return <Candidate candidate={candidate} key={candidate.email} />;
    });
    let info;
    if (this.state.toggle) {
      info = (
        <div className="collapse show">
          {candidatesComp}
          <div
            className="career-description text-dark"
            style={{ fontSize: "16px" }}
          >
            {description}
          </div>
          {careerImages}
        </div>
      );
    }
    const deleteModal = this.state.deleteMode ? (
      <CareerDelete
        career={this.props.career}
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
              {title}
            </button>
            <button
              className="btn  btn-link float-right"
              style={{ fontSize: "16px", color: "#317cf6" }}
              onClick={this.handleDelete}
            >
              <h6>
                <i className="far fa-trash-alt" />
              </h6>
            </button>
          </h5>
        </div>
        {info}
        {deleteModal}
      </div>
    );
  }
}

export default CareerItem;
