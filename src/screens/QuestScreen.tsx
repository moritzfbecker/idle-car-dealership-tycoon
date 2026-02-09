/**
 * Quest Screen
 * Shows daily quests and achievements
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useGameStore } from '@store/gameStore';
import { QuestManager } from '@game/managers/QuestManager';
import QuestCard from '@components/ui/QuestCard';
import Card from '@components/common/Card';
import ProgressBar from '@components/common/ProgressBar';

export default function QuestScreen() {
  const quests = useGameStore((state) => state.quests);
  const achievements = useGameStore((state) => state.achievements);
  const addCash = useGameStore((state) => state.addCash);
  const addGems = useGameStore((state) => state.addGems);
  const completeQuest = useGameStore((state) => state.completeQuest);

  const questManager = new QuestManager();

  // Initialize quests and achievements if empty
  useEffect(() => {
    if (quests.length === 0) {
      const dailyQuests = questManager.generateDailyQuests();
      useGameStore.setState({ quests: dailyQuests });
    }

    if (achievements.length === 0) {
      const initialAchievements = questManager.getInitialAchievements();
      useGameStore.setState({ achievements: initialAchievements });
    }
  }, []);

  // Check if daily quests should refresh
  useEffect(() => {
    if (questManager.shouldRefreshDailyQuests(quests)) {
      const newQuests = questManager.generateDailyQuests();
      useGameStore.setState({ quests: newQuests });
    }
  }, [quests]);

  const handleClaimQuest = (questId: string) => {
    const quest = quests.find((q) => q.id === questId);
    if (quest) {
      const reward = questManager.claimQuestReward(quest);
      if (reward) {
        if (reward.cash) addCash(reward.cash);
        if (reward.gems) addGems(reward.gems);
        completeQuest(questId);
      }
    }
  };

  const completedQuests = quests.filter((q) => q.isCompleted).length;
  const unlockedAchievements = achievements.filter((a) => a.isUnlocked).length;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🎯 Quests & Achievements</Text>

        {/* Summary */}
        <Card style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Daily Quests Completed</Text>
            <Text style={styles.summaryValue}>
              {completedQuests} / {quests.length}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Achievements Unlocked</Text>
            <Text style={styles.summaryValue}>
              {unlockedAchievements} / {achievements.length}
            </Text>
          </View>
        </Card>

        {/* Daily Quests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📅 Daily Quests</Text>
          {quests.length === 0 ? (
            <Text style={styles.emptyText}>No quests available</Text>
          ) : (
            quests.map((quest) => (
              <QuestCard
                key={quest.id}
                quest={quest}
                onClaim={() => handleClaimQuest(quest.id)}
              />
            ))
          )}
        </View>

        {/* Achievements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Achievements</Text>
          {achievements.length === 0 ? (
            <Text style={styles.emptyText}>No achievements available</Text>
          ) : (
            achievements.map((achievement) => {
              const progress = (achievement.progress / achievement.target) * 100;

              return (
                <Card
                  key={achievement.id}
                  style={[
                    styles.achievementCard,
                    achievement.isUnlocked && styles.achievementUnlocked,
                  ]}
                >
                  <View style={styles.achievementHeader}>
                    <Text style={styles.achievementTitle}>
                      {achievement.isUnlocked && '✅ '}
                      {achievement.title}
                    </Text>
                    <Text style={styles.achievementReward}>
                      💎 {achievement.reward}
                    </Text>
                  </View>
                  <Text style={styles.achievementDescription}>
                    {achievement.description}
                  </Text>
                  {!achievement.isUnlocked && (
                    <View style={styles.achievementProgress}>
                      <ProgressBar progress={progress} />
                      <Text style={styles.achievementProgressText}>
                        {achievement.progress} / {achievement.target}
                      </Text>
                    </View>
                  )}
                </Card>
              );
            })
          )}
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
  summaryCard: {
    marginBottom: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  summaryLabel: {
    color: '#aaa',
    fontSize: 14,
  },
  summaryValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  emptyText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    paddingVertical: 20,
  },
  achievementCard: {
    marginBottom: 12,
  },
  achievementUnlocked: {
    backgroundColor: '#1a3a1a',
  },
  achievementHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  achievementTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  achievementReward: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
  },
  achievementDescription: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 12,
  },
  achievementProgress: {
    marginTop: 8,
  },
  achievementProgressText: {
    color: '#aaa',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 4,
  },
});
