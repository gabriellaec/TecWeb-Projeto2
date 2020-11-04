import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import Home from './home'
import Navbar from "../Navbar";
import Postlist from "../posts/postlist";
import Geolocation from './geolocation'
import '../App.css';

export default class Recommendations extends Component {
    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            
        ]}
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/recommendations')
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) { // Checa se o response status code é 2XX (sucesso)
                    this.setState({lista: resp})
                    return;
                }
                console.log(resp.body)
                console.log("resp")
                console.log(resp.json())

        })
        .catch(erro => console.log(erro))

       // this.handleChange = this.handleChange.bind(this)
       this.cadastrar = this.cadastrar.bind(this)
    }

    cadastrar() {
        axios.post('http://localhost:3003/weather', this.state.local)
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) {
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.local],
                            local: {local: ''},
                            redirectToReferrer: true // Vamos usar essa flag pra redirecionar para outra página quando o login for bem sucedido
                        }
                    })
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))
    }

   // event.target representa o elemento que causou o trigger do evento que chamou o método (no caso, será o input do username)
handleChange(event) {
    var handleState = (state, event) => {
        state.usuario[event.target.city] = event.target.value
        return state
    }
    this.setState(handleState(this.state, event))
}

render() {

    // if (this.state.redirectToReferrer === true) {
    //     return (
    //         <Redirect to="/weather"/>
    //     )
    // }

    var tempos = this.state.lista.data
    
    


    console.log(this.state)
    console.log(tempos)

    var city ="oi"
    var weather_description 
    var windspeed 
    var uv_index 
    var is_day 
    var uv_rec
    var uv_val

    // var urlimg;
    if((typeof tempos !== "undefined") ){
       city = tempos.city
       weather_description = (tempos["weather_description"])
       windspeed = (tempos["windspeed"])
       uv_index = (tempos["uv_index"])
       is_day = (tempos["is_day"])
        
        console.log(city)
        console.log(weather_description)
        console.log(windspeed)
        console.log(uv_index)
        console.log(is_day)

        

        if (uv_index<3){
            uv_val = "LOW"

            uv_rec = "No need to worry about sunscreen"
        }else if (uv_index<6){
            uv_val = "MODERATE"

            uv_rec = "Moderate UV index"
        }else{
            uv_val = "HIGH"

            uv_rec = "Don't forget your sunscreen!!!"

        }

       
        // urlimg = "url('"+bkgr+ "');"
        // const image = document.getElementById("img");
        // image.src=urlimg

        // console.log(urlimg)

    }

    console.log(city)
    console.log(weather_description)
    console.log(windspeed)
    console.log(uv_index)
    console.log(is_day)

            return (
            <div class='div'>
            <Navbar/>
                {/* <style> #div{ 'background-image': 'url'({bkgr})}; </style> */}
                <div>
                    <h1>{city}</h1>
                    <h4>UV index: {uv_val}</h4>
                    <p>{uv_rec}</p>
                    
                    {/* <img src = {bkgr} id = "image" alt="weather" width="50" height="50"/> */}

                </div>
                <div className="Table"> 
                    {/* ===================== */}
                        {/* HOW TO USE IT         */}
                        {/* ===================== */}
                        <JsonToTable json={tempos} />
                        {/* ===================== */}

                </div>
                {/* <div  className = "posts">
                <Postlist/>
                </div> */}
            </div>
            );
}} 