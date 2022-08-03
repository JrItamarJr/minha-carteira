import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import createID from '../../utils/createID';
import WalletBox from '../../components/WalletBox';
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";

import listMonths from '../../utils/months'
import expanses from '../../repositories/expenses'
import gains from '../../repositories/gains'

import laugImg from '../../assets/laug.svg'
import badImg from '../../assets/bad.svg'
import confusedImg from '../../assets/confused.svg'

import {
    Container,
    Content
} from "./styles";
import List from "../Lists";

const Dashboard: React.FC = () => {

    const [montSelected, setMontSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const years = useMemo(() => {

        let uniqeYears: number[] = [];


        [...expanses, ...gains].forEach(item => {

            const date = new Date(item.date);
            const year = date.getFullYear();

            if (!uniqeYears.includes(year)) {
                uniqeYears.push(year)
            }
        });

        return uniqeYears.map(year => {
            return {
                value: year,
                label: year,
            }
        });

    }, []);

    const months = useMemo(() => {
        return listMonths.map((month, index) => {
            return {
                key: index,
                value: index + 1,
                label: month,
            }
        });

    }, []);

    const totalGains = useMemo(() => {
        let total: number = 0;

        gains.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === montSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });
        return total;

    }, [montSelected, yearSelected]);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expanses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === montSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });
        return total;

    }, [montSelected, yearSelected]);

    const totalBalance = useMemo(() => {
        return totalGains - totalExpenses;
    }, [totalGains, totalExpenses]);

    const message = useMemo(() => {
        if (totalBalance < 0) {
            return {
                title: "Que triste!",
                description: "Neste mês você gastou mais do que deveria.",
                footerText: "Verifique seus gastos e tente cortar algumas coisas desnecessárias.",
                icon: badImg,
            }
        } else if (totalBalance === 0) {
            return {
                title: "Ufaa!",
                description: "Neste mês, você gastou exatamente o que ganhou",
                footerText: "Tenha cuidado. No próximo mês tente poupar o seu dinheiro.",
                icon: confusedImg,
            }
        }
        else {
            return {
                title: "Muito Bem",
                description: "Sua carteira está positiva!",
                footerText: "Continue assim. Considere investir seu saldo.",
                icon: laugImg,
            }
        }
    }, [totalBalance]);

    const relationExpensesVersusGains = useMemo(() => {
        const total = totalGains + totalExpenses;

        const percentGains = (totalGains / total) * 100;
        const percentExpenses = (totalExpenses / total) * 100;

        const data = [
            {
                name: 'Entradas',
                value: totalGains,
                percent: Number(percentGains.toFixed(1)),
                color: '#F7931B'
            },
            {
                name: 'Saidas',
                value: totalExpenses,
                percent: Number(percentExpenses.toFixed(1)),
                color: '#E44C4E'
            },
        ];

        return data;

    }, [totalGains, totalExpenses]);

    const historyData = useMemo(() => {
        return listMonths.map((_, month) => {

            let amountEntry = 0;
            gains.forEach(gain => {
                const date = new Date(gain.date);
                const gainMount = date.getMonth();
                const gainYear = date.getFullYear();

                if (gainMount === month && gainYear === yearSelected) {
                    try {
                        amountEntry += Number(gain.amount);
                    } catch {
                        throw new Error('amountEntry is invalid. amountEntry must be valid number.')
                    }
                }
            });

            let amountOutput = 0;
            expanses.forEach(expense => {
                const date = new Date(expense.date);
                const expenseMount = date.getMonth();
                const expenseYear = date.getFullYear();

                if (expenseMount === month && expenseYear === yearSelected) {
                    try {
                        amountOutput += Number(expense.amount);
                    } catch {
                        throw new Error('amountOutput is invalid. amountOutput must be valid number.')
                    }
                }
            });

            return {
                monthNumber: month,
                month: listMonths[month].substr(0, 3),
                amountEntry,
                amountOutput,
            }
        }).filter(item => {
            const currentMount = new Date().getMonth();
            const currentYear = new Date().getFullYear();

            return (yearSelected === currentYear && item.monthNumber <= currentMount) || (yearSelected < currentYear)

        })
    }, [yearSelected]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMontSelected(parseMonth);
        } catch (error) {
            throw new Error('Mes selecionado é invalido')
        }
    };

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Ano selecionado é invalido')
        }
    };


    return (
        <div>
            <Container>
                <ContentHeader title="Dashboard" lineColor="#000055">
                    <SelectInput
                        key={createID()}
                        options={months}
                        onChange={(e) => handleMonthSelected(e.target.value)}
                        defaultValue={montSelected} />
                    <SelectInput
                        key={createID()}
                        options={years}
                        onChange={(e) => handleYearSelected(e.target.value)}
                        defaultValue={yearSelected} />
                </ContentHeader>
                <Content>
                    <WalletBox
                        title="Saldo"
                        amount={totalBalance}
                        footerlabel="atualizado com base nas entradas e saidas"
                        icon="dollar"
                        color="#4E41F0"
                    />
                    <WalletBox
                        title="Entradas"
                        amount={totalGains}
                        footerlabel="atualizado com base nas entradas e saidas"
                        icon="arrowUp"
                        color="#F7931B"
                    />
                    <WalletBox
                        title="Saidas"
                        amount={totalExpenses}
                        footerlabel="atualizado com base nas entradas e saidas"
                        icon="arrowDown"
                        color="#E44C4E"
                    />
                    <MessageBox
                        title={message.title}
                        description={message.description}
                        footerText={message.footerText}
                        icon={message.icon} />

                    <PieChartBox data={relationExpensesVersusGains} />

                    <HistoryBox
                        data={historyData}
                        lineColorAmountEntrey="#F7931B"
                        lineColorAmountOutput="#E44C4E"
                        yearSelected={yearSelected}
                    />

                </Content>
            </Container>
        </div>
    );

}

export default Dashboard;