const initialState = {
    selectedPersona: null,
    selectedTopic: null,
    journeyState: {},
};

const journeyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PERSONA':
            return {
                ...state,
                selectedPersona: action.payload,
            };
        case 'SET_TOPIC':
            return {
                ...state,
                selectedTopic: action.payload,
            };
        case 'UPDATE_JOURNEY_STATE':
            return {
                ...state,
                journeyState: {
                    ...state.journeyState,
                    ...action.payload,
                },
            };
        default:
            return state;
    }
};

export default journeyReducer;