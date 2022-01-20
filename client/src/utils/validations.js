import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username required"),
  email: yup.string().email("invalid email address").required("Email required"),
  password: yup
    .string()
    .min(5, "Password must be 5 character or more")
    .required("Password required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email address").required("Email required"),
  password: yup
    .string()
    .min(5, "Password must be 5 character or more")
    .required("Password required"),
});

export { signupSchema, loginSchema };
