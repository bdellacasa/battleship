import {
  UPDATE_PLAYER_NAME, UPDATE_CURRENT_PLAYER, UPDATE_WINNER, RESTART,
} from '../actions/types';

export const initialState = {
  playerName: undefined,
  currentPlayer: 'CPU',
  winner: undefined,
};

export const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PLAYER_NAME:
      return { ...state, playerName: action.args };
    case UPDATE_CURRENT_PLAYER:
      if (state.currentPlayer == 'CPU') {
        return { ...state, currentPlayer: state.playerName };
      } return { ...state, currentPlayer: 'CPU' };
    case UPDATE_WINNER:
      return { ...state, winner: action.args };
    case RESTART:
      return { ...initialState };
    default:
      return state;
  }
};
