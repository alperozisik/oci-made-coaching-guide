const initialState = {
    history: [],
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
            const newHistory = state.history.slice(0, -1);
            return {
                ...state,
                history: newHistory,
                currentComponent: newHistory[newHistory.length - 1] || null,
            };
        default:
            return state;
    }
};

export default navigationReducer;