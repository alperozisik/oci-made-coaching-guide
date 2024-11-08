const initialState = {
    history: [],
    currentStep: null,
};

const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_INITIAL_STEP':
            return {
                ...state,
                currentStep: action.payload,
            };
        case 'PUSH_COMPONENT':
            return {
                ...state,
                history: [...state.history, action.payload],
                currentStep: action.payload,
            };
        case 'POP_COMPONENT':
            const newHistory = state.history.slice(0, -1);
            return {
                ...state,
                history: newHistory,
                currentStep: newHistory[newHistory.length - 1] || null,
            };
        default:
            return state;
    }
};

export default navigationReducer;