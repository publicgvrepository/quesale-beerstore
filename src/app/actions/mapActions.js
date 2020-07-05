// Para centrar el mapa a la posicion inicial
export function centrarMapaInicial(){  
  return {
    type: 'CHANGE_MAP_CENTER_INITIAL',
    payload: {
    	posicion: [-38.952759, -68.024765], //Nqn capital
    	zoom: 10
    },
  }
}


// Para centrar el mapa en el marker seleccionado
export function centrarMapa(posicion){  
  return {
    type: 'CHANGE_MAP_CENTER',
    payload: posicion,
  }
}

