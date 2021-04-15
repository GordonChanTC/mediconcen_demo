import { createContext } from "react";

export const TokenInitState = {
    token: ''
}

export const TokenReducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                token: action.payload
            };
        case 'DEL':
            return {
                ...state,
                token: ''
            };
        default:
            return state;
    }
}

const TokenContext = createContext();

export default TokenContext;