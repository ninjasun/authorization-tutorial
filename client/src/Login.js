import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import fakeAuth from "./Auth";

const Login = () => {
  const { handleSubmit, register, errors } = useForm();
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const onSubmit = async (values) => {
    fakeAuth.signIn(values, () => {
      history.replace(from);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <input
        name="username"
        ref={register({
          required: "Required",
        })}
      />
      {errors.username && errors.username.message}

      <input
        name="password"
        ref={register({
          required: "Required",
        })}
      />
      {errors.password && errors.password.message}
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
