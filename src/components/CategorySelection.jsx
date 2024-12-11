// CategorySelection.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import './CategorySelection.css'; // Import the CSS for styling
import LearningIcon from '../images/learning.svg'; // Import SVG icon for learning
import CertificationIcon from '../images/certification.svg'; // Import SVG icon for certification


const CategorySelection = ({ goNextStep }) => {
    const dispatch = useDispatch();
    const handleCategorySelect = category => {
        dispatch({ type: 'SET_CATEGORY', payload: category });
        goNextStep();
    };
    return (
        <div className="category-selection">
            <div className="category-options">
                <div className="category-item" onClick={() => handleCategorySelect('Learning')}>
                    <LearningIcon alt="Learning" className="category-icon" />
                    <p>Learning / Training</p> {/* Category label */}
                </div>
                <div className="category-item" onClick={() => handleCategorySelect('Certification')}>
                    <CertificationIcon alt="Certification" className="category-icon" />
                    <p>Assessment / Certification</p> {/* Category label */}
                </div>
            </div>
        </div>
    );
};

export default CategorySelection;