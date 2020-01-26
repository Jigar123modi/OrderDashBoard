import React, {Component} from 'react';
import DataNotFound from '../DataNotFound';
import ChartLoader from '../../Helper/ChartLoader';
import {Pie} from 'react-chartjs-2';


export default class GetTotalOrderStatusWise extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let data = {
            labels: [],
            datasets: [{
                data: [],
                backgroundColor: [
                    '#36A2EB',
                    '#FFCE56',
                    '#78ffdb',
                    '#FF6384'
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FFCE56',
                    '#78ffdb',
                    '#FF6384'
                ]
            }]
        };

        this.props.getOrderStatusReport.map((options) => {
            data.labels.push(`${options.status}`);
            data.datasets[0].data.push(options.total);
        });

        return (
            <div>
                <div className="col-lg-6 col-xs-12 col-sm-12 avg-wait-time-report">
                    <div className="analytics-chart-modal">
                        <div className="analytics-chart-header">
                            <div className="chart-title">
                                <span>Status Wise Total Orders</span>
                            </div>
                            <div className="chart-tools">
                            </div>
                        </div>
                        <div className="analytics-chart-body">
                            {this.props.loading ? <ChartLoader/> :
                                data.datasets[0].data.length > 0 ?
                                    <Pie
                                        data={data}
                                        width={100}
                                        height={50}
                                        options={{
                                            maintainAspectRatio: false
                                        }}/> :
                                    <DataNotFound/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
