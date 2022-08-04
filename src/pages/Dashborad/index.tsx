import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import createID from '../../utils/createID';
import WalletBox from '../../components/WalletBox';
import MessageBox from "../../components/MessageBox";
import PieChartBox from "../../components/PieChartBox";
import HistoryBox from "../../components/HistoryBox";
import BarChartBox from "../../components/BarChartBox";

import listMonths from '../../utils/months';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';

import laugImg from '../../assets/laug.svg';
import badImg from '../../assets/bad.svg';
import confusedImg from '../../assets/confused.svg';
import sadbadImg from '../../assets/sab-bad.svg';

import {
    Container,
    Content
} from "./styles";


const Dashboard: React.FC = () => {

    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());

    const years = useMemo(() => {

        let uniqeYears: number[] = [];


        [...expenses, ...gains].forEach(item => {

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

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });
        return total;

    }, [monthSelected, yearSelected]);

    const totalExpenses = useMemo(() => {
        let total: number = 0;

        expenses.forEach(item => {
            const date = new Date(item.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            if (month === monthSelected && year === yearSelected) {
                try {
                    total += Number(item.amount)
                } catch {
                    throw new Error('Invalid amount! Amount must be number.')
                }
            }
        });
        return total;

    }, [monthSelected, yearSelected]);

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
        }
        else if (totalGains === 0 && totalExpenses === 0) {
            return {
                title: "Op's!",
                description: "Neste mês, não há registro de entredas ou saidas",
                footerText: "Parece que você não fez nenhum registro no mes ou ano selecionado.",
                icon: sadbadImg,
            }
        }
        else if (totalBalance === 0) {
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

        const percentGains = Number(((totalGains / total) * 100).toFixed(1));
        const percentExpenses = Number(((totalExpenses / total) * 100).toFixed(1));

        const data = [
            {
                name: 'Entradas',
                value: totalGains,
                percent: percentGains ? percentGains : 0,
                color: '#F7931B'
            },
            {
                name: 'Saidas',
                value: totalExpenses,
                percent: percentExpenses ? percentExpenses : 0,
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
            expenses.forEach(expense => {
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

    const relationExpensevesRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        expenses.filter((expense) => {
            const date = new Date(expense.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
            .forEach((expense) => {
                if (expense.frequency === 'recorrente') {
                    return amountRecurrent += Number(expense.amount)
                }
                if (expense.frequency === 'eventual') {
                    return amountEventual += Number(expense.amount)
                }
            });

        const total = amountRecurrent + amountEventual;

        const percentReccurent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentReccurent ? percentReccurent : 0,
                color: "#F7931B",
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentReccurent : 0,
                color: "#E44C4E",
            },
        ]

    }, [monthSelected, yearSelected]);

    const relationGainsRecurrentVersusEventual = useMemo(() => {
        let amountRecurrent = 0;
        let amountEventual = 0;

        gains.filter((gain) => {
            const date = new Date(gain.date);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;

            return month === monthSelected && year === yearSelected;
        })
            .forEach((gain) => {
                if (gain.frequency === 'recorrente') {
                    return amountRecurrent += Number(gain.amount)
                }
                if (gain.frequency === 'eventual') {
                    return amountEventual += Number(gain.amount)
                }
            });

        const total = amountRecurrent + amountEventual;

        const percentReccurent = Number(((amountRecurrent / total) * 100).toFixed(1));
        const percentEventual = Number(((amountEventual / total) * 100).toFixed(1));

        return [
            {
                name: 'Recorrentes',
                amount: amountRecurrent,
                percent: percentReccurent ? percentReccurent : 0,
                color: "#F7931B",
            },
            {
                name: 'Eventuais',
                amount: amountEventual,
                percent: percentEventual ? percentReccurent : 0,
                color: "#E44C4E",
            },
        ]

    }, [monthSelected, yearSelected]);

    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
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
                        defaultValue={monthSelected}
                    />
                    <SelectInput
                        key={createID()}
                        options={years}
                        onChange={(e) => handleYearSelected(e.target.value)}
                        defaultValue={yearSelected}
                    />
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
                        icon={message.icon}
                    />
                    <PieChartBox
                        data={relationExpensesVersusGains}
                    />
                    <HistoryBox
                        data={historyData}
                        lineColorAmountEntrey="#F7931B"
                        lineColorAmountOutput="#E44C4E"
                        yearSelected={yearSelected}
                    />
                    <BarChartBox
                        title="Saidas"
                        data={relationExpensevesRecurrentVersusEventual}
                    />
                    <BarChartBox
                        title="Entradas"
                        data={relationGainsRecurrentVersusEventual}
                    />
                </Content>
            </Container>
        </div>
    );

}

export default Dashboard;