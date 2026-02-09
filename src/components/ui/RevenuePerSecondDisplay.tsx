/**
 * Revenue Per Second Display
 * Shows current revenue rate with animation
 */

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatRevenuePerSecond } from '@utils/currency';

interface RevenuePerSecondDisplayProps {
  revenuePerSecond: number;
}

export default function RevenuePerSecondDisplay({
  revenuePerSecond,
}: RevenuePerSecondDisplayProps) {
  const [displayRevenue, setDisplayRevenue] = useState(revenuePerSecond);

  useEffect(() => {
    // Animate revenue changes smoothly
    const interval = setInterval(() => {
      setDisplayRevenue((prev) => {
        const diff = revenuePerSecond - prev;
        if (Math.abs(diff) < 0.1) {
          return revenuePerSecond;
        }
        return prev + diff * 0.1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [revenuePerSecond]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Revenue:</Text>
      <Text style={styles.value}>{formatRevenuePerSecond(displayRevenue)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a3a1a',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  label: {
    color: '#aaa',
    fontSize: 12,
    marginRight: 8,
  },
  value: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '700',
  },
});
