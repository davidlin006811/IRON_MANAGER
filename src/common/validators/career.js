import validator from "validator";
import isEmpty from "../isEmpty";

export default function careerValidation(data) {
  let errors = {};

  if (validator.isEmpty(data.title)) {
    errors.title = "This field is required";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
