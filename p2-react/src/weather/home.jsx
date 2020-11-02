import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";


export default class Home extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        this.state = {
            city: [
                    { 
                        "name": "Guarda"
            }]}

        this.handleChange = this.handleChange.bind(this)
        this.changePlace = this.changePlace.bind(this)
    }


    changePlace() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3003/place', { name: this.state.city.name })
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ city: resp })
                    if (resp.data.length === 1) 
                        console.log(resp)

                        var novoid = resp.data[0]
                        console.log(novoid)

                        const json = {
                            name: novoid.name,
                            redirectToReferrer: true,
                        }
                        this.setState({ city: json })
                        return;
                    } else {
                        return;
                    }})
            .catch(erro => console.log(erro))
    }

    handleChange(event) {
        var handleState = (state, event) => {
            state.city[event.target.name] = event.target.value
            console.log(state)
            console.log(state.city["City"])

            return state.city[0]
        }

        this.setState(handleState(this.state, event))
    }


    render() {
        if (this.state.redirectToReferrer === true) {
            return (
                <Redirect to={{
                    pathname: "/weather",
                    // state: {
                    //     id: this.state.city.name,
                    // }
                }
                } 
                    />
        )}


        return (
            <div class="form__group">
                <h1 >changePlace</h1>
                <input name="City"
                    placeholder = "cityname"
                    value={this.state.city.name}
                    onChange={this.handleChange} /><br></br>

                
                <button onClick={this.changePlace}>changePlace</button>

            </div>
        )
    }
}