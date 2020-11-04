import React, { Component } from "react";
import StarRatings from "react-star-ratings";
import axios from "axios";
import xss from "xss";
import config from "../axios/config";
import qs from "querystring";

export default class Rate extends Component {
  state = {
    rating: 0,
    message: "",
    profile: {},
    id: window.location.href.split("/")[4],
  };

  componentDidMount() {
    console.log(this.props.id);
    axios
      .get(`http://localhost:3003/employee/${this.state.id}`, config)
      .then((res) => {
        const newState = this.state;
        newState.profile = res.data;
        this.setState(newState);
      })
      .catch((error) => console.log(error));
  }
  handleSend = () => {
    const { rating, message } = this.state;
    axios
      .post(
        `http://localhost:3003/rating/${this.state.id}`,
        qs.stringify({ rating, message }),
        config
      )
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <main className="rate">
        <h1>Rate me!</h1>
        <img src={require("../assets/images/MK.png")} />
        <h2>
          {this.state.profile.employee ? this.state.profile.employee.name : ""}
        </h2>
        <StarRatings
          rating={this.state.Rating}
          starRatedColor="gold"
          starHoverColor="gold"
          changeRating={(e) => {
            const newState = this.state;
            newState.rating = e;
            this.setState(newState);
          }}
          numberOfStars={5}
          name="rating"
        />
        <textarea
          placeholder="Remember, be nice!"
          onChange={(e) => {
            const newState = this.state;
            newState.message = e.target.value;
            this.setState(newState);
          }}
          onPaste={(e) => e.preventDefault()}
        />
        <button onClick={this.handleSend}>Send</button>
      </main>
    );
  }
}
