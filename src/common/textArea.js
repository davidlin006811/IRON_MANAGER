import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
const TextAreaGroup = ({ field, value, label, error, type, onChange }) => {
  return (
    <div className={classnames("form-group  mb-5", { "has-error": error })}>
      <p>
        <label>{label}</label>
      </p>

      <textarea
        onChange={onChange}
        value={value}
        type={type}
        name={field}
        rows="8"
        className="form-control"
      />
      {error && (
        <span className="help-block" style={{ color: "red" }}>
          {error}
        </span>
      )}
    </div>
  );
};

TextAreaGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextAreaGroup.defaultProps = {
  type: "text"
};

export default TextAreaGroup;
