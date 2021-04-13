import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserComponent from "./components/UserComponent";
import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import jwtdecoder from 'jwt-decode';
import Registration from "./components/Registration";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Profile from "./components/Profile";
import JourneyEdit from "./components/JourneyEdit";

class App extends React.Component {
    constructor(props) {
        super(props);
        let title = (localStorage.getItem("token")) ? jwtdecoder(localStorage.getItem("token")).sub : "user name";
        this.state = {
            title: title
        }
    }
    upTitle = (title) =>{
        this.setState({title:jwtdecoder(title).sub})
    }
    render(){
        return (
      <div>
          <Router>
              <Header title={this.state.title} />
              <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/users" component={UserComponent} />
                  <Route exact path="/profile/:id" component={Profile} />
                  <Route exact path="/journeyEdit" component={JourneyEdit} />
                  <Route exact path="/login" render={()=><Login upTitle={this.upTitle}/>} />
                  <Route exact path="/registration" component={Registration} />

              </Switch>
          </Router>
      </div>



     );
    }
}
export default App;

