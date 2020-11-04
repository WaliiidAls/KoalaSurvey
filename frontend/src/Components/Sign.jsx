import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import qs from "querystring";
import { config } from "../axios/config";

class Sign extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  };
  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };
  handlePassChange = (event) => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };
    axios
      .post(
        `http://localhost:3003/company/register`,
        qs.stringify(user),
        config
      )
      .then((res) => {
        console.log(res);
        this.props.newToken(res.data);
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <section className="sign">
        <div className="left">
          <div>
            <h1>Hey, Friend! 👋</h1>
            <h2>Register and start a journey with us.</h2>
            <Link to="/Login" className="primary">
              Login
            </Link>
          </div>
        </div>
        <div className="right">
          <h1>Create Account</h1>
          <div>
            <input
              onChange={this.handleNameChange}
              type="text"
              placeholder="Username"
            />
            <input
              onChange={this.handleEmailChange}
              type="email"
              placeholder="Email"
            />
            <input
              onChange={this.handlePassChange}
              type="password"
              placeholder="Password"
            />
            <Link
              to="/register"
              className="primary"
              onClick={this.handleSubmit}
            >
              Sign up
            </Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Sign;
