import { divIcon } from 'leaflet';

export default function reducer(state = {
    markers: [],
    fetching: false,
    fetched: false,
    error: null,
    resaltar: null,
}, action) {

     //color de icono todos los que existen primero, el del detalle luego
    const colores = ['black', 'red', 'darkred', 'gray', 'blue', 'lightgreen', 'white', 'beige'];
    
    const iconos = ['<i class="material-icons">visibility_off</i>', '<i class="material-icons">stars</i>'];

    const icono = divIcon({
        className: '',
        popupAnchor:[5,-30],
        iconAnchor: [0, 0],
        html: '<div><div class="awesome-marker-icon-' +
            colores[0] + ' awesome-marker leaflet-clickable leaflet-zoom-animated"' +
            ' style="opacity: 0.7; filter: alpha(opacity=50); margin-left: -13px; margin-top: -37px; width: 35px; height: 45px;">' +
            iconos[0] + '</div></div>',
    });

    const icono_focus = divIcon({
        className: '',
        popupAnchor:[5,-30],
        iconAnchor: [0, 0],
        html: '<div><div class="awesome-marker-icon-' +
            colores[1] + ' awesome-marker leaflet-clickable leaflet-zoom-animated"' +
            ' style="margin-left: -13px; margin-top: -37px; width: 35px; height: 45px;">' +
            iconos[1] + '</div></div>',
    });

    switch (action.type) {        

        case "FETCH_MARKER":{
            return {...state,
                fetching: true,
            }
        }

        case "BORRAR_MARKERS":{
            return {
                markers: [],
                fetching: false,
                fetched: false,
                error: null,
                resaltar: null,
            }

        }

        case "RESALTAR_MARKER":{
            if (action.payload == state.resaltar)
                return {
                    ...state,
                    markers: state.markers.map(
                        (marker, i) => i === action.payload ? {...marker, icono: icono } : {...marker }),
                    resaltar: null
                }
            else 
                return {
                    ...state,
                    markers: state.markers.map(
                        (marker, i) => i === action.payload ? {...marker, icono: icono_focus } : {...marker, icono: icono }),
                    resaltar: action.payload
                }            
        }        

        case "FETCH_MARKER_REJECTED":{
            return {...state,
                fetching: false,
                error: action.payload
            }
        }

        case "FETCH_MARKERS_FULFILLED":{            
            return {
                ...state,
                fetching: false,
                fetched: true,
                markers: action.payload.map((evento) => ({
                    lugar: evento.lugar,
                    evento_nombre: evento.nombre,
                    evento_start_time: evento.start_time,
                    icono: icono,
                    coordinates: evento.lugar.geom.coordinates.reverse(),
                })),
            }
        }

        case "FETCH_MARKER_EVENTO_FULFILLED":{  
            return {
                ...state,
                fetching: false,
                fetched: true,
                markers:[{ 
                    lugar: action.payload.eventos.lugar,
                    evento_nombre: action.payload.eventos.nombre,
                    evento_start_time: action.payload.eventos.start_time,
                    icono: icono,
                    coordinates: action.payload.eventos.lugar.geom.coordinates.reverse()
                }]        
            }
        }

        case "FETCH_MARKERS_LUGARES_RECARGA_FULFILLED":{                     
            return {
                ...state,
                fetching: false,
                fetched: true,
                markers: action.payload.map((lugar) => ({ 
                    lugar: lugar, 
                    icono: icono, 
                    coordinates: lugar.geom.coordinates.reverse() 
                })),
            }
        }

        case "SET_MARKER_NAME":{
            return {
                ...state,
                markers: {...state.markers,
                    name: action.payload
                },
            }
        }

        case "SET_MARKER_AGE":{
            return {
                ...state,
                markers: {...state.markers,
                    age: action.payload
                },
            }
        }

    }

    return state
}
