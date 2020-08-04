import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render as rlRender } from '@testing-library/react';
import aplicationReducer from '../redux/reducers/index';

const store = createStore(aplicationReducer);

export const ProviderMock = (props) => (
  <Provider store={store}>
    {props.children}
  </Provider>
);

const Wrapper = ({ children }) => <ProviderMock>{children}</ProviderMock>;

export const renderWithRedux = (component, renderOptions) => rlRender(component, { wrapper: Wrapper, ...renderOptions });
