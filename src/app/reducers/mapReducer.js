export default function reducer(state = {
    map: {
        url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        // id: 'mapbox.streets',
        //mapCenter: [-38.9356, -67.98], alto valle
        mapCenter: [-38.9524157,-68.059778], //nqn - monumento san martin        
        zoomLevel: 10,
        zoomMax: 17,
        size: 'county'
    },
}, action) {

    switch (action.type) {
        case "CHANGE_MAP_CENTER":{
            return {
                ...state,
                map: {
                    ...state.map,
                    mapCenter: action.payload,
                    zoomLevel: 15,
                }
            }
        }
        case "CHANGE_MAP_CENTER_INITIAL":{
            return {
                ...state,
                map: {
                    ...state.map,
                    mapCenter: action.payload.posicion,
                    zoomLevel: action.payload.zoom
                }
            }
        }
    }

    return state
}
