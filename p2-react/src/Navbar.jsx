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
                <a  href="/weather-page" >Weather</a>
                </li>
                <li>
                <a  href="/city-page" >Cidade</a>
                </li>
                <li>
                <a  href="/login" >Logout</a>
                </li>
              </ul>
            </div>
            </nav>
        );
    }
}

export default Navbar;
