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
                        "name": "Guarda",
                        "country": "Portugal",
                        "region": "Guarda",
                        "lat": "40.533",
                        "lon": "-7.267",
                        "timezone_id": "Europe/Lisbon",
                        "localtime": "2020-11-02 02:08",
                        "localtime_epoch": 1604282880,
                        "utc_offset": "0.0"
            }]}

        this.handleChange = this.handleChange.bind(this)
        this.changePlace = this.changePlace.bind(this)
    }


    changePlace() {
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3003/place', { name: this.state.city.name })
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)
                    this.setState({ name: resp })
                    if (resp.data.length === 1) 
                        console.log(resp)

                        var novoid = resp.data["City"]
                        console.log(novoid)

                        const json = {
                            name: novoid,
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

            return state.city
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
                    onChange={this.handleChange["City"]} /><br></br>

                
                <button onClick={this.changePlace}>changePlace</button>

            </div>
        )
    }
}