import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { COLORS, THEME } from '../theme/colors';
import { NeonButton } from '../components/NeonButton';
import { generateWorkoutPDF } from '../services/pdfService';
import { Save, FileText } from 'lucide-react-native';

export const TrainingPrescriptionScreen = () => {
  const [athleteName, setAthleteName] = useState('');
  const [exercises, setExercises] = useState([
    { exercise: 'Corrida Leve', sets: '1', reps: '30 min', intensity: 'Z2' },
    { exercise: 'Intervalado', sets: '8', reps: '400m', intensity: 'Z4' },
  ]);

  const handleExportPDF = async () => {
    try {
      await generateWorkoutPDF({ name: athleteName || 'Atleta Exemplo' }, exercises);
      Alert.alert("Sucesso", "PDF gerado e pronto para compartilhar!");
    } catch (error) {
      Alert.alert("Erro", "Falha ao gerar o PDF.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Prescrever Treino</Text>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome do Atleta</Text>
          <TextInput 
            style={styles.input}
            value={athleteName}
            onChangeText={setAthleteName}
            placeholder="Digite o nome..."
            placeholderTextColor="#555"
          />
        </View>

        <View style={styles.exerciseSection}>
          <Text style={styles.sectionTitle}>Planilha de Exercícios</Text>
          {exercises.map((item, index) => (
            <View key={index} style={styles.exerciseCard}>
              <Text style={styles.exerciseName}>{item.exercise}</Text>
              <View style={styles.exerciseDetails}>
                <Text style={styles.detailText}>{item.sets} Séries</Text>
                <Text style={styles.detailText}>{item.reps}</Text>
                <Text style={[styles.detailText, { color: COLORS.accent }]}>{item.intensity}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <NeonButton 
            title="Salvar Treino" 
            onPress={() => Alert.alert("Salvo", "Treino salvo localmente (Offline).")} 
            style={styles.btn}
          />
          <NeonButton 
            title="Exportar PDF" 
            onPress={handleExportPDF} 
            variant="accent"
            style={styles.btn}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: 20,
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    color: COLORS.primary,
    fontSize: 14,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: COLORS.gray,
    color: COLORS.white,
    padding: 15,
    borderRadius: THEME.borderRadius.md,
    borderWidth: 1,
    borderColor: '#333',
  },
  exerciseSection: {
    marginTop: 10,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  exerciseCard: {
    backgroundColor: COLORS.gray,
    padding: 15,
    borderRadius: THEME.borderRadius.lg,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
  },
  exerciseName: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    color: '#AAA',
    fontSize: 13,
  },
  actions: {
    marginTop: 30,
    paddingBottom: 40,
  },
  btn: {
    marginBottom: 15,
  },
});
