import React, {Component} from 'react';

export default class DataNotFound extends Component {
    render(){
        return(
            <div className="not-found">
                <div className="error-img-wrapper">
                    <img src="/assets/Images/nodata.png" alt="Oops..No Data Found" />
                </div>
            </div>
        )
    }
}
