import '../css/main.scss';
import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'
import { Provider } from 'react-redux'

import Layout from './components/Layout'
import Index from './components/Index'
import LeftMenuContacto from './components/LeftMenu/LeftMenuContacto'
import LeftMenu404 from './components/LeftMenu/LeftMenu404'
import LeftMenu500 from './components/LeftMenu/LeftMenu500'
import LeftMenuLugaresDeRecarga from './components/LeftMenu/LeftMenuLugaresDeRecarga'

import store from './store';

const app = document.getElementById('app');

ReactDOM.render(
    <Provider store={store}>
     <Router history={hashHistory}>
     <Route path='/' component={Layout}>       
         <IndexRoute component={Index}></IndexRoute>
         <Route path='recargas' component={LeftMenuLugaresDeRecarga}/>
         <Route path='contacto' component={LeftMenuContacto}/>
         <Route path='404' component={LeftMenu404} />
         <Route path='500' component={LeftMenu500} />
         <Route path='401' component={LeftMenu500} />
         <Redirect from='*' to='404' />
     </Route>
   </Router>
 </Provider>,
    app);