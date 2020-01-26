import React, {Component} from 'react';
import DataNotFound from '../DataNotFound';
import ChartLoader from '../../Helper/ChartLoader';
import {Polar} from 'react-chartjs-2';


export default class GetTotalBillablePrice extends Component {

    constructor(props) {
        super(props);
    }

    random_rgba = () => {
        let o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
    };


    render() {

        let visible = false;
        let data = {
            datasets: [{
                data: [],
                backgroundColor: [
                    '#FF6384',
                    '#4BC0C0',
                    '#FFCE56',
                    '#E7E9ED',
                    '#36A2EB'
                ],
                label: 'Total orders'
            }],
            labels: []
        };


        this.props.getTotalBillablePrice.map((options) => {
            data.labels.push(`${options.user.first_name} ${options.user.last_name}`);
            data.datasets[0].data.push(options.totalBillablePrice);
            visible = true;
        });

        return (
            <div>
                <div className="col-lg-6 col-xs-12 col-sm-12 avg-wait-time-report">
                    <div className="analytics-chart-modal">
                        <div className="analytics-chart-header">
                            <div className="chart-title">
                                <span>Get Total Billable</span>
                            </div>
                            <div className="chart-tools">
                            </div>
                        </div>
                        <div className="analytics-chart-body">
                            {this.props.loading ? <ChartLoader/> :
                                visible ?
                                    <Polar
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
