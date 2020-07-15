import styled from 'styled-components';

export const Container = styled.div`
    width: 410px;
    height: 410px;
    border: 2px solid black;

    @media screen and (max-width: 480px) {
        width: 200px;
        height: 200px;
        border: 0px;
        margin-left: -32vw;
    }
`;

export const CellDiv = styled.div`
    width: 39px;
    height: 39px;
    border: 1px solid black;
    background-color: ${(props) => (props.color ? props.color : '#000066')};

    @media screen and (max-width: 480px) {
        width: 30px;
        height: 30px;
    }
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`;
