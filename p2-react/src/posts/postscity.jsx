import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './Posts.css';

export default class Postscity extends Component {

    constructor(props) {
        super(props)
        const nomeusuario = localStorage.getItem("username");
        const place = localStorage.getItem("currentCity");

        var result = nomeusuario.substring(1, nomeusuario.length-1);
        if (place){
            var resultplace = place.substring(1, place.length-1);

        console.log(place)
            console.log(resultplace)

        }

        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            {username: 'mrbrightside', content: 'oi', date: "2020-11-02T19:18:51.373Z", city: "Nulles"},
        ], post: {username: result, content: '', date: '', city: resultplace}}

        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/postlistcity'
        , {
            params: {
              city: resultplace
            }})
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) { // Checa se o response status code é 2XX (sucesso)
                    this.setState({lista: resp.data})
                    return;
                }
                console.log(resp)
        })
        .catch(erro => console.log(erro))

         this.handleChange = this.handleChange.bind(this)
         this.cadastrar = this.cadastrar.bind(this)
         this.incStatus = this.incStatus.bind(this)

    }


    cadastrar() {
        const nomeusuario = localStorage.getItem("username");

        axios.post('http://localhost:3003/addpostcity', this.state.post)
            .then(resp => {
                if(Math.floor(resp.status/100) === 2) {
                    this.setState((state) => {
                        return {
                            lista: [...state.lista, state.post],
                            post: {content: ''},
                            redirectToReferrer: true // Vamos usar essa flag pra redirecionar para outra página quando o login for bem sucedido
                        }
                    })
                }
                console.log(resp)
            })
            .catch(erro => console.log(erro))
    }



    incStatus() {
        const currentStatus = (localStorage.getItem("currentStatus")).parseInt();
        const loggedInUser = localStorage.getItem("currentUser");
        var result = loggedInUser.substring(1, loggedInUser.length-1);

        var url = 'http://localhost:3003/userstatus/'+result

        axios.put(url, (currentStatus+1).toString())
        .then(res => console.log(res))
    }



    // event.target representa o elemento que causou o trigger do evento que chamou o método (no caso, será o input do username)
handleChange(event) {
    var handleState = (state, event) => {
        state.post[event.target.name] = event.target.value
        return state
    }
    this.setState(handleState(this.state, event))
}



render() {

   
    var posts = this.state.lista
    console.log(this.state)
    var liposts = posts.map(post => {
        return (
    
            
            <ul>
            <li key={post.date}>{"Date: "+ (post.date).slice(0, 10) +" - Time: "+ (post.date).slice(11, 16)}</li>
            <li key={post.username}>{post.username}</li>
            <li key={post.content}>{post.content}</li>
            </ul>
        )
    })

    function click(){
        this.cadastrar()
        this.incStatus()

    }


    return (
        <div>
        <div>
        <h1>Comments</h1>

            <p >
                    <input 
                    placeholder = "New Comment" 
                    class = 'form_posts' 
                    name="content"
                    // value={this.state.post.username}
                    onChange={this.handleChange}

                        />
                </p>
                <form onSubmit={this.incStatus}>
                <p>
                    <button
                    type="submit"
                    onClick={this.cadastrar}>Send</button>
                </p>
            </form>
        </div>
        <div>

            <ul> {liposts} </ul><p></p>
            {/* <JsonToTable json={posts} /> */}

            
                
        </div>
        </div>
    )
}
}