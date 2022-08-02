import React, { useMemo, useState } from "react";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import createID from '../../utils/createID';
import WalletBox from '../../components/WalletBox';
import MessageBox from "../../components/MessageBox";

import listMonths from '../../utils/months'
import expanses from '../../repositories/expenses'
import gains from '../../repositories/gains'

import happyImg from '../../assets/happy.svg'

import {
    Container,
    Content
} from "./styles";

const Dashboard: React.FC = () => {

    const [montSelected, setMontSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());


    const options = [
        { value: 'Itamar 01', label: 'Itamar 01' },
        { value: 'Itamar 02', label: 'Itamar 02' },
        { value: 'Itamar 03', label: 'Itamar 03' },

    ]

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


    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMontSelected(parseMonth);
        } catch (error) {
            throw new Error('Mes selecionado é invalido')
        }

    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch (error) {
            throw new Error('Ano selecionado é invalido')
        }

    }


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
                        amount={150.00}
                        footerlabel="atualizado com base nas entradas e saidas"
                        icon="dollar"
                        color="#4E41F0"
                    />
                    <WalletBox
                        title="Entradas"
                        amount={5000.00}
                        footerlabel="atualizado com base nas entradas e saidas"
                        icon="arrowUp"
                        color="#F7931B"
                    />
                    <WalletBox
                        title="Saidas"
                        amount={4850.00}
                        footerlabel="atualizado com base nas entradas e saidas"
                        icon="arrowDown"
                        color="#E44C4E"
                    />
                    <MessageBox
                        title="Muito Bem"
                        description="Sua carteira está positiva!"
                        footerText="Continue assim. Considere investir seu saldo."
                        icon={happyImg}
                    />

                </Content>
            </Container>
        </div>
    );

}

export default Dashboard;