import GameActions from '../../../redux/actions/GameActions';
import * as types from '../../../redux/actions/types';

describe('Game actions', () => {
  test('create action to update player name', () => {
    const playerName = 'Tony';
    const expectedActions = {
      type: types.UPDATE_PLAYER_NAME,
      args: playerName,
    };
    expect(GameActions.updatePlayerName(playerName)).toEqual(expectedActions);
  });

  test('create action to update current player', () => {
    const expectedActions = {
      type: types.UPDATE_CURRENT_PLAYER,
    };
    expect(GameActions.updateCurrentPlayer()).toEqual(expectedActions);
  });

  test('create action to update winner', () => {
    const winner = 'CPU';
    const expectedActions = {
      type: types.UPDATE_WINNER,
      args: winner,
    };
    expect(GameActions.updateWinner(winner)).toEqual(expectedActions);
  });
});
