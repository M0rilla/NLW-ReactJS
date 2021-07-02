import { createContext, ReactNode, useEffect, useState } from 'react';

type Theme = 'light' | 'dark'

type ThemeContextProviderProps = {
  children: ReactNode;
}

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextType);
// sempre passamos o tipo para definir os atributos sempre que importamos algo ou temos um hook

export function ThemeContextProvider(props: ThemeContextProviderProps) {

  const [currentTheme, setCurrentTheme] = useState<Theme>(()=>{
    const storedTheme = localStorage.getItem('theme')

    return (storedTheme ?? 'light') as Theme;
  });
  /* poderíamos só adicionar 'light' para o useState, mas usamos o local storage
    para armazenar o tema da aplicação com useEffect */

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
  },[currentTheme])

  function toggleTheme() {
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  }

  return(
  <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
    {props.children}
  </ThemeContext.Provider>
  )};