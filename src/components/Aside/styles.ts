import styled from 'styled-components';


export const Container = styled.div`
grid-area: AS;
background-color: ${props => props.theme.colors.primary};
color: ${props => props.theme.colors.white};
padding-left: 20px;
border-right: 1px solid ${props => props.theme.colors.gray};
`;

export const Header = styled.header`
display: flex;
align-items: center;
height: 70px;
`;



export const LogImg = styled.img`
height: 30px;
width: 30px;
margin-right: 10px;
`;

export const Title = styled.h3`
color: ${props => props.theme.colors.white};

`;

export const MenuContainer = styled.nav`
display: flex;
margin-top: 50px;
flex-direction: column;

`;

export const MenuItemLink = styled.a`
color: ${props => props.theme.colors.info};
text-decoration: none;
transition: opacity .3s ;
display: flex;
align-items: center;

margin: 7px 0px;
&:hover {
    opacity: .7;
}
> svg {
    font-size: 18px;
    margin-right: 5px;
}
`;