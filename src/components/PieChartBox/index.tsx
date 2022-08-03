import React from "react";

import {
    PieChart,
    Pie,
    ResponsiveContainer,
    Cell,
} from 'recharts'

import {
    Container,
    SideLeft,
    LegendContainer,
    Legend,
    SideRight
} from "./styles";

interface IPieChartProps {
    data: {
        name: string,
        value: number,
        percent: number,
        color: string,
    }[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const PieChartBox: React.FC<IPieChartProps> = ({ data }) => (
    <Container>
        <SideLeft>
            <h2>Relação</h2>
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
                <PieChart>
                    <Pie data={data} dataKey="percent" >

                        {
                            data.map((indicador) => (
                                <Cell name={indicador.name} key={indicador.name} fill={indicador.color} />
                            ))
                        }
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </SideRight>
    </Container>
);

export default PieChartBox;