export const loginErrors = (matric, password) => {
  const errors = {};
  errors.matric = matric? "": "Matric is required";
  errors.password = password? "": "Password is required";
  return errors;
}