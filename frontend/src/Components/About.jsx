import React, { Component } from 'react'

class About extends Component {
    render() {
        return (
            <main className="aboutus">
                <h1>About Us</h1>
                <div className="row">
                    <img src={this.props.images[0]} alt="Mohammad"/>
                    <div>
                        <h1>Mohammad Khajah</h1>
                        <h3>Founder</h3>
                        <p>Mohammad Khajah is a full-stack developer. He mostly use NodeJS, ReactJS, Docker, KhajahJS..., he is a Computer Engineer. he got his PhD from the university of arizona at tucson.</p>
                    </div>
                </div>
                <div className="row">
                    <img src={this.props.images[1]} alt="Waleed"/>
                    <div>
                        <h1>Al-Waleed Al-Shammari</h1>
                        <h3>Founder</h3>
                        <p>Al-Waleed is a professional programmer. he started his journey to learn ReactJS, Sockets, Firebase... he is a freelancer. he is a Computer Engineer. he got his bachelor degree from AUM (the uni that everyone's love).</p>
                    </div>
                </div>
            </main>
        )
    }
}

export default About;