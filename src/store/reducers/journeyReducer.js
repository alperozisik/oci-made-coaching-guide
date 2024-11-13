import initialState from './journeyInitialState';

const journeyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PERSONA':
            let personaId = null;
            let personaName = '';
            if (action.payload && typeof action.payload.id !== 'undefined') {
                personaId = action.payload.id;
            }
            if (action.payload && typeof action.payload.persona !== 'undefined') {
                personaName = action.payload.persona;
            }
            return {
                ...state,
                personaId: personaId,
                personaName: personaName,
            };
        case 'SET_TOPIC':
            return {
                ...state,
                topic: action.payload,
            };
        case 'SET_CATEGORY':
            return {
                ...state,
                category: action.payload,
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