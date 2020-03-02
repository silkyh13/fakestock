import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import "../styles/App.css";
import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Portfolio from "./Portfolio";
import Transactions from "./Transaction";
import Goodbye from "./Goodbye";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      userName: null,
      loggedOut: false
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }
  //get user data info to pass as props
  getUser = () => {
    axios
      .get("/api/user")
      .then(res => {
        this.setState({
          user: res.data,
          userName: res.data.firstName
        });
      })
      .catch(err => console.error(err));
  };

  //log out user
  loggedOut = event => {
    axios
      .get("/api/logout")
      .then(response => {
        // handle success
        this.setState({
          loggedOut: !this.state.loggedOut
        });
        console.log(response);
      })
      .catch(error => {
        // handle error
        console.log(error);
      })
      .finally(res => {
        // always executed
        console.log("logged out");
      });
  };

  render() {
    return (
      <Router>
        <div id="app">
          <nav className="navbar">
            <div className="container">
              <h1 className="logo" onClick="window.location.reload();">
                <Link to="/">FakeStock</Link>
              </h1>
              {this.state.user ? (
                <ul>
                  <li>
                    <Link to="/transactions">Transactions</Link>
                  </li>
                  <li className="even">
                    <Link to="/portfolio">Portfolio</Link>
                  </li>
                  <li>
                    <Link onClick={this.loggedOut} to="/goodbye">
                      Log Out
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <Link to="/signin">Sign In</Link>
                  </li>
                </ul>
              )}
            </div>
            {this.state.loggedOut
              ? (window.location.pathname = "/goodbye")
              : null}
          </nav>

          <Switch>
            <Route path="/goodbye">
              <Goodbye />
            </Route>
            <Route path="/transactions">
              <Transactions />
            </Route>
            <Route path="/portfolio">
              <Portfolio userName={this.state.userName} />
            </Route>
            <Route path="/signin">
              <SignIn userName={this.state.userName} getUser={this.getUser} />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <Home user={this.state.user} userName={this.state.userName} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
