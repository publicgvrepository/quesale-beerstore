export function resaltarMarker(index){
  return {
    type: 'RESALTAR_MARKER',
    payload: index,
  }
}

export function borrarMarkers(){	
  return {
    type: 'BORRAR_MARKERS',    
  }
}

export function cargarMarkers(data){  
  return {
    type: 'FETCH_MARKERS_LUGARES_RECARGA_FULFILLED',
    payload: data
  }
}

export function cargarMarkersEventos(data){	
	return {
		type: 'FETCH_MARKERS_FULFILLED',
		payload: data,
	}
}

export function cargarMarkersEventoCompartido(evento){ 
  return {
    type: 'FETCH_MARKER_EVENTO_FULFILLED',
    payload: evento
  }
}

