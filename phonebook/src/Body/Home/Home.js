import React from 'react';
import {connect} from "react-redux";
import './Home.css';


const home = (props) => {
    return (
        <body>
            HOME PAGE
        </body>
    )
};



export default connect(null,mapDispatchToProps)(home);
