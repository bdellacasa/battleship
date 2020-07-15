import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;

    @media screen and (max-width: 480px) {
        width: 90vw;
        margin-top: 50vh;
        flex-direction: column;
        align-items: center;
    }
`;

export const BoardCpuContainer = styled.div`
    flex-direction: column; 
    margin-left: 30px;

    @media screen and (max-width: 480px) {
        margin-top: 140px;
        margin-left: 0px;
    }
`;

export const ButtonContainer = styled.div`
    flex-direction: row;
    width: 50%; 
    justify-content: flex-end; 
    margin-top: 20px; 
    margin-left: 60%;

    @media screen and (max-width: 480px) {
        width: 100%; 
        padding-top: 120px;
        margin-left: 0;
    }
`;
