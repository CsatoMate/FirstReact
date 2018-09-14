import React from 'react';
import './Header.css';

import {connect} from "react-redux";

const header = (props) => {
    return (
        <header>
            <div className="headerPanel" onClick={props.navigationPage.bind(this, 'home')}> Home</div>
            <div className="headerPanel" onClick={props.navigationPage.bind(this, 'management')}> User management</div>
            <div className="headerPanel" onClick={props.navigationPage.bind(this, 'modify')}> About</div>
        </header>
    )
};

//küldő
const mapDispatchToProps = dispatch => {
    return {
        navigationPage: (value) => {
            dispatch({type: 'NAVIGATION', actualPage: value})
        }
    }
};

export default connect(null, mapDispatchToProps)(header);

