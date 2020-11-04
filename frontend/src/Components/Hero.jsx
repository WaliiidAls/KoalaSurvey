import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Hero extends Component {
    render() {
        return (
            <section className="hero">
                <div className="left">
                    <h1>Your Team is your business. Not ours. </h1>
                    <p>Built for businesses, designed for people, loved by teams. Discover why we're a leading survey platform for companies around the globe.</p>
                    <Link to="/Register" className="primary">Join us</Link>
                </div>
                <img src={this.props.img} alt="img"/>
            </section>
        )
    }
}

export default Hero;
