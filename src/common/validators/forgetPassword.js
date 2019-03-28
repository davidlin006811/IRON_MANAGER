import isEmpty from "../isEmpty";

export default function forgetPasswordValidataion(data) {
  let errors = {};
  const patten = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  if (!data.phone.match(patten)) {
    errors.phone = "Phone number is missing or in wrong format";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
