import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BoardActions from '../../redux/actions/BoardActions';
import GameActions from '../../redux/actions/GameActions';
import Screen from '../screen/Screen';
import { Message } from './styles';
import { Text, ScreenButton } from '../screenStyles';

const EndGameScreen = (props) => {
    const handleClickRestart = () => {
        props.resetBoard();
        props.restartGame();
    }

    const renderContent = () => {
        return(
            <div>
                <div style={{flexDirection: "column"}}>
                    <Message>
                        <Text>{props.winner} wins!</Text>
                        <Link style={{paddingTop: 50, paddingRight: '40px'}} to="/">
                            <ScreenButton onClick={() => handleClickRestart()}>
                                Restart 
                            </ScreenButton>
                        </Link>
                    </Message>
                </div>
            </div>
        )
    }

    return (
        <Screen
            content={
                renderContent()
            }
        />
    );
}

/**
 * 
 * @param {ReduxState} state 
 * @param {object} props 
 */
const mapStateToProps = (state, props) => ({
    winner: state.game.winner
})

const mapDispatchToProps = dispatch => ({    
    resetBoard: () => dispatch(BoardActions.restart()),
    restartGame: () => dispatch(GameActions.restart())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EndGameScreen);