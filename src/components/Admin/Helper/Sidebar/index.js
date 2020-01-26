import React, {Component} from 'react';
import {Drawer, List, ListItem, Divider} from 'material-ui';
import {Link} from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import decode from 'jwt-decode';
import NotificationSystem from 'react-notification-system';

import * as websiteAction from '../../../../actions/websiteAction';

import './Sidebar.css';

const stylesDrawer = {
    containerStyle: {
        backgroundColor: '#1f2b3e',
        color: "#fff"
    }
};

const stylesMenu = {
    style: {
        color: "#fff",
        borderBottom: '1px solid #fff'
    },
    innerDivStyle: {
        padding: 20
    }
};

const ListStyles = {
    style: {
        textAlign: 'center',
        color: '#99aecf'
    }
};

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: props.open,
            notificationSystem: null,
        };
    }

    handleLogout = () => {
        this.props.actions.websiteAction.loggedOut();
    };

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 3
        });
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };


    render() {
        const userProfile = decode(localStorage.getItem("accessToken"));
        const userRole = userProfile.user && userProfile.user.role;
        return (
            <div className="side-menu">
                <NotificationSystem ref="notificationSystem"/>
                <Drawer
                    className="menu-drawer"
                    open={this.state.open} containerStyle={stylesDrawer.containerStyle} docked={false}
                    onRequestChange={this.props.closeNav}>
                    <List style={{padding: 0}}>
                        <ListItem className="text-center" style={{color: "#fff", backgroundColor: "#bf925d"}}
                                  innerDivStyle={stylesMenu.innerDivStyle}>
                            <span><img src="/assets/Images/DB_Logo.png" alt="" style={{width: 120}}/></span>
                            <span onClick={this.props.closeNav}><i className="fa fa-times"
                                                                   style={{position: 'absolute', right: 10, top: 10}}/> </span>
                        </ListItem>
                        <div className="menu-left">
                            <Link to="/Dashboard" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-home"/>
                                    <div style={{marginTop: 10}} className="link-hover">Home</div>
                                </ListItem>
                            </Link><Divider/>
                            {userRole.toLowerCase() === "admin" &&
                            <span>
                                <Link to="/Dashboard/ManageService" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-cog"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Services</div>
                                </ListItem>
                            </Link> <Divider/>
                                <Link to="/Dashboard/ManageGallery" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-cogs"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Gallery's</div>
                                </ListItem>
                            </Link> <Divider/>
                                <Link to="/Dashboard/ManageVideo" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-film"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Videos</div>
                                </ListItem>
                            </Link> <Divider/>
                                <Link to="/Dashboard/ManageProducts" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-database"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Products</div>
                                </ListItem>
                            </Link><Divider/>
                                <Link to="/Dashboard/ManageTeamMemberProduct" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-database"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage TeamMember Products</div>
                                </ListItem>
                            </Link><Divider/>
                                <Link to="/Dashboard/ManageTeam" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-users"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Teams</div>
                                </ListItem>
                            </Link> <Divider/>
                                <Link to="/Dashboard/ManageUser" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-user"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Users</div>
                                </ListItem>
                            </Link> <Divider/>
                                <Link to="/Dashboard/ManageSliderImage" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-file-image-o"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Sliders</div>
                                </ListItem>
                            </Link> <Divider/>
                                <Link to="/Dashboard/ManageTimeSlot" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-calendar"/>
                                    <div style={{marginTop: 10}} className="link-hover">Manage Time Slots</div>
                                </ListItem>
                            </Link> <Divider/>
                                <Link to="/Dashboard/Analytics" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-pie-chart"/>
                                    <div style={{marginTop: 10}} className="link-hover">Analisys</div>
                                </ListItem>
                            </Link><Divider/>
                                </span>}
                            <Link to="/Dashboard/Profile" className="link">
                                <ListItem className="sidebar-list" style={ListStyles.style}>
                                    <i className="fa fa-user-circle-o"/>
                                    <div style={{marginTop: 10}} className="link-hover">Setting</div>
                                </ListItem>
                            </Link><Divider/>
                        </div>
                    </List>
                    <Divider/>
                    <List className="logout-list">
                        <Link onClick={this.handleLogout} className="link" >
                            <ListItem className="sidebar-list bg_color_logout" style={ListStyles.style}>
                                <i className="fa fa-power-off"/>
                                <div style={{marginTop: 10}} className="link-hover">Logout</div>
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </div>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    actions: {
        websiteAction: bindActionCreators(websiteAction, dispatch)
    }
});

export default connect(null, mapDispatchToProps)(Sidebar)
