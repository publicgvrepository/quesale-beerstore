export default function reducer(state = {
    modal: {
        show: false,
        evento: null,
        response: {
            pending: false,
            fulfilled: false,
            error: false,
        },
    },
}, action) {

    switch (action.type) {
        case "OPEN_MODAL":{
            return {
                ...state,                
                modal: {
                    ...state.modal,                    
                    show: true,
                }
            }
        }
        case "CLOSE_MODAL":{
            return {
                ...state,
                modal: {
                    ...state.modal,
                    evento:null,
                    show: false
                }
            }
        }

        case "FETCH_EVENTO_IMAGEN_MODAL":{
            return {
                ...state,
                modal:{
                        evento:action.payload                        
                    }
            }
        }


        case "FETCH_EVENTO_MODAL_PENDING":{
              return {
                  ...state,
                  response: {
                    ...state.response, 
                    pending: true
                }
              }              
        }
        case "FETCH_EVENTO_MODAL_REJECTED":{
            return {
                ...state, 
                fetching: false,
                pending: false, 
                error: action.payload
            }
        }
        case "FETCH_EVENTO_MODAL_FULFILLED":{
            return {
              ...state,
              response: {
                ...state.response, 
                pending: false, 
                fulfilled: true
                },
              evento: action.payload              
            }
        }

    }

    return state
}
