import validator from "validator";
import isEmpty from "../isEmpty";

export default function loginValidataion(data) {
  let errors = {};

  if (validator.isEmpty(data.email) || !validator.isEmail(data.email)) {
    errors.email = "This field is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
