import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './App.css';
import { Route } from 'react-router-dom'
import Navbar from "./Navbar";


export default class UserPage extends Component {

    submitForm (e) {
        e.preventDefault()
        if (this.props.history){
            this.props.history.push('/weather-page'); // <--- The page you want to redirect your user to.
        }}

    render() {
        return (
            <div >
                <Navbar/>
                <h1 class="title_login">Hello!</h1>
            </div>)}
}