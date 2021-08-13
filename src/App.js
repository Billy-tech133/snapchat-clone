import React from 'react';
import './App.css';
import Preview from "./Preview";
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="app-body">
          <Switch>
            <Route  path="/preview">
              <Preview />
            </Route>
            <Route path="/" exact>
              <WebcamCapture />
            </Route>
          </Switch>
        </div>
      </Router>
      <WebcamCapture />
    </div>
  );
}

export default App;
