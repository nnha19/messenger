import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../context/authContext";
import axios from "axios";

import Button from "../../../common/button/button";
import Input from "../../../common/input/Input";
import ImageUpload from "./ImgUpload/ImageUpload";

export interface IInputVals {
  email: string;
  password: string;
  name: string;
}

const Auth = () => {
  const context = useContext(AuthContext);

  const [inputVals, setInputVals] = useState<IInputVals>({
    name: "",
    email: "nyinyi@gmail.com",
    password: "password",
  });
  const [loginMode, setLoginMode] = useState(true);
  const [changedMode, setChangedMode] = useState(false);

  useEffect(() => {
    changedMode &&
      setInputVals({
        name: "",
        email: "",
        password: "",
      });
  }, [loginMode]);

  const changeValHandler = (e: any, name: string) => {
    setInputVals({ ...inputVals, [name]: e.target.value });
  };

  const createUserHandler = async (e: any) => {
    e.preventDefault();
    try {
      let data;
      const { name: username, email, password } = inputVals;
      if (loginMode) {
        data = {
          password,
          email,
        };
      } else {
        data = { email, password, username };
      }
      if (
        (username && email && password && !loginMode) ||
        (email && password && loginMode)
      ) {
        const resp = await axios({
          url: !loginMode
            ? `http://localhost:5000/user`
            : "http://localhost:5000/user/login",
          method: "POST",
          data,
        });
        const newUser = resp.data;
        context.signIn(newUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeLoginModeHandler = (): void => {
    setLoginMode(!loginMode);
    setChangedMode(true);
  };

  return (
    <div className="h-screen p-4 flex flex-col justify-center items-center shadow-md bg-primary">
      <div className="w-1/4 mx-auto bg-white">
        <div className="p-2 border-b-2">
          <h2 className="text-center font-medium">
            {loginMode ? "Sign In" : "Create Account"}
          </h2>
        </div>
        <div className="p-12">
          <form onSubmit={createUserHandler}>
            {!loginMode && <ImageUpload />}
            <Input
              onChange={changeValHandler}
              value={inputVals.email}
              type="text"
              placeholder="Your Email"
              name="email"
              label="Email"
            />
            {!loginMode && (
              <Input
                onChange={changeValHandler}
                value={inputVals.name}
                type="texts"
                placeholder="Your Name"
                name="name"
                label="Name"
              />
            )}
            <Input
              onChange={changeValHandler}
              value={inputVals.password}
              type="password"
              placeholder="Your Password"
              name="password"
              label="Password"
            />
            <Button>Submit</Button>
          </form>
          <div className="mt-6">
            <span className="mr-2">
              {loginMode ? "Dont't 'have an account?" : "Already a member"}
            </span>
            <span
              onClick={changeLoginModeHandler}
              className="underline text-primary cursor-pointer"
            >
              {loginMode ? "Sign Up" : "Log In"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
