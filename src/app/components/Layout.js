import React from 'react'
import MapOSM from './Maps/Map'

import { connect } from 'react-redux'
import Header from './Header'
import { mostrarIconoNavegacion, ocultarIconoNavegacion, 
        abreMenuSidebar, cierraMenuSidebar } from '../actions/menuActions.js'
import { borrarMarkers } from '../actions/markersActions.js'
import { centrarMapaInicial } from '../actions/mapActions'


@connect((store) => {
    return {
        browser: store.browser,
        menu: store.menu,
        openMenu: store.menu.menu_sidebar,      

    }
})

export default class Layout extends React.Component {

    constructor() {
        super();
        this.switchMenu = this.switchMenu.bind(this);       
    }
     
    updateDimensions() { 
        (this.props.location.pathname == '/') ? this.props.dispatch(ocultarIconoNavegacion()) : this.props.dispatch(mostrarIconoNavegacion());
    }

    componentDidMount(nextProps) {  
        //la primera vez o con refresh de browser
        this.updateDimensions(); 

        //queda el listener
        window.addEventListener("resize", this.updateDimensions.bind(this)); 
        this.props.dispatch(abreMenuSidebar());
    }

    componentWillReceiveProps(nextProps){
        //de todos los props que cambian siempre, tengo que ver que el location haya cambiado
        if (nextProps.location != this.props.location){
            if (nextProps.location.pathname == '/') {
                // this.props.dispatch(ocultarIconoNavegacion())
                this.props.dispatch(borrarMarkers());
                this.props.dispatch(centrarMapaInicial());
                (nextProps.location.pathname == '/') ? this.props.dispatch(ocultarIconoNavegacion()) : this.props.dispatch(mostrarIconoNavegacion());            
            }
            else
                this.props.dispatch(mostrarIconoNavegacion());

        };
    }

    switchMenu(event) {
        if (this.props.openMenu == 'open')
            this.props.dispatch(abreMenuSidebar());
        else
            this.props.dispatch(cierraMenuSidebar());
    }

    render() {

        var iconStyle = {
            color: '#FFFFFF',
        }
        var today = new Date();
        var dia = today.getDate();
        var class_hoy = "flaticon-calendar-on-day-" + dia.toString() +"-interface-symbol-of-rounded-square-black-spring-tool icon-36"

        return (
            <div>
                <header>
                    <Header/>
                </header>
                <div class="mainContainer" role="main">
                    <div class="mainPanel tab-content" id="mainPanel">
                            {this.props.children}
                    </div>
                    <div class={"filler leaflet-container leaflet-grab leaflet-touch-drag leaflet-touch-zoom " + this.props.openMenu }>
                        <MapOSM/>
                    </div>
                </div>                           
            </div>
        );
    }
}
