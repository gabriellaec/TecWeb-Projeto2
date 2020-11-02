import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './App.css';


export default class Login extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        this.state = {
            usuario: [
                    { id: '',
                    username: '',
                    password: '',
            }]}

        this.handleChange = this.handleChange.bind(this)
        this.novoCadastro = this.novoCadastro.bind(this)
        this.login = this.login.bind(this)
    }


    login() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3003/login', { username: this.state.usuario.username, password: this.state.usuario.password })
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ usuario: resp })
                    if (resp.data.length === 1) 
                        console.log(resp)

                        var novoid = resp.data[0]
                        console.log(resp.data)

                        const json = {
                            id: novoid._id,
                            redirect: true,
                        }
                        this.setState({ usuario: json })
                        return;
                    } else {
                        return;
                    }})
            .catch(erro => console.log(erro))
    }

    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.username] = event.target.value
            return state
        }

        this.setState(handleState(this.state, event))
    }

    novoCadastro(){
        const semLogin = {
            cadastroRed: true,
        }
        this.setState({ usuario: semLogin })
    }

    render() {
        if (this.state.usuario.redirect === true) {
            return (
                <Redirect to={{
                    pathname: "/weather",
                    state: {
                        id: this.state.usuario.id,
                    }}} />
        )}

        if (this.state.usuario.cadastroRed === true) {
            return (
                <Redirect to={{
                    pathname: "/cadastro"       
                }} />
            )}

        return (
            <div class="form__group">
                <h1 >Login</h1>
                <input name="username"
                    placeholder = "username"
                    value={this.state.usuario.username}
                    onChange={this.handleChange} /><br></br>

                <input name="password"
                class = 'input'
                    placeholder = "password"
                    value={this.state.usuario.password}
                    onChange={this.handleChange} /><br></br>

                <button onClick={this.login}>Login</button>
                <button onClick={this.novoCadastro}>Register</button>

            </div>
        )
    }
}