import React, { useState, useEffect } from 'react';
import {
  SHIP_TYPE_CARRIER, SHIP_TYPE_CRUISER, SHIP_TYPE_SUBMARINE, SHIP_ORIENTATION,
} from '../../utils/Constants';
import {
  Container, RowContainer, Row, Column, Icon, SelectButton,
} from './styles';
import Submarine from '../../assets/submarine.png';
import Cruiser from '../../assets/cruiser.png';
import Carrier from '../../assets/carrier.png';

const ShipSelector = (props) => {
  const [carriers, setCarriers] = useState(0);
  const [cruisers, setCruisers] = useState(0);
  const [submarines, setSubmarines] = useState(0);
  const [orientation, setOrientation] = useState(SHIP_ORIENTATION.VERTICAL);
  const [lastShip, setLastShip] = useState(undefined);

  useEffect(() => {
    setCarriers(props.carriers);
    setCruisers(props.cruisers);
    setSubmarines(props.submarines);
  }, []);

  useEffect(() => {
    if (props.shipSaved) {
      shipSaved();
    }
  }, [props.shipSaved]);

  const shipSaved = () => {
    switch (lastShip) {
      case 'Carrier':
        if (carriers > 0) {
          setCarriers(carriers - 1);
        }
        break;
      case 'Cruise':
        if (cruisers > 0) {
          setCruisers(cruisers - 1);
        }
        break;
      case 'Submarine':
        if (submarines > 0) {
          setSubmarines(submarines - 1);
        }
        break;
    }
    props.restartSavedPlayerShip();
  };

  const handleClickSelect = (title) => {
    switch (title) {
      case 'Carriers':
        if (carriers > 0) {
          setLastShip('Carrier');
          props.selectShip(SHIP_TYPE_CARRIER);
        }
        break;
      case 'Cruisers':
        if (cruisers > 0) {
          setLastShip('Cruise');
          props.selectShip(SHIP_TYPE_CRUISER);
        }
        break;
      case 'Submarines':
        if (submarines > 0) {
          setLastShip('Submarine');
          props.selectShip(SHIP_TYPE_SUBMARINE);
        }
        break;
    }
  };

  const handleClickRotate = () => {
    if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
      setOrientation(SHIP_ORIENTATION.VERTICAL);
      props.selectOrientation(SHIP_ORIENTATION.VERTICAL);
    } else {
      setOrientation(SHIP_ORIENTATION.HORIZONTAL);
      props.selectOrientation(SHIP_ORIENTATION.HORIZONTAL);
    }
  };

  const renderRow = (title, number, icon) => (
    <RowContainer>
      <Row>
        <label>
          {title}
          :
          {' '}
          {number}
        </label>
      </Row>
      <Row>
        <Column>
          <Icon src={icon} />
        </Column>
        <Column>
          <SelectButton onClick={() => handleClickSelect(title)}>
            Select
          </SelectButton>
        </Column>
      </Row>
    </RowContainer>
  );

  const renderRotateButton = () => (
    <Row>
      <label style={{ paddingRight: 15 }}>{orientation == SHIP_ORIENTATION.HORIZONTAL ? 'Dir: Horizontal' : 'Dir: Vertical'}</label>
      <button style={{ paddingRight: 15 }} onClick={() => handleClickRotate()}>Rotate</button>
    </Row>
  );

  return (
    <Container>
      {renderRow('Carriers', carriers, Carrier)}
      {renderRow('Cruisers', cruisers, Cruiser)}
      {renderRow('Submarines', submarines, Submarine)}
      {renderRotateButton()}
    </Container>
  );
};

export default ShipSelector;
