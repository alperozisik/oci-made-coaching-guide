import React from 'react';
import './UserSelectionPanel.css';
import guideData from '../guide.json';
import store from '../store';
import Persona1Icon from '../images/persona1.svg';
import Persona2Icon from '../images/persona2.svg';
import Persona3Icon from '../images/persona3.svg';
import Persona4Icon from '../images/persona4.svg';
import Persona5Icon from '../images/persona5.svg';
import Persona6Icon from '../images/persona6.svg';
import Persona7Icon from '../images/persona7.svg';
import Persona8Icon from '../images/persona8.svg';
import CertificationIcon from '../images/certification.svg';
import LearningIcon from '../images/learning.svg';
const defaultViewBox = "0 0 98 98";

const personaIcons = {
    Persona1: Persona1Icon,
    Persona2: Persona2Icon,
    Persona3: Persona3Icon,
    Persona4: Persona4Icon,
    Persona5: Persona5Icon,
    Persona6: Persona6Icon,
    Persona7: Persona7Icon,
    Persona8: Persona8Icon,
};

const categoryIcons = {
    Certification: CertificationIcon,
    Learning: LearningIcon,
};

const MADE_GROUPS = {
    M: { name: 'Modern Data Platform', color: '#A9D08E' },
    A: { name: 'AI and Application Innovation', color: '#FFD966' },
    D: { name: 'Data center Exit', color: '#8EA9DB' },
    E: { name: 'Estate Modernization', color: '#F4B084' },
};

const UserSelectionPanel = ({ }) => {

    const journeyUserSelection = store.getState().journey;
    const { personaId, topic, category, } = journeyUserSelection;

    const topicInfo = guideData.topics.find(t => t.Topic === topic);
    const topicInitial = topicInfo.MADE;
    const topicColor = MADE_GROUPS[topicInitial].color;

    const SelectedPersonaIcon = personaIcons[`Persona${personaId}`];
    const SelectedCategoryIcon = categoryIcons[category];

    return (
        <div className="user-selection-panel" >
            <div className="persona-icon">
                <SelectedPersonaIcon viewBox={defaultViewBox}/>
            </div>
            <div className="topic-initial" style={{ backgroundColor: topicColor }}>
                {topicInitial}
            </div>
            <div className="category-icon">
                <SelectedCategoryIcon viewBox={defaultViewBox}/>
            </div>
        </div >
    );
};

export default UserSelectionPanel;