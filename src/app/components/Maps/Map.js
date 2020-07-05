import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import Control from 'react-leaflet-control'
import { connect } from 'react-redux'
import { collapsedTrue, collapsedFalse }from '../../actions/lugaresRecargaActions'
import { resaltarMarker } from '../../actions/markersActions'

import Moment from 'moment'

@connect((store) => {
    return {
        markers: store.markers,
        map: store.map.map,
        lugares_recarga_op: store.lugaresRecarga.lugares_opcion,
        eventos_op: store.eventos.opciones,
        menu: store.menu,
        url_patron: store.menu.url_patron
    }
})

export default class App extends Component {

  markerTouched(index){
    if (this.props.url_patron.indexOf("eventos") > -1 ){       
        if (this.props.eventos_op[index].collapsed) {
             this.props.dispatch(ocultarDetalleEvento(index));
             this.props.dispatch(resaltarMarker(index));  
         } 
         else {
             this.props.dispatch(verDetalleEvento(index));
             this.props.dispatch(resaltarMarker(index));
         }        
       }           
    else if (this.props.url_patron.indexOf("recarga") > -1) {
        if (this.props.lugares_recarga_op[index].collapsed) {
             this.props.dispatch(collapsedFalse(index));
             this.props.dispatch(resaltarMarker(index));  
         } 
         else {
             this.props.dispatch(collapsedTrue(index));
             this.props.dispatch(resaltarMarker(index));
         }
      }     
    else
      null;
  }
  
 render() {

    const markerLugaresEventos = this.props.markers.markers.map((marker, index) =>
        <Marker key={'marker__' + index} 
              position={marker.coordinates} 
              icon={marker.icono} 
              onClick={this.markerTouched.bind(this, index)}>
        { (marker.hasOwnProperty('lugar')) ?
            <Popup closeButton={false}>
              <div>
                <div class="container-fluid">
                    <div class="row">
                      <div class="modal-header leaflet-modal-header">
                        <h4 class="h4-popup">
                            {(marker.hasOwnProperty('evento_nombre')) ? marker.evento_nombre : marker.lugar.nombre}                                          
                        </h4>
                      </div>
                  </div>
                  <div class="row">
                    <div class="modal-body">
                      { (marker.hasOwnProperty('evento_nombre')) ?
                          (<p><i class="fa fa-clock-o" aria-hidden="true"></i>&ensp;
                          <small><strong>{Moment(marker.evento_start_time, 'DD/MM/YYYY HH:mm:ss').locale('es').format('dddd D MMMM')} </strong> a las <strong>{Moment(marker.evento_start_time, 'DD/MM/YYYY HH:mm:ss').format('HH:mm')}hs</strong> ({Moment(marker.evento_start_time, 'DD/MM/YYYY HH:mm:ss').locale('es').fromNow()})</small></p>)
                       :
                        null
                      }
                      <p><small><i class="fa fa-map-marker" aria-hidden="true"></i>&ensp;{marker.lugar.direccion}, <b>{marker.lugar.localidad.nombre}</b></small></p>
                      <p><small><i class="fa fa-street-view" aria-hidden="true"></i>&ensp;<a target="_blank" href={"https://www.google.com/maps/dir/?api=1&destination=" +marker.lugar.geom.coordinates[0]+","+ marker.lugar.geom.coordinates[1]}>Cómo llego?</a></small></p>                      
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          :
            null
          
        }
        </Marker>
    );

    return (
      <Map center={this.props.map.mapCenter} 
          zoom={this.props.map.zoomLevel} 
          maxZoom={this.props.map.zoomMax} 
          animate={true} 
          zoomControl={false}>        
        <TileLayer attribution={this.props.map.attribution} url={this.props.map.url} />          
           { (this.props.markers.markers.length > 1) ?
              <MarkerClusterGroup 
                enableDefaultStyle={true}
                spiderfyOnMaxZoom={false}
                disableClusteringAtZoom={15}>
                  {markerLugaresEventos}
              </MarkerClusterGroup>
             :
             ( (this.props.markers.markers.length == 1 ) ? 
                markerLugaresEventos
                :
                null
             )
           }          
        <Control position="topleft" >
          <div class="card card-map-float">
              <div class="body text-center">
                  { (this.props.markers.resaltar == null) ?
                      <strong>Alto Valle de Río Negro y Neuquén</strong>
                    :
                     <strong>{this.props.markers.markers[this.props.markers.resaltar].lugar.localidad.provincia + ", " + this.props.markers.markers[this.props.markers.resaltar].lugar.localidad.nombre}</strong>
                  }
              </div>
          </div>                
        </Control>  
      </Map>            
    );
  }
}
