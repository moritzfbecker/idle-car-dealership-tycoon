/**
 * Currency Display Component
 * Shows cash and gems with icons
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatCurrency, formatGems } from '@utils/currency';

interface CurrencyDisplayProps {
  cash: number;
  gems: number;
  showBoth?: boolean;
  large?: boolean;
}

export default function CurrencyDisplay({
  cash,
  gems,
  showBoth = true,
  large = false,
}: CurrencyDisplayProps) {
  return (
    <View style={styles.container}>
      {/* Cash */}
      <View style={styles.currencyItem}>
        <Text style={[styles.icon, large && styles.iconLarge]}>💵</Text>
        <Text style={[styles.amount, large && styles.amountLarge]}>
          {formatCurrency(cash)}
        </Text>
      </View>

      {/* Gems */}
      {showBoth && (
        <View style={[styles.currencyItem, styles.gems]}>
          <Text style={[styles.icon, large && styles.iconLarge]}>💎</Text>
          <Text style={[styles.amount, large && styles.amountLarge]}>
            {formatGems(gems)}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 10,
  },
  gems: {
    backgroundColor: '#2a1a3a',
  },
  icon: {
    fontSize: 16,
    marginRight: 6,
  },
  iconLarge: {
    fontSize: 20,
  },
  amount: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  amountLarge: {
    fontSize: 18,
  },
});
