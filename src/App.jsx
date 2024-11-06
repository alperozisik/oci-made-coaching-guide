import React, { useState } from 'react';
import PersonaSelection from './components/PersonaSelection';
import TopicSelection from './components/TopicSelection';
import LinkSelection from './components/LinkSelection';
import data from './guide.json'; // Importing JSON data
import './styles.css';
import journeyData from './journey.yaml'; // Importing YAML journey data

const App = () => {
    // State to keep track of the current step in the journey
    const [currentStep, setCurrentStep] = useState(journeyData.journey.default[0]);
    // State for selected persona (if applicable)
    const [selectedPersona, setSelectedPersona] = useState(null);

    /**
     * Function to handle moving to the next step in the journey
     * @param {string} stepKey - The key representing the current step in the journey
     */
    const handleNextStep = (stepKey) => {
        console.log('Next step:', stepKey);
        // Logic to find the next step and update the state
        // Check for exceptions or use the default flow
        const nextStepIndex = journeyData.journey.default.findIndex(
            (step) => step.step === stepKey
        ) + 1;

        if (nextStepIndex < journeyData.journey.default.length) {
            setCurrentStep(journeyData.journey.default[nextStepIndex]);
        } else {
            console.log('End of journey');
        }
    };

    return (
        <div>
            {/* Displaying the current step name */}
            <h1>{currentStep.step}</h1>
            {/* Button to proceed to the next step */}
            <button onClick={() => handleNextStep(currentStep.step)}>Next</button>
        </div>
    );
};

export default App;