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
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

                <a href="/userpage"><i class="fa fa-fw fa-user"></i> </a>

              </ul>
            </div>
            </nav>
        );
    }
}

export default Navbar;
