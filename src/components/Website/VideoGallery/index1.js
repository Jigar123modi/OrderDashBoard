import React, {Component} from 'react';
import {Player} from 'video-react';
import "video-react/dist/video-react.css";

class VideoGallery extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <center>
                    <br/>
                    <div style={{width: "50%", height: "50%"}}><Player
                        playsInline
                        poster="/assets/Images/01.jpg"
                        src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    /></div>
                </center>
            </div>
        )
    }

}

export default VideoGallery;