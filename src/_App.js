import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AppBar from 'material-ui/AppBar';

import { Scrollbars } from 'react-custom-scrollbars';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class App extends Component {
  render() {
    return (
      <div className="App">

        <Scrollbars style={{height:300,width:200,}} >
          <AppBar 
              title={`รายละเอียดสินค้า`}
              titleStyle={{
                  fontSize:16, marginTop:-10,
              }}
              style={{ height: "48px" }}
              iconStyleLeft={{display:'none'}}
          />
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
        </Scrollbars>
      </div>
    );
  }
}

export default App;
