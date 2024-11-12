// TopicButton.jsx
import React, { useEffect, useRef } from 'react';
import './TopicSelection.css';

const TopicButton = ({ text, onClick }) => {
    const buttonRef = useRef(null);

    useEffect(() => {
        const button = buttonRef.current;
        if (button) {
            let fontSize = parseFloat(window.getComputedStyle(button).fontSize);
            while (button.scrollHeight > button.clientHeight && fontSize > 0.5) {
                fontSize -= 0.1;
                button.style.fontSize = `${fontSize}rem`;
            }
        }
    }, []);

    return (
        <div ref={buttonRef} className="topic-button" onClick={onClick}>
            {text}
        </div>
    );
};

export default TopicButton;