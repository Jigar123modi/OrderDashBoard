import React, {Component} from 'react';
import DataNotFound from '../DataNotFound';
import ChartLoader from '../../Helper/ChartLoader';
import {Bar} from 'react-chartjs-2';


export default class TopUsersListReport extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        let data = {
            labels: [],
            datasets: [
                {
                    label: 'Total Order',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: []
                }
            ]
        };

        this.props.topUsers.map((options) => {
            data.labels.push(`${options.user.first_name} ${options.user.last_name}`);
            data.datasets[0].data.push(options.totalOrder);
        });

        return (
            <div>
                <div className="col-lg-6 col-xs-12 col-sm-12 avg-wait-time-report">
                    <div className="analytics-chart-modal">
                        <div className="analytics-chart-header">
                            <div className="chart-title">
                                <span>Top 10 Users</span>
                            </div>
                            <div className="chart-tools">
                            </div>
                        </div>
                        <div className="analytics-chart-body">
                            {this.props.loading ? <ChartLoader/> :
                                data.datasets[0].data.length > 0 ?
                                    <Bar
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
