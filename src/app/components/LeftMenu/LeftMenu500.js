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
export default class LeftMenu500 extends Component {

  componentWillMount(){
    this.props.dispatch(setUrl(this.props.route.path))
  }

  componentDidMount(){   
    this.props.dispatch(borrarMarkers());
    this.props.dispatch(abreMenuSidebar());    
  }
  
  render (){
    return(
      <div>
            <div class="tab-pane clearfix active">
              <div class="row">
                <h4 class="text-center font-weight-bold h4-blanco"><b>500</b> Oooopps!!!</h4>
              </div>
              <div class="row">
            <div class="col-md-12">
              <img class="img-responsive center-block" style={{width:"300px", height: "300px" }} src={"/static/img/generic/gifs/ahahah500.gif"} ></img>
              </div>
              </div>
            </div>

      </div>
    );
  }
}
