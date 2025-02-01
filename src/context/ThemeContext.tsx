'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme } from "@radix-ui/themes";
import useMediaQuery from '@/hook/useMediaQuery';

type ThemeType = 'inherit' | 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (newTheme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = useState<ThemeType>('inherit');
    const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

    useEffect(() => {
        const storedTheme = window.localStorage.getItem('x-theme') as ThemeType;
        if (storedTheme && ['inherit', 'light', 'dark'].includes(storedTheme)) {
            setTheme(storedTheme);
        } else if (prefersDark) {
            setTheme('dark');
        }
    }, [prefersDark]);

    useEffect(() => {
        if (theme === 'dark' || (theme === 'inherit' && prefersDark)) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme, prefersDark]);

    const changeTheme = (newTheme: ThemeType) => {
        setTheme(newTheme);
        if (newTheme !== 'inherit') {
            window.localStorage.setItem('x-theme', newTheme);
        } else {
            window.localStorage.removeItem('x-theme');
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
            <Theme appearance={theme}>{children}</Theme>
        </ThemeContext.Provider>
    );
};

export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
