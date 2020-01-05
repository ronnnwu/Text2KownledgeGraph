import React from 'react'; 
import './App.css';
import About from './About'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Home'
import logo from './logo.png'

function App() {
  return (
    <Router>
      <header>
      <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <span className="navbar-item" >
          <Link to="/">
            <img src={logo} alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" width="140"/>
          </Link>
          </span>
        </div>
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <span className="navbar-item">
              <Link to="/" style={{color:"white"}}>Home</Link>
            </span> 
            <span className="navbar-item">
              <Link to="/about" style={{color:"white"}}>About</Link>
            </span>
          </div>
        </div>
      </nav>
      </header>
         <Switch>
              <Route path="/about">
                <About />
              </Route>
              <Route path="/">
                <Home />
              </Route>
          </Switch>
      </Router>
  );
}

export default App;
