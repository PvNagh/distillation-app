import { configureStore } from '@reduxjs/toolkit';
import cardReducers from './reducers';  

const store = configureStore({
    reducer: cardReducers,
});

export default store;