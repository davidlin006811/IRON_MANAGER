import validator from "validator";
import isEmpty from "../isEmpty";

export default function productValidation(data) {
  let errors = {};

  if (validator.isEmpty(data.name)) {
    errors.name = "This field is required";
  }

  if (validator.isEmpty(data.description)) {
    errors.description = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
