import {
  INIT_CPU_BOARD, PLAYER_ATTACK, INIT_EMPTY_BOARD, UPDATE_PLAYER_BOARD, CPU_ATTACK, RESTART, RESTART_SAVED_PLAYER_SHIP,
} from './types';
import { SHIP_TYPE_ID, NUMBER_OF_SHIP } from '../../utils/Constants';
import helpers from '../../utils/Helpers';

/**
 *  Redux actions for init and update cpu and player boards
 */

const initCpuBoard = () => {
  const { cpuBoard, cpuShips } = helpers.initRandomCpuBoard();
  return {
    type: INIT_CPU_BOARD,
    args: {
      cpuBoard,
      cpuShips,
      shipsCpuCount: NUMBER_OF_SHIP.TOTAL,
    },
  };
};

const cpuAttack = () => (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const {
    playerBoard, cpuCoordinatesAttacked, lastCpuDirection, lastCpuHit, playerShips, playerShipDestroyed, cpuHasTarget,
  } = helpers.cpuAttack(boardState.playerBoard, boardState.cpuCoordinatesAttacked, boardState.lastCpuDirection, boardState.lastCpuHit, boardState.playerShips, boardState.cpuHasTarget);
  const _shipsPlayerCount = playerShipDestroyed ? boardState.shipsPlayerCount - 1 : boardState.shipsPlayerCount;

  return dispatch({
    type: CPU_ATTACK,
    args: {
      playerBoard,
      cpuCoordinatesAttacked,
      lastCpuDirection,
      lastCpuHit,
      playerShips,
      shipsPlayerCount: _shipsPlayerCount,
      updatedPlayerBoard: true,
      cpuHasTarget,
    },
  });
};

const initEmptyBoard = () => {
  const playerBoard = helpers.initEmptyBoard();
  return {
    type: INIT_EMPTY_BOARD,
    args: {
      playerBoard,
    },
  };
};

const updatePlayerBoard = (shipData) => (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const code = boardState.shipsPlayerCount;
  const updatedPlayerBoard = helpers.updatePlayerBoard(boardState.playerBoard, shipData, code);
  const { playerShips } = boardState;
  let args;

  if (updatedPlayerBoard) {
    const shipsPlayerCount = boardState.shipsPlayerCount + 1;
    let { carriersAvailable } = boardState;
    let { cruisersAvailable } = boardState;
    let { submarinesAvailable } = boardState;
    playerShips.push(shipData.ship.size);

    switch (shipData.ship.id) {
      case SHIP_TYPE_ID.CARRIER:
        carriersAvailable--;
        break;
      case SHIP_TYPE_ID.CRUISER:
        cruisersAvailable--;
        break;
      case SHIP_TYPE_ID.SUBMARINE:
        submarinesAvailable--;
        break;
    }
    args = {
      playerBoard: updatedPlayerBoard,
      shipsPlayerCount,
      carriersAvailable,
      cruisersAvailable,
      submarinesAvailable,
      playerShips,
      savedPlayerShip: true,
    };
  } else {
    args = {
      savedPlayerShip: false,
    };
  }
  return dispatch({
    type: UPDATE_PLAYER_BOARD,
    args,
  });
};

const playerAttack = ({ row, col }) => (dispatch, getState) => {
  const state = getState();
  const boardState = state.board;
  const { board, hit, shipDestroyed } = helpers.attack(boardState.cpuBoard, row, col, boardState.cpuShips);
  let { shipsCpuCount } = boardState;
  const { cpuShips } = boardState;
  if (hit) {
    const codeShip = boardState.cpuBoard[row][col].code;
    cpuShips[codeShip]--;
  }
  if (shipDestroyed) {
    shipsCpuCount--;
  }
  return dispatch({
    type: PLAYER_ATTACK,
    args: {
      cpuBoard: board,
      shipsCpuCount,
      cpuShips,
      updatedPlayerBoard: false,
    },
  });
};

const restart = () => ({
  type: RESTART,
});

const restartSavedPlayerShip = () => ({
  type: RESTART_SAVED_PLAYER_SHIP,
});

const BoardActions = {
  initCpuBoard,
  cpuAttack,
  initEmptyBoard,
  updatePlayerBoard,
  playerAttack,
  restart,
  restartSavedPlayerShip,
};

export default BoardActions;
