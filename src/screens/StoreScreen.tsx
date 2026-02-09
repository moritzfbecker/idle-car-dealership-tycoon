/**
 * Store Screen
 * Premium shop for gems and epic upgrades
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useGameStore } from '@store/gameStore';
import { EPIC_UPGRADES } from '@game/data/epicUpgrades';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import { formatGems } from '@utils/currency';

export default function StoreScreen() {
  const gems = useGameStore((state) => state.gems);
  const epicUpgrades = useGameStore((state) => state.epicUpgrades);
  const purchaseEpicUpgrade = useGameStore((state) => state.purchaseEpicUpgrade);

  // Initialize epic upgrades if empty
  useEffect(() => {
    if (epicUpgrades.length === 0) {
      useGameStore.setState({ epicUpgrades: EPIC_UPGRADES });
    }
  }, []);

  const handlePurchase = (upgradeId: string) => {
    const success = purchaseEpicUpgrade(upgradeId);
    if (success) {
      console.log(`[Store] Purchased ${upgradeId}`);
    }
  };

  const purchasedCount = epicUpgrades.filter((u) => u.isPurchased).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🏪 Premium Store</Text>

        {/* Gem Balance */}
        <Card style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Your Gems</Text>
          <Text style={styles.balanceAmount}>💎 {formatGems(gems)}</Text>
        </Card>

        {/* Epic Upgrades */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            ⚡ Epic Upgrades ({purchasedCount}/{epicUpgrades.length})
          </Text>
          <Text style={styles.sectionSubtitle}>
            Permanent upgrades that persist through prestige
          </Text>

          {epicUpgrades.map((upgrade) => {
            const canAfford = gems >= upgrade.cost;

            return (
              <Card
                key={upgrade.id}
                style={[
                  styles.upgradeCard,
                  upgrade.isPurchased && styles.purchasedCard,
                ]}
              >
                <View style={styles.upgradeHeader}>
                  <View style={styles.upgradeInfo}>
                    <Text style={styles.upgradeName}>
                      {upgrade.isPurchased && '✓ '}
                      {upgrade.name}
                    </Text>
                    <Text style={styles.upgradeDescription}>
                      {upgrade.description}
                    </Text>
                  </View>

                  {!upgrade.isPurchased && (
                    <View style={styles.upgradeAction}>
                      <Text
                        style={[
                          styles.upgradeCost,
                          !canAfford && styles.cantAfford,
                        ]}
                      >
                        💎 {upgrade.cost}
                      </Text>
                      <Button
                        title="Buy"
                        onPress={() => handlePurchase(upgrade.id)}
                        disabled={!canAfford}
                        variant={canAfford ? 'success' : 'secondary'}
                        style={styles.buyButton}
                      />
                    </View>
                  )}

                  {upgrade.isPurchased && (
                    <View style={styles.purchasedBadge}>
                      <Text style={styles.purchasedText}>OWNED</Text>
                    </View>
                  )}
                </View>
              </Card>
            );
          })}
        </View>

        {/* Gem Packs (Placeholder) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💎 Gem Packs</Text>
          <Text style={styles.comingSoon}>Coming soon...</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  balanceCard: {
    backgroundColor: '#2a1a3a',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 24,
  },
  balanceLabel: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 8,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 16,
  },
  upgradeCard: {
    marginBottom: 12,
  },
  purchasedCard: {
    backgroundColor: '#1a3a1a',
    opacity: 0.7,
  },
  upgradeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upgradeInfo: {
    flex: 1,
    marginRight: 16,
  },
  upgradeName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  upgradeDescription: {
    color: '#aaa',
    fontSize: 12,
  },
  upgradeAction: {
    alignItems: 'flex-end',
  },
  upgradeCost: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  cantAfford: {
    color: '#F44336',
  },
  buyButton: {
    minWidth: 80,
  },
  purchasedBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  purchasedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  comingSoon: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 32,
  },
});
