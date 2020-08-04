import React from 'react';
import PropTypes from 'prop-types';
import { CELL_ID_VALUE } from '../../../utils/Constants';
import { CellDiv } from '../styles';

const Cell = (props) => {
  const {
    id, mark, showShip, onMouseHover, onClick,
  } = props;

  const getCellColor = () => {
    if (mark) {
      return '#9C9B9A';
    }
    switch (id) {
      case CELL_ID_VALUE.DEFAULT:
        return '#000066';
      case CELL_ID_VALUE.WATER:
        return '#0077B3';
      case CELL_ID_VALUE.HIT:
        return '#FF9933';
      case CELL_ID_VALUE.DESTROYED:
        return 'red';
      default:
        if (!showShip) {
          return 'grey';
        } return '#000066';
    }
  };

  const handleOnClick = () => {
    if (!(id === CELL_ID_VALUE.WATER || id === CELL_ID_VALUE.HIT || id === CELL_ID_VALUE.DESTROYED)) {
      onClick();
    }
  };

  return (
    <CellDiv color={getCellColor()} onMouseOver={() => onMouseHover()} onClick={() => handleOnClick()} />
  );
};

Cell.propTypes = {
  id: PropTypes.number.isRequired,
  mark: PropTypes.bool,
  showShip: PropTypes.bool.isRequired,
  onMouseHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

Cell.defaultProps = {
  mark: false,
};

export default Cell;
