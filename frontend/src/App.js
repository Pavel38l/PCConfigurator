import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserComponent from "./components/UserComponent";
import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Profile from "./components/Profile";
import JourneyEdit from "./components/JourneyEdit";


function App() {
  return (
      <div>
          <Router>
              <Header />
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/users" component={UserComponent} />
                  <Route exact path="/profile/:id" component={Profile} />
                  <Route exact path="/journeyEdit" component={JourneyEdit} />
              </Switch>
          </Router>
      </div>



  );
}

export default App;
