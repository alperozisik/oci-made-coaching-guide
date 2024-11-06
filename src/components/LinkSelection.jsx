import React from 'react';

const LinkSelection = ({ links, topic }) => {
    return (
        <div>
            <h2>Recommended Links</h2>
            <div>
                {links
                    .filter((link) => link.topics.includes(topic.id))
                    .map((link) => (
                        <div key={link.id} className="link-item">
                            <a href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.name}
                            </a>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default LinkSelection;