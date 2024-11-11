import React from 'react';
import Link from './Link'; // Import the Link component
import './Confirmation.css'; // Import the CSS for styling

const Confirmation = ({ currentStep, onProceed, onBack, goNextStep }) => {
    const { icon, title, text, proceedButton, backButton } = currentStep;
    // Default button texts if not provided
    const proceedText = proceedButton || "Proceed";
    const backText = backButton || "Back";
    // Function to parse text and replace links with Link component
    const parseText = (text) => {
        if (!text) {
            return "";
        }
        return text.split('\n').map((line, lineIndex) => (
            <p key={`line-${lineIndex}`}>
                {line.split(/(\${link:\d+})/g).map((part, index) => {
                    const match = part.match(/\${link:(\d+)}/);
                    if (match) {
                        const linkId = match[1]; // Extracts the link ID
                        return <Link key={`link-${linkId}-${index}`} linkId={linkId} />;
                    }
                    return <span key={`part-${index}`}>{part}</span>; // Returns the text part as is
                })}
            </p>
        ));
    };

    const handleProceed = () => {
        goNextStep && goNextStep();
        onProceed && onProceed();
    };

    const handleBack = () => {
        goStepBack && goStepBack();
        onBack && onBack();
    }

    return (
        <div className="confirmation-container">
            {icon && <img src={icon} alt="Icon" className="confirmation-icon" />}
            <h2 className="confirmation-title">{title}</h2>
            <div className="confirmation-text">
                {parseText(text)}
            </div>
            <div className="confirmation-buttons">
                <button className="back-button" onClick={handleBack}>
                    <span className="triangle-left"></span>
                    {backText}
                </button>
                <button className="proceed-button" onClick={handleProceed}>
                    {proceedText}
                    <span className="triangle-right"></span>
                </button>
            </div>
        </div>
    );
};

export default Confirmation;