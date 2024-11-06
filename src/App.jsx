import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();
    const currentComponent = useSelector(state => state.navigation.currentComponent);

    const handleNavigate = (componentName) => {
        dispatch({ type: 'PUSH_COMPONENT', payload: componentName });
    };

    return (
        <div>
            <h1>Current Component: {currentComponent}</h1>
            <button onClick={() => handleNavigate('NextComponent')}>Go to Next</button>
        </div>
    );
};

export default App;