import React, { useState } from "react";
import Button from "../button/button";
import Input from "../input/Input";

interface IInputVals {
  email: string;
  password: string;
  name: string;
}

const Auth = () => {
  const [inputVals, setInputVals] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeValHandler = (e: any, name: string) => {
    setInputVals({ ...inputVals, [name]: e.target.value });
  };

  const createUserHandler = (e: any) => {
    e.preventDefault();
    if (inputVals.name && inputVals.email && inputVals.password) {
      console.log("Create account.");
    }
  };

  return (
    <div className="h-screen p-4 flex flex-col justify-center items-center shadow-md bg-primary">
      <div className="w-1/4 mx-auto bg-white">
        <div className="p-2 border-b-2">
          <h2 className="text-center font-medium">Create Account</h2>
        </div>
        <form onSubmit={createUserHandler} className="p-12">
          <Input
            onChange={changeValHandler}
            value={inputVals.email}
            type="text"
            placeholder="Your Email"
            name="email"
            label="Email"
          />
          <Input
            onChange={changeValHandler}
            value={inputVals.name}
            type="texts"
            placeholder="Your Name"
            name="name"
            label="Name"
          />
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
      </div>
    </div>
  );
};

export default Auth;
