import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  const {
    carriers,
    cruisers,
    submarines,
    shipSaved,
    restartSavedPlayerShip,
    selectShip,
    selectOrientation,
  } = props;
  const [currentCarriers, setCurrentCarriers] = useState(() => carriers);
  const [currentCruisers, setCurrentCruisers] = useState(() => cruisers);
  const [currentSubmarines, setCurrentSubmarines] = useState(() => submarines);
  const [orientation, setOrientation] = useState(SHIP_ORIENTATION.VERTICAL);
  const [lastShip, setLastShip] = useState(undefined);

  const updateShips = () => {
    switch (lastShip) {
      case 'Carrier':
        if (currentCarriers > 0) {
          setCurrentCarriers(currentCarriers - 1);
        }
        break;
      case 'Cruise':
        if (currentCruisers > 0) {
          setCurrentCruisers(currentCruisers - 1);
        }
        break;
      case 'Submarine':
        if (currentSubmarines > 0) {
          setCurrentSubmarines(currentSubmarines - 1);
        }
        break;
      default:
        break;
    }
    restartSavedPlayerShip();
  };

  useEffect(() => {
    if (shipSaved) {
      updateShips();
    }
  }, [shipSaved]);

  const handleClickSelect = (title) => {
    switch (title) {
      case 'Carriers':
        if (currentCarriers > 0) {
          setLastShip('Carrier');
          selectShip(SHIP_TYPE_CARRIER);
        }
        break;
      case 'Cruisers':
        if (currentCruisers > 0) {
          setLastShip('Cruise');
          selectShip(SHIP_TYPE_CRUISER);
        }
        break;
      case 'Submarines':
        if (currentSubmarines > 0) {
          setLastShip('Submarine');
          selectShip(SHIP_TYPE_SUBMARINE);
        }
        break;
      default:
        break;
    }
  };

  const handleOnClick = () => {
    if (orientation === SHIP_ORIENTATION.HORIZONTAL) {
      setOrientation(SHIP_ORIENTATION.VERTICAL);
      selectOrientation(SHIP_ORIENTATION.VERTICAL);
    } else {
      setOrientation(SHIP_ORIENTATION.HORIZONTAL);
      selectOrientation(SHIP_ORIENTATION.HORIZONTAL);
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

  const text = orientation === SHIP_ORIENTATION.HORIZONTAL ? 'Dir: Horizontal' : 'Dir: Vertical';

  const renderRotateButton = () => (
    <Row>
      <label style={{ paddingRight: 15 }}>{text}</label>
      <button style={{ paddingRight: 15 }} onClick={() => handleOnClick()} type="button">Rotate</button>
    </Row>
  );

  return (
    <Container>
      {renderRow('Carriers', currentCarriers, Carrier)}
      {renderRow('Cruisers', currentCruisers, Cruiser)}
      {renderRow('Submarines', currentSubmarines, Submarine)}
      {renderRotateButton()}
    </Container>
  );
};

ShipSelector.propTypes = {
  carriers: PropTypes.number.isRequired,
  cruisers: PropTypes.number.isRequired,
  submarines: PropTypes.number.isRequired,
  shipSaved: PropTypes.bool.isRequired,
  restartSavedPlayerShip: PropTypes.func.isRequired,
  selectShip: PropTypes.func.isRequired,
  selectOrientation: PropTypes.func.isRequired,
};

export default ShipSelector;
