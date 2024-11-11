import initialState from './journeyInitialState';

const journeyReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PERSONA':
            let persona = action.payload;
            if (action.payload && typeof action.payload.id !== 'undefined') {
                persona = action.payload.id;
            }
            return {
                ...state,
                personaId: persona,
            };
        case 'SET_TOPIC':
            return {
                ...state,
                topic: action.payload,
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