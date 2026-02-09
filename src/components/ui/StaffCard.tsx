/**
 * Staff Card Component
 * Shows staff member info or hire button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Staff } from '@types/game.types';
import { formatCurrency } from '@utils/currency';

interface StaffCardProps {
  staff?: Staff;
  hireCost?: number;
  onHire?: () => void;
  canAfford?: boolean;
}

export default function StaffCard({
  staff,
  hireCost,
  onHire,
  canAfford,
}: StaffCardProps) {
  // If staff exists, show staff info
  if (staff) {
    return (
      <View style={styles.container}>
        <View style={styles.info}>
          <Text style={styles.icon}>👤</Text>
          <View style={styles.details}>
            <Text style={styles.role}>{staff.role}</Text>
            <Text style={styles.efficiency}>
              Efficiency: {staff.efficiency.toFixed(1)}x
            </Text>
          </View>
        </View>
        <Text style={styles.level}>Lv. {staff.level}</Text>
      </View>
    );
  }

  // Otherwise, show hire button
  return (
    <TouchableOpacity
      style={[styles.container, styles.hireContainer, !canAfford && styles.disabled]}
      onPress={onHire}
      disabled={!canAfford}
      activeOpacity={0.7}
    >
      <View style={styles.hireInfo}>
        <Text style={styles.hireIcon}>➕</Text>
        <Text style={styles.hireText}>Hire Staff</Text>
      </View>
      <Text style={[styles.cost, !canAfford && styles.cantAfford]}>
        {formatCurrency(hireCost || 0)}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hireContainer: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    borderStyle: 'dashed',
  },
  disabled: {
    opacity: 0.5,
    borderColor: '#666',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  role: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  efficiency: {
    color: '#aaa',
    fontSize: 12,
  },
  level: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  hireInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hireIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  hireText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cost: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
  },
  cantAfford: {
    color: '#F44336',
  },
});
