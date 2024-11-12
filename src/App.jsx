import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { parseJourney } from './utils/journeyParser';
import journeyData from './journey.yaml';
import Navigation from './Navigation';
import guideData from './guide.json';
import journeyInitialState from './store/reducers/journeyInitialState';
import './styles.css';
import oTag from './assets/images/o-tag.png';

const App = () => {
    const dispatch = useDispatch();
    const currentStep = useSelector((state) => state.navigation.currentStep); // Get the current step from the store

    useEffect(() => {
        const initialJourney = parseJourney(journeyData, journeyInitialState);
        if (initialJourney.length > 0) {
            dispatch({ type: 'SET_INITIAL_STEP', payload: initialJourney[0] });
        }
    }, [dispatch]);

    return (
        <div className="app-container">
            <img src={oTag} alt="Oracle O-tag" className="o-tag" />
            <Navigation currentStep={currentStep} onNavigate={() => { /* Navigation logic */ }}
                guideData={guideData} journeyData={journeyData} />
        </div>
    );
};

export default App;