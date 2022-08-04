import React, { ReactNode } from "react";

import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    Tooltip,
} from "recharts";

import formatCurrency from "../../utils/formatCurrency";

import {
    Container,
    SideLeft,
    SideRight,
    LegendContainer,
    Legend

} from "./styles";

interface IBarChartProps {
    title: string;
    data: {
        name: string,
        amount: number,
        percent: number,
        color: string
    }[]
}

const BarChartBox: React.FC<IBarChartProps> = ({ title, data }) => (
    <Container>
        <SideLeft>
            <h2>{title}</h2>
            <LegendContainer>
                {
                    data.map(indicador => (
                        <Legend key={indicador.name} color={indicador.color}>
                            <div>{indicador.percent}%</div>
                            <span>{indicador.name}</span>
                        </Legend>
                    ))
                }
            </LegendContainer>
        </SideLeft>
        <SideRight>
            <ResponsiveContainer>
                <BarChart data={data}>
                    <Bar dataKey="amount">
                        {
                            data.map((indicador) => (
                                <Cell
                                    key={indicador.name}
                                    fill={indicador.color}
                                />
                            ))
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
)

export default BarChartBox;