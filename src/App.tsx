import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Routes from './routes';
import dark from './styles/Themes/dark';
import ligth from './styles/Themes/ligth';

const App: React.FC = () => {
    return (
        <ThemeProvider theme={dark}>
            <GlobalStyles />
            <Routes />
        </ThemeProvider>
    );
}

export default App;
