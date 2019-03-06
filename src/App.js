import React, { Component } from 'react';
import ChamberSelector from './ChamberSelector'
import CongressMemberSelector from './CongressMemberSelector'
import CongressMemberDetail from './CongressMemberDetail'
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <>
          <Route path="/" exact component={ChamberSelector} />
          <Route path="/:chamber" exact component={CongressMemberSelector} />
          <Route path="/:chamber/:memberId" component={CongressMemberDetail} /> 
        </>
      </Router>
    );
  }
}

export default App;
