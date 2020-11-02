import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Weather from './weather/weather'
import City from './weather/city'
import Usuarios from './usuarios'
import Cadastro from './cadastro'
import Login from './login'


//import Teste from './usuarios/teste'

export default props => (
    <Router>
        {/* <Route exact path='/' component={Weather} /> */}
        <Route path='/weather' component={Weather} />
        <Route path='/city' component={City} />
        <Route path='/usuarios' component={Usuarios} />
        <Route path='/cadastro' component={Cadastro}/>
        <Route path='/login' component={Login} />

        {/* <Route path='/teste' component={Teste} /> */}
        {/* <Redirect from='*' to='/weather' /> */}
    </Router>
)