import { combineReducers } from 'redux';
import { globalStateReducer } from './global.state';


export * from './global.state';

export const mainReducer = combineReducers({
    globalStateReducer
});