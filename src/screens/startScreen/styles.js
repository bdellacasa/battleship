import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: stretch;
    align-content: stretch;

    @media screen and (max-width: 480px) {
        flex-direction: column;
        align-items: center;
        align-content: center;
    }
`;

export const Form = styled.div`
    flex-direction: column; 
    margin-top: 45%;
    margin-left: 25px;

    @media screen and (max-width: 480px) {
        margin-top: 50%;
        margin-left: 0px;
    }
`;

export const BoardContainer = styled.div`
    flex-direction: column;
`;
