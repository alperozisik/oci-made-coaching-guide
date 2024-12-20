import React from 'react';
import { useDispatch } from 'react-redux';
import './PersonaSelection.css';
import Persona1Icon from '../images/persona1.svg';
import Persona2Icon from '../images/persona2.svg';
import Persona3Icon from '../images/persona3.svg';
import Persona4Icon from '../images/persona4.svg';
import Persona5Icon from '../images/persona5.svg';
import Persona6Icon from '../images/persona6.svg';
import Persona7Icon from '../images/persona7.svg';
import Persona8Icon from '../images/persona8.svg';

const icons = [
    Persona1Icon,
    Persona2Icon,
    Persona3Icon,
    Persona4Icon,
    Persona5Icon,
    Persona6Icon,
    Persona7Icon,
    Persona8Icon,
];

const defaultViewBox = "0 0 99 98";

const PersonaSelection = ({ guideData, onSelectPersona, goNextStep }) => {
    const dispatch = useDispatch();
    const personas = guideData.personas;

    const handleSelectPersona = (persona) => {
        // Dispatch to update the selected persona in the store
        dispatch({ type: 'SET_PERSONA', payload: persona });

        goNextStep();

        // Call the optional onSelectPersona event if provided
        if (onSelectPersona) {
            onSelectPersona(persona);
        }
    };

    return (
        <div className="persona-selection">
            <div className="header">
                <h2>Select Your Role</h2>
                <p>Select your most matching role</p>
            </div>
            <div className="persona-container">
                <div className="star-wrapper">
                    <div className="outer-square"></div>
                    <div className="inner-square"></div>
                </div>
                {personas.map((persona, index) => {
                    const IconComponent = icons[index];
                    return (
                        <div
                            key={persona.id}
                            className={`persona-item persona-${index + 1}`}
                            onClick={() => handleSelectPersona(persona)}
                        >
                            <IconComponent className="persona-icon" viewBox={defaultViewBox} />
                            <p>{persona.persona}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PersonaSelection;