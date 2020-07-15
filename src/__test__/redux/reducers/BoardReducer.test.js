import { boardReducer, initial_state } from '../../../redux/reducers/BoardReducer';
import * as types from '../../../redux/actions/types';
import helpers from '../../../utils/Helpers';

describe('Board reducer', () => {
  it('should return the initial state', () => {
    expect(boardReducer(undefined, {})).toEqual(initial_state);
  });

  it('should handle INIT_EMPTY_BOARD', () => {
    const playerBoard = helpers.initEmptyBoard();
    const args = {
      playerBoard,
    };
    expect(boardReducer(undefined, { type: types.INIT_CPU_BOARD })).toEqual({
      ...initial_state,
      ...args,
    });
  });

  it('should handle UPDATE_PLAYER_BOARD', () => {
    const args = {
      savedPlayerShip: false,
    };
    expect(boardReducer(undefined, {
      type: types.UPDATE_PLAYER_BOARD,
      args,
    })).toEqual({
      ...initial_state,
      ...args,
    });
  });

  it('should handle RESTART_SAVED_PLAYER_SHIP', () => {
    const args = {
      savedPlayerShip: false,
    };
    expect(boardReducer(undefined, { type: types.RESTART_SAVED_PLAYER_SHIP })).toEqual({
      ...initial_state,
      ...args,
    });
  });
});
