'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type ThemeMode = 'light' | 'dark'

interface ThemeContextType {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  setTheme: () => {},
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('image-theme') as ThemeMode | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme = saved === 'light' || saved === 'dark' ? saved : prefersDark ? 'dark' : 'light'

    setThemeState(nextTheme)
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('image-theme', theme)
  }, [mounted, theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme: setThemeState }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
