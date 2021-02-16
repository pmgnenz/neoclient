import React, { Component } from "react"
import doshi from './doshi-logo.64e5832c.png'
import './common.css';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
} from "react-router-dom";
import view2 from './view2.js';
import home from "./home";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          apiResponse: []
          //header: [],
          //rows:[] 
       };

    }
    
    render(){
    return (
      <Router>
      <div className="App">

      <header className="headerid"> 
        <img src ={doshi} alt = "doshi-logo" width="30%" />   
        </header>
      
        <ul className="menu-bar">
          <li>
          <NavLink exact activeClassName="active" to="/" className="normal">Home</NavLink>
          </li>
          <li>
          <NavLink exact activeClassName="active" to="/view2" className="normal"> view2</NavLink>
          </li>
      </ul>
             <hr/>     
              <Switch>
                <Route exact path="/" component={home} />
                <Route
                    path="/view2"
                    component={view2} 
                />
        </Switch>
      
      </div>
      </Router>
    );
  }
  }

export default App;
