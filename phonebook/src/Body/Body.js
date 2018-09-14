import {connect} from "react-redux";
import React, {Component} from 'react';
import UserManagementPage from "./Search/Search";
import HomePage from "./Home/Home";

class bodyPage extends Component {

    render() {
        let dynamicElement = <br/>;

        switch (this.props.page) {
            case "home":
                dynamicElement = <HomePage/>;
                break;
            case "management":
                dynamicElement = <UserManagementPage/>;
                break;
            case "modify":
                dynamicElement = <div>About page</div>;
                break;
            default:
                dynamicElement = <div>Hello Visitor</div>;
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
    }
};

export default connect(mapStateToProps, null)(bodyPage);
