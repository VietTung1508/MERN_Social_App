import "./login.scss";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { useDispatch } from "react-redux";
import {
  loginFailure,
  loginStart,
  loginSuccess,
} from "../../../redux/userSlice";
import axiosClient from "../../../api/axiosClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const [passVisible, setPassVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleVisible = () => {
    setPassVisible(!passVisible);
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axiosClient.post("auth/login", credentials);
      dispatch(loginSuccess({ user: res.data, token: res.data.accessToken }));
      navigate("/");
    } catch (e) {
      setErr(e.response.data.message);
      dispatch(loginFailure());
    }
  };

  return (
    <div className="login">
      <div className="login__box  container">
        <Link to="/">
          <FontAwesomeIcon className="close-icon" icon={faXmark} />
        </Link>
        <div className="login__box__left">
          <img src="./images/login.jpg" />
        </div>
        <div className="login__box__right">
          <h1>Login</h1>
          <p className="login-link">
            Doesn't have an account yet ?{" "}
            <Link to="/register">
              <span>Sign up</span>
            </Link>
          </p>
          <form className="login-form" onSubmit={handleSubmit}>
            <div>
              {" "}
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="you@expample.com"
                value={credentials.email}
                onChange={handleChange}
              />
            </div>
            <div>
              {" "}
              <label htmlFor="password">Password</label>
              <input
                type={passVisible ? "text" : "password"}
                name="password"
                id="password"
                required
                placeholder="Enter 6 character or more"
                value={credentials.password}
                onChange={handleChange}
              />
              <FontAwesomeIcon
                className="password-visible"
                icon={passVisible ? faEyeSlash : faEye}
                onClick={handleVisible}
              />
            </div>
            {err && <span className="err">{err}</span>}
            <button className="btn-login" type="submit">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
