import React from 'react';
import axios from 'axios';
import { of } from 'rxjs';
import { pipe, concatMap, concatAll } from 'rxjs/operators';

import DBApi from '../db-api.js';

import "./ComputerListing.css";

export default class ComputerListing extends React.Component {
    constructor() {
        super();
        this.state = {
            buildList: []
        }
    }

    componentDidMount() {
        let me = this;
        let _buildList = [];

        DBApi.getAllBuilds().subscribe({
            next(x) {
                _buildList.push(x);
            },
            complete() {
                me.setState({buildList: _buildList});
            },
            error(e) {
                console.log("error:", e);
            }
        });
        /*
        DBApi.getAllBuilds().subscribe((result) => {

        });
        */
        /*
        axios.get("/parts_api/get_builds").then((result) => {
            console.log(result);
        });
        */
    }

    render() {
        let computerList = this.state.buildList.map((buildList, idx) => 
            <tr key={idx}>
                <td>{buildList.computer_name}</td>
                <td>{buildList.processor.processor_name}</td>
                <td>{buildList.ram_type.ram_name}</td>
            </tr>
        );

        return (
            <div style={{textAlign: 'center'}}>
                <table>
                    <tr>
                        <th>Model</th>
                        <th>Processor</th>
                        <th>RAM</th>
                    </tr>
                    {computerList}
                </table>
            </div>
        );
    }
}