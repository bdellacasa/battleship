import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BoardActions from '../../redux/actions/BoardActions';
import GameActions from '../../redux/actions/GameActions';
import Screen from '../screen/Screen';
import Message from './styles';
import { Text, ScreenButton } from '../screenStyles';

const EndGameScreen = ({ winner, resetBoard, restartGame }) => {
  const handleClickRestart = () => {
    resetBoard();
    restartGame();
  };

  const renderContent = () => (
    <div>
      <div style={{ flexDirection: 'column' }}>
        <Message>
          {winner
            ? (
              <Text>
                {winner}
                {' '}
                wins!
              </Text>
            )
            : (
              <Text>
                You have surrendered
              </Text>
            )}
          <Link style={{ paddingTop: 50, paddingRight: '40px' }} to="/">
            <ScreenButton onClick={() => handleClickRestart()}>
              Restart
            </ScreenButton>
          </Link>
        </Message>
      </div>
    </div>
  );

  return (
    <Screen
      content={
        renderContent()
      }
    />
  );
};

EndGameScreen.propTypes = {
  winner: PropTypes.string.isRequired,
  resetBoard: PropTypes.func.isRequired,
  restartGame: PropTypes.func.isRequired,
};

/**
 *
 * @param {ReduxState} state
 * @param {object} props
 */
const mapStateToProps = (state) => ({
  winner: state.game.winner,
});

const mapDispatchToProps = (dispatch) => ({
  resetBoard: () => dispatch(BoardActions.restart()),
  restartGame: () => dispatch(GameActions.restart()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EndGameScreen);
