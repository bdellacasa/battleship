import styled from 'styled-components';

export const BoardsContainer = styled.div`
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

export const BottomContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 20px;
    width: 100%;
    @media screen and (max-width: 480px) {
        padding-top: 120px;
        flex-direction: column;
    }
`;

export const FeedbackContainer = styled.div`
    flex-direction: column;
    justify-content: center;
    width: 50%;
    margin-top: 10px;
    @media screen and (max-width: 480px) {
        flex-direction: row;
        width: 100%;
    }
`;

export const ButtonContainer = styled.div`
    flex-direction: column;
    justify-content: center;
    width: 50%;
    @media screen and (max-width: 480px) {
        flex-direction: row;
        width: 100%;
    }
`;
