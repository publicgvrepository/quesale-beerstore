import { combineReducers } from 'redux'

import eventos from './eventosReducer'
import menu from './menuReducer'
import markers from './markersReducer'
import map from './mapReducer'
import modal from './modalReducer'
import lugaresRecarga from './lugaresRecargaReducer'

import { responsiveStateReducer } from 'redux-responsive'

export default combineReducers({	
    browser: responsiveStateReducer,
    eventos,
    menu,
    markers,
    map,
    modal,
    lugaresRecarga
})
