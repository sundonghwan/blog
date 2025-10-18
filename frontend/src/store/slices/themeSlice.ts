import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  mode : 'light' | 'dark';
}

const getInitialTheme = (): 'light' | 'dark' => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark' || savedTheme === 'light') {
    return savedTheme
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
}

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme(state) {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', state.mode);
        }
    }
})

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
