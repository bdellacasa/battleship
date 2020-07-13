import styled from 'styled-components';

export const Container = styled.div`
    text-align: center;
    background-color: #282c34;
    height: 100vh;
`;

export const Header = styled.header`
    background-color: #282c34;
    font-family: 'Black Ops One';
    height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: calc(20px + 2vmin);
    color: white;
    margin-top: 0px;
`;

export const Content = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    margin-bottom: 10px;
    background: ${props => `url(${props.url})`};
    background-position-y: -5px;
    
    @media screen and (max-width: 480px) {
        max-height: 100vh;
        overflow: scroll;
    }
`;