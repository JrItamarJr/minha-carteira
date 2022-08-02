import React, { ReactNode } from "react";

import { TestGrid } from "./styles";
import MainHeader from "../MainHeader";
import Aside from "../Aside";
import Content from "../Content";

type Props = {
    children?: React.ReactNode
};


const GridLayout: React.FC<Props> = ({ children }) => {
    return (
        <TestGrid>
            <MainHeader />
            <Aside />
            <Content>
                {children}
            </Content>
        </TestGrid>
    );

}

export default GridLayout;