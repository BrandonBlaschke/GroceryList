import * as actionTypes from './actions';

const initialState = {
    email: '',
    name: '',
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EMAIL:
            console.log("Email set to " + action.value);
            return { ...state, email: action.value }
        case actionTypes.SET_NAME:
            console.log("Name set to " + action.value);
            return { ...state, name: action.value }
        default:
            return state
    };
};

export default reducer; 