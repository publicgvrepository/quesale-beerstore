import React, { Component } from 'react';
import { Link } from "react-router";

export default class LeftMenu extends Component {

  render (){

  	var myStyle = {
            urbanismo: {
                borderLeft: '7px solid #40BFEF',
                dataColor: '#40BFEF'
            },
            cultura: {
                borderWidth: '0px 0px 0px 7px',
                borderLeft: '7px solid rgb(229, 51, 42)',
                display: 'list-item',
                dataColor: '#E5332A'
            },
            servicios: {
                borderLeft: '7px solid rgb(255, 211, 0)',
                display: 'list-item',
                dataColor: '#FFD300'
            },
            turismo: {
                borderWidth: '0px 0px 0px 7px',
                borderLeft: '7px solid rgb(0, 167, 106)',
                display: 'list-item',
                dataColor: '#00A76A'
            },
            esparcimiento: {
                borderWidth: '0px 0px 0px 7px',
                borderLeft: '7px solid rgb(0, 167, 106)',
                display: 'list-item',
                cursor: 'default',
                dataColor: '#C8A2C8',
            }
        };
        
    return(
	    <div>
            <div id="mapas" class="tab-pane clearfix active">
                <div class="clearfix">
                    <ul class="unstyled categorias color disable-select">
                    	<Link to="birrapp/mapa" activeClassName="active" style={{ textDecoration: 'none' }}>
                        <li class="categoria" style={myStyle.urbanismo} >                            
			                <h1>Ver Locales</h1>
                            <p class="resumen">Muestra en el mapa, todos los locales de recarga</p>				            
                        </li>
                        </Link>
                    </ul>
                </div>
            </div>
	    </div>
    );
  }
}
