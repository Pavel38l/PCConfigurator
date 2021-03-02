import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserComponent from "./components/UserComponent";
import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
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
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/registration" component={Registration} />
              </Switch>
          </Router>
      </div>



  );
}

export default App;
