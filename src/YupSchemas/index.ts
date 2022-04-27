import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required"),
});
