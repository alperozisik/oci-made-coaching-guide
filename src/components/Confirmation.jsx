import React from 'react';
import { parseText } from '../utils/journeyParser';
import './Confirmation.css'; // Import the CSS for styling

import Persona1Icon from '../images/persona1.svg';
import Persona2Icon from '../images/persona2.svg';
import Persona3Icon from '../images/persona3.svg';
import Persona4Icon from '../images/persona4.svg';
import Persona5Icon from '../images/persona5.svg';
import Persona6Icon from '../images/persona6.svg';
import Persona7Icon from '../images/persona7.svg';
import Persona8Icon from '../images/persona8.svg';
import CertificationIcon from '../images/certification.svg';

const icons = {
    "persona1.svg": Persona1Icon,
    "persona2.svg": Persona2Icon,
    "persona3.svg": Persona3Icon,
    "persona4.svg": Persona4Icon,
    "persona5.svg": Persona5Icon,
    "persona6.svg": Persona6Icon,
    "persona7.svg": Persona7Icon,
    "persona8.svg": Persona8Icon,
    "certification.svg": CertificationIcon,
};
const defaultViewBox = "0 0 98 98";

const Confirmation = ({ currentStep, onProceed, onBack, goNextStep, journey, goStepBack }) => {
    const { icon, title, text, proceedButton, backButton } = currentStep;
    const contextData = {
        icon, title, text, proceedButton, backButton,
        ...journey,
    };
    // Default button texts if not provided
    const proceedText = proceedButton || "Proceed";
    const backText = backButton || "Back";


    const handleProceed = () => {
        goNextStep && goNextStep();
        onProceed && onProceed();
    };

    const handleBack = () => {
        goStepBack && goStepBack(-1);
        onBack && onBack();
    }

    let IconComponent = null;
    if (icon) {
        IconComponent = icons[parseText(icon, contextData, true)];
    }

    return (
        <div className="confirmation-container">
            <div className='confirmation-content'>
                {icon && <IconComponent viewBox={defaultViewBox} alt="Icon" className="confirmation-icon" />}
                <div className='confirmation-body'>
                    <h2 className="confirmation-title">{parseText(title, contextData)}</h2>
                    <div className="confirmation-text">
                        {parseText(text, contextData)}
                    </div>
                </div>
            </div>
            <div className="confirmation-buttons">
                <button className="back-button" onClick={handleBack}>
                    <span className="triangle-left"></span>
                    {parseText(backText, contextData)}
                </button>
                <button className="proceed-button" onClick={handleProceed}>
                    {parseText(proceedText, contextData)}
                    <span className="triangle-right"></span>
                </button>
            </div>
        </div>
    );
};

export default Confirmation;