import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { TrainerDashboard } from '../screens/TrainerDashboard';
import { AIUploadScreen } from '../screens/AIUploadScreen';
import { TrainingPrescriptionScreen } from '../screens/TrainingPrescriptionScreen';
import { COLORS } from '../theme/colors';
import { View } from 'react-native';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        cardStyle: { backgroundColor: COLORS.background },
        detachPreviousScreen: false, // Ajuda na estabilidade do Android
      }}
    >
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="TrainerDashboard" 
        component={TrainerDashboard} 
        options={{ 
          title: 'DASHBOARD',
          headerLeft: () => null, 
        }}
      />
      <Stack.Screen 
        name="AIUpload" 
        component={AIUploadScreen} 
        options={{ title: 'TRANSCRIÇÃO IA' }}
      />
      <Stack.Screen 
        name="TrainingPrescription" 
        component={TrainingPrescriptionScreen} 
        options={{ title: 'PRESCREVER TREINO' }}
      />
    </Stack.Navigator>
  );
};
