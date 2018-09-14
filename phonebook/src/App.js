import React, {Component} from 'react';

import './App.css';
import './Footer/Footer.css';
import './Body/Body.css';
import '../node_modules/semantic-ui-css/semantic.css';

import Header from './Header/Header';
import Body from './Body/Body';
import Footer from './Footer/Footer';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <Body/>
                <Footer/>
            </div>
        );
    }
}

export default App;