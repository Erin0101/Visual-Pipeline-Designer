import { create } from 'zustand';

export const useThemeStore = create((set) => ({
  theme: 
    typeof window !== 'undefined' && localStorage.getItem('appTheme')
      ? localStorage.getItem('appTheme')
      : 'dark',

  setTheme: (newTheme) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('appTheme', newTheme);
    }
    set({ theme: newTheme });
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('appTheme', newTheme);
      }
      return { theme: newTheme };
    });
  },
}));
