import {
    RECEIVE_AUTH,
    REQUEST_AUTH,
} from "../constants/actionTypes";

const initialState = {
    isAuthorized: false,
}

export default function Reducer(state = initialState, action) {

    switch (action.type) {
        case REQUEST_AUTH: {
            return {
                ...state,
            }
        }
        case RECEIVE_AUTH: {
            return {
                ...state,
                isAuthorized: action.payload,
            }
        }
        default: {
            return state;
        }
    }
}
