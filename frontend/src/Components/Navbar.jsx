import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    const { Token } = this.props;
    return (
      //style={this.props.style ? {borderRadius: "50px"} : {borderRadius: "0px"}}
      <header
        style={
          this.props.style
            ? { borderRadius: "0 0 50px 0 " }
            : { borderRadius: "0px", height: "100px" }
        }
      >
        <h1>
          {" "}
          <Link to="/Home">KoalaSurvey</Link>
        </h1>
        <nav>
          <div>
            <Link to="/Pricing">Pricing</Link>
            <Link to="/About">About</Link>
            {this.props.Token ? (
              <Link to={`/profile`}>Profile</Link>
            ) : (
              <>
                <Link to="/Login">Login</Link>
                <Link to="Register" className="primary">
                  Register
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    );
  }
}

export default Navbar;
