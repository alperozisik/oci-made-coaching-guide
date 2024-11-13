import React, { useEffect } from 'react';
import './LinkList.css';
import Link from './Link';
import guideData from '../guide.json';
import store from '../store';

/**
 * Component that displays a list of links.
 * Uses the Link component to render each link.
 * @param {Object} props - The component properties.
 */
const LinkList = () => {
    const journeyUserSelection = store.getState().journey;
    const { personaId, topic, category } = journeyUserSelection;
    const isCertification = category === 'Certification';
    const allLinks = guideData.links;
    const links = allLinks.filter(link => {
        return link.personas.includes(personaId) && link.topics.includes(topic) && !!link.certification === isCertification;
    });

    useEffect(() => {
        // Scroll to the top of the list whenever the content changes.
        document.querySelector('.link-list').scrollTop = 0;
    }, []);

    return (
        <div className="link-list">
            <ul>
                {links.map((link, index) => (
                    <li key={index} className="link-item">
                        <Link linkId={link.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LinkList;