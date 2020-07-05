import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'


import { abreMenuSidebar, ocultarIconoNavegacion } from '../actions/menuActions.js'

@connect((store) => {
    return {
        browser: store.browser,
        openMenu: store.menu.menu_sidebar,        
    }
})

export default class Index extends Component {

  componentWillMount() {
    this.props.dispatch(abreMenuSidebar());    
    (this.props.route.path == "/")?this.props.dispatch(ocultarIconoNavegacion()):null; 
  };

  render (){
    return(
        <div class="tab-pane clearfix active">
            <div class="row row-menu">
                <div class="col-6 col-xs-6 col-lg-6 col-md-6">
                    <Link to="/recargas" style={{color: "black"}} activeClassName="active">
                        <div class="panel panel-centro-recarga">
                            <div class="panel-heading">
                                <div class="row row-center">
                                    <i class="flaticon-drink"></i>                                     
                                </div>                                
                            </div>
                            <div class="panel-footer">
                                <p style={{textAlign: "center"}}><b>Centros de Recarga</b></p>                               
                                <div class="clearfix"></div>
                            </div>                            
                        </div>
                    </Link>                        
                </div>
                <div class="col-6 col-xs-6 col-lg-6 col-md-6">
                    <Link to="/contacto" style={{color: "black"}} activeClassName="active">
                        <div class="panel panel-quienes-somos">
                            <div class="panel-heading">
                                <div class="row row-center">                                
                                    <i class="flaticon-opened-email-envelope"></i>                             
                                </div>                                
                            </div>
                            <div class="panel-footer">
                                <p style={{textAlign: "center"}}><b>Quiénes somos?</b></p>                               
                                <div class="clearfix"></div>
                            </div>                            
                        </div>
                    </Link>                        
                </div>
            </div>
            <div class="row row-menu">
                <div class="col-6 col-xs-6 col-lg-6 col-md-6">
                                
                </div>
            </div>
        </div>
    );
  }
}
