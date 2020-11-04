import React, { Component } from "react";
import { Link } from "react-router-dom";

class Main extends Component {
  render() {
    let services = [
      {
        title: "Securety",
        img: this.props.package.images[1],
        paragraph: "We use QRCode to secure every employee from haters.",
      },
      {
        title: "Motivation",
        img: this.props.package.images[2],
        paragraph:
          "Customers can send a motivational reviews to their helpers.",
      },
      {
        title: "Profits",
        img: this.props.package.images[3],
        paragraph: "Promote your Employees by viewing the customers reviews.",
      },
      {
        title: "Community",
        img: this.props.package.images[4],
        paragraph: "With Koala you will get a better hard working society",
      },
    ];
    return (
      <main className="home">
        <div className="imgabout">
          <div className="about">
            <h1>What is KoalaSurvey</h1>
            <h2>
              KoalaSurvey is a rating system that uses QRCode to get you to the
              employee or the company profile where you could rate their
              services. We're helping both sides in a way. The goal is to
              enhance the credibility between the costumer and the company.
            </h2>
          </div>
          <img src={this.props.package.images[0]} alt="Mac" />
        </div>
        <section className="service">
          <h1>Our Service</h1>
          <div className="cardholder">
            {services.map((item, index) => (
              <div className="card" key={index}>
                <img src={item.img} alt={item.title} />
                <h2>{item.title}</h2>
                <p>{item.paragraph}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="analyse">
          <div className="left">
            <img src={this.props.package.images[5]} alt="analyse" />
            <div className="keys">
              <span>
                <div></div>Positive
              </span>
              <span>
                <div></div>Satisfied
              </span>
              <span>
                <div></div>Happy
              </span>
            </div>
          </div>
          <div className="right">
            <h1>Analysis</h1>
            <p>
              business analysis is the discipline of recognizing business needs
              and findings solutions to various business problems. In simpler
              words, it is a set of tasks and techniques which work as a
              connection between stakeholders. These help them understand
              organization's structure, policies, and operations.
            </p>
            <img src={this.props.package.images[6]} alt="feedback" />
          </div>
        </section>
        <div className="start">
          <h1>Aren't you just a little bit curious?</h1>
          <Link to="/Register">Get Started</Link>
        </div>
      </main>
    );
  }
}
export default Main;
