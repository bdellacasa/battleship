import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import BoardActions from '../../redux/actions/BoardActions';
import GameActions from '../../redux/actions/GameActions';
import Board from '../../components/board/Board';
import Screen from '../screen/Screen';
import { Container, BoardCpuContainer, ButtonContainer } from './styles';
import { Text, ScreenButton } from '../screenStyles';

const GameScreen = (props) => {
  const [finishGame, setFinishGame] = useState(false);

  useEffect(() => {
    props.initCpuBoard();
    props.updateCurrentPlayer();
  }, []);

  useEffect(() => {
    if (props.currentPlayer == 'CPU' && !props.updatedPlayerBoard) {
      props.cpuAttack();
    }

    if (props.updatedPlayerBoard && props.currentPlayer == 'CPU') {
      setTimeout(setTurn, 1000);
    }
  }, [props.currentPlayer, props.updatedPlayerBoard]);

  const checkWinner = () => {
    if (props.shipsCpuCount == 0) {
      props.updateWinner(props.playerName);
      setFinishGame(true);
    }

    if (props.shipsPlayerCount == 0) {
      props.updateWinner('CPU');
      setFinishGame(true);
    }
  };

  const setTurn = () => {
    checkWinner();
    props.updateCurrentPlayer();
  };

  const handleClickBoard = (position) => {
    if (props.currentPlayer !== 'CPU') {
      props.playerAttack(position);
      setTimeout(setTurn, 1000);
    }
  };

  const renderContent = () => (
    finishGame ? <Redirect to="/end" push />
      : (
        <div>
          <Container>
            <div style={{ flexDirection: 'column' }}>
              <div style={{ paddingBottom: 10 }}>
                <Text>{props.playerName}</Text>
              </div>
              <Board cpu={false} click={false} board={props.playerBoard} />
            </div>
            <BoardCpuContainer>
              <div style={{ paddingBottom: 10 }}>
                <Text>CPU</Text>
              </div>
              <Board cpu click board={props.cpuBoard} onClickBoard={(position) => handleClickBoard(position)} />
            </BoardCpuContainer>
          </Container>
          <ButtonContainer>
            <Text>
              Playing:
              {props.currentPlayer}
            </Text>
            <Link to="/end">
              <ScreenButton>
                Surrender
              </ScreenButton>
            </Link>
          </ButtonContainer>
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

/**
 *
 * @param {ReduxState} state
 * @param {object} props
 */
const mapStateToProps = (state, props) => ({
  playerBoard: state.board.playerBoard,
  cpuBoard: state.board.cpuBoard,
  updatedPlayerBoard: state.board.updatedPlayerBoard,
  shipsCpuCount: state.board.shipsCpuCount,
  shipsPlayerCount: state.board.shipsPlayerCount,
  playerName: state.game.playerName,
  currentPlayer: state.game.currentPlayer,
  winner: state.game.winner,
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
