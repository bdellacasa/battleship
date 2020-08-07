import React, { useState } from 'react';
import PropTypes from 'prop-types';
import helpers from '../../utils/Helpers';
import Cell from './cell/Cell';
import { Container, Row } from './styles';

const Board = (props) => {
  const {
    cpu, click, board, shipSelected, shipOrientation, onClickBoard,
  } = props;
  const [positionsToMark, setPositionsToMark] = useState([]);

  const markPositions = (row, col) => {
    setPositionsToMark([]);
    if (shipSelected) {
      const positions = helpers.getShipPositions(board, shipSelected.size, row, col, shipOrientation);
      if (positions) {
        setPositionsToMark(positions);
      } else {
        setPositionsToMark([]);
      }
    }
  };

  const handleOnClick = (x, y) => {
    if (click) {
      onClickBoard({ row: x, col: y });
    }
  };

  const getBoard = () => {
    let mark;
    const updatedBoard = board.map((row, x) => (
      <Row key={x.toString()}>
        {row.map((column, y) => {
          mark = positionsToMark.length > 0
            && positionsToMark.findIndex((pos) => pos.row === x && pos.col === y) !== -1;
          return (
            <div key={y.toString()}>
              <Cell
                showShip={cpu}
                code={board[x][y].code}
                id={board[x][y].id}
                onMouseHover={() => markPositions(x, y)}
                mark={mark}
                onClick={() => handleOnClick(x, y)}
              />
            </div>
          );
        })}
      </Row>
    ));
    return updatedBoard;
  };

  return (
    <Container>
      {getBoard()}
    </Container>
  );
};

Board.propTypes = {
  cpu: PropTypes.bool.isRequired,
  click: PropTypes.bool.isRequired,
  board: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  shipSelected: PropTypes.element,
  shipOrientation: PropTypes.number,
  onClickBoard: PropTypes.func,
};

Board.defaultProps = {
  shipSelected: null,
  shipOrientation: null,
  onClickBoard: () => { },
};

export default Board;
