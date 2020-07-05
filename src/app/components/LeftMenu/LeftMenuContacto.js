import React, {Component} from 'react'
import {render} from 'react-dom'
import {Link} from 'react-router'
import { connect } from 'react-redux'


import { borrarMarkers } from '../../actions/markersActions.js'
// import { centrarMapaInicial } from '../../actions/mapActions'
import { setUrl, mostrarIconoNavegacion, ocultarIconoNavegacion, limpiarMenu, iniciarMenu, abreMenuSidebar, cierraMenuSidebar, armarMenu } from '../../actions/menuActions.js'



@connect((store) => {
    return {
        browser: store.browser,
        menu: store.menu,
        openMenu: store.menu.menu_sidebar,
    }
})
export default class LeftMenuContacto extends Component {

  componentWillMount(){   
    this.props.dispatch(borrarMarkers());
    this.props.dispatch(abreMenuSidebar());    
    this.props.dispatch(setUrl(this.props.route.path))
  }
  
  render (){
    return(
      <div>
        <div class="tab-pane clearfix active">
          <div>
            <h4 class="text-center font-weight-bold h4-blanco"><b>SINAPSYS</b></h4>
            <p class="text-left loading help">Somos un equipo de jóvenes desarrolladores embarcados en una continua búsqueda de conocimiento de las nuevas tecnologías. </p>
            <p class="text-left loading help">Para ir mejorando ‘QueSale?’, si tenés alguna sugerencia para hacernos, o si detectás que algo no anda como debería, escribinos a  <a href="mailto:sinapsys.startup@gmail.com?subject=ContactoDesde%20quesale.com.ar"><i>sinapsys.startup@gmail.com</i></a></p>
          </div>
          
          <div class="row row-menu">
            <div class="col-6 col-xs-6 col-lg-6 col-md-6">
              <img class="img-responsive center-block" style={{width:"100px", height: "100px" }} src={"dist/img/generic/avatar_gv.png"} ></img>
            </div>
            <div class="col-6 col-xs-6 col-lg-6 col-md-6">
              <img class="img-responsive center-block" style={{width:"100px", height: "100px" }} src={"dist/img/generic/avatar_lucho.png"} ></img> 
            </div>
          </div>
          
        </div>
      </div>
    );
  }
}
