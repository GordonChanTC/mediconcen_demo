export const TokenInitState = {
    token: ''
};

const TokenReducer = (state, action) => {
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
};

export default TokenReducer;