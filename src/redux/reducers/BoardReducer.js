import {
  INIT_CPU_BOARD, PLAYER_ATTACK, INIT_EMPTY_BOARD, UPDATE_PLAYER_BOARD, CPU_ATTACK, RESTART, RESTART_SAVED_PLAYER_SHIP,
} from '../actions/types';
import { NUMBER_OF_SHIP, DIRECTION } from '../../utils/Constants';
import helpers from '../../utils/Helpers';

export const initialState = {
  cpuBoard: helpers.initEmptyBoard(),
  playerBoard: helpers.initEmptyBoard(),
  shipsCpuCount: 0, // Total number of cpu ships without being destroyed
  shipsPlayerCount: 0, // Total number of player ships without being destroyed
  carriersAvailable: NUMBER_OF_SHIP.CARRIER,
  cruisersAvailable: NUMBER_OF_SHIP.CRUISER,
  submarinesAvailable: NUMBER_OF_SHIP.SUBMARINE,
  updatedPlayerBoard: false,
  cpuCoordinatesAttacked: [], // positions of cpu attacks
  lastCpuHit: -1,
  lastCpuDirection: DIRECTION.UP,
  cpuShips: [], // Count of positions by ship without being hit.
  playerShips: [],
  savedPlayerShip: false,
  cpuHasTarget: false,
  attemptFeedback: undefined,
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_CPU_BOARD:
    case CPU_ATTACK:
    case INIT_EMPTY_BOARD:
    case UPDATE_PLAYER_BOARD:
    case PLAYER_ATTACK:
      return { ...state, ...action.args };

    case RESTART:
      return { ...initialState };

    case RESTART_SAVED_PLAYER_SHIP:
      return { ...state, savedPlayerShip: false };
    default:
      return state;
  }
};
