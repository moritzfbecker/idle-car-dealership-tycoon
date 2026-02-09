/**
 * Upgrade Button Component
 * Shows upgrade info and purchase button
 */

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { formatCurrency } from '@utils/currency';

interface UpgradeButtonProps {
  title: string;
  description: string;
  currentLevel: number;
  cost: number;
  onPress: () => void;
  canAfford: boolean;
  disabled?: boolean;
}

export default function UpgradeButton({
  title,
  description,
  currentLevel,
  cost,
  onPress,
  canAfford,
  disabled = false,
}: UpgradeButtonProps) {
  const isDisabled = disabled || !canAfford;

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isDisabled && styles.disabled,
      ]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <View style={styles.info}>
        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.level}>Lv. {currentLevel}</Text>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>

      <View style={styles.action}>
        <Text style={[styles.cost, !canAfford && styles.cantAfford]}>
          {formatCurrency(cost)}
        </Text>
        <View style={[styles.button, !canAfford && styles.buttonDisabled]}>
          <Text style={styles.buttonText}>
            {canAfford ? 'UPGRADE' : 'LOCKED'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
  info: {
    flex: 1,
    marginRight: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  level: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    color: '#aaa',
    fontSize: 12,
  },
  action: {
    alignItems: 'flex-end',
  },
  cost: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  cantAfford: {
    color: '#F44336',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonDisabled: {
    backgroundColor: '#424242',
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
});
