const INITIAL_STATE = {
    alertMsg: {
        statut: "",
        msg: ""
    }
}

function formReducer(state = INITIAL_STATE, action) {

    switch(action.type) {
        case 'ALERTMSG': {
            return {
                ...state,
                alertMsg: action.payload
            }
        }
    }

    return state
}

export default formReducer