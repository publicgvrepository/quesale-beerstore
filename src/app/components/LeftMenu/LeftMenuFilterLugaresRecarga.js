import React from "react"
import { Collapse } from 'react-bootstrap'
import { connect } from "react-redux"

import { abreMenuSidebarFilter, cierraMenuSidebarFilter, abreMenuSidebar, cierraMenuSidebar } from '../../actions/menuActions.js'
import { fetchLugaresDeRecarga }from '../../actions/lugaresRecargaActions'
import { borrarMarkers } from '../../actions/markersActions.js'
import { centrarMapaInicial } from '../../actions/mapActions'


@connect((store) => {
    return {
        browser: store.browser,
        lugares_recarga: store.lugaresRecarga.lugares,
        lugares_recarga_op: store.lugaresRecarga.lugares_opcion,
        response_lugares_recarga: store.lugaresRecarga.response,     
        menu: store.menu,
        openMenuFilter: store.menu.menu_sidebar_filter,
        openMenu: store.menu.menu_sidebar      
    }
})


export default class LeftMenuFilterLugaresRecarga extends React.Component {

  constructor(){
      super();
      this.state = {filtro: ''};
      this.switchMenuFilter = this.switchMenuFilter.bind(this);  
      this.handleChange = this.handleChange.bind(this);
      this.buscarLugarDeRecarga = this.buscarLugarDeRecarga.bind(this);           
    }

  switchMenuFilter(event) {      
    if (this.props.openMenuFilter == 'open')
        this.props.dispatch(abreMenuSidebarFilter());
    else
        this.props.dispatch(cierraMenuSidebarFilter());
  }

  switchMenu(event) {
      if (this.props.openMenu == 'open')
          this.props.dispatch(abreMenuSidebar());
      else
          this.props.dispatch(cierraMenuSidebar());
  }  

  buscarLugarDeRecarga(){    
    this.props.dispatch(borrarMarkers());
    this.props.dispatch(centrarMapaInicial());
    this.props.dispatch(fetchLugaresDeRecarga(this.state.filtro));
  }

  handleChange(event) {    
    this.setState({filtro: event.target.value});
  }

render() {

    var iconStyle = {
      color: 'white'
    }       

    return(
      <div id={"filtros-" + Math.floor(Math.random() * 10000) + 1} class="card">
          <div data-toggle="collapse"  class="header bg-amber">
              <h2>
                  <strong class="camel-case">Centros de Recarga</strong>
                  {this.props.lugares_recarga.length == 1 ?
                  <small>Existe 1 alternativa!</small>
                  :
                  <small>Existen {(this.props.response_lugares_recarga.pending) ? '?' : this.props.lugares_recarga.length} alternativas!</small>
                  }
              </h2>
              <ul class="header-dropdown m-r-0">
                  <li>
                      {(window.innerWidth>390) ? null : (<i class="fa fa-map-o" style={iconStyle} aria-hidden="true" onClick={this.switchMenu.bind(this)}></i>)}&ensp;&ensp;
                      <i class="fa fa-sliders" style={iconStyle} aria-hidden="true" onClick={this.switchMenuFilter.bind(this)}></i>
                  </li>
              </ul>
          </div>
          <Collapse in={this.props.openMenuFilter != ''}>            
            <div class="body bg-amber">
              <div class="input-group">
                <input value={this.state.filtro} type="text" class="form-control" placeholder="Buscar por nombre..." onChange={this.handleChange.bind(this)} onKeyPress={event=>{if(event.key==='Enter'){this.buscarLugarDeRecarga()}}}/>
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button" onClick={this.buscarLugarDeRecarga.bind(this)}><i class="fa fa-search fa-2x" aria-hidden="true"></i></button>
                </span>
              </div>
            </div>
          </Collapse>
      </div>
    )
  }
}