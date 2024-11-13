import React, { useEffect } from 'react';
import './LinkList.css';
import Link from './Link';
import guideData from '../guide.json';
import store from '../store';
import UserSelectionPanel from './UserSelectionPanel';

/**
 * Component that displays a list of links.
 * Uses the Link component to render each link.
 * @param {Object} props - The component properties.
 */
const LinkList = () => {
    const journeyUserSelection = store.getState().journey;
    const { personaId, topic, category, personaName } = journeyUserSelection;
    const isCertification = category === 'Certification';
    const allLinks = guideData.links;
    const links = allLinks.filter(link => {
        return true; //DEBUG: Remove this line
        return link.personas.includes(personaId) && link.topics.includes(topic) && !!link.certification === isCertification;
    });

    useEffect(() => {
        // Scroll to the top of the list whenever the content changes.
        document.querySelector('.link-list').scrollTop = 0;
    }, []);

    return (
        <div className="link-list">
            <div className="header">
                Displaying useful links for <strong>{personaName}</strong>, <strong>{topic}</strong>, <strong>{category}</strong>
            </div>
            <UserSelectionPanel />
            <div className="link-list-effects">
                <div className="top-gradient"></div>
                <div className='link-list-container'>
                    {links.map((link, index) => (
                        <div key={index} className="link-item">
                            <Link linkId={link.id} />
                        </div>
                    ))}
                </div>
                <div className="bottom-gradient"></div>
            </div>
        </div>
    );
};

export default LinkList;