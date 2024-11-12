import React from 'react';
import guideData from '../guide.json'; // Import guide data for links
import './Link.css'; // Import the CSS for styling

const Link = ({ linkId }) => {
    // Find the link data by ID
    const link = guideData.links.find(link => link.id === parseInt(linkId));

    if (!link) {
        // Log an error to the console if the link is not found
        console.error(`Link with ID ${linkId} not found in guide.json`);
        return <span>Link not found</span>;
    }

    // Render the <a> element with the appropriate link details
    return (
        <a href={link.url} target="_blank" rel="noopener noreferrer" className='guide-link'>
            {link.name}
        </a>
    );
};

export default Link;