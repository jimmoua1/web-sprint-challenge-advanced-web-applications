import React, { useState } from "react";
import axios from "axios";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const changeHandler = e => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const submitHandler = e => {
    e.preventDefault();
    console.log(`submit`);
    axios
      .post(`http://localhost:5000/api/login`, login)
      .then(res => localStorage.setItem("token", res.data.payload))

      .catch(error => console.log(error));

    setLogin({ username: "", password: "" });
    props.history.push(`/bubblepage`);
  };

  return (
    <>
      <h1 className='Title'>Welcome to the Bubble App!</h1>

      <form onSubmit={submitHandler}>
        <div>
          <label>
            Username: 
            <input
              type="text"
              name="username"
              placeholder="username"
              value={login.username}
              onChange={changeHandler}
            />
          </label>
        </div>
        <div>
          <label>
            Password: 
            <input
              type="password"
              name="password"
              placeholder="password"
              value={login.password}
              onChange={changeHandler}
            />
          </label>
        </div>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;