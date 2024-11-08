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
        case 'PUSH_STEP':
            return {
                ...state,
                history: [...state.history, action.payload],
                currentStep: action.payload,
            };
        case 'POP_STEP':
            const newHistory = state.history.slice(0, -1);
            return {
                ...state,
                history: newHistory,
                currentStep: newHistory[newHistory.length - 1] || null,
            };
        case 'NEXT_STEP':
            const { currentStep, journeyData, userSelection } = action.payload;
            const currentIndex = journeyData.findIndex(step => step.step === currentStep.step);
            if (currentIndex !== -1 && currentIndex < journeyData.length - 1) {
                const nextStep = journeyData[currentIndex + 1];
                return {
                    ...state,
                    history: [...state.history, nextStep],
                    currentStep: nextStep,
                };
            }
            return state;
        default:
            return state;
    }
};

export default navigationReducer;