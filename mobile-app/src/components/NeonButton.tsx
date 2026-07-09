import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { COLORS, THEME } from '../theme/colors';

interface NeonButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'accent';
  loading?: boolean;
  disabled?: boolean;
}

export const NeonButton: React.FC<NeonButtonProps> = ({ 
  title, 
  onPress, 
  style, 
  textStyle,
  variant = 'primary',
  loading = false,
  disabled = false
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'accent':
        return { borderColor: COLORS.accent, ...THEME.shadows.neonBlue };
      case 'secondary':
        return { borderColor: COLORS.secondary, shadowColor: COLORS.secondary };
      default:
        return { borderColor: COLORS.primary, ...THEME.shadows.neon };
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.button, getVariantStyle(), style, (disabled || loading) && styles.disabled]} 
      onPress={() => {
        if (onPress && !loading && !disabled) {
          onPress();
        }
      }}
      activeOpacity={0.7}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={COLORS.white} />
      ) : (
        <Text style={[styles.text, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
  },
});
