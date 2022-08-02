import React, { ReactNode } from "react";
import { Container } from "./styles";

interface iSelectInputProps {
    options: {
        value: string | number;
        label: string | number;
    }[],

    onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string | number;
}


type Props = {
    children?: React.ReactNode
};

const SelectInput: React.FC<iSelectInputProps> = ({ options, onChange, defaultValue }) => {
    return (
        <Container>
            <select onChange={onChange} defaultValue={defaultValue} >
                {
                    options.map(option => (

                        <option value={option.value}>{option.label} </option>
                    ))
                }
            </select>
        </Container>
    );

}

export default SelectInput;