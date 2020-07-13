import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import BoardActions from '../../redux/actions/BoardActions';
import GameActions from '../../redux/actions/GameActions';
import Screen from '../screen/Screen'
import Board from '../../components/board/Board';
import ShipSelector from '../../components/shipSelector/ShipSelector';
import { Container, Form, BoardContainer } from './styles';
import { Text, SubmitButton, ScreenButton } from '../screenStyles';
import { NUMBER_OF_SHIP, SHIP_ORIENTATION } from '../../utils/Constants';

const StartScreen = (props) => {
    const [shipSelected, setShipSelected] = useState(undefined);
    const [orientation, setOrientation] = useState(SHIP_ORIENTATION.VERTICAL);
    const [start, setStart] = useState(false);
    const [playerName, setPlayerName] = useState(undefined);
    const [loadShipSelector, setLoadShipSelector] = useState(false);

    useEffect(() => {
        props.initPlayerBoard();
    }, []);

    useEffect(() => {
        if (props.savedPlayerShip) {
            setShipSelected(undefined);
            handleStart();
        }
    }, [props.savedPlayerShip])

    const saveShip = async(position) => {
        if (shipSelected) {
            const shipData = {
                row: position.row,
                col: position.col,
                ship: shipSelected,
                orientation: orientation
            }
            const saveShip = await props.updatePlayerBoard(shipData);     
        } else {
            alert("Please select a ship!")
        }
    }

    const restartSavedPlayerShip = () => {
        props.restartSavedPlayerShip();
    }

    const handleStart = () => {
        if (props.shipsPlayerCount == NUMBER_OF_SHIP.TOTAL && props.playerName) {
            setStart(true);
        }
    }

    const handleChange = (e) => {
        setPlayerName(e.target.value);
    }

    const handleSubmit = (e) => {
        setLoadShipSelector(true);
        props.updatePlayerName(playerName);
    }

   const renderContent = () => {
        const startGameButtonOpacity = start ? 1 : (loadShipSelector ? 0.6 : 0);
        return(
            <div>
                <div style={{paddingBottom: 30}}>
                    { loadShipSelector ? <Text>Hi {playerName}, please locate your ships!</Text> : <Text>Please enter your name!</Text> }
                </div>
                <Container>
                    {loadShipSelector && <ShipSelector 
                        shipSaved={props.savedPlayerShip}
                        carriers={props.carriersAvailable} 
                        cruisers={props.cruisersAvailable} 
                        submarines={props.submarinesAvailable} 
                        selectShip={ ship => setShipSelected(ship) }
                        selectOrientation={ orientation => setOrientation(orientation) }
                        restartSavedPlayerShip={() => restartSavedPlayerShip()}
                    />}
                    <BoardContainer>
                        <Board 
                            cpu={false}
                            board={props.playerBoard}
                            click={true} 
                            onClickBoard={ position => saveShip(position) }
                            shipSelected={shipSelected}
                            shipOrientation={orientation}/>
                    </BoardContainer>
                    <Form>
                        {!loadShipSelector && <form onSubmit={handleSubmit}>
                            <input
                                onChange={handleChange}
                                className="form-control"
                                type="text"
                                name="Player name"
                                placeholder="Player name"
                                style={{height: 30}}
                            />
                        <SubmitButton type="submit" value="Submit"/>
                        </form>}
                        <Link to="/game">
                            <ScreenButton style={{ opacity: startGameButtonOpacity}} disabled={!start}>
                                Start Game
                            </ScreenButton>
                        </Link>
                    </Form>
                </Container>
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
    playerBoard: state.board.playerBoard,
    carriersAvailable: state.board.carriersAvailable,
    cruisersAvailable: state.board.cruisersAvailable,
    submarinesAvailable: state.board.submarinesAvailable,
    shipsPlayerCount: state.board.shipsPlayerCount,
    savedPlayerShip: state.board.savedPlayerShip,
    playerName: state.game.playerName
})

const mapDispatchToProps = dispatch => ({
    initPlayerBoard: () => dispatch(BoardActions.initEmptyBoard()),
    updatePlayerBoard: (args) => dispatch(BoardActions.updatePlayerBoard(args)),
    updatePlayerName: (args) => dispatch(GameActions.updatePlayerName(args)),
    restartSavedPlayerShip : () => dispatch(BoardActions.restartSavedPlayerShip())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StartScreen);