import React, {Component} from 'react';

import './App.css';
import './Footer/Footer.css';
import './Body/Body.css';

import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';
import {connect} from "react-redux";

class App extends Component {

    state = {
        persons: [
            { id:'1', name: 'Max', phone:"06-90/654-5665", age: 28 },
            { id:'2', name: 'Manu', phone:"06-90/654-5665", age: 29 },
            { id:'3', name: 'Stephanie', phone:"06-90/654-5665", age: 26 }
        ],
        showPerson: true
    };



    render() {
        if(this.props.searchName != null){
            return (
                <div className="App">
                    <Header />
                    <div>NEM vagyok üres</div>
                    <Footer />
                </div>
            );
        }


        return (
            <div className="App">
                <Header />
                <Body all={this.state.persons} />
                <Footer />
            </div>
        );
    }
}

//ezzel kötöd hozzá a reduxos state-t a props-hoz
const mapStateToProps = state => {
    //console.log("PAGE", state);
    return {
        searchName: state.searchName
    }
};

export default connect(mapStateToProps,null)(App);
