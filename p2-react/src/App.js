import logo from './logo.svg';
import React from 'react';
import './App.css';
import Routes from './routes'
import Navbar from "./Navbar";


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <h1>Weather API</h1> */}
        <Routes />
      </header>
    </div>
  );
}


export default App;
