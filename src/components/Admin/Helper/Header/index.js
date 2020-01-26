import React, {Component} from 'react';
import moment from 'moment';
import SidebarComponent from '../Sidebar/index';
import './Header.css';

export default class Header extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            time:"Loading....",
            timeZone:'Asia/Kolkata'
        }
    }

    openNav = () =>{
        this.setState({open:true});
    };

    closeNav = () => {
        this.setState({open:false});
    };

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    };

    tick() {
        this.setState({
            time: this.getDateGMTChangeStore(this.state.timeZone)
        });
    }

    getDateGMTChangeStore = (timeZone) => {
        return moment().tz(timeZone).format("DD-MM-YYYY HH:mm:ss a");
    };


    render(){
        if (this.state.time.toString().includes("12:10:00 pm")) {
            window.location.reload();
        }
        return(
            <div className="form-header">
                {this.state.open && <SidebarComponent closeNav={this.closeNav} open={this.state.open}/>}
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="header-logo d-flex justify-content-between">
                                <div>
                                {!this.props.isNotFound && <a onClick={this.openNav}><i className="fa fa-bars fa-2x" style={{color: '#fff', padding: '5px 10px', verticalAlign: 'middle',cursor: 'pointer'}}/></a>}
                                <img src="/assets/Images/DB_Logo.png" alt="" style={{width:120}}/>
                                </div>
                                <ul className="nav navbar-nav navbar-right pr-4" style={{color:'#fff',fontSize:'2vw'}}>
                                    <li className="sub-title">Time - {this.state.time} </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

