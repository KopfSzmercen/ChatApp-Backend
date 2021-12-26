import validator from "validator";
import { RegisterErrors } from "./register";

const checkPasswords = (
  errors: RegisterErrors,
  password: string,
  confirmPassword: string
) => {
  if (!password || !confirmPassword) {
    errors.password = { message: "Password is required" };
  } else if (
    !validator.isLength(password, { min: 5, max: 15 }) ||
    !validator.isLength(confirmPassword, { min: 5, max: 15 })
  ) {
    errors.password = {
      message: "Password has to be between 5 and 15 characters long."
    };
  } else if (password !== confirmPassword) {
    errors.password = { message: "Passwords do not match" };
  }
};

export default checkPasswords;
