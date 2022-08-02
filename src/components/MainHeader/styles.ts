import styled from 'styled-components';

export const Container = styled.div`
    grid-area: MH;
    /* background: linear-gradient( #000055, #55558D);
        background-color: orange; */
/* background:linear-gradient(rgba(250,0,0,0.5),transparent);
background-color:orange; this your primary color */
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.white};
    display:flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid ${props => props.theme.colors.gray};

`;

export const Profile = styled.div`
/* display: flex;
flex-direction: row; */

color: ${props => props.theme.colors.white};

`;

export const Welcome = styled.div`

`;

export const UserName = styled.div`

`;
