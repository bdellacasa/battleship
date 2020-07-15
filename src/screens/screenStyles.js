import styled from 'styled-components';

const button = `
    height: 50px; 
    width: 150px; 
    margin-left: 50px; 
    background-color: #144205; 
    color: white;

    @media screen and (max-width: 480px) {
        width: 100px;
        margin-left: 10px;
    }
`;

export const SubmitButton = styled.input`
    ${button}  
`;

export const ScreenButton = styled.button`
    ${button}
`;

export const Text = styled.label`
    font-family: 'Black Ops One';
    font-size: 1.6em;
    color: white;
    align-self: center;

    @media screen and (max-width: 480px) {
        font-size: 1.4em;
    }
`;
