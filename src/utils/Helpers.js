import {
  LENGTH_BOARD, SHIP_TYPE_CARRIER, SHIP_TYPE_CRUISER, SHIP_TYPE_SUBMARINE, NUMBER_OF_SHIP, DIRECTION, CELL_ID_VALUE, SHIP_ORIENTATION,
} from './Constants';

/**
 * Helper function to init an empty board
 */
const initEmptyBoard = () => {
  const board = [];
  for (let i = 0; i < LENGTH_BOARD; i++) {
    const row = [];
    for (let j = 0; j < LENGTH_BOARD; j++) {
      row.push({
        id: CELL_ID_VALUE.DEFAULT,
        code: -1,
      });
    }
    board.push(row);
  }
  return board;
};

const isValidPosition = (row, col) => ((row >= 0) && (row < LENGTH_BOARD) && (col >= 0) && (col < LENGTH_BOARD));

const freePostion = (row, col, board) => {
  if (isValidPosition(row, col) && (board[row][col].id == CELL_ID_VALUE.DEFAULT)) {
    return true;
  }
  return false;
};

const checkNeighboringCell = (row, col, board) => {
  if (isValidPosition(row, col) && (board[row][col].id != CELL_ID_VALUE.DEFAULT)) {
    return false;
  }
  return true;
};

const freePositionToSaveShip = (row, col, board) => {
  if (freePostion(row, col, board)
        && checkNeighboringCell(row - 1, col, board)
        && checkNeighboringCell(row, col + 1, board)
        && checkNeighboringCell(row + 1, col, board)
        && checkNeighboringCell(row, col - 1, board)
  ) {
    return true;
  }
  return false;
};

/**
 * Helper function to return an array with the positions of the ship when the mouse passes over a cell
 *
 * @param {array} board
 * @param {int} shipSize
 * @param {int} row
 * @param {int} col
 * @param {string} orientation
 */
const getShipPositions = (board, shipSize, row, col, orientation) => {
  const positions = [];
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    for (let y = 0; y < shipSize; y++) {
      if (freePositionToSaveShip(row, col + y, board)) {
        positions.push({ row, col: col + y });
      } else return null;
    }
  } else {
    for (let x = 0; x < shipSize; x++) {
      if (freePositionToSaveShip(row - x, col, board)) {
        positions.push({ row: row - x, col });
      } else return null;
    }
  }
  return positions;
};

/**
 * Helper function to check if the neighboring cells are occupied to save a ship
 *
 * @param {array} board
 * @param {int} shipSize
 * @param {int} row
 * @param {int} col
 * @param {string} orientation
 */
const checkCellsToSaveShip = (board, shipSize, row, col, orientation) => {
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    for (let y = 0; y < shipSize; y++) {
      if (!freePositionToSaveShip(row, col + y, board)) {
        return false;
      }
    }
  } else {
    for (let x = 0; x < shipSize; x++) {
      if (!freePositionToSaveShip(row - x, col, board)) {
        return false;
      }
    }
  }
  return true;
};

/**
 * Helper function to save a ship in the board
 *
 * @param {array} board
 * @param {object} ship
 * @param {int} size
 * @param {int} posX
 * @param {int} posY
 * @param {string} direction
 */
const saveShip = (board, ship, size, row, col, orientation) => {
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    for (let y = 0; y < size; y++) {
      board[row][col + y] = ship;
    }
  } else {
    for (let x = 0; x < size; x++) {
      board[row - x][col] = ship;
    }
  }
  return board;
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Helper function to create cpu ships
 */

const createShips = () => {
  const carriers = Array.from({ length: NUMBER_OF_SHIP.CARRIER }, (_, index) => ({ ...SHIP_TYPE_CARRIER, ...{ code: index } }));
  const cruisers = Array.from({ length: NUMBER_OF_SHIP.CRUISER }, (_, index) => ({ ...SHIP_TYPE_CRUISER, ...{ code: index + NUMBER_OF_SHIP.CARRIER } }));
  const submarines = Array.from({ length: NUMBER_OF_SHIP.SUBMARINE }, (_, index) => ({ ...SHIP_TYPE_SUBMARINE, ...{ code: index + NUMBER_OF_SHIP.CARRIER + NUMBER_OF_SHIP.CRUISER } }));
  return carriers.concat(cruisers).concat(submarines);
};

const getRandomDirection = () => {
  if (getRandomInt(1, 2) == 1) {
    return SHIP_ORIENTATION.HORIZONTAL;
  } return SHIP_ORIENTATION.VERTICAL;
};

const getRandomCoordinate = () => getRandomInt(0, LENGTH_BOARD);

/**
 * Helper function to initialize the cpu board randomly
 */
const initRandomCpuBoard = () => {
  const ships = createShips();
  let cpuBoard = initEmptyBoard();
  let index = 0; let row; let col; let orientation; let freePosition; const
    cpuShips = [];

  while (index < NUMBER_OF_SHIP.TOTAL) {
    row = getRandomCoordinate();
    col = getRandomCoordinate();
    orientation = getRandomDirection();
    freePosition = checkCellsToSaveShip(cpuBoard, ships[index].size, row, col, orientation);

    if (freePosition) {
      cpuBoard = saveShip(cpuBoard, { id: ships[index].id, code: ships[index].code, orientation }, ships[index].size, row, col, orientation);
      cpuShips[ships[index].code] = ships[index].size;
      index++;
    }
  }

  return {
    cpuBoard,
    cpuShips,
  };
};

/**
 * Helper function to update player board with a position, orientation and ship selected
 */
const updatePlayerBoard = (board, shipData, code) => {
  const freePosition = checkCellsToSaveShip(board, shipData.ship.size, shipData.row, shipData.col, shipData.orientation);
  if (freePosition) {
    const ship = { id: shipData.ship.id, code, orientation: shipData.orientation };
    return saveShip(board, ship, shipData.ship.size, shipData.row, shipData.col, shipData.orientation);
  }
  return null;
};

/**
 * Helper function to update ship cells to destroyed
 * @param {array} board
 * @param {int} id
 *
 */
const updateShipToDestroyed = (board, code) => board.map((row, x) => (
  row.map((column, y) => {
    if (board[x][y].code == code) {
      return {
        id: CELL_ID_VALUE.DESTROYED,
        code,
      };
    } return board[x][y];
  })
));

/**
 * Helper function to update a board after an attack
 * @param {array} board
 * @param {int} row
 * @param {int} col
 * @param {int} countShips number of positions of a ship without attacking
 */
const attack = (board, row, col, countShips) => {
  const { id, code, orientation } = board[row][col];
  let shipDestroyed = false;
  if (id == CELL_ID_VALUE.DEFAULT || id == CELL_ID_VALUE.WATER) {
    board[row][col] = { id: CELL_ID_VALUE.WATER, code };
    return {
      board,
      hit: false,
      shipDestroyed,
    };
  } if (id !== CELL_ID_VALUE.DESTROYED) {
    if ((countShips[code] - 1) == 0) {
      board = updateShipToDestroyed(board, code);
      shipDestroyed = true;
    } else {
      board[row][col] = {
        id: CELL_ID_VALUE.HIT, code, orientation, shipId: id,
      };
    }
  }
  return {
    board,
    hit: true,
    shipDestroyed,
  };
};

const changeAttackDirection = (orientation, lastCpuHit, numberOfHits, lastCpuDirection) => {
  let position; let
    optionalDirection;
  if (orientation == SHIP_ORIENTATION.HORIZONTAL) {
    if (lastCpuDirection == DIRECTION.RIGHT) {
      position = {
        row: lastCpuHit.row,
        row: lastCpuHit.col - numberOfHits,
        direction: DIRECTION.LEFT,
      };
      optionalDirection = DIRECTION.UP;
    } else {
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col + numberOfHits,
        direction: DIRECTION.RIGHT,
      };
      optionalDirection = DIRECTION.DOWN;
    }
  } else if (lastCpuDirection == DIRECTION.UP) {
    position = {
      row: lastCpuHit.row + numberOfHits,
      col: lastCpuHit.col,
      direction: DIRECTION.DOWN,
    };
    optionalDirection = DIRECTION.RIGHT;
  } else {
    position = {
      row: lastCpuHit.row - numberOfHits,
      col: lastCpuHit.col,
      direction: DIRECTION.UP,
    };
    optionalDirection = DIRECTION.LEFT;
  }
  if (isValidPosition(position.row, position.col)) {
    return position;
  } return {
    row: lastCpuHit.row,
    col: lastCpuHit.col,
    direction: optionalDirection,
  };
};

const rotateAttackDirection = (lastCpuHit, lastCpuDirection) => {
  let position;
  switch (lastCpuDirection) {
    case DIRECTION.UP:
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col + 1,
        direction: DIRECTION.RIGHT,
      };
      if (isValidPosition(position.row, position.col)) {
        return position;
      } return rotateAttackDirection(lastCpuHit, DIRECTION.DOWN);
    case DIRECTION.RIGHT:
      position = {
        row: lastCpuHit.row + 1,
        col: lastCpuHit.col,
        direction: DIRECTION.DOWN,
      };
      if (isValidPosition(position.row, position.col)) {
        return position;
      } return rotateAttackDirection(lastCpuHit, DIRECTION.LEFT);
    case DIRECTION.DOWN:
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col - 1,
        direction: DIRECTION.LEFT,
      };
      if (isValidPosition(position.row, position.col)) {
        return position;
      } return rotateAttackDirection(lastCpuHit, DIRECTION.UP);
    case DIRECTION.LEFT:
      position = {
        row: lastCpuHit.row - 1,
        col: lastCpuHit.col,
        direction: DIRECTION.UP,
      };
      if (isValidPosition(position.row, position.col)) {
        return position;
      } return rotateAttackDirection(lastCpuHit, DIRECTION.RIGHT);
  }
};

const getNextPosition = (playerBoard, orientation, lastCpuHit, numberOfHits, lastCpuDirection) => {
  let position;
  if (orientation == SHIP_ORIENTATION.HORIZONTAL) {
    if (lastCpuDirection == DIRECTION.RIGHT) {
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col + 1,
        direction: DIRECTION.RIGHT,
      };
    } else {
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col - 1,
        direction: DIRECTION.LEFT,
      };
    }
  } else if (lastCpuDirection == DIRECTION.UP) {
    position = {
      row: lastCpuHit.row - 1,
      col: lastCpuHit.col,
      direction: DIRECTION.UP,
    };
  } else {
    position = {
      row: lastCpuHit.row + 1,
      col: lastCpuHit.col,
      direction: DIRECTION.DOWN,
    };
  }

  if (isValidPosition(position.row, position.col) && playerBoard[position.row][position.col].id !== CELL_ID_VALUE.WATER) {
    return position;
  } return changeAttackDirection(orientation, lastCpuHit, numberOfHits, lastCpuDirection);
};

const getNextCpuAttackPosition = (playerBoard, size, shipPosToHit, orientation, lastCpuHit, lastCpuDirection, cpuHasTarget) => {
  const numberOfHits = size - shipPosToHit;
  if (numberOfHits > 1) {
    if (cpuHasTarget) {
      return getNextPosition(playerBoard, orientation, lastCpuHit, numberOfHits, lastCpuDirection);
    }
    return changeAttackDirection(orientation, lastCpuHit, numberOfHits, lastCpuDirection);
  }
  return rotateAttackDirection(lastCpuHit, lastCpuDirection);
};

const getShipSize = (id) => {
  switch (id) {
    case SHIP_TYPE_CARRIER.id:
      return SHIP_TYPE_CARRIER.size;
    case SHIP_TYPE_CRUISER.id:
      return SHIP_TYPE_CRUISER.size;
    case SHIP_TYPE_SUBMARINE.id:
      return SHIP_TYPE_SUBMARINE.size;
    default:
      break;
  }
};

const getRandomBoardPosition = (playerBoard, lastCpuDirection) => {
  let row; let col; let cellId; let
    valid = false;
  while (!valid) {
    row = getRandomCoordinate();
    col = getRandomCoordinate();
    cellId = playerBoard[row][col].id;
    if (cellId !== CELL_ID_VALUE.WATER && cellId != CELL_ID_VALUE.HIT && cellId !== CELL_ID_VALUE.DESTROYED) {
      valid = true;
    }
  }
  return {
    row,
    col,
    direction: lastCpuDirection,
  };
};

/**
 * Helper function to update player board after the cpu attack
 * @param {array} playerBoard
 * @param {array} cpuCoordinatesAttacked positions of cpu attacks
 * @param {} lastCpuDirection last direction of the cpu attack
 * @param {} lastCpuHit last position of cpu hit player's board. If cpu did not hit a ship its value is -1
 * @param {} playerShips Count of positions by player's ship without being hit
 */
const cpuAttack = (playerBoard, cpuCoordinatesAttacked, lastCpuDirection, lastCpuHit, playerShips, cpuHasTarget) => {
  let attackPosition;
  let direction = lastCpuDirection; let
    positionAttacked;

  positionAttacked = false;
  do {
    if (lastCpuHit == -1) {
      attackPosition = getRandomBoardPosition(playerBoard, lastCpuDirection);
    } else {
      const ship = playerBoard[lastCpuHit.row][lastCpuHit.col];
      attackPosition = getNextCpuAttackPosition(playerBoard, getShipSize(ship.shipId), playerShips[ship.code], ship.orientation, lastCpuHit, lastCpuDirection, cpuHasTarget);
    }
    positionAttacked = cpuCoordinatesAttacked.some((coordinate) => (coordinate.row == attackPosition.row) && (coordinate.col == attackPosition.col));
    lastCpuDirection = attackPosition.direction;
  } while (positionAttacked);

  const position = { row: attackPosition.row, col: attackPosition.col };
  const { code } = playerBoard[position.row][position.col];
  const { board, hit, shipDestroyed } = attack(playerBoard, position.row, position.col, playerShips);
  cpuCoordinatesAttacked.push(position);

  if (shipDestroyed) {
    lastCpuHit = -1;
    cpuHasTarget = false;
  } else {
    if (hit) {
      playerShips[code]--;
      lastCpuHit = position;
      cpuHasTarget = true;
    } else {
      cpuHasTarget = false;
    }
    direction = attackPosition.direction;
  }
  return {
    playerBoard: board,
    cpuCoordinatesAttacked,
    lastCpuDirection: direction,
    lastCpuHit,
    playerShips,
    playerShipDestroyed: shipDestroyed,
    cpuHasTarget,
  };
};

const helpers = {
  initEmptyBoard,
  getShipPositions,
  initRandomCpuBoard,
  updatePlayerBoard,
  cpuAttack,
  attack,
};

export default helpers;
