import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import BoardActions from '../../../redux/actions/BoardActions';
import { initial_state as board } from '../../../redux/reducers/BoardReducer';
import * as types from '../../../redux/actions/types';
import helpers from '../../../utils/Helpers';
import { SHIP_TYPE_SUBMARINE, SHIP_ORIENTATION, CELL_ID_VALUE } from '../../../utils/Constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Board actions', () => {
  test('create async action to update player board', () => {
    const shipData = {
      row: 10,
      col: 2,
      ship: SHIP_TYPE_SUBMARINE,
      orientation: SHIP_ORIENTATION.HORIZONTAL,
    };
    const expectedActions = [{
      type: types.UPDATE_PLAYER_BOARD,
      args: {
        savedPlayerShip: false,
      },
    }];
    const store = mockStore({ board });
    store.dispatch(BoardActions.updatePlayerBoard(shipData));
    expect(store.getActions()).toEqual(expectedActions);
  });

  test('create async action player attack', () => {
    const position = {
      row: 5,
      col: 2,
    };
    const cpuBoard = helpers.initEmptyBoard();
    cpuBoard[position.row][position.col] = { id: CELL_ID_VALUE.WATER, code: -1 };
    const expectedActions = [{
      type: types.PLAYER_ATTACK,
      args: {
        cpuBoard,
        shipsCpuCount: 0,
        cpuShips: [],
        updatedPlayerBoard: false,
        attemptFeedback: 'Shot missed!',
      },
    }];
    const store = mockStore({ board });
    store.dispatch(BoardActions.playerAttack(position));
    expect(store.getActions()).toEqual(expectedActions);
  });
});
