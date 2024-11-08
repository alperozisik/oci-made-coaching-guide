import React, { useEffect } from 'react';
import './LinkList.css';
import Link from './Link';

/**
 * Component that displays a list of links.
 * Uses the Link component to render each link.
 * @param {Object} props - The component properties.
 * @param {Array} props.links - The list of link objects to display.
 */
const LinkList = ({ links }) => {
    useEffect(() => {
        // Scroll to the top of the list whenever the content changes.
        document.querySelector('.link-list').scrollTop = 0;
    }, [links]);

    return (
        <div className="link-list">
            <ul>
                {links.map((link, index) => (
                    <li key={index}>
                        <Link linkId={link.id} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LinkList;