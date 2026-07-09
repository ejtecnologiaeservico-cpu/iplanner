export const COLORS = {
  primary: '#B026FF', // Lilás Neon
  secondary: '#2B0038', // Roxo Escuro
  background: '#0A0A0A', // Preto
  accent: '#00E5FF', // Azul Neon
  white: '#FFFFFF',
  ice: '#F0F0F0',
  gray: '#2A2A2A',
  text: '#FFFFFF',
  error: '#FF3B30',
  success: '#4CD964',
};

export const THEME = {
  colors: COLORS,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  shadows: {
    neon: {
      shadowColor: COLORS.primary,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 10,
    },
    neonBlue: {
      shadowColor: COLORS.accent,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.8,
      shadowRadius: 10,
      elevation: 10,
    }
  }
};
