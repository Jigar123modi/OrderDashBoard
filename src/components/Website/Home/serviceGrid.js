import React, {Component} from 'react';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import Slider from "react-slick";

class ServiceGrid extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const settings = {
            dots: true,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            rtl: true
        };
        return (
            <div>
                {/*<div>*/}
                {/*<div className="container mt-40">*/}
                {/*<h3 className="text-center"></h3>*/}
                {/*<div className="row mt-30">*/}
                {/*{this.props.serviceList.length > 3 ? <Slider {...settings}>*/}
                {/*{this.props.serviceList.map((service, index) => (*/}
                {/*<div className="col-md-4 col-sm-6" key={index}>*/}
                {/*<div className="box16">*/}
                {/*<img src={ENVIRONMENT_VARIABLES.PHOTO_URL + service.image_url}/>*/}
                {/*<div className="box-content">*/}
                {/*<h3 className="title">{service.name}</h3>*/}
                {/*<span className="post">{service.description}</span>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*))}*/}
                {/*</Slider> :*/}
                {/*this.props.serviceList.map((service, index) => (*/}
                {/*<div className="col-md-4 col-sm-6" key={index}>*/}
                {/*<div className="box16">*/}
                {/*<img src={ENVIRONMENT_VARIABLES.PHOTO_URL + service.image_url}/>*/}
                {/*<div className="box-content">*/}
                {/*<h3 className="title">{service.name}</h3>*/}
                {/*<span className="post">{service.description}</span>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*))*/}
                {/*}*/}
                {/*</div>*/}
                {/*</div>*/}
                {/*</div>*/}

                <section className="service pt-5 pb-5">
                    <div className="container">
                        <div className="title_content text-center mb-5">
                            <span className="title">Service Menu</span>
                            <p className="sub_title pt-3">Far far away, behind the word mountains, far from the
                                countries
                                Vokalia and Consonantia</p>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="text-center p-3 main_box">
                                    <div className="mb-1">
                                        <i className="fa fa-camera-retro"></i>
                                    </div>
                                    <span>Photography</span>
                                    <p className="mt-2">A small river named Duden flows by their place and supplies.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center p-3 mt-sm-0 mt-3 main_box">
                                    <div className="mb-1">
                                        <i className="fa fa-picture-o"></i>
                                    </div>
                                    <span>Haricut &amp; Styling</span>
                                    <p className="mt-2">A small river named Duden flows by their place and supplies.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="text-center p-3 mt-sm-0 mt-3 main_box">
                                    <div className="mb-1">
                                        <i className="fa fa-video-camera"></i>
                                    </div>
                                    <span>Haricut &amp; Styling</span>
                                    <p className="mt-2">A small river named Duden flows by their place and supplies.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        )
    }
}

export default ServiceGrid;
