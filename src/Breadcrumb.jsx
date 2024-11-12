import React from 'react';
import './Breadcrumb.css';
import journeyInitialState from './store/reducers/journeyInitialState';
import journeyData from './journey.yaml';
import { parseJourney } from './utils/journeyParser';

// Parse the initial journey at the top of the reducer file
const initialJourney = parseJourney(journeyData, journeyInitialState);
const initialStep = initialJourney.length > 0 ? initialJourney[0] : null;

const Breadcrumb = ({ history, currentStep, goStepBack }) => {
    // Ensure that history is an array and currentStep is not null
    const breadcrumbSteps = [
        initialStep,
        ...(Array.isArray(history) ? history : []),
    ]
        .filter(Boolean)
        .map((step, index, arr) => {
            return {
                ...step,
                historyIndex: index - arr.length + 1, // Calculate how far back this step is
            };
        })
        .filter((step) => step.breadcrumbVisible);

        return (
            <div className="breadcrumb">
                {breadcrumbSteps.map((step, index) => (
                    <span
                        key={index}
                        className={`breadcrumb-item ${index === breadcrumbSteps.length - 1 ? 'current' : ''}`}
                        onClick={() => {
                            if (index !== breadcrumbSteps.length - 1) {
                                goStepBack(step.historyIndex);
                            }
                        }}
                        tabIndex={index === breadcrumbSteps.length - 1 ? -1 : 0}
                        style={{ 
                            cursor: index === breadcrumbSteps.length - 1 ? 'default' : 'pointer',
                            userSelect: 'none'
                        }}
                        role="button"
                    >
                        {step.step}
                        {index < breadcrumbSteps.length - 1 && (
                            <span className="breadcrumb-separator"> &gt; </span>
                        )}
                    </span>
                ))}
            </div>
        );
};

export default Breadcrumb;