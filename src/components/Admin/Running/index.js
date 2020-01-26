import React, {Component} from 'react';
import jQuery from 'jquery';
import Order from '../Order';

export default class Running extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTicket: 0
        }

    }

    setTicket = (activeTicket) => {
        let windowHeight = jQuery(window).height() - 130; //130 px for header part
        let lengthoful = document.getElementById("here-now") && document.getElementById("here-now").getElementsByTagName("li").length;
        let liHeight = jQuery("#here-now")[0] && jQuery("#here-now li").height();
        let hereNowHeight = jQuery("#here-now")[0] && ((liHeight * lengthoful));

        if (hereNowHeight > windowHeight - 50) {
            let hereNowUl = jQuery("#here-now li");
            let prevTicket = hereNowUl.slice(0, activeTicket);
            let currentTickets = hereNowUl.slice(activeTicket, activeTicket + 4);
            let lastTicket = hereNowUl.slice(activeTicket + 3, lengthoful);
            let ulHeight = Math.floor(hereNowHeight / lengthoful * 4);
            let remainHeight = windowHeight - ulHeight - 24 - 4 - 20; //24px for 8px of each margin bottom,4 px for bottom
            let marginSetValue = liHeight - remainHeight / (prevTicket.length + lastTicket.length - 1);
            let marginSet;
            if (marginSetValue < 60) {
                marginSet = "-" + (marginSetValue) + "px";
            } else {
                jQuery('.here-now-scroll').addClass('overflow-scroll');
                marginSet = "-60px";
            }
            let prevTicketLength = prevTicket.length;
            jQuery("#here-now li").each(function (i, data) {
                let bodyStyle = data.style;
                bodyStyle.removeProperty('position');
                bodyStyle.removeProperty('z-index');
                bodyStyle.removeProperty('opacity');
                bodyStyle.removeProperty('margin-bottom');
                bodyStyle.removeProperty('margin-top');
            });
            currentTickets.each(function (index, data) {
                currentTickets[index].style.marginBottom = '8px';
            });
            prevTicket.each(function (index, data) {
                prevTicket[prevTicketLength - (index + 1)].style.position = 'relative';
                prevTicket[prevTicketLength - (index + 1)].style.marginBottom = marginSet;
            });
            let lastTicketLength = lastTicket.length;
            lastTicket.each(function (index, data) {
                lastTicket[index].style.position = 'relative';
                lastTicket[index].style.zIndex = lastTicketLength - index;
                if (index !== 0) {
                    lastTicket[index].style.marginTop = marginSet;
                }
            });
        } else {
            jQuery("#here-now li").each(function (index, data) {
                if (lengthoful - 1 !== index) jQuery(this).css("margin-bottom", "8px");
            });
        }
    };

    handleChangeTicket = (activeTicket) => {
        let lengthoful = document.getElementById("here-now") && document.getElementById("here-now").getElementsByTagName("li").length;
        if (activeTicket > lengthoful - 4) {
            this.setState({currentTicket: lengthoful - 4});
        } else {
            this.setState({currentTicket: activeTicket});
        }
    };

    render() {
        const {orders} = this.props;
        return (
            <div className="col-lg-4 col-sm-12 col-md-6 card here-now">
                <div className="card-header" style={{backgroundColor:'#bf925d',color:'#000000'}}><span
                    className="item-number">{orders && (orders.length || 0)}</span>
                    <h3 className="sub-title">Running!</h3></div>
                <div className="card-body here-now-scroll">
                    <ul id="here-now">
                        {orders && orders.map((data, index) => (
                            <Order
                                key={data.id}
                                order={data}
                                currentElement={index}
                                handleChangeTicket={this.handleChangeTicket}
                            />
                        ))}
                    </ul>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        this.setTicket(this.state.currentTicket);
    }

}
