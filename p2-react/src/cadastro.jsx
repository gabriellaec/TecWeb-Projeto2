import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";


export default class Cadastro extends Component {
    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {
            usuario: [
                { username: 'user1' ,
                password: 'senha' ,
                redirectToReferrer: false,
                erro: ''
            }]}

        this.handleChange = this.handleChange.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
        }


    cadastrar() {
        axios.post('http://localhost:3003/adduser', { username: this.state.usuario.username, password: this.state.usuario.password})
        .then(resp => {
            if(Math.floor(resp.status/100) === 2) {
                this.setState((state) => {

                    var novoid = resp.usuario[0]
                    console.log(resp.usuario)

                const dict = {
                    username: novoid.username,
                    password: novoid.password,
                    redirectToReferrer: true        
                }
            
            this.setState({ usuario: dict })
        })
            return;
        }
        console.log(resp)
        })
        .catch(erro => console.log(erro))
       }
       

    handleChange(event) {
        var handleState = (state, event) => {
            state.usuario[event.target.username] = event.target.value
            console.log(state)
            return state
        }

        this.setState(handleState(this.state, event))
    }

    render() {
        if (this.state.usuario.redirectToReferrer === true) {
            return (
                <Redirect to={{
                    pathname: "/login"
                }} />
            )}
            
        return (
            <div class="form__group">
                <h1>Cadastro</h1>
                <input name="username"
                class="form__input"
                    placeholder = "username"
                    value={this.state.usuario.username}
                    onChange={this.handleChange} /><br></br>

                <input name="password"
                    class="form__input"
                    placeholder = "password"
                    value={this.state.usuario.password}
                    onChange={this.handleChange} /><br></br>

                <button onClick={this.cadastrar}>register</button>
            </div>
        )
    }
}