import styles from "./signup.module.css";
import { useFormik } from "formik";
import { signupSchema } from "../../utils/validations";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      setUser(values);
    },
  });
  const sign = async (e) => {
    e.preventDefault();
    await formik.handleSubmit();
    await api()
      .post("/user/signup", user)
      .then((response) => navigate("/login", { state: "newUser" }))
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    localStorage.getItem("token") && navigate("/posts");
  }, []);

  return (
    <div className={styles.container}>
      <h1>Signup</h1>
      <form onSubmit={(e) => sign(e)}>
        <div className={styles.formItem}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          {formik.touched.username && formik.errors.username && (
            <span className={styles.error}>{formik.errors.username}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <span className={styles.error}>{formik.errors.email}</span>
          )}
        </div>
        <div className={styles.formItem}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password && (
            <span className={styles.error}>{formik.errors.password}</span>
          )}
        </div>
        <button type="submit">Signup</button>
      </form>
      <span>
        Already have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default Signup;
