export default function reducer(state = {
    lugares: [],
    lugares_opcion: [],
    response: {
        pending: false,
        fulfilled: false,
        error: false,
    },
}, action) {

    switch (action.type) {
        case "LUGARES_RECARGA_INICIAL":{
            return {
                lugares: [],
                lugares_opcion: [],
                response: {
                    pending: false,
                    fulfilled: false,
                    error: false,
                }
            }
        }
        case "FETCH_LUGARES_RECARGA_PENDING":{
              return {
                  ...state,
                  lugares: [],
                  lugares_opcion: [],
                  response: {
                    ...state.response, 
                    pending: true
                }
              }              
        }
        case "FETCH_LUGARES_RECARGA_REJECTED":{
            return {
                ...state,
                response:{
                    fetching: false,
                    pending: false, 
                    error: action.payload
                }
            }
        }
        case "FETCH_LUGARES_RECARGA_FULFILLED":{
            return {                    
              response: {
                ...state.response, 
                pending: false, 
                fulfilled: true
                },
              lugares: action.payload,
              lugares_opcion: action.payload.map((lugar)=>({
                collapsed: false
              }))
            }
        }
        case "LUGARES_RECARGA_OP_COLLAPSE":{
            return {
                ...state,
                lugares_opcion: state.lugares_opcion.map((lugar_op,index)=> (index==action.payload)?{...lugar_op,collapsed:true}:{...lugar_op, collapsed:false})
            }
        }
        case "LUGARES_RECARGA_OP_NOT_COLLAPSE":{
            return {
                ...state,
                lugares_opcion: state.lugares_opcion.map((lugar_op,index)=> (index==action.payload)?{...lugar_op,collapsed:false}:{...lugar_op})
            }
        }
    }

    return state
}
