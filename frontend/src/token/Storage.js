import React, { useReducer } from 'react';
import TokenContext, { TokenInitState, TokenReducer } from './Context';

const TokenStorage = Component => props => {
    const [state, dispatch] = useReducer(TokenInitState, TokenReducer);
   
    const get = () => {
        return state.token || '';
    };

    const set = (token) => {
        dispatch({ type: 'SET', payload: token });
    };

    const del = () => {
        dispatch({ type: 'DEL' });
    };

    return (
        <TokenContext.Provider value={{ set: set, get: get, del: del }}>
            <Component {...props} />
        </TokenContext.Provider>
    );
    
};

export default TokenStorage;