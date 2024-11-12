import React from 'react';
import guideData from '../guide.json'; // Import guide.json to access the topics
import './TopicSelection.css';
import TopicButton from './TopicButton';
import { useDispatch } from 'react-redux';

const MADE_GROUPS = {
    M: { name: 'Modern Data Platform', color: '#A9D08E' },
    A: { name: 'AI and Application Innovation', color: '#FFD966' },
    D: { name: 'Data center Exit', color: '#8EA9DB' },
    E: { name: 'Estate Modernization', color: '#F4B084' },
};

const TopicSelection = ({ goNextStep }) => {
    const dispatch = useDispatch();
    const topics = guideData.topics;

    const handleTopicSelect = topic => {
        dispatch({ type: 'SET_TOPIC', payload: topic });
        goNextStep();
    }

    return (
        <div className="topic-selection">
            <h2 className="topic-selection-title">Choose your interest area</h2>
            <div className="topic-groups">
                {Object.entries(MADE_GROUPS).map(([key, group]) => (
                    <div key={key} className="topic-group" style={{ borderColor: group.color }}>
                        <div className="group-header" style={{ backgroundColor: group.color }}>
                            <h3 className="group-letter">{key}</h3>
                            <span className="group-name">{group.name}</span>
                        </div>
                        <div className="topics">
                            {topics
                                .filter(topic => topic.MADE === key)
                                .map((topic, index) => (
                                    <TopicButton
                                        key={index}
                                        text={topic.Topic}
                                        onClick={() => handleTopicSelect(topic.Topic)} // Handle topic selection
                                    />
                                ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TopicSelection;