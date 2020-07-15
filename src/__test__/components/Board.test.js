import React from 'react';
import { renderWithRedux } from '../TestUtils';
import Board from '../../components/board/Board';

const props = {
    board: [],
    cpu: false,
    click: true,
    onClickBoard: () => {},
};

describe('<Board/>', () => {
    test('board component render', () => {
      renderWithRedux(<Board {...props} />);
    });
});

describe('Board snapshot', () => {
    test('Check the Board Snapshot', () => {
      const { container } = renderWithRedux(<Board {...props} />);
      expect(container).toMatchSnapshot()
    });
});