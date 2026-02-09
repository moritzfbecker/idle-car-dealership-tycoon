/**
 * Quest Card Component
 * Shows quest progress and rewards
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Quest } from '@types/game.types';
import Card from '@components/common/Card';
import ProgressBar from '@components/common/ProgressBar';
import Button from '@components/common/Button';
import { formatCurrency, formatGems } from '@utils/currency';

interface QuestCardProps {
  quest: Quest;
  onClaim?: () => void;
}

export default function QuestCard({ quest, onClaim }: QuestCardProps) {
  const progress = (quest.progress / quest.target) * 100;
  const isComplete = quest.isCompleted;

  return (
    <Card style={[styles.card, isComplete && styles.completeCard]}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text style={styles.title}>{quest.title}</Text>
          <Text style={styles.description}>{quest.description}</Text>
        </View>
        {quest.type === 'daily' && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Daily</Text>
          </View>
        )}
      </View>

      <View style={styles.progress}>
        <ProgressBar progress={progress} />
        <Text style={styles.progressText}>
          {quest.progress} / {quest.target}
        </Text>
      </View>

      <View style={styles.footer}>
        <View style={styles.rewards}>
          {quest.reward.cash && (
            <Text style={styles.reward}>💵 {formatCurrency(quest.reward.cash)}</Text>
          )}
          {quest.reward.gems && (
            <Text style={styles.reward}>💎 {formatGems(quest.reward.gems)}</Text>
          )}
        </View>

        {isComplete && onClaim && (
          <Button
            title="Claim"
            onPress={onClaim}
            variant="success"
            style={styles.claimButton}
          />
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  completeCard: {
    backgroundColor: '#1a3a1a',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#aaa',
    fontSize: 12,
  },
  badge: {
    backgroundColor: '#FF9800',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  progress: {
    marginBottom: 12,
  },
  progressText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewards: {
    flexDirection: 'row',
  },
  reward: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 12,
  },
  claimButton: {
    minWidth: 80,
  },
});
