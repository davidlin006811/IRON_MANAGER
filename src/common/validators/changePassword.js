import validator from "validator";
import isEmpty from "../isEmpty";

export default function changePasswordValidataion(data) {
  let errors = {};
  const patten = new RegExp("^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
  if (validator.isEmpty(data.oldPassword)) {
    errors.oldPassword = "This field is required";
  }
  if (!patten.test(data.newPassword)) {
    errors.newPassword =
      "Password must contain at least 6 characters, at least one number, one lowercase and one uppercase letter (no spaces or other characters)";
  }
  if (data.newPassword !== data.repeatPassword) {
    errors.repeatPassword = "Repeat password must match the new password";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
