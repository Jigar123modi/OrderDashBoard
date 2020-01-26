import React, {Component} from 'react';
import './chart-loader.css';
export default class ChartLoader extends Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="chart-loader"><img src="/assets/Images/chart-loader.gif"/></div>
        )
    }
}