import React, { useState } from 'react';
import PersonaSelection from './components/PersonaSelection';
import TopicSelection from './components/TopicSelection';
import LinkSelection from './components/LinkSelection';
import data from './guide.json'; // Importing JSON data
import './styles.css';

const App = () => {
    // Define application state for current step, selected persona, and selected topic
    const [currentStep, setCurrentStep] = useState('persona');
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Handle persona selection and proceed to the topic selection step
    const handleSelectPersona = (persona) => {
        setSelectedPersona(persona);
        setCurrentStep('topic');
    };

    // Handle topic selection and proceed to the link selection step
    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
        setCurrentStep('link');
    };

    return (
        <div>
            {/* Render PersonaSelection if current step is 'persona' */}
            {currentStep === 'persona' && (
                <PersonaSelection personas={data.personas} onSelectPersona={handleSelectPersona} />
            )}
            
            {/* Render TopicSelection if current step is 'topic' */}
            {currentStep === 'topic' && (
                <TopicSelection topics={data.topics} persona={selectedPersona} onSelectTopic={handleSelectTopic} />
            )}
            
            {/* Render LinkSelection if current step is 'link' */}
            {currentStep === 'link' && <LinkSelection links={data.links} topic={selectedTopic} />}
        </div>
    );
};

export default App;