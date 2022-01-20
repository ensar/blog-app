import styles from "./login.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../../utils/validations";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    localStorage.getItem("token") && navigate("/posts");
    location.state === "newUser" &&
      toast.success("Kayıt oldunuz.Lütfen giriş yapın");
  }, []);

  const login = async (e) => {
    e.preventDefault();
    await formik.handleSubmit();
    await api()
      .post("/user/login", user)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/posts");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setUser(values);
    },
  });

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={(e) => login(e)}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
