import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loader from '../../Helper/Loader';
import _ from 'lodash';
import {Dropdown} from 'semantic-ui-react';
import '../Helper/DeleteAlertCss/react-confirm-alert.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import * as teamProductManageAction from '../../../actions/teamProductManageAction'
import ENVIRONMENT_VARIABLES from "../../../environment.config";
import NotificationSystem from 'react-notification-system';
import * as teamAction from '../../../actions/teamAction';
import ImageLoader from 'react-load-image';

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {

    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};

const grid = 5;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? '#ffd204' : 'white',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'rgba(0,0,0,.87)',
    padding: grid,
    width: 250
});

class ManageTeamMemberProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            selected: [],
            notificationSystem: null,
            selectedTeamId: null,
            moveProductMove: false,
            minutes: []
        };
    }

    componentWillMount() {
        this.props.actions.teamMemberListAction.TeamList();
        this.props.actions.teamProductManageAction.ProductList();
    }

    id2List = {
        droppable: 'items',
        droppable2: 'selected'
    };

    getList = id => this.state[this.id2List[id]];

    productAddRemove = (source, destination, droppableSource, droppableDestination) => {
        this.setState({moveProductMove: true});
        let product = source[droppableSource.index];
        let findProduct = this.state.minutes.find((data) => data.productId === product.id);
        const approxTime = findProduct ? findProduct.approxTime : 0;

        let requestData = {
            id: this.state.selectedTeamId,
            product_id: product.id,
            approxTime: approxTime
        };
        let action = "addTeamProduct";

        if (droppableSource.droppableId === "droppable2") {
            let allMinutes = this.state.minutes;
            let minutes = [];
            for (let i = 0; i < 60; i++) {
                let text = "";
                if (i < 10)
                    text = "0";
                let option = {
                    text: text + i,
                    value: `${product.id},${i}`
                };
                minutes.push(option);
            }
            allMinutes.push({productId: product.id, minute: minutes, approxTime: 0});
            this.setState({minutes: allMinutes});
            action = "removeTeamProduct";
        }

        return this.props.actions.teamProductManageAction.TeamMemberProductAddRemove(requestData, action).then((response) => {
            var a = move(source, destination, droppableSource, droppableDestination);
            this.setState({moveProductMove: false});
            this.addNotifications(response.data.result, "success");
            return new Promise(function (resolve, reject) {
                resolve(a);
            });
        }).catch((err) => {
            this.setState({moveProductMove: false});
            this.addNotifications(err.message.toString(), "error");
            return new Promise(function (resolve, reject) {
                reject("fail");
            });
        });
    };

    onDragEnd = result => {
        const {source, destination} = result;

        // dropped outside the list
        if (!destination) {
            return;
        }

        if (source.droppableId === destination.droppableId) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );

            let state = {items};

            if (source.droppableId === 'droppable2') {
                state = {selected: items};
            }

            this.setState(state);
        } else {
            var _this = this;
            this.productAddRemove(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            ).then((result) => {
                _this.setState({
                    items: result.droppable,
                    selected: result.droppable2
                });
            });
        }
    };

    handleChangeTeamMember = (event, {value}) => {
        this.setState({selectedTeamId: value});
        this.props.actions.teamProductManageAction.TeamMemberProductList(value);
    };

    addNotifications = (message, level) => {
        this.state.notificationSystem.addNotification({
            message: message,
            level: level,
            autoDismiss: 1
        });
    };

    componentDidMount() {
        this.setState({notificationSystem: this.refs.notificationSystem});
    };

    componentWillReceiveProps(nextProps) {
        if ((!nextProps.Loading && nextProps.error_msg) || (!nextProps.teamListLoader && nextProps.teamListError_msg)) {
            this.addNotifications(nextProps.error_msg, "error");
        } else if (!nextProps.Loading && nextProps.success_msg !== 'Successfully fetched') {
            this.addNotifications(nextProps.success_msg, "success");
        }
        let AllProductList = _.cloneDeep(nextProps.allProductList);
        let allMinutes = [];

        AllProductList.map((item) => {
            let minutes = [];
            for (let i = 0; i < 60; i++) {
                let text = "";
                if (i < 10)
                    text = "0";
                let option = {
                    text: text + i,
                    value: `${item.id},${i}`
                };
                minutes.push(option);
            }
            allMinutes.push({productId: item.id, minute: minutes, approxTime: 0});
        });

        nextProps.teamProductList.map((teamProduct) => {

            let removeProduct = AllProductList.find((product) => product.id === teamProduct.id);
            let index = AllProductList.indexOf(removeProduct);
            AllProductList.splice(index, 1);

            removeProduct = allMinutes.find((product) => product.productId === teamProduct.id);
            index = allMinutes.indexOf(removeProduct);
            allMinutes.splice(index, 1);

        });
        this.setState({items: AllProductList || [], minutes: allMinutes});
        this.setState({selected: nextProps.teamProductList || []});
    }

    handleChangeServiceM = (event, {value}) => {
        const valueSplit = value.toString().split(',');
        let stateAllProducts = this.state.minutes;
        let stateProduct = stateAllProducts.find((data) => data.productId === valueSplit[0]);
        stateProduct.approxTime = valueSplit[1];
        value !== null && this.setState({minutes: stateAllProducts});
    };

    render() {
        let options = [];
        const {minutes} = this.state;
        this.props.teamList.map((team) => {
            let option = {
                text: team.first_name + " " + team.last_name,
                value: team.id
            };
            options.push(option);
        });
        let {selectedTeamId} = this.state;

        return (
            <div className="bg-burrito-image autofill-background">
                <NotificationSystem ref="notificationSystem"/>
                <div className="container tab-bg-container">
                    <div className="d-flex justify-content-between">
                    <h2> Manage products for team </h2>
                        <div className="w-25">
                    <Dropdown placeholder={"Select Team member"} fluid selection
                                  options={options}
                                  onChange={this.handleChangeTeamMember} className="pr-2"/>
                    </div>
                    </div>
                    {options.length > 0 && <div className="d-flex justify-content-around mt-4">
                        {selectedTeamId !== null && <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <div className="dropbox"
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.items.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>

                                                        <ImageLoader
                                                            src={ENVIRONMENT_VARIABLES.PHOTO_URL + item.image_url}>
                                                            <img className="img-fluid" style={{height: '50px', width: '50px'}}
                                                                 alt={item.title}/>
                                                            <img src="/assets/Images/NoImages.png" style={{height: '50px', width: '50px'}}
                                                                 alt={item.title} />
                                                            <img src="/assets/Images/s_loader.gif" style={{height: '50px', width: '50px'}}
                                                                 alt={item.title} />
                                                        </ImageLoader>
                                                        {item.title}
                                                        <Dropdown placeholder="Select ApproxTime" fluid
                                                                  selection
                                                                  options={(minutes.find((data) => data.productId === item.id)).minute}
                                                                  key={item.id}
                                                                  onChange={this.handleChangeServiceM}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>


                            <Droppable droppableId="droppable2">
                                {(provided, snapshot) => (
                                    <div className="dropbox"
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {this.state.selected.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {item.image_url !== undefined ? (
                                                            <img src={ENVIRONMENT_VARIABLES.PHOTO_URL + item.image_url}
                                                                 width="50px"
                                                                 height="50px"/>) : (
                                                            <img
                                                                src={ENVIRONMENT_VARIABLES.PHOTO_URL + "images/UserAvatar/demo.png"}
                                                                width="50px"
                                                                height="50px"/>)}
                                                        {item.title}
                                                        {(minutes.find((data) => data.productId === item.id)) ? (minutes.find((data) => data.productId === item.id)).approxTime : (item.approxTime)}
                                                        mins
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>}
                    </div>}
                </div>
                {(this.props.Loading || this.props.teamListLoader || this.state.moveProductMove) && <Loader/>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    const {manageTeamProductReducer, manageTeamReducer} = state;
    return {
        Loading: manageTeamProductReducer.Loading,
        error_msg: manageTeamProductReducer.error_msg,
        success_msg: manageTeamProductReducer.success_msg,
        teamProductList: manageTeamProductReducer.teamProductList,
        teamList: manageTeamReducer.teamList,
        teamListLoader: manageTeamReducer.Loading,
        teamListError_msg: manageTeamReducer.error_msg,
        allProductList: manageTeamProductReducer.allProductList
    };
};

const mapDispatchToProps = dispatch => ({
    actions: {
        teamProductManageAction: bindActionCreators(teamProductManageAction, dispatch),
        teamMemberListAction: bindActionCreators(teamAction, dispatch),
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeamMemberProduct);
