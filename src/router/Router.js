import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StartScreen from '../screens/startScreen/StartScreen';
import GameScreen from '../screens/gameScreen/GameScreen';
import EndGameScreen from '../screens/endGameScreen/EndGameScreen';

/**
 * Router that manages the navigation of the application
 */

const ApplicationRouter = () => (
  <Router>
    <Route exact path="/" component={StartScreen} />
    <Route path="/game" component={GameScreen} />
    <Route path="/end" component={EndGameScreen} />
  </Router>
);

export default ApplicationRouter;
