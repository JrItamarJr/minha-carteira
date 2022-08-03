import React, { useMemo, useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

import { Container, Content, Filters } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";

import listMonths from "../../utils/months";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from '../../utils/formatDate';
import createID from '../../utils/createID';

interface iData {
    id: string;
    description: string;
    amountFormated: string;
    frequency: string;
    dateFromated: string;
    tagColor: string;
}

const List: React.FC = () => {

    const [data, setData] = useState<iData[]>([]);
    const [monthSelected, setMonthSelected] = useState<number>(new Date().getMonth() + 1);
    const [yearSelected, setYearSelected] = useState<number>(new Date().getFullYear());
    const [frequecyFilterSelected, setFrequecyFilterSelected] = useState(['recorrente', 'eventual']);

    const { type } = useParams();

    const pageData = useMemo(() => {
        return type === 'entry-balance' ?
            {
                title: 'Entradas',
                lineColor: '#4E41F0',
                data: gains,
            }
            :
            {
                title: 'Saídas',
                lineColor: '#E44C4E',
                data: expenses,
            }
    }, [type]);

    const years = useMemo(() => {

        let uniqeYears: number[] = [];

        const { data } = pageData;

        data.forEach(item => {

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

    }, [pageData]);

    const months = useMemo(() => {
        return listMonths.map((month, index) => {
            return {
                key: index,
                value: index + 1,
                label: month,
            }
        });

    }, []);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = frequecyFilterSelected.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filtered = frequecyFilterSelected.filter(item => item !== frequency);
            setFrequecyFilterSelected(filtered);
        } else {
            setFrequecyFilterSelected((prev) => [...prev, frequency]);

        }
    }
    
    const handleMonthSelected = (month: string) => {
        try {
            const parseMonth = Number(month);
            setMonthSelected(parseMonth);
        } catch {
            throw new Error('Mes selecionado é invalido')
        }

    }

    const handleYearSelected = (year: string) => {
        try {
            const parseYear = Number(year);
            setYearSelected(parseYear);
        } catch {
            throw new Error('Ano selecionado é invalido')
        }

    }


    useEffect(() => {
        const { data } = pageData;

        const filterDate = data.filter(item => {
            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            return month === monthSelected && year === yearSelected && frequecyFilterSelected.includes(item.frequency)
        });

        const dataFormated = filterDate.map(item => {
            return {
                id: createID(),
                description: item.description,
                amountFormated: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFromated: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',

            }
        });
        setData(dataFormated);
    }, [pageData, monthSelected, yearSelected, data.length, frequecyFilterSelected]);

    return (
        <Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput
                    key={createID()}
                    options={months}
                    onChange={(e) => handleMonthSelected(e.target.value)}
                    defaultValue={monthSelected} />
                <SelectInput
                    key={createID()}
                    options={years}
                    onChange={(e) => handleYearSelected(e.target.value)}
                    defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${frequecyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorentes
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${frequecyFilterSelected.includes('eventual') && 'tag-actived'}`}
                    onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>

            </Filters>

            <Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFromated}
                            amount={item.amountFormated}
                        />
                    ))
                }
            </Content>
        </Container >
    );

}

export default List;