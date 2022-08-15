import React, { Component } from 'react';

class Counter extends Component {
    state = { count: 0 }
    render() {
        return (
            <div><h1>Hello</h1><button>+</button></div>
        );
    }
}

export default Counter;