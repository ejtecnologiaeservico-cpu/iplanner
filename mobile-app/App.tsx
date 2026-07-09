import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import { View, ActivityIndicator, LogBox, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { StatusBar } from 'expo-status-bar';
import { initDatabase } from './src/database/db';
import { COLORS } from './src/theme/colors';
import * as SplashScreen from 'expo-splash-screen';

// Ignorar avisos irrelevantes que podem causar lentidão
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);

// Manter a splash screen visível enquanto inicializamos
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('Starting app initialization...');
        await initDatabase();
        console.log('Database initialized successfully');
      } catch (e: any) {
        console.error('Initialization error:', e);
        setError(e.message || 'Erro ao inicializar banco de dados');
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      console.log('App is ready, hiding splash screen');
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null; 
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorTitle}>Erro de Inicialização</Text>
        <Text style={styles.errorText}>{error}</Text>
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorTitle: {
    color: '#B026FF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    color: '#FFF',
    textAlign: 'center',
  },
});
