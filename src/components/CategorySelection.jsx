import React, { useEffect } from 'react';
import './CategorySelection.css';

const CategorySelection = ({ links, persona, topic, onNavigate }) => {
    // Separate links into 'certification' and 'learning' categories
    const certificationLinks = links.filter(link => link.type === 'certification');
    const learningLinks = links.filter(link => link.type !== 'certification');

    useEffect(() => {
        // Automatically navigate to the next step if one of the categories is empty
        if (certificationLinks.length === 0 || learningLinks.length === 0) {
            onNavigate({ step: 'Link List' }); // Navigate to the next step
        }
    }, [certificationLinks, learningLinks, onNavigate]);

    return (
        <div className="category-selection">
            <h2>Select a Category</h2>
            <div className="category-container">
                {/* Display the certification category button if there are items */}
                {certificationLinks.length > 0 && (
                    <button onClick={() => onNavigate({ step: 'Link List', category: 'certification' })}>
                        Certification ({certificationLinks.length})
                    </button>
                )}
                {/* Display the learning category button if there are items */}
                {learningLinks.length > 0 && (
                    <button onClick={() => onNavigate({ step: 'Link List', category: 'learning' })}>
                        Learning ({learningLinks.length})
                    </button>
                )}
            </div>
        </div>
    );
};

export default CategorySelection;