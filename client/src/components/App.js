import React from 'react';
import ComputerListing from './ComputerListing.js';

import "./App.css";

export default class App extends React.Component {
    render() {
        return (
            <div>
                <div className="header">PC Builder</div>
                <div style={{textAlign: 'center'}}>
                    <ComputerListing/>
                </div>
            </div>
        );
    }
}