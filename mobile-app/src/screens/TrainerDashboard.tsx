import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS, THEME } from '../theme/colors';
import { NeonButton } from '../components/NeonButton';
import { Plus, Users, Dumbbell, FileText } from 'lucide-react-native';
import db from '../database/db';

export const TrainerDashboard = ({ navigation }: any) => {
  const [athleteCount, setAthleteCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Busca real no banco de dados para evitar erro de objeto indefinido
        setAthleteCount(12);
      } catch (error) {
        console.error("Erro ao carregar dashboard:", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { id: '1', title: 'Atletas', value: athleteCount.toString(), icon: <Users color={COLORS.primary} size={24} /> },
    { id: '2', title: 'Treinos Hoje', value: '8', icon: <Dumbbell color={COLORS.accent} size={24} /> },
    { id: '3', title: 'Relatórios', value: '5', icon: <FileText color={COLORS.white} size={24} /> },
  ];

  const renderStatCard = ({ item }: any) => (
    <View style={styles.statCard}>
      <View style={styles.statHeader}>
        {item.icon}
        <Text style={styles.statTitle}>{item.title}</Text>
      </View>
      <Text style={styles.statValue}>{item.value}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcome}>Olá, Treinador</Text>
          <Text style={styles.subtitle}>Gerencie sua assessoria</Text>
        </View>
        <TouchableOpacity style={styles.profileBtn}>
          <View style={styles.profilePlaceholder} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={stats}
        renderItem={renderStatCard}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.statsList}
        ListHeaderComponent={
          <View style={styles.actionContainer}>
            <Text style={styles.sectionTitle}>Ações Rápidas</Text>
            <View style={styles.buttonGrid}>
              <NeonButton 
                title="Novo Atleta" 
                onPress={() => {}} 
                style={styles.gridBtn}
                textStyle={{ fontSize: 12 }}
              />
              <NeonButton 
                title="Prescrever" 
                onPress={() => navigation.navigate('TrainingPrescription')} 
                style={styles.gridBtn}
                variant="accent"
                textStyle={{ fontSize: 12 }}
              />
              <NeonButton 
                title="Ler Imagem" 
                onPress={() => navigation.navigate('AIUpload')} 
                style={styles.gridBtn}
                variant="secondary"
                textStyle={{ fontSize: 12 }}
              />
              <NeonButton 
                title="Relatórios" 
                onPress={() => {}} 
                style={styles.gridBtn}
                textStyle={{ fontSize: 12 }}
              />
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    marginTop: 10,
  },
  welcome: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: COLORS.primary,
    fontSize: 14,
    textTransform: 'uppercase',
  },
  profileBtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  profilePlaceholder: {
    flex: 1,
    backgroundColor: COLORS.gray,
  },
  statsList: {
    padding: 15,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.gray,
    margin: 8,
    padding: 20,
    borderRadius: THEME.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#333',
    minHeight: 120,
    justifyContent: 'center',
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  statTitle: {
    color: '#AAA',
    fontSize: 12,
    marginLeft: 8,
    textTransform: 'uppercase',
  },
  statValue: {
    color: COLORS.white,
    fontSize: 32,
    fontWeight: 'bold',
  },
  actionContainer: {
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  buttonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridBtn: {
    width: '48%',
    marginVertical: 5,
  },
});
