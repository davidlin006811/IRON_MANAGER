import React, { Component } from "react";
import axios from "axios";
import { SERVER_URL } from "../../../settings";
import { getFileExtension } from "../../common";
import FileSaver from "file-saver";
class Candidate extends Component {
  constructor(props) {
    super(props);
  }
  download = (resume, filename) => {
    axios({
      url: SERVER_URL + resume,
      method: "GET",
      responseType: "blob"
    }).then(response => {
      FileSaver.saveAs(new Blob([response.data]), filename);
    });
  };
  render() {
    const { name, email, resume } = this.props.candidate;
    const names = resume.map(fileUrl => fileUrl.replace("uploads/", ""));
    const fileNames = names.map(name => name.slice(name.indexOf(".") + 5));
    const fileTypes = fileNames.map(fileName => getFileExtension(fileName));
    const resumeComp = resume.map((item, i) => {
      let fileIcon = <i className="far fa-file fa-4x" />;
      if (fileTypes[i] === "doc" || fileTypes[i] === "docx") {
        fileIcon = <i className="far fa-file-word fa-4x word" />;
      } else if (fileTypes[i] === "pdf") {
        fileIcon = <i className="far fa-file-pdf fa-4x pdf" />;
      }
      return (
        <button
          className="btn btn-link text-dark"
          onClick={() => {
            this.download(item, fileNames[i]);
          }}
          key={fileNames[i]}
        >
          <p>{fileIcon}</p>
          {fileNames[i]}
        </button>
      );
    });
    return (
      <div className="card card-body text-dark">
        <p>
          <i className="fas fa-user-tie" />
          &nbsp;&nbsp;{name}
        </p>
        <p className="email">{email}</p>
        <div>{resumeComp}</div>
      </div>
    );
  }
}
export default Candidate;
