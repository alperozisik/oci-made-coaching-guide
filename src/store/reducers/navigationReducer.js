import journeyInitialState from './journeyInitialState';
import journeyData from '../../journey.yaml';
import { parseJourney } from '../../utils/journeyParser';

// Parse the initial journey at the top of the reducer file
const initialJourney = parseJourney(journeyData, journeyInitialState);
const initialStep = initialJourney.length > 0 ? initialJourney[0] : null;

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
        case 'POP_MULTIPLE_STEPS':
            if (action.payload > state.history.length) {
                console.warn('Invalid step count: Trying to go back more steps than available in history.');
                return {
                    ...state,
                    history: [],
                    currentStep: initialStep, // Set to the initial step based on journey parsing
                };
            }
            const updatedHistory = state.history.slice(0, -action.payload);
            return {
                ...state,
                history: updatedHistory,
                currentStep: updatedHistory.length > 0 ? updatedHistory[updatedHistory.length - 1] : initialStep, // Fallback to the initial step
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