import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserComponent from "./components/UserComponent";
import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import EditTrip from "./components/EditTrip";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App() {
  return (
      <div>
          <Router>
              <Header />
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/users" component={UserComponent} />
                  <Route exact path="/edit_trip" component={EditTrip} />
              </Switch>
          </Router>
      </div>



  );
}

export default App;
