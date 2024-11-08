// Import necessary components and hooks
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { parseJourney } from './utils/journeyParser';

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
    const userSelection = useSelector((state) => state.userSelection); // Get the user selection from the store

    const goNextStep = () => {
        const updatedJourney = parseJourney(journeyData, userSelection);
        const currentIndex = updatedJourney.findIndex(step => step.step === currentStep.step);
        if (currentIndex !== -1 && currentIndex < updatedJourney.length - 1) {
            const nextStep = updatedJourney[currentIndex + 1];
            dispatch({
                type: 'PUSH_STEP',
                payload: nextStep,
            });
        }
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
                            {...currentStep.props}
                            onNavigate={onNavigate}
                            guideData={guideData}
                            goNextStep={goNextStep}
                        />
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};

export default Navigation;