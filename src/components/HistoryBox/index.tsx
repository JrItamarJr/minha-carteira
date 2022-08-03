import React, { ReactNode } from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

import formatCurrency from "../../utils/formatCurrency";

import {
    Container,
    ChartContainer,
    Header,
    LegendContainer,
    Legend,
    HeaderTitle
} from "./styles";

interface IHistoryBoxProps {
    data: {
        month: string,
        amountEntry: number,
        amountOutput: number,
    }[],
    lineColorAmountEntrey: string,
    lineColorAmountOutput: string,
    yearSelected: number,
}

const HistoryBox: React.FC<IHistoryBoxProps> = ({
    data, lineColorAmountEntrey, lineColorAmountOutput, yearSelected
}) => (
    <Container>
        <Header>
            <HeaderTitle>
                <h2>Histórico de Saldo </h2>
                <small>{yearSelected.toString()}</small>
            </HeaderTitle>
            <LegendContainer>
                <Legend color={lineColorAmountEntrey}>
                    <div></div>
                    <span>Entradas</span>
                </Legend>
                <Legend color={lineColorAmountOutput}>
                    <div></div>
                    <span>Saídas</span>
                </Legend>
            </LegendContainer>
        </Header>
        <ChartContainer>
            <ResponsiveContainer>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#CECECE" />
                    <XAxis dataKey="month" stroke="#CECECE" />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line
                        type="monotone"
                        dataKey="amountEntry"
                        name="Entradas"
                        stroke={lineColorAmountEntrey}
                        strokeWidth={5}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="amountOutput"
                        name="Saídas"
                        stroke={lineColorAmountOutput}
                        strokeWidth={5}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    </Container>

)

export default HistoryBox;