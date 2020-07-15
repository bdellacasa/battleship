import { combineReducers } from 'redux';
import { boardReducer } from './BoardReducer';
import { gameReducer } from './GameReducer';

export const aplicationReducer = combineReducers({
  board: boardReducer,
  game: gameReducer,
});
