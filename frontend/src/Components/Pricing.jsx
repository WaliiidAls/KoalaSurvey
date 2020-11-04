import React, { Component } from 'react'

class Pricing extends Component {
    render() {
        return (
            <main className="pricing">
                <h1>Plans & Pricing</h1>
                <div className="columnholder">
                    <div className="column">
                        <h1>Company</h1>
                        <h3>First month Free</h3>
                        <h2>50$/m</h2>
                        <h2>Limited</h2>
                    </div>
                    <div className="column">
                        <h1>Company+</h1>
                        <h3>First month Free</h3>
                        <h2>150$/m</h2>
                        <h2>Unlimited</h2>
                    </div>
                </div>
            </main>
        )
    }
}

export default Pricing;