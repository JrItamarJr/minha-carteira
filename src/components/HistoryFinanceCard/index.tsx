import React, { ReactNode } from "react";
import { Container, Tag } from "./styles";

type Props = {
    children?: React.ReactNode
};

interface IHistoryFinanceCarde {
    tagColor: string;
    title: string;
    subtitle: string;
    amount: string;

}

const HistoryFinanceCard: React.FC<IHistoryFinanceCarde> = ({
    tagColor,
    title,
    subtitle,
    amount,

}) => {
    return (
        <Container>
            <Tag color={tagColor} />
            <div>
                <span>{title}</span>
                <small>{subtitle}</small>

            </div>
            <h3>{amount}</h3>

        </Container>
    );

}

export default HistoryFinanceCard;