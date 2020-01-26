import React, {Component} from 'react';
import * as websiteAction from "../../../actions/websiteAction";
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';
import {connect} from "react-redux";

class VideoGalleryMain extends Component {

    componentDidMount() {
        this.props.actions.websiteAction.basketVisible(true);
        window.scrollTo(0, 0);
    }

    render() {
        return (
            <div>
                <h4> Child Router </h4>
                <Link to="/VideoGallery/demo" className="link"> click here </Link>
                {this.props.children}
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(VideoGalleryMain);