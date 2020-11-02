import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";
import './Posts.css';

export default class Postlist extends Component {

    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            {username: 'mrbrightside', content: 'oi', date: "2020-11-02T19:18:51.373Z"},
        ], post: {username: '', content: '', date: ''}}

        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/postlist')
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
    }

    cadastrar() {
        axios.post('http://localhost:3003/addpost', this.state.post)
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

    // event.target representa o elemento que causou o trigger do evento que chamou o método (no caso, será o input do username)
handleChange(event) {
    var handleState = (state, event) => {
        state.post[event.target.content] = event.target.value
        return state
    }
    this.setState(handleState(this.state, event))
}

render() {

    // if (this.state.redirectToReferrer === true) {
    //     return (
    //         <Redirect to="/postlist"/>
    //     )
    // }

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
    return (
        <div>
        <div>
        <h1>Comments</h1>

            <p >
                    <input 
                    placeholder = "New Comment" 
                    class = 'form_posts' 
                    name="username"
                    // value={this.state.post.username}
                    onChange={this.handleChange}
                        />
                </p>
                <p>
                    <button onClick={this.cadastrar}>Send</button>
                </p>
        </div>
        <div>

            <ul> {liposts} </ul><p></p>
            {/* <JsonToTable json={posts} /> */}

            
                
        </div>
        </div>
    )
}
}