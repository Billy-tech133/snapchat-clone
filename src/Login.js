import React from "react";
import { Button } from "@material-ui/core";
import "./Login.css";
import { login } from "./features/appSlice";
import { useDispatch } from "react-redux";
import { auth, provider } from "./firebase";
function Login() {
  const dispatch = useDispatch();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) =>
        dispatch(
          login({
            username: result.user.displayName,
            profilePic: result.user.photoURL,
            id: result.user.uid,
          })
        )
      )
      .catch((error) => alert(error.message));
  };
  return (
    <div className="login">
      <div className="login-container">
        <img src="https://bit.ly/3g10C6i" alt="snapchat" />
        <Button variant="outlined" onClick={signIn}>
          Sign in
        </Button>
      </div>
    </div>
  );
}

export default Login;
