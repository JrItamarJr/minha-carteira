import React, { useMemo, useState, useEffect } from "react";

import { Container, Content, Filters } from "./styles";

import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";
import HistoryFinanceCard from "../../components/HistoryFinanceCard";
import { useParams } from 'react-router-dom';

import gains from "../../repositories/gains";
import expenses from "../../repositories/expenses";
import listMonths from "../../utils/months";
import formatCurrency from "../../utils/formatCurrency";
import formatDate from '../../utils/formatDate';



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
    const [montSelected, setMontSelected] = useState<string>(String(new Date().getMonth() + 1));
    const [yearSelected, setYearSelected] = useState<string>(String(new Date().getFullYear));
    const [selectedFrequency, setSelectedFrequency] = useState(['recorrente', 'eventual']);

    function uid() {
        let a = new Uint32Array(3);
        window.crypto.getRandomValues(a);
        return (performance.now().toString(36) + Array.from(a).map(A => A.toString(36)).join("")).replace(/\./g, "");
    };

    const { type } = useParams();

    const title = useMemo(() => {
        return type === 'entry-balance' ? 'Entradas' : 'Saídas'
    }, [type]);

    const lineColor = useMemo(() => {
        return type === 'entry-balance' ? '#F7931B' : '#E44C4E'
    }, [type]);

    const listData = useMemo(() => {
        return type === 'entry-balance' ? gains : expenses;
    }, []);

    const years = useMemo(() => {

        let uniqeYears: number[] = [];

        listData.forEach(item => {

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

    }, [listData]);

    const months = useMemo(() => {
        return listMonths.map((month, index) => {
            return {
                value: index + 1,
                label: month,
            }
        });

    }, []);

    const handleFrequencyClick = (frequency: string) => {
        const alreadySelected = selectedFrequency.findIndex(item => item === frequency);

        if (alreadySelected >= 0) {
            const filtered = selectedFrequency.filter(item => item !== frequency);
            setSelectedFrequency(filtered);
        } else {
            setSelectedFrequency((prev) => [...prev, frequency]);

        }
    }

    useEffect(() => {
        const filterDate = listData.filter(item => {
            const date = new Date(item.date);
            const month = String(date.getMonth() + 1);
            const year = String(date.getFullYear());

            return month === montSelected && year === yearSelected && selectedFrequency.includes(item.frequency)
        });

        const dataFormated = filterDate.map(item => {
            return {
                id: uid(),
                description: item.description,
                amountFormated: formatCurrency(Number(item.amount)),
                frequency: item.frequency,
                dateFromated: formatDate(item.date),
                tagColor: item.frequency === 'recorrente' ? '#4E41F0' : '#E44C4E',

            }
        });
        setData(dataFormated);
    }, [listData, montSelected, yearSelected, data.length, selectedFrequency]);


    return (
        <Container>
            <ContentHeader title={title} lineColor={lineColor}>
                <SelectInput options={months}
                    onChange={(e) => setMontSelected(e.target.value)}
                    defaultValue={montSelected} />
                <SelectInput options={years}
                    onChange={(e) => setYearSelected(e.target.value)}
                    defaultValue={yearSelected} />
            </ContentHeader>

            <Filters>
                <button
                    type="button"
                    className={`tag-filter tag-filter-recurrent
                    ${selectedFrequency.includes('recorrente') && 'tag-actived' }`}
                    onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorentes
                </button>
                <button
                    type="button"
                    className={`tag-filter tag-filter-eventual
                    ${selectedFrequency.includes('eventual') && 'tag-actived' }`}
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