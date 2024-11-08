// Import necessary components for rendering
import React from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

// Import all potential components
import PersonaSelection from './components/PersonaSelection';
import Confirmation from './components/Confirmation';
import TopicSelection from './components/TopicSelection';
import CategorySelection from './components/CategorySelection';
import LinkList from './components/LinkList';
// Add any additional components as needed

// Create a map of component names to their respective imports
const componentMap = {
    'PersonaSelection': PersonaSelection,
    'Confirmation': Confirmation,
    'TopicSelection': TopicSelection,
    'CategorySelection': CategorySelection,
    'LinkList': LinkList,
    // Add other components here as needed
};

const Navigation = ({ currentStep, onNavigate, guideData }) => {
    // Ensure the component to render is defined in the map
    const ComponentToRender = componentMap[currentStep?.component];
    console.log('Current Step:', currentStep);

    return (
        <TransitionGroup>
            {ComponentToRender && (
                <CSSTransition key={currentStep.step} timeout={300} classNames="fade">
                    <div className="navigation-step">
                        <ComponentToRender {...currentStep.props} onNavigate={onNavigate} guideData={guideData} />
                    </div>
                </CSSTransition>
            )}
        </TransitionGroup>
    );
};

export default Navigation;