import React, {Component} from 'react';
import {connect} from "react-redux";
import ModifySelectedUser from "../Modify/Modify";
import './Search.css';

class search extends Component {

    allUsers;
    constructor(props){
        super();
        this.allUsers = props.all;
    }

    render(){
        let modifyElements;
        if(this.props.selectedUser != null){
            modifyElements = <ModifySelectedUser item={this.props.selectedUser}/>
        }

        return (
            <body>
                <div id="myModal" className="modal"> {modifyElements} </div>

                <div className="SearchDiv">
                    <div>Search User:</div>
                    <input type="text" onChange={this.props.modifyName.bind(this, "newUser")} placeholder='Write name to search'/>
                </div>

                <table>
                    <thead className="tableHeader">
                    <th>Name:</th>
                    <th>Phone:</th>
                    <th>Age:</th>
                    <th ><button className='addButton' onClick={this.props.modifyUser.bind(this)}>ADD</button></th>
                    </thead>
                    <tbody className="tableBody">
                    {this.allUsers.map(item => {
                        return (
                            <tr data={item}>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.age}</td>
                                <td className='modifyButton' onClick={this.props.modifyUser.bind(this, item)} id='modifyBtn' ><button>Modify</button></td>
                            </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </body>
        )
    }
}

//ezzel kötöd hozzá a reduxos state-t a props-hoz
const mapStateToProps = state => {
    return {
        selectedUser: state.selectedUser,
        newUser: state.person
    }
};

//küldő
const mapDispatchToProps = dispatch => {
    return {
        //To search user
        modifyName: (name) => {
            console.log('SEARCH Dispatch',name.target.value);
            dispatch({type:'SEARCH NAME', searchname:name.target.value});
        },
        //To modify user
        modifyUser: (selectedUser) => {
            console.log(selectedUser);
            dispatch({type: 'MODIFY USER', selectedUser: selectedUser});
            document.getElementById('myModal').style.display = "block"

        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(search);

/*const searchi =(props) =>{
        return (
            <div id="myModal" className="modal"> {props.modifyUser} </div>,

            <div>
                <div>Search User:</div>
                <input type="text" onChange={props.modifyName.bind(this)} placeholder='Write name to search'/>
            </div>,

            <table>
                <thead className="tableHeader">
                <th>Name:</th>
                <th>Phone:</th>
                <th>Age:</th>
                <th ><button className='addButton'>ADD</button></th>
                </thead>
                <HomePageBody allUser={this.allUsers}/>
            </table>
        )
};*/

