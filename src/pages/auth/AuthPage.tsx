import classes from "./style.module.css";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

import { Navigate } from "react-router-dom";
import Header from "../../components/header/Header";
import { useEffect } from "react";

export const Auth = () => {
  return (
    <>
      <div className={classes.SignInContainer}>
        <Header />
        <SignedOut>
          <div className={classes.boxContainer}>
            <div className={classes.box}>
              <h2>Sign in </h2>
              <SignInButton mode="modal" />
            </div>
            <div className={classes.box}>
              <h3>Create a New Account</h3>
              <SignUpButton mode="modal" />
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div>
            <UserButton />
          </div>
          <Navigate to="/home" />
        </SignedIn>
      </div>
    </>
  );
};
