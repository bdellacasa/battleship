import {
  LENGTH_BOARD,
  SHIP_TYPE_CARRIER,
  SHIP_TYPE_CRUISER,
  SHIP_TYPE_SUBMARINE,
  NUMBER_OF_SHIP,
  DIRECTION,
  CELL_ID_VALUE,
  SHIP_ORIENTATION,
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

const isValidPosition = (row, col) => (
  (row >= 0) && (row < LENGTH_BOARD) && (col >= 0) && (col < LENGTH_BOARD)
);

const freePostion = (row, col, board) => {
  if (isValidPosition(row, col) && (board[row][col].id === CELL_ID_VALUE.DEFAULT)) {
    return true;
  }
  return false;
};

const checkNeighboringCell = (row, col, board) => {
  if (isValidPosition(row, col) && (board[row][col].id !== CELL_ID_VALUE.DEFAULT)) {
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
 * Helper function to return an array with the positions of the ship
 * when the mouse passes over a cell
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
 * @param {int} row
 * @param {int} col
 * @param {string} orientation
 */
const saveShip = (board, ship, size, row, col, orientation) => {
  // eslint-disable-next-line prefer-const
  let updateBoard = board.slice(0);
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    for (let y = 0; y < size; y++) {
      updateBoard[row][col + y] = ship;
    }
  } else {
    for (let x = 0; x < size; x++) {
      updateBoard[row - x][col] = ship;
    }
  }
  return updateBoard;
};

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min)) + min;

/**
 * Helper function to create cpu ships
 */

const createShips = () => {
  const carriers = Array.from({
    length: NUMBER_OF_SHIP.CARRIER,
  }, (_, index) => ({
    ...SHIP_TYPE_CARRIER, ...{ code: index },
  }));
  const cruisers = Array.from({
    length: NUMBER_OF_SHIP.CRUISER,
  }, (_, index) => ({
    ...SHIP_TYPE_CRUISER, ...{ code: index + NUMBER_OF_SHIP.CARRIER },
  }));
  const submarines = Array.from({
    length: NUMBER_OF_SHIP.SUBMARINE,
  }, (_, index) => ({
    ...SHIP_TYPE_SUBMARINE, ...{ code: index + NUMBER_OF_SHIP.CARRIER + NUMBER_OF_SHIP.CRUISER },
  }));
  return carriers.concat(cruisers).concat(submarines);
};

const getRandomDirection = () => {
  if (getRandomInt(1, 2) === 1) {
    return SHIP_ORIENTATION.HORIZONTAL;
  } return SHIP_ORIENTATION.VERTICAL;
};

const getRandomCoordinate = () => getRandomInt(0, LENGTH_BOARD);

/**
 * Helper function to initialize the cpu board randomly
 */
const initRandomCpuBoard = () => {
  const cpuShips = [];
  const ships = createShips();
  let cpuBoard = initEmptyBoard();
  let index = 0; let row; let col; let orientation; let freePosition;
  let ship;

  while (index < NUMBER_OF_SHIP.TOTAL) {
    row = getRandomCoordinate();
    col = getRandomCoordinate();
    orientation = getRandomDirection();
    freePosition = checkCellsToSaveShip(cpuBoard, ships[index].size, row, col, orientation);

    if (freePosition) {
      ship = { id: ships[index].id, code: ships[index].code, orientation };
      cpuBoard = saveShip(cpuBoard, ship, ships[index].size, row, col, orientation);
      cpuShips[ships[index].code] = ships[index].size;
      index += 1;
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
  const {
    row,
    col,
    ship,
    orientation,
  } = shipData;
  const freePosition = checkCellsToSaveShip(board, ship.size, row, col, orientation);
  if (freePosition) {
    return saveShip(board, { id: ship.id, code, orientation }, ship.size, row, col, orientation);
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
    if (board[x][y].code === code) {
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
  let updateBoard = board.slice(0);
  let shipDestroyed = false;
  if (id === CELL_ID_VALUE.DEFAULT || id === CELL_ID_VALUE.WATER) {
    updateBoard[row][col] = { id: CELL_ID_VALUE.WATER, code };
    return {
      board: updateBoard,
      hit: false,
      shipDestroyed,
    };
  } if (id !== CELL_ID_VALUE.DESTROYED) {
    if ((countShips[code] - 1) === 0) {
      updateBoard = updateShipToDestroyed(board, code);
      shipDestroyed = true;
    } else {
      updateBoard[row][col] = {
        id: CELL_ID_VALUE.HIT, code, orientation, shipId: id,
      };
    }
  }
  return {
    board: updateBoard,
    hit: true,
    shipDestroyed,
  };
};

const isValidPositionToShot = (playerBoard, position) => (
  isValidPosition(position.row, position.col)
  && playerBoard[position.row][position.col].id !== CELL_ID_VALUE.WATER
);

const changeAttackDirection = (playerBoard, orientation, lastCpuHit, numberOfHits, lastCpuDirection) => {
  let position; let optionalDirection;
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    if (lastCpuDirection === DIRECTION.RIGHT) {
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col - numberOfHits,
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
  } else if (lastCpuDirection === DIRECTION.UP) {
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
  if (isValidPositionToShot(playerBoard, position)) {
    return position;
  }
  return {
    row: lastCpuHit.row,
    col: lastCpuHit.col,
    direction: optionalDirection,
  };
};

const getNextRotation = (lastCpuHit, lastCpuDirection) => {
  let position;
  switch (lastCpuDirection) {
    case DIRECTION.UP:
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col + 1,
        direction: DIRECTION.RIGHT,
      };
      break;
    case DIRECTION.RIGHT:
      position = {
        row: lastCpuHit.row + 1,
        col: lastCpuHit.col,
        direction: DIRECTION.DOWN,
      };
      break;
    case DIRECTION.DOWN:
      position = {
        row: lastCpuHit.row,
        col: lastCpuHit.col - 1,
        direction: DIRECTION.LEFT,
      };
      break;
    case DIRECTION.LEFT:
      position = {
        row: lastCpuHit.row - 1,
        col: lastCpuHit.col,
        direction: DIRECTION.UP,
      };
      break;
    default:
      break;
  }
  return position;
};

const rotateAttackDirection = (playerBoard, lastCpuHit, lastCpuDirection) => {
  let position;
  let direction = lastCpuDirection;
  do {
    position = getNextRotation(lastCpuHit, direction);
    direction = position.direction;
  } while (!isValidPositionToShot(playerBoard, position));
  return position;
};

const getNextPosition = (playerBoard, orientation, lastCpuHit, numberOfHits, lastCpuDirection) => {
  let position;
  if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
    if (lastCpuDirection === DIRECTION.RIGHT) {
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
  } else if (lastCpuDirection === DIRECTION.UP) {
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
  if (isValidPositionToShot(playerBoard, position)) {
    return position;
  }
  return changeAttackDirection(playerBoard, orientation, lastCpuHit, numberOfHits, lastCpuDirection);
};

const getCpuAttackPosition = (board, size, shipPosToHit, orientation, lastCpuHit, lastCpuDirection, cpuHasTarget) => {
  const numberOfHits = size - shipPosToHit;
  if (numberOfHits > 1) {
    if (cpuHasTarget) {
      return getNextPosition(board, orientation, lastCpuHit, numberOfHits, lastCpuDirection);
    }
    return changeAttackDirection(board, orientation, lastCpuHit, numberOfHits, lastCpuDirection);
  }
  return rotateAttackDirection(board, lastCpuHit, lastCpuDirection);
};

const getShipSize = (id) => {
  let size;
  switch (id) {
    case SHIP_TYPE_CARRIER.id:
      size = SHIP_TYPE_CARRIER.size;
      break;
    case SHIP_TYPE_CRUISER.id:
      size = SHIP_TYPE_CRUISER.size;
      break;
    case SHIP_TYPE_SUBMARINE.id:
      size = SHIP_TYPE_SUBMARINE.size;
      break;
    default:
      break;
  }
  return size;
};

const getRandomBoardPosition = (playerBoard, lastCpuDirection) => {
  let row; let col; let cellId; let valid = false;
  while (!valid) {
    row = getRandomCoordinate();
    col = getRandomCoordinate();
    cellId = playerBoard[row][col].id;
    if (cellId !== CELL_ID_VALUE.WATER && cellId !== CELL_ID_VALUE.HIT && cellId !== CELL_ID_VALUE.DESTROYED) {
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
  // eslint-disable-next-line prefer-const
  let cpuCoordinates = cpuCoordinatesAttacked.slice(0);
  // eslint-disable-next-line prefer-const
  let ships = playerShips.slice(0);
  let lastDir = lastCpuDirection;
  let positionAttacked = false;
  let lastHit = lastCpuHit;
  let cpuTarget = cpuHasTarget;

  do {
    if (lastCpuHit === -1) {
      attackPosition = getRandomBoardPosition(playerBoard, lastDir);
    } else {
      const ship = playerBoard[lastCpuHit.row][lastCpuHit.col];
      attackPosition = getCpuAttackPosition(playerBoard,
        getShipSize(ship.shipId),
        playerShips[ship.code],
        ship.orientation,
        lastCpuHit,
        lastDir,
        cpuHasTarget);
    }
    const { row, col, direction } = attackPosition;
    positionAttacked = cpuCoordinatesAttacked.some((coordinate) => coordinate.row === row && coordinate.col === col);
    lastDir = direction;
  } while (positionAttacked);

  const position = { row: attackPosition.row, col: attackPosition.col };
  const { code } = playerBoard[position.row][position.col];
  const { board, hit, shipDestroyed } = attack(playerBoard, position.row, position.col, playerShips);
  cpuCoordinates.push(position);

  if (shipDestroyed) {
    lastHit = -1;
    cpuTarget = false;
  } else if (hit) {
    ships[code] -= 1;
    lastHit = position;
    cpuTarget = true;
  } else {
    cpuTarget = false;
  }

  return {
    playerBoard: board,
    cpuCoordinatesAttacked: cpuCoordinates,
    lastCpuDirection: lastDir,
    lastCpuHit: lastHit,
    playerShips: ships,
    playerShipDestroyed: shipDestroyed,
    cpuHasTarget: cpuTarget,
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
