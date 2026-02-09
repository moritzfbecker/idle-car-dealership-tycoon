/**
 * Prestige Modal
 * Shows city progression and prestige options
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGameStore } from '@store/gameStore';
import { PrestigeManager } from '@game/managers/PrestigeManager';
import Modal from './Modal';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import ProgressBar from '@components/common/ProgressBar';
import { formatCurrency } from '@utils/currency';

interface PrestigeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PrestigeModal({ visible, onClose }: PrestigeModalProps) {
  const cash = useGameStore((state) => state.cash);
  const currentCity = useGameStore((state) => state.currentCity);
  const prestigeMultiplier = useGameStore((state) => state.prestigeMultiplier);
  const prestige = useGameStore((state) => state.prestige);

  const prestigeManager = new PrestigeManager();
  const nextCity = prestigeManager.getNextCity(currentCity);
  const canPrestige = nextCity && prestigeManager.canPrestige(cash, nextCity.id);
  const progress = nextCity
    ? prestigeManager.getProgressToNextCity(cash, currentCity)
    : 100;

  const handlePrestige = () => {
    if (nextCity && canPrestige) {
      // Confirm prestige
      prestige(nextCity.id);
      onClose();
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} title="🌆 City Progression">
      <ScrollView>
        {/* Current City */}
        <Card style={styles.currentCityCard}>
          <Text style={styles.label}>Current City</Text>
          <Text style={styles.cityName}>
            {prestigeManager.getCity(currentCity)?.name}
          </Text>
          <Text style={styles.multiplier}>
            {prestigeMultiplier}x Revenue Multiplier
          </Text>
        </Card>

        {/* Progress to Next City */}
        {nextCity ? (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Progress to {nextCity.name}</Text>
              <ProgressBar progress={progress} showLabel />
              <Text style={styles.progressText}>
                {formatCurrency(cash)} / {formatCurrency(nextCity.unlockCost)}
              </Text>
            </View>

            {/* Next City Info */}
            <Card style={styles.nextCityCard}>
              <Text style={styles.nextCityLabel}>Next City</Text>
              <Text style={styles.nextCityName}>{nextCity.name}</Text>
              <Text style={styles.nextMultiplier}>
                {nextCity.prestigeMultiplier}x Revenue Multiplier
              </Text>

              <View style={styles.infoBox}>
                <Text style={styles.infoText}>⚠️ Moving to a new city will:</Text>
                <Text style={styles.infoItem}>• Reset all departments</Text>
                <Text style={styles.infoItem}>• Reset all staff</Text>
                <Text style={styles.infoItem}>• Reset cash to $1,000</Text>
                <Text style={styles.infoItem}>
                  ✅ Keep permanent multiplier ({nextCity.prestigeMultiplier}x)
                </Text>
                <Text style={styles.infoItem}>✅ Keep gems</Text>
                <Text style={styles.infoItem}>✅ Keep epic upgrades</Text>
              </View>

              <Button
                title={canPrestige ? `Move to ${nextCity.name}` : 'Not Enough Cash'}
                onPress={handlePrestige}
                disabled={!canPrestige}
                variant={canPrestige ? 'warning' : 'secondary'}
                fullWidth
                style={styles.prestigeButton}
              />
            </Card>
          </>
        ) : (
          <Card style={styles.maxCityCard}>
            <Text style={styles.maxCityText}>🏆</Text>
            <Text style={styles.maxCityTitle}>Maximum City Reached!</Text>
            <Text style={styles.maxCitySubtext}>
              You've reached the highest city available.
            </Text>
          </Card>
        )}

        {/* All Cities List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Cities</Text>
          {prestigeManager.getAllCities().map((city) => {
            const isUnlocked = city.id <= currentCity;
            const isCurrent = city.id === currentCity;

            return (
              <View
                key={city.id}
                style={[
                  styles.cityItem,
                  isCurrent && styles.cityItemCurrent,
                  !isUnlocked && styles.cityItemLocked,
                ]}
              >
                <View style={styles.cityItemInfo}>
                  <Text style={styles.cityItemName}>
                    {isCurrent && '📍 '}
                    {city.name}
                  </Text>
                  <Text style={styles.cityItemMultiplier}>
                    {city.prestigeMultiplier}x
                  </Text>
                </View>
                {!isUnlocked && (
                  <Text style={styles.cityItemCost}>
                    {formatCurrency(city.unlockCost)}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  currentCityCard: {
    backgroundColor: '#1a3a1a',
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  cityName: {
    color: '#4CAF50',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  multiplier: {
    color: '#aaa',
    fontSize: 14,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  progressText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
  nextCityCard: {
    backgroundColor: '#2a2a1a',
    marginBottom: 20,
  },
  nextCityLabel: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  nextCityName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 4,
  },
  nextMultiplier: {
    color: '#FF9800',
    fontSize: 14,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoText: {
    color: '#FF9800',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoItem: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 4,
  },
  prestigeButton: {
    marginTop: 8,
  },
  maxCityCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  maxCityText: {
    fontSize: 64,
    marginBottom: 16,
  },
  maxCityTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  maxCitySubtext: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
  },
  cityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  cityItemCurrent: {
    backgroundColor: '#1a3a1a',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  cityItemLocked: {
    opacity: 0.5,
  },
  cityItemInfo: {
    flex: 1,
  },
  cityItemName: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  cityItemMultiplier: {
    color: '#4CAF50',
    fontSize: 12,
  },
  cityItemCost: {
    color: '#aaa',
    fontSize: 12,
  },
});
