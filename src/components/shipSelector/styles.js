import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 500px;
    border: 11px solid rgb(3,3,65,1);
    background-color: rgb(2,2,120,0.9);
    margin-right: 50px;

    @media screen and (max-width: 480px) {
        width: 300px;
        height: 400px;
        margin-right: 0px;
        margin-top: 50vh;
        margin-bottom: 10vh;
    }
`;

export const RowContainer = styled.div`
    height: 30vh;
    border: 2px solid rgb(3,3,65,0.5);
`;

export const Row = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    align-content: space-around;
    padding: 10px;
    font-family: 'Black Ops One';
    font-size: 1.2em;
    color: white;

    @media screen and (max-width: 480px) {
        font-size: 1em;
        height: 2vh;
        padding-top: 20px;
    }
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    width: 100px;
    align-items: center;
`;

export const Icon = styled.img`
    width: 80px;
    height: 65px;
`;

export const SelectButton = styled.button`
    height: 30px;
    margin-left: 5px;
`;
