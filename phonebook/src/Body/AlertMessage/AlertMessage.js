import React, {Component} from 'react'
import {Button, Modal} from 'semantic-ui-react'
import axios from "axios";
import {connect} from "react-redux";
import './AlertMessage.css';
import config from '../../Config/config'

class AlertMessage extends Component {

    state = {
        open: true
    };
    deleteID;
    userData;
    deletedUser = false;
    message = "Are you sure you want to save your modification?";

    constructor(props) {
        super();
        this.deleteID = props.deleteId;
        this.userData = props.item;
        this.deletedUser = props.deletedUser;
        this.messageValue();
    }

    messageValue() {
        if (this.deletedUser) {
            this.message = "Are you sure you want to delete this user?"
        }
    }

    userManager(id) {
        if (this.deletedUser) {
            this.deleteUser(id);
        }
        else {
            this.editUser()
        }
    }

    buttonManager(){
        if (this.deletedUser) {
            this.props.clickDeleteCloseButton(this);
        }
        else{
            this.props.clickCloseButton(this);
        }
    }

    editUser() {
        let newPerson =
            {
                username: this.userData.name,
                phone: this.userData.phone,
                age: this.userData.age
            };

        if (this.props.userType === 'modify') {
            axios.put(config.basicNodeUrl + '/api/user/' + this.props.modifyPerson.id, newPerson)
                .then(res => {
                    this.props.clickYesButton(this);
                    console.log('Update', res)
                })
                .catch((err) => {
                    console.log(err);
                })

        }

        if (this.props.userType === 'create') {
            axios.post(config.basicNodeUrl + '/api/user', newPerson)
                .then(res => {
                    this.props.clickYesButton(this);
                    console.log('Create', res);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }

    deleteUser(id) {
        axios.delete(config.basicNodeUrl + '/api/user/' + id)
            .then((res) => {
                this.props.clickYesButton(this);
                console.log('Deleted', res.data.items);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    render() {
        const {open} = this.state;
        return (
            <div>
                <Modal size='mini' open={open} onClose={this.props.clickCloseButton.bind(this)} id='alertModal' closeOnEscape={false}>
                    <Modal.Header>{this.message}</Modal.Header>
                    <Modal.Actions>
                        <Button negative onClick={this.buttonManager.bind(this)}>No</Button>
                        <Button positive onClick={this.userManager.bind(this, this.deleteID)}
                                id='deleteYesButton'> Yes </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

//ezzel kötöd hozzá a reduxos state-t a props-hoz
const mapStateToProps = state => {
    return {
        userType: state.userType,
        modifyPerson: state.modifyPerson,
    }
};

//küldő
const mapDispatchToProps = dispatch => {
    return {
        clickCloseButton: () => {
            dispatch({type: 'CLICK CLOSE', alertOpened: 'none', modalOpened: true});
        },
        clickYesButton: () => {
            dispatch({type: 'CLICK CLOSE', alertOpened: 'none', modalOpened: false, refreshPage: true});
        },
        clickDeleteCloseButton: () => {
            dispatch({type: 'CLICK CLOSE', alertOpened: 'none', modalOpened: false});
        },
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(AlertMessage);