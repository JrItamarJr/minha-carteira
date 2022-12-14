import styled from "styled-components";

interface ILegendProps {
    color: string;
}

export const Container = styled.div`
    width: 49%;
    height: 260px;

    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};

    display: flex;

    border-radius: 7px;
`;

export const SideLeft = styled.div`
    padding: 30px 20px;

    > h2 {
        margin-bottom: 20px;
    }
`;

export const LegendContainer = styled.ul`
    list-style: none;

    height: 175px;
    padding-right: 15px;

    overflow-y: scroll;

    ::-webkit-scrollbar {
        width: 10px;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.colors.primary};
        border-radius: 10px;
    }
    
    ::-webkit-scrollbar-track {
        background-color: ${props => props.theme.colors.tertiary};
        border-radius: 10px;
    }
`;

export const Legend = styled.li<ILegendProps>`
    display: flex;
    align-items: center;

    margin-bottom: 7px;
    
    > div {
        background-color: ${props => props.color};
        
        width: 55px;
        height: 55px;
        
        border-radius: 5px;
        
        font-size: 16px;
        text-align: center;
        font-weight: bold;

        line-height: 55px;
     }

    > span {
        margin-left: 5px;
    }
`;

export const SideRight = styled.main`
    display: flex;
    flex: 1;
    justify-content: center;

`;