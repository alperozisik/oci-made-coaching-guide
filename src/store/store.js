import { configureStore } from '@reduxjs/toolkit';
import navigationReducer from './reducers/navigationReducer';
import journeyReducer from './reducers/journeyReducer';

const store = configureStore({
    reducer: {
        navigation: navigationReducer,
        journey: journeyReducer,
    },
});

export default store;