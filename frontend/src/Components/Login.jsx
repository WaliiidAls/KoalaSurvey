import React, { Component } from "react";
import axios from "axios";
import qs from "querystring";
import config from "../axios/config";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(`http://localhost:3003/company/login`, qs.stringify(user), config)
      .then((res) => this.props.newToken(res.data))
      .catch((error) => console.log(error.response));
  };
  render() {
    return (
      <>
        <section className="login">
          <div className="left">
            <h1>Login</h1>
            <div>
              <span>
                <input
                  onChange={this.handleEmailChange}
                  type="email"
                  placeholder="Email"
                />
                <p>Forgot email ?</p>
              </span>
              <span>
                <input
                  onChange={this.handlePassChange}
                  type="password"
                  placeholder="Password"
                />
                <p>Forgot password ?</p>
              </span>
              <Link
                to="/profile"
                className="primary"
                onClick={this.handleSubmit}
              >
                Login
              </Link>
            </div>
          </div>
          <div className="right">
            <div>
              <h1>Welcome Back! 👋</h1>
              <h2>
                if you don't have an account yet, why don't you make one ?
              </h2>
              <Link to="/Register" className="primary">
                Register
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default Login;
