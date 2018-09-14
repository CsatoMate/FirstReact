import React, {Component} from 'react';
import './Modify.css';
import {connect} from "react-redux";
import {Icon, Button, Label} from 'semantic-ui-react'

import {Form, Input} from 'formsy-semantic-ui-react';

class modifySelectedUser extends Component {

    selectedPerson;

    constructor(props) {
        super();
        this.selectedPerson = props.item;
        this.state = {
            name: this.selectedPerson.name,
            phone: this.selectedPerson.phone,
            age: this.selectedPerson.age,
            id: this.selectedPerson.id,

            canSubmit: false
        };
    }

    setHandlerName(event) {
        this.setState({
            ...this.state,
            name: event.target.value
        });
    }

    setHandlePhone(event) {
        this.setState({
            ...this.state,
            phone: event.target.value
        });
    }

    setHandleAge(event) {
        this.setState({
            ...this.state,
            age: event.target.value
        });
    }

    enableButton() {
        this.setState({
            ...this.state,
            canSubmit: true
        });
    }

    disableButton() {
        this.setState({
            ...this.state,
            canSubmit: false
        });
    }

    submit(state) {
        this.props.clickSaveButton(state)
    }

    render() {
        const errorLabel = <Label color="red" pointing="left"/>;
        return (
            <div id="myModal" className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <Icon name='close' size='large' className="close"
                              onClick={this.props.clickCloseButton.bind(this)}/>
                        <Label basic size='massive' className="editLabel">Edit User:</Label>
                    </div>
                    <div className="modal-body">
                        <Form onValidSubmit={this.submit.bind(this, this.state)} onValid={this.enableButton.bind(this)}
                              onInvalid={this.disableButton.bind(this)}>
                            <Label basic size='large' className="modifyLabel">Name:</Label>
                            <br/>
                            <Input name='name'
                                   validations="isSpecialWords,minLength:3"
                                   validationErrors={{
                                       isSpecialWords: 'Only letters',
                                       isDefaultRequiredValue: 'Name is Required',
                                       minLength: 'Min length 3 character'
                                   }}
                                   errorLabel={errorLabel}
                                   required
                                   instantValidation
                                   defaultValue={this.state.name}
                                   onChange={this.setHandlerName.bind(this)}/>

                            <Label basic size='large' className="modifyLabel">Phone:</Label>
                            <br/>
                            <Input name='phone'
                                   errorLabel={errorLabel}
                                   validations={{matchRegexp: /^\+\d{2}-\d{2}\/\d{3}-\d{4}$/}}
                                   validationErrors={{
                                       isDefaultRequiredValue: 'Phone is Required',
                                       matchRegexp: 'Phone number format: +XX-XX/XXX-XXXX'
                                   }}
                                   defaultValue={this.state.phone}
                                   placeholder='+36-90/444-8877'
                                   required
                                   onChange={this.setHandlePhone.bind(this)}/>


                            <Label basic size='large' className="modifyLabel">Age:</Label>
                            <br/>
                            <Input name='age'
                                   validations='isNumeric'
                                   validationErrors={{
                                       isNumeric: 'Only umber',
                                       isDefaultRequiredValue: 'Age is Required'
                                   }}
                                   errorLabel={errorLabel}
                                   required
                                   instantValidation
                                   defaultValue={this.state.age}
                                   onChange={this.setHandleAge.bind(this)}/>

                            <div className="modal-footer">
                                <Button type="submit"
                                        className="saveButton"
                                        disabled={!this.state.canSubmit}>
                                    <Icon name='save'/> SAVE
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}

//küldő
const mapDispatchToProps = dispatch => {
    return {
        clickSaveButton: (person) => {
            dispatch({type: 'SAVE MODIFY', modifyPerson: person, refreshPage: true, alertOpened: 'edit'});
        },
        clickCloseButton: () => {
            dispatch({type: 'CLICK CLOSE', modalOpened: false})
        }
    }
};

export default connect(null, mapDispatchToProps)(modifySelectedUser);