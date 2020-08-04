import React from 'react';
import PropTypes from 'prop-types';
import background from '../../assets/background.png';
import { Container, Header, Content } from './styles';

const Screen = ({ content }) => (
  <Container>
    <Header>
      <p>
        Battleship
      </p>
    </Header>
    <Content url={background}>
      {content}
    </Content>
  </Container>
);

Screen.propTypes = {
  content: PropTypes.node.isRequired,
};

export default Screen;
