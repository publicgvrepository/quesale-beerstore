import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Collapse, ButtonToolbar, Button } from 'react-bootstrap'
import Avatar from 'react-avatar'


import { fetchLugaresDeRecarga, collapsedTrue, collapsedFalse }from '../../actions/lugaresRecargaActions'
import { resaltarMarker } from '../../actions/markersActions'
import { centrarMapa } from '../../actions/mapActions'
import { setUrl, abreMenuSidebar, cierraMenuSidebar } from '../../actions/menuActions.js'


import LeftMenuFilterLugaresRecarga from './LeftMenuFilterLugaresRecarga'


@connect((store) => {
    return {
        browser: store.browser,       
        menu: store.menu,
        lugares_recarga: store.lugaresRecarga.lugares,
        lugares_recarga_op: store.lugaresRecarga.lugares_opcion,
        response_lugares_recarga: store.lugaresRecarga.response,
        openMenu: store.menu.menu_sidebar
    }
})
export default class LeftMenuLugaresDeRecarga extends Component {

    componentWillMount(){
        this.props.dispatch(setUrl(this.props.route.path))
    }

    constructor(){
      super();
      this.collapseLugarRecarga = this.collapseLugarRecarga.bind(this);      
      this.switchMenu = this.switchMenu.bind(this);
    }

    componentDidMount() {
        //se ejecuta la primera vez y cuando se vuelve en el navegado
        this.props.dispatch(abreMenuSidebar());
        this.props.dispatch(fetchLugaresDeRecarga(""));        
    }   

    collapseLugarRecarga(index){        
        if (this.props.lugares_recarga_op[index].collapsed) {
            this.props.dispatch(collapsedFalse(index));
            this.props.dispatch(resaltarMarker(index));  
        } 
        else {
            this.props.dispatch(collapsedTrue(index));
            this.props.dispatch(resaltarMarker(index));        
            this.props.dispatch(centrarMapa(this.props.lugares_recarga[index].geom.coordinates));
        }
    }

    switchMenu(event) {
        if (this.props.openMenu == 'open')
            this.props.dispatch(abreMenuSidebar());
        else
            this.props.dispatch(cierraMenuSidebar());
    }

    render() {        

        const waitingSpinner = (
            <div key={'estoy_esperando_birra'} class="align-center align-center-spinner">
                <div key="waitingSpinner" class="preloader pl-size-xl">
                    <div class="spinner-layer">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div>
                        <div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                    </div>
                </div>
            </div>
        );

        var iconStyle = {
            color: 'white'
          }

        const itemLugarDeRecarga = this.props.lugares_recarga.map((lugar_recarga, index) =>
            <div key={"lugar_recarga_quesale_" + index}>
                <div class="information-box-with-normal-header">
                  <div class={"cont-row clearfix op-recorrido recorrido_" + (index % 20)}>
                      <div class="card">                        
                        <div class="header header-cervezas" data-toggle="collapse" onClick={this.collapseLugarRecarga.bind(this,index)}>
                            
                            {(lugar_recarga.link_imagen != "https://drive.google.com/uc?id=1IR00OzPF6fkr934V5m2r2m8XMeKXMqDA") ?
                                <div class="row row-menu">
                                    <div class="col-3 col-xs-3 col-lg-3 col-md-3">                                    
                                        <Avatar size={50} name={"avatar_" + lugar_recarga.nombre} src={lugar_recarga.link_imagen} round={true} />                                    
                                    </div>
                                    <div class="col-8 col-xs-8 col-lg-8 col-md-8 nombre-cerveceria">
                                        <p class="titulo-cervecerias"><b>{lugar_recarga.nombre} </b></p>                                    
                                    </div>
                                    <div class="col-1 col-xs-1 col-lg-1 col-md-1">                          
                                      { (this.props.lugares_recarga_op[index].collapsed) ?
                                        <i class="fa fa-chevron-up fa-2x pull-right" aria-hidden="true"></i>
                                        :
                                        <i class="fa fa-chevron-down fa-2x pull-right" aria-hidden="true"></i>
                                      }
                                    </div>
                                </div>
                                :
                                <div class="row row-menu">                                        
                                    <div class="col-10 col-xs-10 col-lg-10 col-md-10 nombre-cerveceria">
                                        <p class="titulo-cervecerias"><b>{lugar_recarga.nombre} </b></p>                                    
                                    </div>
                                    <div class="col-2 col-xs-2 col-lg-2 col-md-2">                          
                                      { (this.props.lugares_recarga_op[index].collapsed) ?
                                        <i class="fa fa-chevron-up fa-2x pull-right" aria-hidden="true"></i>
                                        :
                                        <i class="fa fa-chevron-down fa-2x pull-right" aria-hidden="true"></i>
                                      }
                                    </div>
                                </div>
                            }
                            
                        </div>                             
                        <Collapse in={this.props.lugares_recarga_op[index].collapsed}>   
                            <div class="body-evento">
                                <p><small><i class="fa fa-map-marker" aria-hidden="true"></i>&ensp;{lugar_recarga.direccion}, {lugar_recarga.localidad.nombre}</small></p>
                                <p><small><i class="fa fa-street-view" aria-hidden="true"></i>&ensp;<a target="_blank" href={"https://www.google.com/maps/dir/?api=1&destination=" +lugar_recarga.geom.coordinates[0]+","+ lugar_recarga.geom.coordinates[1]}>Cómo llego?</a></small></p>
                                { (window.innerWidth<=390) ?
                                  <p class="text-right"><a onClick={this.switchMenu.bind(this)}><i class="fa fa-map-o" aria-hidden="true"></i>&ensp;Ver en mapa</a></p>
                                  :
                                  null
                                }
                                <p><small><i class="fa fa-map-marker" aria-hidden="true"></i>&ensp;{lugar_recarga.direccion}, {lugar_recarga.localidad.nombre}</small></p>
                                <p>Contacto</p>
                                <ButtonToolbar>
                                    { (lugar_recarga.link_facebook == "") ? null : <Button bsClass="btn-circle btn-facebook" onClick={()=> window.open(lugar_recarga.link_facebook, "_blank", "location=yes,scrollbars=yes,status=yes")}><i class="fa fa-facebook-official" aria-hidden="true"></i></Button>}
                                    { (lugar_recarga.link_twitter == "") ? null : <Button bsClass="btn-circle btn-twitter" onClick={()=> window.open(lugar_recarga.link_twitter, "_blank", "location=yes,scrollbars=yes,status=yes")}><i class="fa fa-twitter-square" aria-hidden="true"></i></Button>}
                                    { (lugar_recarga.link_instagram == "") ? null : <Button bsClass="btn-circle btn-instagram" onClick={()=> window.open(lugar_recarga.link_instagram, "_blank", "location=yes,scrollbars=yes,status=yes")}><i class="fa fa-instagram" aria-hidden="true"></i></Button>}
                                </ButtonToolbar>
                            </div>
                        </Collapse>
                      </div>
                  </div>
                </div>
            </div>
        );

        const opcionesLugaresDeRecarga = (
            <div>                
                {itemLugarDeRecarga}
            </div>
            );

        const sinOpcion = (
            <li key="sinOpcion">
                <div class="card">
                    <div class="body bg-light-green text-center">
                        <p class="tamanio-seo"><strong>No hay resultados :(</strong></p>
                        <p class="tamanio-seo"><small>Te invitamos a que nos sugieras algún centro de recarga a <a href="mailto:sinapsys.startup@gmail.com?subject=CentroRecarga%20quesale.com.ar"><i>sinapsys.startup@gmail.com</i></a></small></p>
                    </div>
                </div>                
                <div class="row">
                    <div class="col-md-12">
                      <img class="img-responsive center-block" style={{width:"200px", height: "150px" }} src={"/dist/img/generic/gifs/no_events_confused_travolta.gif"} ></img>
                    </div>
                </div>
            </li>
        );


        return (
            <div>
                <div id="mapas">
                  <div class="clearfix"> 
                    <LeftMenuFilterLugaresRecarga />                         
                    { (this.props.response_lugares_recarga.pending) ?
                        waitingSpinner
                        :
                        ((this.props.lugares_recarga.length != 0) ? opcionesLugaresDeRecarga : sinOpcion)
                     }
                  </div>                   
                </div>
            </div>                
        );
    }
}
