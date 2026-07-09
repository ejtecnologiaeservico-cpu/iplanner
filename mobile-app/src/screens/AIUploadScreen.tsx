import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS, THEME } from '../theme/colors';
import { NeonButton } from '../components/NeonButton';
import { transcribeImage } from '../services/aiService';
import { Camera, FileUp, CheckCircle } from 'lucide-react-native';

export const AIUploadScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      processImage(result.assets[0].base64 || '');
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      processImage(result.assets[0].base64 || '');
    }
  };

  const processImage = async (base64: string) => {
    setLoading(true);
    try {
      const data = await transcribeImage(base64);
      setResult(data);
      Alert.alert("Sucesso", "Dados extraídos com sucesso via IA!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível ler a imagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Transcrição IA</Text>
        <Text style={styles.description}>
          Faça upload de uma foto da planilha ou exame para converter em dados digitais.
        </Text>

        <View style={styles.imagePreview}>
          {image ? (
            <Image source={{ uri: image }} style={styles.preview} />
          ) : (
            <View style={styles.placeholder}>
              <FileUp color={COLORS.gray} size={60} />
              <Text style={styles.placeholderText}>Nenhuma imagem selecionada</Text>
            </View>
          )}
        </View>

        <View style={styles.btnRow}>
          <NeonButton 
            title="Câmera" 
            onPress={takePhoto} 
            style={styles.actionBtn}
            variant="accent"
          />
          <NeonButton 
            title="Galeria" 
            onPress={pickImage} 
            style={styles.actionBtn}
          />
        </View>

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.loadingText}>IA Processando Imagem...</Text>
          </View>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <View style={styles.resultHeader}>
              <CheckCircle color={COLORS.success} size={20} />
              <Text style={styles.resultTitle}>Dados Extraídos</Text>
            </View>
            <View style={styles.resultCard}>
              <Text style={styles.resultLabel}>Atleta: <Text style={styles.resultValue}>{result.nome_atleta || 'N/A'}</Text></Text>
              <Text style={styles.resultLabel}>Data: <Text style={styles.resultValue}>{result.data || 'N/A'}</Text></Text>
              
              <Text style={[styles.resultLabel, { marginTop: 10 }]}>Exercícios Detectados:</Text>
              {result.exercicios?.map((ex: any, index: number) => (
                <View key={index} style={styles.exerciseItem}>
                  <Text style={styles.exerciseName}>{ex.nome}</Text>
                  <Text style={styles.exerciseDetail}>{ex.series}x{ex.repeticoes} - {ex.intensidade}</Text>
                </View>
              ))}
            </View>
            
            <NeonButton 
              title="Salvar na Planilha" 
              onPress={() => {}} 
              variant="accent"
              style={{ marginTop: 20 }}
            />
          </View>
        )}
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
    marginBottom: 10,
  },
  description: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 30,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: THEME.borderRadius.lg,
    backgroundColor: COLORS.gray,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#333',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: '#555',
    marginTop: 10,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    width: '48%',
  },
  loadingContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.primary,
    marginTop: 10,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    paddingBottom: 40,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  resultCard: {
    backgroundColor: COLORS.gray,
    padding: 20,
    borderRadius: THEME.borderRadius.lg,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  resultLabel: {
    color: '#AAA',
    fontSize: 14,
    marginBottom: 5,
  },
  resultValue: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  exerciseItem: {
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  exerciseName: {
    color: COLORS.accent,
    fontWeight: 'bold',
    fontSize: 14,
  },
  exerciseDetail: {
    color: COLORS.white,
    fontSize: 12,
  },
});
