'use client'

import type { Theme } from '@/providers/Theme/types'

import React, { createContext, useCallback, use, useState, useEffect } from 'react'

import { themeLocalStorageKey } from '../Theme/ThemeSelector/types'

export interface ContextType {
  headerTheme?: Theme | null
  setHeaderTheme: (theme: Theme | null) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const preference = window.localStorage.getItem(themeLocalStorageKey)
    setThemeState(preference as Theme | 'light')
  }, [])
  const [headerTheme, setThemeState] = useState<Theme | undefined | null>(null)

  const setHeaderTheme = useCallback((themeToSet: Theme | null) => {
    setThemeState(themeToSet)
  }, [])

  return <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>{children}</HeaderThemeContext>
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
