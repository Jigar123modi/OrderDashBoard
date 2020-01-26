import React from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import ImageLoader from 'react-load-image';

class ImageGrid extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="gallery pt-5">
                    <div className="container-fluid">
                        <div className="title_content text-center">
                            <span className="title">Gallery</span>
                        </div>
                        <div className="row">
                            {this.props.galleryList.map((gallery, index) => (
                                <div className="col-md-3 px-0" key={index}>
                                    <div className="main_img_box">
                                        <ImageLoader
                                            src={ENVIRONMENT_VARIABLES.PHOTO_URL + gallery.image_url}>
                                            <img className="img-fluid" alt="image"/>
                                            <img src="/assets/Images/NoImages.png" style={{height: '50px', width: '50px'}}
                                                 alt="image" />
                                            <img src="/assets/Images/s_loader.gif" style={{height: '50px', width: '50px'}}
                                                 alt="image" />
                                        </ImageLoader>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default ImageGrid;
