import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Image, KeyboardAvoidingView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { COLORS, THEME } from '../theme/colors';
import { NeonButton } from '../components/NeonButton';
import { StatusBar } from 'expo-status-bar';
import { authenticateTrainer, Trainer } from '../database/db';

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Erro', 'Por favor, preencha e-mail e senha.');
      return;
    }

    setIsLoading(true);
    try {
      const trainer = await authenticateTrainer(email.trim(), password.trim());
      
      if (trainer) {
        if (navigation) {
          navigation.navigate('TrainerDashboard', { trainer });
        } else {
          Alert.alert('Erro', 'Sistema de navegação não encontrado');
        }
      } else {
        Alert.alert('Acesso Negado', 'Usuário ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao autenticar:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar entrar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar Senha', 'Um link de recuperação será enviado para o seu e-mail.');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <StatusBar style="light" />
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          {/* Espaço para a logo */}
          <View style={styles.logoPlaceholder}>
             <Text style={styles.logoText}>iRunner</Text>
          </View>
        </View>

        <Text style={styles.title}>Acesso Restrito</Text>
        <Text style={styles.subtitle}>Painel do Treinador</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#888"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <NeonButton 
          title="Entrar" 
          onPress={handleLogin} 
          style={styles.loginBtn}
          loading={isLoading}
          disabled={isLoading}
        />

        <TouchableOpacity 
          style={styles.forgotPass}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPassText}>Esqueceu a senha?</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...THEME.shadows.neon,
  },
  logoText: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  title: {
    color: COLORS.white,
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: COLORS.gray,
    color: COLORS.white,
    padding: 15,
    borderRadius: THEME.borderRadius.md,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
  },
  loginBtn: {
    width: '100%',
    marginTop: 10,
  },
  forgotPass: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPassText: {
    color: '#888',
    fontSize: 14,
  },
});
