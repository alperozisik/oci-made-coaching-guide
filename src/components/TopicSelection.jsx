import React from 'react';

const TopicSelection = ({ topics, persona, onSelectTopic }) => {
    return (
        <div>
            <h2>Select Topic</h2>
            <div>
                {topics
                    .filter((topic) => topic.personas.includes(persona.id))
                    .map((topic) => (
                        <button key={topic.id} onClick={() => onSelectTopic(topic)}>
                            {topic.name}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default TopicSelection;