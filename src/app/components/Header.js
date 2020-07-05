import React from "react";
import { connect } from "react-redux"
import { irAtras, abreMenuSidebar } from "../actions/menuActions.js"

@connect((store) => {
    return {
        browser: store.browser,
        openMenu: store.menu.menu_sidebar,
        fecha: store.menu.fecha,
        mostrar: store.menu.show_navegation_button,
        url: store.menu.url_patron,
        url_params: store.menu.url_params
    }
})

export default class Header extends React.Component {

  constructor(){
    super();
    this.backHistory = this.backHistory.bind(this);
  }

  backHistory() {    
    var url = '/#/'
    if (this.props.openMenu == 'open')
      this.props.dispatch(abreMenuSidebar())
    else
      {
        url += irAtras(this.props.url, this.props.url_params);
        window.location.replace(url);
      }      
  }

  render() {

    const titulo = (this.props.fecha == 'finde') ? 'Qué sale el finde?' : 
      ((this.props.fecha == 'manana') ? 'Qué sale mañana?' :
          ((this.props.fecha == 'hoy') ? 'Qué sale hoy?' : 'Qué sale?')
    );
    const iconoMenu = (
        <i class="fa fa-arrow-left" aria-hidden="true" onClick={this.backHistory.bind(this)}></i>
      );     

    return (
     <nav class="navbar navbar-fixed-top navbar-inverse" role="navigation">
        <div class="container-fluid">
            <div class="navbar-header">
                <h4 class="navbar-text" id="icono-menu">{(this.props.mostrar)?iconoMenu:null}&emsp;</h4>
                <div class="navbar-brand">
                    <img class="logo-quesale" src="/dist/img/logo/icon_quesale_white.png"/>
                    <span>uéSale</span> 
                </div>
            </div>
        </div>
    </nav>
    );
  }
}
