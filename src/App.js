import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import './App.css';
import Home from './Containers/Home';
import Timer from './Components/Timer';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props}/>}/>
          <Route exact path="/timer" render={(props) => <Timer {...props}/>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
