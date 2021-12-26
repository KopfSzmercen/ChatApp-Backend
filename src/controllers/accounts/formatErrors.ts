import { RegisterErrors } from "./register";

const formatErrors = (errors: RegisterErrors) => {
  const formattedError: RegisterErrors = {};

  if (errors.password) {
    formattedError.password = { message: errors.password.message };
  }
  if (errors.confirmPassword) {
    formattedError.confirmPassword = {
      message: errors.confirmPassword.message
    };
  }
  if (errors.email) {
    formattedError.email = { message: errors.email.message };
  }
  if (errors.username) {
    formattedError.username = { message: errors.username.message };
  }

  return formattedError;
};

export default formatErrors;
