import React, { createContext, useState, useContext } from "react";

import dark from "../styles/Themes/dark";
import ligth from "../styles/Themes/ligth";

interface iThemeContext {
    toggleTheme(): void;
    theme: ITheme;
}

interface ITheme {
    title: string;
    colors: {
        primary: string,
        secondary: string,
        tertiary: string,

        white: string,
        black: string,
        gray: string,

        sucess: string,
        info: string,
        warning: string,
    },
}

type Props = {
    children?: React.ReactNode
};

export const ThemeContext = createContext<iThemeContext>({} as iThemeContext);

const ThemeProvider: React.FC<Props> = ({ children }) => {
    
    const [theme, setTheme] = useState<ITheme>(() => {

        const themeSaved = localStorage.getItem('@minha-carteira:theme')

        if (themeSaved) {
            return JSON.parse(themeSaved)
        } else {
            return dark;
        }
    });

    const toggleTheme = () => {
        if (theme.title === 'dark') {
            setTheme(ligth);
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(ligth));
        } else {
            setTheme(dark);
            localStorage.setItem('@minha-carteira:theme', JSON.stringify(dark));
        }
    };
    return (
        <ThemeContext.Provider value={{ toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

function useTheme(): iThemeContext {
    const context = useContext(ThemeContext);

    return context;
}

export { ThemeProvider, useTheme };