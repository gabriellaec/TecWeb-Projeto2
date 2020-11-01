import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { JsonToTable } from "react-json-to-table";

export default class City extends Component {

    constructor(props) {
        super(props)
        // Inicializando o State com alguns valores para testarmos
        this.state = {lista: [
            
        ]}
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.get('http://localhost:3003/city')
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

      
    }


render() {


    var tempos = this.state.lista

    console.log(this.state)
    console.log(this.state.lista.body)

    return (
   
    <div >
        <div>
              <ul>
                 <p>
                     <label>Local:       </label>
                     <input local="local"
                         />
                 </p>
                 <p>
                     <button onClick={this.cadastrar}>Pesquisar</button>
                 </p>
             </ul> 
        </div>
        <div className="Table"> 
             {/* ===================== */}
                {/* HOW TO USE IT         */}
                {/* ===================== */}
                <JsonToTable json={tempos.data} />
                {/* ===================== */}
        </div>
    </div>
     );
}
}