import * as actionTypes from './actions';

const initialState = {
    email: '',
    name: '',
    listView: '',
    listID: '', 
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_EMAIL:
            return { ...state, email: action.value }
        case actionTypes.SET_NAME:
            return { ...state, name: action.value }
        case actionTypes.SET_LIST_VIEW:
            return {...state, listView: action.value}
        case actionTypes.SET_LIST_ID:
            return {...state, listID: action.value}
        default:
            return state
    };
};

export default reducer; 