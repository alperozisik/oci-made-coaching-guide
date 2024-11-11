// Import necessary components and hooks
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { parseJourney } from './utils/journeyParser';
import store from './store';

// Import all potential components
import PersonaSelection from './components/PersonaSelection';
import Confirmation from './components/Confirmation';
import TopicSelection from './components/TopicSelection';
import CategorySelection from './components/CategorySelection';
import LinkList from './components/LinkList';

// Create a map of component names to their respective imports
const componentMap = {
    'PersonaSelection': PersonaSelection,
    'Confirmation': Confirmation,
    'TopicSelection': TopicSelection,
    'CategorySelection': CategorySelection,
    'LinkList': LinkList,
};

const Navigation = ({ currentStep, onNavigate, guideData, journeyData }) => {
    const dispatch = useDispatch();

    const goNextStep = () => {
        const userSelection = store.getState().journey;
        
        const updatedJourney = parseJourney(journeyData, userSelection);
        const currentIndex = updatedJourney.findIndex(step => step.step === currentStep.step);
        if (currentIndex !== -1 && currentIndex < updatedJourney.length - 1) {
            const nextStep = updatedJourney[currentIndex + 1];
            console.log('Next Step:', nextStep);
            dispatch({
                type: 'PUSH_STEP',
                payload: nextStep,
            });
        }
    };

    const goStepBack = (numberOfStepstoGoBack = -1) => {
        if (numberOfStepsToGoBack > 0) {
            console.warn('Invalid step count: numberOfStepsToGoBack should be negative.');
            return;
        }
        dispatch({
            type: 'POP_MULTIPLE_STEPS',
            payload: Math.abs(numberOfStepsToGoBack), // Convert to positive number
        });
    };

    // Ensure the component to render is defined in the map
    const ComponentToRender = componentMap[currentStep?.component];
    console.log('Current Step:', currentStep);

    return (
        <TransitionGroup>
            {ComponentToRender && (
                <CSSTransition key={currentStep.step} timeout={300} classNames="fade">
                    <div className="navigation-step">
                        <ComponentToRender
                            currentStep={currentStep}
                            onNavigate={onNavigate}
                            guideData={guideData}
                            goNextStep={goNextStep}
                            goStepBack={goStepBack}
                        />
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};

export default Navigation;