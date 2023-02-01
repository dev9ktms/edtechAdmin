import React from "react";
import {  useNavigate,Link } from "react-router-dom";
import LoginStyles from "./Login.module.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { signinGoogle } from "../../redux/actions/auth";

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    dispatch(signinGoogle(accessToken, navigate));
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  

  return (
    <>
      <div className={LoginStyles.loginContainer}>
        <div className={LoginStyles.loginContainerv2}>
          <h1>Welcome back</h1>
          <button onClick={() => login()} className={LoginStyles.googleBTN}>
            <i className="fa-brands fa-google"></i> Sign in with google
          </button>
          <span className={LoginStyles.notreg}>
            Not registered yet?{" "}
            <Link className={LoginStyles.singupBTN} to="/account/signup">
              Signup
            </Link>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
