import React, {Component} from 'react';
import {connect} from 'react-redux';
import ImageGrid from './imageGrid';
import HappyClient from './happyClient';
import ServiceGrid from './serviceGrid';
import MiddleCard from './middleCard';
import Team from './team';
import {bindActionCreators} from "redux";
import * as websiteAction from "../../../actions/websiteAction";

class Home extends Component {

    componentDidMount() {
        this.props.actions.websiteAction.basketVisible(true);
    }

    render() {
        return (
            <div className="mt-5 pt-md-4 pt-3">
                <div className="overlay"></div>
                <video playsInline="playsinline" autoPlay="autoplay" muted="muted" className="w-100" loop="loop">
                    <source src="assets/Video/saffron.webm" type="video/webm"/>
                </video>
                <ServiceGrid serviceList={this.props.serviceList}/>
                <MiddleCard/>
                <ImageGrid galleryList={this.props.galleryList}/>
                <HappyClient/>
                <Team teamList={this.props.teamList}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        teamList: websiteReducer.teamList,
        serviceList: websiteReducer.serviceList,
        galleryList: websiteReducer.galleryList,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

