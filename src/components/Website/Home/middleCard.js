import React, {Component} from 'react';

class MiddleCard extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <section className="welcome">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-4 pl-0 pr-0">
                                <div className="img1">
                                    <div className="main_text"></div>
                                </div>
                            </div>
                            <div className="col-md-4 pl-0 pr-0">
                                <div
                                    className="d-flex flex-column justify-content-center align-items-center h-100 text-center p-4 welcome_content">
                                    <div className="text-center d-flex flex-column logo_area mb-3">
                                        <i className="fa fa-camera"></i>
                                        <span>Saffron</span>
                                    </div>
                                    <span className="welcome_text">Welcome to our salon</span>
                                    <p className="mt-3">A small river named Duden flows by their place and supplies it
                                        with
                                        the necessary regelialia. It is a paradisematic country, in which roasted parts
                                        of sentences fly into your mouth. Far far away, behind the word mountains, far
                                        from the countries Vokalia and Consonantia, there live the blind texts.</p>
                                </div>
                            </div>
                            <div className="col-md-4 pl-0 pr-0">
                                <div className="img2">
                                    <div className="main_text"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default MiddleCard;
