import axios from "axios";

const api_token_access = document.getElementById('app').getAttribute('myargument');
const api_url = process.env.API_HOST;


export function limpiarMenu(){
  return {
    type: 'MENU_SIDEBAR_INICIAL'    
  }
}

export function iniciarMenu(fecha){
  return {
    type: 'INICIAR_MENU',
    payload: fecha,
  }
}

export function mostrarIconoNavegacion(){
  return {
    type: 'SHOW_NAVEGATION_BUTTON',
  }
}

export function ocultarIconoNavegacion(){
  return {
    type: 'HIDDE_NAVEGATION_BUTTON',
  }
}

export function abreMenuSidebar(){
  return {
    type: 'OPEN_MENU_SIDEBAR',
  }
}

export function cierraMenuSidebar(){
  return {
    type: 'CLOSE_MENU_SIDEBAR',
  }
}

export function abreMenuSidebarFilter(){
  return {
    type: 'OPEN_MENU_SIDEBAR_FILTER',
  }
}

export function cierraMenuSidebarFilter(){
  return {
    type: 'CLOSE_MENU_SIDEBAR_FILTER',
  }
}

export function setearMenuGrupo(nombre_grupo, query_grupo){
  return {
    type: 'SETEAR_MENU_GRUPO',
    payload: {
      nombre_grupo,
      grupo: query_grupo
    }
  }
}


export function setearMenuGrupoQuery(query_grupo){
  return {
    type: 'SETEAR_MENU_GRUPO_QUERY',
    payload: {      
      grupo: query_grupo
    }
  }
}

export function armarMenu(parametro) {

  return function(dispatch) {

    var url = api_url + "api/grouptag/";
   
    var fecha = parametro;

    switch (fecha) {
      case 'hoy':
        url += "grupos_hoy/"
        break;
      case 'manana':
        url += "grupos_manana/"
        break;
      case 'finde':
        url += "grupos_finde/"
        break;
      default:
        url = "INVALIDA";
        break;
    }
        dispatch({
          type:"MENU_GRUPO",
          payload: axios.get(url, { 'headers': { 'Authorization': 'Bearer ' + api_token_access }})
        });
  }
}

export function getMenuGroupForFilter(query_param){

  return function(dispatch){
    var url = api_url + "api/grouptag/";

    dispatch({
          type:"MENU_GRUPO_FILTER",
          payload: axios.get(url + '?query_param=' + query_param, { 'headers': { 'Authorization': 'Bearer ' + api_token_access }})
        });

  }
}


export function setUrl(url){
  return {
    type: 'MENU_SETEAR_REGULAR_URL',
    payload: {
      url: url
    }
  }
}

export function setParams(params){
  return {
    type: 'MENU_SETEAR_REGULAR_URL_PARAMS',
    payload: {
      params: params
    }
  }
}



export function irAtras(url, params){

  switch (url){

    case "404":
    case "500":
    case "contacto":
    case "colaborar":
    case "recargas":
    case "evento/:idevento":
    case "eventos/:fecha": {
      return ""
      break;
    }
    case "eventos/:fecha/:grupo":{
      return "eventos/" + params.fecha;
      break;
    }
    default:
      return ""
  }
  
}
