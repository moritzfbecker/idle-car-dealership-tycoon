/**
 * Offline Earnings Modal
 * Shows earnings collected while away
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from './Modal';
import Button from '@components/common/Button';
import { formatCurrency } from '@utils/currency';
import { OfflineEarningsData } from '@hooks/useOfflineEarnings';

interface OfflineEarningsModalProps {
  visible: boolean;
  onClose: () => void;
  data: OfflineEarningsData | null;
}

export default function OfflineEarningsModal({
  visible,
  onClose,
  data,
}: OfflineEarningsModalProps) {
  if (!data) return null;

  return (
    <Modal visible={visible} onClose={onClose}>
      <View style={styles.container}>
        <Text style={styles.emoji}>💰</Text>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          You were away for {data.formattedTime}
        </Text>

        <View style={styles.earningsBox}>
          <Text style={styles.earningsLabel}>Offline Earnings</Text>
          <Text style={styles.earningsAmount}>
            {formatCurrency(data.earnings)}
          </Text>
        </View>

        {data.cappedAtMax && (
          <Text style={styles.capWarning}>
            ⚠️ Reached 4-hour offline earnings cap
          </Text>
        )}

        <Button
          title="Collect"
          onPress={onClose}
          variant="success"
          fullWidth
          style={styles.button}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 24,
  },
  earningsBox: {
    backgroundColor: '#1a3a1a',
    padding: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  earningsLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  earningsAmount: {
    color: '#4CAF50',
    fontSize: 32,
    fontWeight: '700',
  },
  capWarning: {
    color: '#FF9800',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
