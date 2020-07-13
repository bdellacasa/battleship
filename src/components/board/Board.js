import React, { useState } from 'react';
import PropTypes from 'prop-types';
import helpers from '../../utils/Helpers';
import { CELL_ID_VALUE } from '../../utils/Constants';
import { Container, CellDiv, Row } from './styles';

const Cell = (props) => {
    const getCellColor = () => {
        if (props.mark) {
            return '#9C9B9A';
        }
        switch(props.id) {
            case CELL_ID_VALUE.DEFAULT:
                return '#000066';
            case CELL_ID_VALUE.WATER:
                return '#0077B3';
            case CELL_ID_VALUE.HIT:
                return '#FF9933';
            case CELL_ID_VALUE.DESTROYED:
                return 'red';
            default:
                if (!props.showShip) {
                    return 'grey';
                } else return '#000066'
        }
    }

    const handleClick = () => {
        if (!(props.id == CELL_ID_VALUE.WATER || props.id == CELL_ID_VALUE.HIT || props.id == CELL_ID_VALUE.DESTROYED)) {
            props.onClick()
        }
    }

    return(
        <CellDiv color={getCellColor()} onMouseOver={() => props.onMouseHover()} onClick={() => handleClick()}/>
    )
}

const Board = (props) => {
    const [positionsToMark, setPositionsToMark] = useState(undefined);

    const markPositions = (row,col) => {
        setPositionsToMark(undefined);
        if (props.shipSelected) {
            const positions = helpers.getShipPositions(props.board, props.shipSelected.size, row, col, props.shipOrientation);
            if (positions) {
                setPositionsToMark(positions);
            } else {
                setPositionsToMark(undefined);
            }
        } 
    }

    const getBoard = () => {
        let mark;
        const board = props.board.map((row, x) => {
            return (
                    <Row key={x}>{row.map((column, y) => {
                        mark = positionsToMark && positionsToMark.findIndex(pos => pos.row == x && pos.col == y) !== -1;
                        return (
                            <div key={y}>
                                <Cell
                                    showShip={props.cpu}
                                    code={props.board[x][y].code}
                                    id={props.board[x][y].id}
                                    onMouseHover={() => markPositions(x,y)}
                                    mark={mark}
                                    onClick={() => { props.click && props.onClickBoard({row: x, col: y})}}
                                />
                            </div>
                        )})}
                    </Row>
            )
        });
        return board;
    }
 
    return(
        <Container>
            {getBoard()}
        </Container>
    )
}

Board.propTypes = {
    board: PropTypes.array
};

export default Board;