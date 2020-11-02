import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";


export default class Home extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        this.state = {
            lista: [{ name: ""
            }], city: {name: ''}}

        this.handleChange = this.handleChange.bind(this)
        this.changePlace = this.changePlace.bind(this)
    }


    changePlace() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3003/place', this.state.city )
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.city],
                            city: {name: ''},
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
            state.city[event.target.name] = event.target.value
            console.log(state)
           // var cidade = state.city[0]
            // console.log(cidade)
            return state
        }

        this.setState(handleState(this.state, event))
    }


    render() {
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to= "/city"  />
        )}


        return (
            <div class="form__group">
                <h1 >changePlace</h1>
                <input type="text"
                    name="City"
                    placeholder = "cityname"
                    // value={this.state.city.name}
                    onChange={this.handleChange} 
                    />
                    <br></br>

                
                <button onClick={this.changePlace}>changePlace</button>

            </div>
        )
    }
}