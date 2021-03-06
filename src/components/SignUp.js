import React, { Component } from "react";
import axios from "axios";
import "../styles/SignUp.css";
export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      confirmEmail: false
    };
  }

  handleRegister = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  submitForm = e => {
    if (this.state.password === this.state.confirmPassword) {
      e.preventDefault();

      axios
        .post("/api/user", {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => {
          this.setState({
            confirmEmail: this.state.email
          });
        });
    } else {
      document
        .getElementById("confirmPassword")
        .setCustomValidity("Passwords don't match");
    }
  };
  render() {
    return (
      <div id="sign-up">
        <div className="form-container">
          <div className="form-wrap">
            <h1>Sign Up</h1>
            <form>
              <div className="form-group">
                <label>First Name </label>
                <input
                  type="text"
                  id="firstName"
                  onChange={this.handleRegister}
                ></input>
              </div>

              <div className="form-group">
                <label>Last Name </label>
                <input
                  type="text"
                  id="lastName"
                  onChange={this.handleRegister}
                ></input>
              </div>

              <div className="form-group">
                <label>Email </label>
                <input
                  type="email"
                  id="email"
                  onChange={this.handleRegister}
                ></input>
              </div>

              <div className="form-group">
                <label>Password </label>
                <input
                  type="password"
                  id="password"
                  onChange={this.handleRegister}
                ></input>
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  onChange={this.handleRegister}
                ></input>
              </div>
              {this.state.confirmEmail === this.state.email ? (
                (window.location.pathname = "/signin")
              ) : (
                <button onClick={this.submitForm}>Sign Up</button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }
}
