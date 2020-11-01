import logo from './logo.svg';
import React from 'react';
import './App.css';
import Routes from './routes'

class Navbar extends React.Component{
    render() {
        return (
            <div>
              <ul id="nav">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Posts</a></li>
                <li><a href="#">Tempo atual</a></li>
                <li><a href="#">Recomendações</a></li>
                <li><a href="#">Perfil</a></li>
                    
              </ul>
            </div>
        );
    }
}

export default Navbar;
