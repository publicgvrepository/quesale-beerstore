import axios from 'axios';
import { cargarMarkers } from './markersActions';

export function fetchLugaresDeRecarga(filtro_nombre) {
  return function(dispatch) {
    var url = 'dist/data/data-beerstore.json';
    var filtro = filtro_nombre.toLowerCase();

    dispatch({type: "FETCH_LUGARES_RECARGA_PENDING"});   
    axios.get(url)
      .then((response) => {
        var data = response.data.filter((l)=>l.nombre.toLowerCase().includes(filtro));
        dispatch({
            type: "FETCH_LUGARES_RECARGA_FULFILLED", 
            payload: data,
          });
        dispatch(cargarMarkers(data));
      })
      .catch((err) => {
        dispatch({
          type: "FETCH_LUGARES_RECARGA_REJECTED", 
          payload: err
        })
      })
  }  
}

export function collapsedTrue(index){
  return {
    type: 'LUGARES_RECARGA_OP_COLLAPSE',
    payload: index,
  }
}

export function collapsedFalse(index){
  return {
    type: 'LUGARES_RECARGA_OP_NOT_COLLAPSE',
    payload: index,
  }
}

