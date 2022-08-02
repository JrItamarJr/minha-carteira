import React from "react";
import { Container, ToggleLabel, ToggleSelector } from "./styles";


const Toggle: React.FC = () => (
    <Container>
        <ToggleLabel>Ligth</ToggleLabel>
        <ToggleSelector
            checked={true}
            onChange={() => console.log('Mudou')}
            uncheckedIcon={false}
            checkedIcon={false}

        />
        <ToggleLabel>Dark</ToggleLabel>
    </Container>
)

export default Toggle;