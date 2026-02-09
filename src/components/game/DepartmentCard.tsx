/**
 * Department Card Component
 * Displays department info and allows tapping to upgrade
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Department } from '@types/game.types';
import Card from '@components/common/Card';
import { formatRevenuePerSecond } from '@utils/currency';

interface DepartmentCardProps {
  department: Department;
  onPress: () => void;
}

export default function DepartmentCard({
  department,
  onPress,
}: DepartmentCardProps) {
  if (!department.isUnlocked) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Card style={styles.card}>
          <View style={styles.locked}>
            <Text style={styles.lockedIcon}>🔒</Text>
            <Text style={styles.lockedText}>{department.name}</Text>
            <Text style={styles.lockedSubtext}>Tap to Unlock</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.name}>{department.name}</Text>
          <Text style={styles.level}>Lv. {department.level}</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Capacity</Text>
            <Text style={styles.statValue}>{department.capacity}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Quality</Text>
            <Text style={styles.statValue}>{department.quality}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Staff</Text>
            <Text style={styles.statValue}>{department.staff.length}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.revenue}>
            {formatRevenuePerSecond(department.revenuePerSecond)}
          </Text>
          {department.activeCustomers.length > 0 && (
            <Text style={styles.customers}>
              👥 {department.activeCustomers.length}
            </Text>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  level: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    color: '#999',
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  revenue: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  customers: {
    color: '#2196F3',
    fontSize: 14,
  },
  locked: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  lockedIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  lockedText: {
    color: '#999',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  lockedSubtext: {
    color: '#666',
    fontSize: 12,
  },
});
