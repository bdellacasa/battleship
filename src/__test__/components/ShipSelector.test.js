import React from 'react';
import { renderWithRedux } from '../TestUtils';
import ShipSelector from '../../components/shipSelector/ShipSelector';

const props = {
  shipSaved: true,
  carriers: 0,
  cruisers: 0,
  submarines: 0,
  selectShip: () => {},
  selectOrientation: () => {},
  restartSavedPlayerShip: () => {},
};

describe('<ShipSelector/>', () => {
  test('ShipSelector component render', () => {
    renderWithRedux(<ShipSelector {...props} />);
  });
});

describe('ShipSelector snapshot', () => {
  test('Check the ShipSelector Snapshot', () => {
    const { container } = renderWithRedux(<ShipSelector {...props} />);
    expect(container).toMatchSnapshot();
  });
});
