import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import "react-photo-feed/library/style.css";
import * as websiteAction from '../../../actions/websiteAction';
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import {Dropdown} from 'semantic-ui-react';
import ImageLoader from 'react-load-image';

class Gallery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current_service: null,
            photos: [],
            loadThisPage: false
        }
    }

    componentWillMount() {
        if (this.props.serviceList.length > 0) {
            this.props.actions.websiteAction.getAllGallerys(this.props.serviceList[0].id);
        } else {
            this.setState({loadThisPage: true}, () => {
                this.props.actions.websiteAction.getWebsiteHome();
            });
        }
        this.props.actions.websiteAction.basketVisible(true);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.serviceList.length > 0 && this.state.loadThisPage) {
            this.setState({loadThisPage: false}, () => {
                this.props.actions.websiteAction.getAllGallerys(this.props.serviceList[0].id);
            });
        }
        this.setState({photos: nextProps.allGalleryList});
    }

    handleChangeService = (event, {value}) => {
        this.setState({current_service: value});
        if (value !== null) {
            this.props.actions.websiteAction.getAllGallerys(value);
        }
    };

    render() {
        const {photos,current_service} = this.state;
        let options = [];
        this.props.serviceList.map((service, index) => {
            let option = {
                text: service.title,
                value: service.id
            };
            options.push(option);
        });
        let placeHolder = options.length > 1 ? options[0].text : "Service Loading...";

        return (
            <div>
                <section className="gallery pt-5 pb-5" style={{marginTop: '80px'}}>
                    <div className="container-fluid">
                        <div className="title_content text-center">
                            <span className="title">Gallery</span>
                            <Dropdown style={{width: '60%', margin: '0 auto', marginBottom: '10px'}}
                                      placeholder={placeHolder} fluid selection options={options}
                                      onChange={this.handleChangeService}/>
                        </div>
                        <div className="row">
                            {photos.map((gallery, index) => (
                                <div className="col-md-3 px-0" key={index}>
                                    <div className="main_img_box">
                                        <ImageLoader
                                            src={ENVIRONMENT_VARIABLES.PHOTO_URL + gallery.image_url}>
                                            <img className="img-fluid" alt="Gallery Image"/>
                                            <img src="/assets/Images/NoImages.png" alt="Gallery Image" />
                                            <img src="/assets/Images/s_loader.gif" alt="Gallery Image" />
                                        </ImageLoader>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const {websiteReducer} = state;
    return {
        allGalleryList: websiteReducer.allGalleryList,
        serviceList: websiteReducer.serviceList,
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);