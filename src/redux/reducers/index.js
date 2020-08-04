import { combineReducers } from 'redux';
import { boardReducer } from './BoardReducer';
import { gameReducer } from './GameReducer';

const aplicationReducer = combineReducers({
  board: boardReducer,
  game: gameReducer,
});

export default aplicationReducer;
