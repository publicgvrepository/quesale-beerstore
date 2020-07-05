export default function reducer(state = {
    response: {
        pending: false,
        fulfilled: false,
        error: false,
        response: [],
    },
    menu: [],
    menu_sidebar:'open',
    menu_sidebar_filter: '',
    menu_filter: {
        filtro_nombre:""
    },
    fecha: '',
    grupo: '',
    grupo_nombre: '',
    url_patron:'',
    url_patron:{},
    show_navegation_button:false,    

}, action) {


    // var menu_color = ['amarillo', 'celeste', 'violeta', 'verde', 'rojo', 'anaranjado', 'amarillo', 'celeste', 'violeta', 'verde', 'rojo', 'anaranjado'];


    switch (action.type) {

        case "MENU_SETEAR_REGULAR_URL": {
            return {
                ...state,
                url_patron: action.payload.url
            }
        }    

        case "MENU_SETEAR_REGULAR_URL_PARAMS": {
            return {
                ...state,
                url_params: action.payload.params,
            }
        }       

        case "MENU_SIDEBAR_INICIAL":{
            return {
                ...state,
                response: {
                    pending: false,
                    fulfilled: false,
                    error: false,
                    response: [],
                },
                menu: [],
                menu_sidebar:'open',
                menu_sidebar_filter: '',
                fecha: '',
                grupo: '',
                grupo_nombre: '',                
                show_navegation_button: state.show_navegation_button,    

            }

        }

        case "SHOW_NAVEGATION_BUTTON":{
          return {
            ...state,
            show_navegation_button: true,
          }
        }


        case "HIDDE_NAVEGATION_BUTTON":{
          return {
            ...state,
            show_navegation_button: false,
          }
        }
        

        case "OPEN_MENU_SIDEBAR":{
          return {
            ...state,
            menu_sidebar: '',
          }
        }

        case "CLOSE_MENU_SIDEBAR":{
          return {
            ...state,
            menu_sidebar:'open',
          }
        }

        case "OPEN_MENU_SIDEBAR_FILTER":{
          return {
            ...state,
            menu_sidebar_filter: '',
          }
        }

        case "CLOSE_MENU_SIDEBAR_FILTER":{
          return {
            ...state,
            menu_sidebar_filter:'open',
          }
        }

        case "INICIAR_MENU":
            {
                return {
                    ...state,
                    response: {
                        pending: false,
                        fulfilled: false,
                        error: false,
                    },
                    menu: [],
                    fecha: action.payload,

                    // grupo: '',
                    // grupo_nombre: '',
                }
            }

        case "MENU_GRUPO_PENDING":
            {
                return {
                    ...state,
                    response: {...state.response, pending: true , error:false, response:[]}
                }
                break;
            }

        case "MENU_GRUPO_FULFILLED":
            {
                return {
                    ...state,
                    menu: action.payload.data.map((opcion, i) => ({...opcion })),
                    response: {...state.response, pending: false, fulfilled: true, error:false, response:[]},
                }
                break;
            }

        case "MENU_GRUPO_REJECTED":
            {
                return {
                    ...state,
                    menu: [],                
                    response: {pending: false, fulfilled: false, error: true, response: action.payload},
                }
                break;
            }


        case "MENU_GRUPO_FILTER_PENDING":
            {
                return {
                    ...state,
                    grupo: null,
                    response: {...state.response, pending: true , error:false, response:[]}
                }
                break;
            }

        case "MENU_GRUPO_FILTER_FULFILLED":
            {
                return {
                    ...state,
                    grupo: action.payload.data[0],
                    response: {...state.response, pending: false, fulfilled: true, error:false, response:[]},
                }
                break;
            }

        case "MENU_GRUPO_FILTER_REJECTED":
            {
                return {
                    ...state,
                    grupo: null,                
                    response: {pending: false, fulfilled: false, error: true, response: action.payload},
                }
                break;
            }


        case "SETEAR_MENU_GRUPO":
            {
                return {
                    ...state,
                    grupo: action.payload.grupo,
                    grupo_nombre: action.payload.nombre_grupo
                }
            }
            
        case "SETEAR_MENU_GRUPO_QUERY":
            {
                return {
                    ...state,
                    grupo: action.payload.grupo                    
                }
            }


        case "FETCH_MENUS":
            {
                return {...state, pending: true }
            }
        case "FETCH_MENUS_REJECTED":
            {
                return {...state, pending: false, error: action.payload }
            }
        case "FETCH_MENUS_FULFILLED":
            {
                return {
                    ...state,
                    pending: false,
                    fulfilled: true,
                    menus: action.payload,
                }
            }
        case "ADD_MENU":
            {
                return {
                    ...state,
                    menus: [...state.menus, action.payload],
                }
            }
        case "UPDATE_MENU":
            {
                const { id, text } = action.payload
                const newEventos = [...state.menus]
                const menuToUpdate = newEventos.findIndex(menu => menu.id === id)
                newEventos[menuToUpdate] = action.payload;

                return {
                    ...state,
                    menus: newEventos,
                }
            }
        case "DELETE_MENU":
            {
                return {
                    ...state,
                    menus: state.menus.filter(menu => menu.id !== action.payload),
                }
            }
    }

    return state
}
