import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import { Link } from 'react-router-dom';

class Navbar extends React.Component{
    render() {
        return (
          <nav>
            <div>
              <ul id="nav">
                <li>
                <Link to="/weather" >Weather</Link>
                </li>
                <li>
                <Link to="/city" >City</Link>
                </li>
                <li>
                <Link to="/weather" >Profile</Link>
                </li>
                <li>
                <Link to="/login" >Logout</Link>
                </li>
                
              </ul>
            </div>
            </nav>
        );
    }
}

export default Navbar;
