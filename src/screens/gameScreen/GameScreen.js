import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardActions from '../../redux/actions/BoardActions';
import GameActions from '../../redux/actions/GameActions';
import Board from '../../components/board/Board';
import Screen from '../screen/Screen';
import {
  BoardsContainer, BoardCpuContainer, BottomContainer, FeedbackContainer, ButtonContainer,
} from './styles';
import { Text, ScreenButton } from '../screenStyles';

const GameScreen = (props) => {
  const {
    playerBoard,
    cpuBoard,
    updatedPlayerBoard,
    shipsCpuCount,
    shipsPlayerCount,
    attemptFeedback,
    playerName,
    currentPlayer,
    initCpuBoard,
    playerAttack,
    cpuAttack,
    updateCurrentPlayer,
    updateWinner,
  } = props;
  const [finishGame, setFinishGame] = useState(false);

  const checkWinner = () => {
    if (shipsCpuCount === 0) {
      updateWinner(playerName);
      setFinishGame(true);
    }

    if (shipsPlayerCount === 0) {
      updateWinner('CPU');
      setFinishGame(true);
    }
  };

  const setTurn = () => {
    checkWinner();
    updateCurrentPlayer();
  };

  useEffect(() => {
    initCpuBoard();
    updateCurrentPlayer();
  }, []);

  useEffect(() => {
    if (currentPlayer === 'CPU' && !updatedPlayerBoard) {
      cpuAttack();
    }

    if (updatedPlayerBoard && currentPlayer === 'CPU') {
      setTimeout(setTurn, 1000);
    }
  }, [currentPlayer, updatedPlayerBoard]);

  const handleClickBoard = (position) => {
    if (currentPlayer !== 'CPU') {
      playerAttack(position);
      setTimeout(setTurn, 1000);
    }
  };

  const renderContent = () => (
    finishGame ? <Redirect to="/end" push />
      : (
        <div>
          <BoardsContainer>
            <div style={{ flexDirection: 'column' }}>
              <div style={{ paddingBottom: 10 }}>
                <Text>{playerName}</Text>
              </div>
              <Board cpu={false} click={false} board={playerBoard} />
            </div>
            <BoardCpuContainer>
              <div style={{ paddingBottom: 10 }}>
                <Text>CPU</Text>
              </div>
              <Board cpu click board={cpuBoard} onClickBoard={(position) => handleClickBoard(position)} />
            </BoardCpuContainer>
          </BoardsContainer>
          <BottomContainer>
            <FeedbackContainer>
              <Text size="1.4em">
                {attemptFeedback}
              </Text>
            </FeedbackContainer>
            <ButtonContainer>
              <Text size="1.4em">
                Playing:
                {' '}
                {currentPlayer}
              </Text>
              <Link to="/end">
                <ScreenButton>
                  Surrender
                </ScreenButton>
              </Link>
            </ButtonContainer>
          </BottomContainer>
        </div>
      )
  );

  return (
    <Screen
      content={
        renderContent()
      }
    />
  );
};

GameScreen.propTypes = {
  playerBoard: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  cpuBoard: PropTypes.arrayOf(PropTypes.array.isRequired).isRequired,
  updatedPlayerBoard: PropTypes.bool.isRequired,
  shipsCpuCount: PropTypes.number.isRequired,
  shipsPlayerCount: PropTypes.number.isRequired,
  attemptFeedback: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  currentPlayer: PropTypes.string.isRequired,
  initCpuBoard: PropTypes.func.isRequired,
  playerAttack: PropTypes.func.isRequired,
  cpuAttack: PropTypes.func.isRequired,
  updateCurrentPlayer: PropTypes.func.isRequired,
  updateWinner: PropTypes.func.isRequired,
};

/**
 *
 * @param {ReduxState} state
 * @param {object} props
 */
const mapStateToProps = (state) => ({
  playerBoard: state.board.playerBoard,
  cpuBoard: state.board.cpuBoard,
  updatedPlayerBoard: state.board.updatedPlayerBoard,
  shipsCpuCount: state.board.shipsCpuCount,
  shipsPlayerCount: state.board.shipsPlayerCount,
  attemptFeedback: state.board.attemptFeedback,
  playerName: state.game.playerName,
  currentPlayer: state.game.currentPlayer,
});

const mapDispatchToProps = (dispatch) => ({
  initCpuBoard: () => dispatch(BoardActions.initCpuBoard()),
  playerAttack: (args) => dispatch(BoardActions.playerAttack(args)),
  cpuAttack: () => dispatch(BoardActions.cpuAttack()),
  updateCurrentPlayer: () => dispatch(GameActions.updateCurrentPlayer()),
  updateWinner: (args) => dispatch(GameActions.updateWinner(args)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(GameScreen);
