import * as Yup from "yup";

// export const authValidationSchema = Yup.object().shape({
//   email: Yup.string().email("Email is not valid").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

export const registerValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});
