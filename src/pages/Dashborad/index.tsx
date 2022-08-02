import React from "react";
import { Container } from "./styles";
import ContentHeader from "../../components/ContentHeader";
import SelectInput from "../../components/SelectInput";


const Dashboard: React.FC = () => {

    const options = [
        { value: 'Itamar 01', label: 'Itamar 01' },
        { value: 'Itamar 02', label: 'Itamar 02' },
        { value: 'Itamar 03', label: 'Itamar 03' },

    ]


    return (
        <div>
            <Container>
                <ContentHeader title="Dashboard" lineColor="#000055">
                    <SelectInput options={options} onChange={() => {}}/>
                </ContentHeader>
            </Container>
        </div>
    );

}

export default Dashboard;