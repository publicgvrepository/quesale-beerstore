export default function reducer(state={
    eventos: [],
    opciones : [],
    response: {
        pending: false,
        fulfilled: false,
        error: false,
        response: [],
    },
  }, action) {

    switch (action.type) {

      case "EVENTOS_INITIAL":{
        return {
          eventos: [],
          opciones : [],
          response: {
              pending: false,
              fulfilled: false,
              error: false,
              response: [],
          }
        }
      }

      // EVENTOS LISTADO
      case "FETCH_EVENTOS_PENDING":
          {
              return {
                  ...state,
                  eventos: [],
                  response: {fullfilled:false, pending: true, error: false, response:[] }
              }
              break;
          }

      case "FETCH_EVENTOS_REJECTED": {
        return {
            ...state, 
            response: {error: true, response: action.payload, pending:false, fulfilled:false}
          }
      }

      case "FETCH_EVENTOS_FULFILLED": {
        return {
          ...state,
          response: {fulfilled: true, pending: false, error:false, response:[]},
          eventos: action.payload,
          opciones: action.payload.map((evento)=>({
                collapsed: false,
                ver_imagen: false
              }))
        }
      }

      // EVENTO SINGULAR
      case "FETCH_EVENTO_PENDING":
          {
              return {
                  ...state,
                  eventos: [],
                  response: {fullfilled:false, pending: true, error: false, response:[] }
              }
              break;
          }

      case "FETCH_EVENTO_REJECTED": {
        return {
            ...state,
            eventos: [],
            response: {error: true, response: action.payload, pending:false, fulfilled:false}
          }
      }

      case "FETCH_EVENTO_FULFILLED": {
        return {
          ...state,
          response: {fulfilled: true, pending: false, error:false, response:[]},
          eventos: [action.payload]          
        }
      }

      case "VER_DETALLE_EVENTO": {
        return {
                ...state,
                opciones: state.opciones.map((evento_op,index)=> (index==action.payload)?{...evento_op,collapsed:true}:{...evento_op, collapsed:false})
            }
      }

      case "OCULTAR_DETALLE_EVENTO": {
        return {
                ...state,
                opciones: state.opciones.map((evento_op,index)=> (index==action.payload)?{...evento_op,collapsed:false}:{...evento_op})
            }
      }

      case "VER_DETALLE_EVENTO_IMAGEN": {
        return {
                ...state,
                opciones: state.opciones.map((evento_op,index)=> (index==action.payload)?{...evento_op,ver_imagen:true}:{...evento_op, ver_imagen:false})
            }
      }

      case "OCULTAR_DETALLE_EVENTO_IMAGEN": {
        return {
                ...state,
                opciones: state.opciones.map((evento_op,index)=> (index==action.payload)?{...evento_op,ver_imagen:false}:{...evento_op})
            }
      }

      case "ADD_EVENTO": {
        return {
          ...state,
          eventos: [...state.eventos, action.payload],
        }
      }

      case "UPDATE_EVENTO": {
        const { id, text } = action.payload
        const newEventos = [...state.eventos]
        const eventoToUpdate = newEventos.findIndex(evento => evento.id === id)
        newEventos[eventoToUpdate] = action.payload;

        return {
          ...state,
          eventos: newEventos,
        }
      }

      case "DELETE_EVENTO": {
        return {
          ...state,
          eventos: state.eventos.filter(evento => evento.id !== action.payload),
        }
      }
    }

    return state
}
