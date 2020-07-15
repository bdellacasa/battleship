import React from 'react';
import background from '../../assets/background.png';
import { Container, Header, Content } from './styles';

const Screen = (props) => (
  <Container>
    <Header>
      <p>
        Battleship
      </p>
    </Header>
    <Content url={background}>
      {props.content}
    </Content>
  </Container>
);

export default Screen;
