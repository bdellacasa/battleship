import { combineReducers } from 'redux';
import { boardReducer, initial_state } from './BoardReducer';
import { gameReducer } from './GameReducer';

export const aplicationReducer = combineReducers({
    board: boardReducer,
    game: gameReducer 
});