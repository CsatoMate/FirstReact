import React, {Component} from 'react';
import {connect} from "react-redux";
import ModifySelectedUser from "../Modify/Modify";
import AlertMessage from '../AlertMessage/AlertMessage';
import './Search.css';
import axios from "axios";
import {Button, Icon, Input, Label, Form} from "semantic-ui-react";
import {orderBy} from "lodash"
import config from '../../Config/config'

class search extends Component {

    lastSearch;

    constructor() {
        super();
        this.state = {
            receivedPerson: null,
            name: null,
            refreshPage: false,
        };
    }

    componentDidMount() {
        this.usersReload()
    }

    setHandlerName(event) {
        let searchValue = event.target.value;

        if (this.lastSearch !== searchValue) {
            if (searchValue !== null && this.state.receivedPerson !== null) {
                axios.get(config.basicNodeUrl + '/api/user/' + searchValue)
                    .then(res => {
                        let receivedPerson = [];
                        let sortedList = orderBy(res.data.items, [user => user.username.toLowerCase()], ['asc']);
                        sortedList.map(item => {
                            return (
                                receivedPerson.push(
                                    {
                                        id: item.id,
                                        name: item.username,
                                        phone: item.phone,
                                        age: item.age
                                    })
                            )
                        });
                        this.setState({
                            ...this.state,
                            receivedPerson,
                        });
                        this.lastSearch = searchValue;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }
        }
    }

    usersReload() {
        /**
         * Return all users
         */
        axios.get(config.basicNodeUrl + '/api/user')
            .then(res => {
                let receivedPerson = [];

                let sortedList = orderBy(res.data.items, [user => user.username.toLowerCase()], ['asc']);
                sortedList.map(item => {
                    return (
                        receivedPerson.push(
                            {
                                id: item.id,
                                name: item.username,
                                phone: item.phone,
                                age: item.age
                            })
                    )
                });
                this.setState({
                    ...this.state,
                    refreshPage: false,
                    receivedPerson
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentWillReceiveProps() {
        this.usersReload();
    }

    render() {
        let modifyElements = null;
        let popUp = null;

        if (this.props.modalOpened) {
            modifyElements =
                <ModifySelectedUser item={this.props.selectedUser}/>
        }
        if (this.props.alertOpened === 'delete') {
            modifyElements =
                <AlertMessage deleteId={this.props.selectedUser.id} deletedUser={true}/>
        }

        if (this.props.alertOpened === 'edit') {
            popUp = <AlertMessage item={this.props.modifyPerson} deletedUser={false}/>
        }

        if (this.state.refreshPage) {
            this.usersReload();
        }

        let showedItems = [];
        if (this.state.receivedPerson !== null) {

            showedItems = this.state.receivedPerson.map(item => {
                return (
                    <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.age}</td>
                        <td className='modifyButton'
                            id='modifyBtn'>
                            <Button icon onClick={this.props.modifyUser.bind(this, 'modify', item)}><Icon
                                name='pencil alternate' color='teal'/></Button>
                        </td>
                        <td><Button icon className="deleteButton"
                                    onClick={this.props.clickDeleteButton.bind(this, item)}><Icon
                            name='trash alternate outline' color='teal'/></Button></td>
                    </tr>
                );
            });
        }

        return (
            <div>
                {modifyElements}
                {popUp}
                <Form.Field className="SearchDiv">
                    <Label basic size='large' className="searchLabel">Search User:</Label><br/>
                    <Input icon='search' className='searchInput' type="text" onChange={this.setHandlerName.bind(this)}
                           placeholder='Write name to search'/>
                </Form.Field>

                <table>
                    <thead className="tableHeader">
                    <tr>
                        <th>Name:</th>
                        <th>Phone:</th>
                        <th>Age:</th>
                        <th colSpan='2'>
                            <Button icon className='addButton'
                                    onClick={this.props.modifyUser.bind(this, 'create')}><Icon
                                name='add user' color='teal'/></Button>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="tableBody">
                    {showedItems}
                    </tbody>
                </table>
            </div>
        )
    }
}

//ezzel kötöd hozzá a reduxos state-t a props-hoz
const mapStateToProps = state => {
    return {
        selectedUser: state.selectedUser,
        modalOpened: state.modalOpened,
        refreshPage: state.refreshPage,
        alertOpened: state.alertOpened,
        modifyPerson: state.modifyPerson
    }
};

//küldő
const mapDispatchToProps = dispatch => {
    return {
        //To modify user
        modifyUser: (type, selectedUser) => {
            dispatch({type: 'MODIFY USER', selectedUser: selectedUser, modalOpened: true, userType: type});
        },
        clickDeleteButton: (selectedUser) => {
            dispatch({type: 'DElETE BUTTON', selectedUser: selectedUser, alertOpened: 'delete'});
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(search);



