import styled from "styled-components";

export const Container = styled.div``;

export const Content = styled.main``;

export const Filters = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 30px;

    .tag-filter{
        font-size: 18px;
        font-weight: bolder;
        background: none;
        color: ${props => props.theme.colors.white};
        opacity: .4;
        margin: 0 10px;

        transition: opacity .3s;

        :hover{
            opacity: .7;
        }
    }

    .tag-filter-recurrent::after{
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 5px solid ${props => props.theme.colors.sucess};
    }

    .tag-filter-eventual::after{
        content: '';
        display: block;
        width: 55px;
        margin: 0 auto;
        border-bottom: 5px solid ${props => props.theme.colors.warning};
    }
    
    .tag-actived {
        opacity: 1;
    }
    
`;