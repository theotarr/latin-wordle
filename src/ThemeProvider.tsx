import React, { useEffect, createContext, useState } from 'react'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('current-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
  }
  return 'light'
}

export type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: getInitialTheme(),
  setTheme: () => {},
})

interface Props {
  initialTheme?: string
  children: React.ReactNode
}

export const ThemeProvider = ({ initialTheme, children }: Props) => {
  const [theme, setTheme] = useState(getInitialTheme)

  const checkTheme = (existing: string) => {
    const root = window.document.documentElement
    const isDark = existing === 'dark'

    root.classList.remove(isDark ? 'light' : 'dark')
    root.classList.add(existing)

    localStorage.setItem('current-theme', existing)
  }

  if (initialTheme) {
    checkTheme(initialTheme)
  }

  useEffect(() => {
    checkTheme(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
