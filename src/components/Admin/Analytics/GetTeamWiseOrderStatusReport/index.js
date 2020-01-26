import React, {Component} from 'react';
import DataNotFound from '../DataNotFound';
import ChartLoader from '../../Helper/ChartLoader';
import {Radar} from 'react-chartjs-2';


export default class GetTeamWiseOrderStatusReport extends Component {

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
            labels: ['waiting', 'process', 'late', 'finish'],
            datasets: []
        };

        this.props.getTeamWiseOrderStatusReport.map((options) => {

            let SingleDatasets = {
                label: `${options.user.first_name} ${options.user.last_name}`,
                backgroundColor: this.random_rgba(),
                borderColor: this.random_rgba(),
                pointBackgroundColor: this.random_rgba(),
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: this.random_rgba(),
                data: []
            };

            options.orderStatus.map((singleRecords) => {
                SingleDatasets.data.push(singleRecords.total);
            });

            data.datasets.push(SingleDatasets);
            visible = true;

        });

        return (
            <div>
                <div className="col-lg-6 col-xs-12 col-sm-12 avg-wait-time-report">
                    <div className="analytics-chart-modal">
                        <div className="analytics-chart-header">
                            <div className="chart-title">
                                <span>Team Wise Order Status</span>
                            </div>
                            <div className="chart-tools">
                            </div>
                        </div>
                        <div className="analytics-chart-body">
                            {this.props.loading ? <ChartLoader/> :
                                visible ?
                                    <Radar
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
