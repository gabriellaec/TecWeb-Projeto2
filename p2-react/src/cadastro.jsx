import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";


export default class Cadastro extends Component {
    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            {username: 'mrbrightside', password: 'senha'}
        ], usuario: {username: '', password: ''}}

        this.handleChange = this.handleChange.bind(this)
        this.cadastrar = this.cadastrar.bind(this)
        }


    cadastrar() {
        axios.post('http://localhost:3003/adduser', this.state.usuario)
        .then(resp => {
            if(Math.floor(resp.status/100) === 2) {
                this.setState((state) => {
                    return {
                        lista: [...state.lista, state.usuario],
                        usuario: {username: '', password: ''},
                        redirectToReferrer: true // Vamos usar essa flag pra redirecionar para outra página quando o login for bem sucedido
                    }
                })
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
                <Redirect to="/login"/>
            )}
            
        return (
            <div class="form__group">
                <h1>Cadastro</h1>
                <input name="username"
                class="form__input"
                    placeholder = "username"
                    // value={this.state.usuario.username}
                    onChange={this.handleChange} /><br></br>

                <input name="password"
                    class="form__input"
                    placeholder = "password"
                    // value={this.state.usuario.password}
                    onChange={this.handleChange} /><br></br>

                <button onClick={this.cadastrar}>register</button>
            </div>
        )
    }
}