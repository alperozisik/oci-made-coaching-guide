const initialState = {
    history: [], // Holds the navigation stack
    currentComponent: null,
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PUSH_COMPONENT':
            return {
                ...state,
                history: [...state.history, action.payload],
                currentComponent: action.payload,
            };
        case 'POP_COMPONENT':
            return {
                ...state,
                history: state.history.slice(0, -1),
                currentComponent: state.history[state.history.length - 2] || null,
            };
        default:
            return state;
    }
};

export default navigationReducer;