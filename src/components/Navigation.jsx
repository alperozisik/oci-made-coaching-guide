import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group'; // Optional for animations
import PersonaSelection from './PersonaSelection';
import Confirmation from './Confirmation';
import TopicSelection from './TopicSelection';

const componentMap = {
    'PersonaSelection': PersonaSelection,
    'Confirmation': Confirmation,
    'TopicSelection': TopicSelection,
    // Diğer bileşenler
};

const Navigation = () => {
    const [history, setHistory] = useState([]); // Local state to hold the history stack
    const currentComponent = useSelector(state => state.navigation.currentComponent);
    const dispatch = useDispatch();

    // Function to navigate to the next component and push it to history
    const handleNavigate = (component) => {
        setHistory(prevHistory => [...prevHistory, component]);
        dispatch({ type: 'PUSH_COMPONENT', payload: component });
    };

    // Function to go back in history
    const handleBack = () => {
        setHistory(prevHistory => {
            const newHistory = prevHistory.slice(0, -1);
            dispatch({ type: 'POP_COMPONENT' });
            return newHistory;
        });
    };

    return (
        <div className="navigation-container">
            {/* Optional animation wrapper */}
            <TransitionGroup>
                <CSSTransition key={currentComponent} timeout={300} classNames="fade">
                    <div className="current-component">
                        {currentComponent && React.createElement(currentComponent)}
                    </div>
                </CSSTransition>
            </TransitionGroup>

            {/* Navigation buttons */}
            <div className="navigation-buttons">
                {history.length > 1 && (
                    <button onClick={handleBack} className="back-button">
                        Back
                    </button>
                )}
                {/* Proceed button logic can be added here */}
            </div>
        </div>
    );
};

export default Navigation;