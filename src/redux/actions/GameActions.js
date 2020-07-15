import {
  UPDATE_PLAYER_NAME, UPDATE_CURRENT_PLAYER, UPDATE_WINNER, RESTART,
} from './types';

/**
 * Redux actions for manage the state of the game
 */

const updatePlayerName = (args) => ({
  type: UPDATE_PLAYER_NAME,
  args,
});

const updateCurrentPlayer = () => ({
  type: UPDATE_CURRENT_PLAYER,
});

const updateWinner = (args) => ({
  type: UPDATE_WINNER,
  args,
});

const restart = () => ({
  type: RESTART,
});

const GameActions = {
  updatePlayerName,
  updateCurrentPlayer,
  updateWinner,
  restart,
};

export default GameActions;
