import React, {Component} from 'react';
import $ from "jquery";
import Lottie from 'react-lottie';
import * as animationData from './loader'

export default class Loader extends Component {
    componentWillMount() {
        $("body").addClass("loading");
    }

    componentWillUnmount() {
        $("body").removeClass("loading");
    }

    render() {

        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (

            <div className="loadingPanel">
                <Lottie options={defaultOptions} height={400}
                        width={400}/>
            </div>

        )
    }
}
