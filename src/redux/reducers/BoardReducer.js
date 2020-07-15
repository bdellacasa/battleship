import {
  INIT_CPU_BOARD, PLAYER_ATTACK, INIT_EMPTY_BOARD, UPDATE_PLAYER_BOARD, CPU_ATTACK, RESTART, RESTART_SAVED_PLAYER_SHIP,
} from '../actions/types';
import { NUMBER_OF_SHIP, DIRECTION } from '../../utils/Constants';
import helpers from '../../utils/Helpers';

export const initial_state = {
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
};

export const boardReducer = (state = initial_state, action) => {
  switch (action.type) {
    case INIT_CPU_BOARD:
    case CPU_ATTACK:
    case INIT_EMPTY_BOARD:
    case UPDATE_PLAYER_BOARD:
    case PLAYER_ATTACK:
      return { ...state, ...action.args };

    case RESTART:
      return { ...initial_state };

    case RESTART_SAVED_PLAYER_SHIP:
      return { ...state, savedPlayerShip: false };
    default:
      return state;
  }
};
