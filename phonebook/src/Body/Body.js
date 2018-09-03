import {connect} from "react-redux";
import React, {Component} from 'react';
import SearchPage from "./Search/Search";
//import HomePageBody from "./Home/Home"

class bodyPage extends Component{

    allUsers;
    constructor(props){
        super();
        this.allUsers = props.all;
    }

    render(){
        let dynamicElement=<br />;

        switch(this.props.page){
            case "home":
                dynamicElement=<div>Hello Visitor</div>;
                break;
            case "management":
                dynamicElement=<SearchPage all={this.allUsers} />;
                break;
            case "modify":
                dynamicElement=<div>MODIFY page</div>;
                break;
            default:
                dynamicElement= <div>Hello Visitor</div>;
                break;
        }

        return (
            <main>
                {dynamicElement}
            </main>

        )
    }
}

//ezzel kötöd hozzá a reduxos state-t a props-hoz
const mapStateToProps = state => {
    return {
        page: state.page,
        selectedUser: state.selectedUser
    }
};

export default connect(mapStateToProps,null)(bodyPage);
