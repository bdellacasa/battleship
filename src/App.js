import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import ApplicationRouter from "./router/Router";
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <ApplicationRouter/>
      </Provider>
    </div>
  );
}

export default App;
