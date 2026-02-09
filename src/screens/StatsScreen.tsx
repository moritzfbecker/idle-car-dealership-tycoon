/**
 * Stats Screen
 * Player statistics and achievements
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useGameStore } from '@store/gameStore';
import Card from '@components/common/Card';
import { formatCurrency, formatTime } from '@utils/currency';

export default function StatsScreen() {
  const statistics = useGameStore((state) => state.statistics);
  const currentCity = useGameStore((state) => state.currentCity);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>📊 Statistics</Text>

        <Card style={styles.card}>
          <Text style={styles.cardTitle}>General Stats</Text>

          <StatRow
            label="Total Earnings"
            value={formatCurrency(statistics.totalEarningsAllTime)}
          />
          <StatRow
            label="Customers Served"
            value={statistics.customersServedTotal.toString()}
          />
          <StatRow
            label="Play Time"
            value={formatTime(statistics.totalPlayTime)}
          />
          <StatRow
            label="Departments Unlocked"
            value={statistics.departmentsUnlocked.toString()}
          />
          <StatRow label="Current City" value={`City ${currentCity}`} />
          <StatRow
            label="Highest City"
            value={`City ${statistics.highestCity}`}
          />
          <StatRow
            label="Times Prestiged"
            value={statistics.prestigeCount.toString()}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statRow}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  content: {
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    marginBottom: 16,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  statLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  statValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
