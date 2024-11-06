import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { parseJourney } from './utils/journeyParser';
import journeyData from './journey.yaml';
import Navigation from './components/Navigation';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        // Parse the initial journey step and set the first component
        const initialJourney = parseJourney(journeyData, { personaId: null, topic: null });
        if (initialJourney.length > 0) {
            dispatch({ type: 'PUSH_COMPONENT', payload: initialJourney[0].component });
        }
    }, [dispatch]);

    return (
        <div className="app-container">
            <Navigation />
        </div>
    );
};

export default App;