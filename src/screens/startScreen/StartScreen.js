import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardActions from '../../redux/actions/BoardActions';
import GameActions from '../../redux/actions/GameActions';
import Screen from '../screen/Screen';
import Board from '../../components/board/Board';
import ShipSelector from '../../components/shipSelector/ShipSelector';
import { Container, Form, BoardContainer } from './styles';
import { Text, SubmitButton, ScreenButton } from '../screenStyles';
import { NUMBER_OF_SHIP, SHIP_ORIENTATION } from '../../utils/Constants';

const StartScreen = (props) => {
  const {
    playerBoard,
    carriersAvailable,
    cruisersAvailable,
    submarinesAvailable,
    shipsPlayerCount,
    savedPlayerShip,
    playerName,
    initPlayerBoard,
    updatePlayerBoard,
    updatePlayerName,
    restartSavedPlayerShip,
  } = props;
  const [shipSelected, setShipSelected] = useState(undefined);
  const [orientation, setOrientation] = useState(SHIP_ORIENTATION.VERTICAL);
  const [start, setStart] = useState(false);
  const [name, setName] = useState(undefined);
  const [loadShipSelector, setLoadShipSelector] = useState(false);

  const handleStart = () => {
    if (shipsPlayerCount === NUMBER_OF_SHIP.TOTAL && playerName) {
      setStart(true);
    }
  };

  useEffect(() => {
    initPlayerBoard();
  }, []);

  useEffect(() => {
    if (savedPlayerShip) {
      setShipSelected(undefined);
      handleStart();
    }
  }, [savedPlayerShip]);

  const saveShip = async (position) => {
    if (shipSelected) {
      const shipData = {
        row: position.row,
        col: position.col,
        ship: shipSelected,
        orientation,
      };
      await updatePlayerBoard(shipData);
    } else {
      // eslint-disable-next-line no-alert
      alert('Please select a ship!');
    }
  };

  const resetSavedPlayerShip = () => {
    restartSavedPlayerShip();
  };

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleOnSubmit = () => {
    setLoadShipSelector(true);
    updatePlayerName(name);
  };

  const renderContent = () => {
    const disableButtonOpacity = loadShipSelector ? 0.6 : 0;
    const startGameButtonOpacity = start ? 1 : disableButtonOpacity;
    return (
      <div>
        <div style={{ paddingBottom: 30 }}>
          {loadShipSelector ? (
            <Text>
              Hi
              {' '}
              {name}
              , please locate your ships!
            </Text>
          ) : <Text>Please enter your name!</Text>}
        </div>
        <Container>
          {loadShipSelector && (
            <ShipSelector
              shipSaved={savedPlayerShip}
              carriers={carriersAvailable}
              cruisers={cruisersAvailable}
              submarines={submarinesAvailable}
              selectShip={(ship) => setShipSelected(ship)}
              selectOrientation={(value) => setOrientation(value)}
              restartSavedPlayerShip={() => resetSavedPlayerShip()}
            />
          )}
          <BoardContainer>
            <Board
              cpu={false}
              board={playerBoard}
              click
              onClickBoard={(position) => saveShip(position)}
              shipSelected={shipSelected}
              shipOrientation={orientation}
            />
          </BoardContainer>
          <Form>
            {!loadShipSelector && (
              <form onSubmit={handleOnSubmit}>
                <input
                  onChange={handleOnChange}
                  className="form-control"
                  type="text"
                  name="Player name"
                  placeholder="Player name"
                  style={{ height: 30 }}
                />
                <SubmitButton type="submit" value="Submit" />
              </form>
            )}
            <Link to="/game">
              <ScreenButton style={{ opacity: startGameButtonOpacity }} disabled={!start}>
                Start Game
              </ScreenButton>
            </Link>
          </Form>
        </Container>
      </div>
    );
  };

  return (
    <Screen
      content={
        renderContent()
      }
    />
  );
};

StartScreen.propTypes = {
  playerBoard: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  carriersAvailable: PropTypes.number.isRequired,
  cruisersAvailable: PropTypes.number.isRequired,
  submarinesAvailable: PropTypes.number.isRequired,
  shipsPlayerCount: PropTypes.number.isRequired,
  savedPlayerShip: PropTypes.bool.isRequired,
  playerName: PropTypes.string.isRequired,
  initPlayerBoard: PropTypes.func.isRequired,
  updatePlayerBoard: PropTypes.func.isRequired,
  updatePlayerName: PropTypes.func.isRequired,
  restartSavedPlayerShip: PropTypes.func.isRequired,
};

/**
 *
 * @param {ReduxState} state
 * @param {object} props
 */
const mapStateToProps = (state) => ({
  playerBoard: state.board.playerBoard,
  carriersAvailable: state.board.carriersAvailable,
  cruisersAvailable: state.board.cruisersAvailable,
  submarinesAvailable: state.board.submarinesAvailable,
  shipsPlayerCount: state.board.shipsPlayerCount,
  savedPlayerShip: state.board.savedPlayerShip,
  playerName: state.game.playerName,
});

const mapDispatchToProps = (dispatch) => ({
  initPlayerBoard: () => dispatch(BoardActions.initEmptyBoard()),
  updatePlayerBoard: (args) => dispatch(BoardActions.updatePlayerBoard(args)),
  updatePlayerName: (args) => dispatch(GameActions.updatePlayerName(args)),
  restartSavedPlayerShip: () => dispatch(BoardActions.restartSavedPlayerShip()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StartScreen);
