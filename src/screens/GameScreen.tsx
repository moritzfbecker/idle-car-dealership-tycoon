/**
 * Game Screen
 * Main gameplay screen with visual dealership view
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useGameStore } from '@store/gameStore';
import { useGameLoop } from '@hooks/useGameLoop';
import { useOfflineEarnings } from '@hooks/useOfflineEarnings';
import CurrencyDisplay from '@components/ui/CurrencyDisplay';
import RevenuePerSecondDisplay from '@components/ui/RevenuePerSecondDisplay';
import DepartmentCard from '@components/game/DepartmentCard';
import DepartmentUpgradeModal from '@components/ui/DepartmentUpgradeModal';
import PrestigeModal from '@components/ui/PrestigeModal';
import OfflineEarningsModal from '@components/ui/OfflineEarningsModal';
import GameView from '@components/game/GameView';
import Button from '@components/common/Button';
import { DepartmentType } from '@types/game.types';

export default function GameScreen() {
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPrestigeModal, setShowPrestigeModal] = useState(false);
  const [viewMode, setViewMode] = useState<'visual' | 'list'>('visual');

  // Start game loop
  const { getRevenuePerSecond } = useGameLoop();

  // Check for offline earnings
  const { offlineData, showModal: showOfflineModal, dismissModal: dismissOfflineModal } = useOfflineEarnings();

  // Get game state
  const cash = useGameStore((state) => state.cash);
  const gems = useGameStore((state) => state.gems);
  const departments = useGameStore((state) => state.departments);
  const currentCity = useGameStore((state) => state.currentCity);
  const activeCustomers = useGameStore((state) => state.activeCustomers);
  const statistics = useGameStore((state) => state.statistics);

  const revenuePerSecond = getRevenuePerSecond();

  const handleDepartmentPress = useCallback((deptId: DepartmentType) => {
    setSelectedDepartment(deptId);
    setShowUpgradeModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowUpgradeModal(false);
    setSelectedDepartment(null);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <TouchableOpacity onPress={() => setShowPrestigeModal(true)}>
            <Text style={styles.cityName}>City {currentCity} 🏙️</Text>
          </TouchableOpacity>
          <CurrencyDisplay cash={cash} gems={gems} />
        </View>
        <View style={styles.headerRight}>
          <RevenuePerSecondDisplay revenuePerSecond={revenuePerSecond} />
          <Button
            title={viewMode === 'visual' ? '📋' : '🎮'}
            onPress={() => setViewMode(viewMode === 'visual' ? 'list' : 'visual')}
            variant="secondary"
            style={styles.viewToggle}
          />
        </View>
      </View>

      {/* Visual Mode - New 2D/3D View */}
      {viewMode === 'visual' && (
        <View style={styles.visualContainer}>
          <GameView />

          {/* Info Overlay */}
          <View style={styles.infoOverlay}>
            <Text style={styles.infoText}>
              👥 {activeCustomers.length} customers | 📊 {statistics.customersServedTotal} served
            </Text>
            <Text style={styles.tapHint}>Tap buildings to upgrade! 👆</Text>
          </View>

          {/* Department Quick Access */}
          <ScrollView
            horizontal
            style={styles.quickAccess}
            showsHorizontalScrollIndicator={false}
          >
            {Object.values(DepartmentType).map((deptType) => (
              <TouchableOpacity
                key={deptType}
                style={styles.quickButton}
                onPress={() => handleDepartmentPress(deptType)}
              >
                <Text style={styles.quickButtonText}>
                  {departments[deptType].name}
                </Text>
                <Text style={styles.quickButtonLevel}>
                  Lv. {departments[deptType].level}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* List Mode - Original Card View */}
      {viewMode === 'list' && (
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          <Text style={styles.sectionTitle}>🚗 Your Dealership</Text>

          <DepartmentCard
            department={departments[DepartmentType.PARKING_LOT]}
            onPress={() => handleDepartmentPress(DepartmentType.PARKING_LOT)}
          />
          <DepartmentCard
            department={departments[DepartmentType.SHOWROOM]}
            onPress={() => handleDepartmentPress(DepartmentType.SHOWROOM)}
          />
          <DepartmentCard
            department={departments[DepartmentType.FINANCE_OFFICE]}
            onPress={() => handleDepartmentPress(DepartmentType.FINANCE_OFFICE)}
          />
          <DepartmentCard
            department={departments[DepartmentType.SERVICE_CENTER]}
            onPress={() => handleDepartmentPress(DepartmentType.SERVICE_CENTER)}
          />
          <DepartmentCard
            department={departments[DepartmentType.PARTS_SHOP]}
            onPress={() => handleDepartmentPress(DepartmentType.PARTS_SHOP)}
          />
          <DepartmentCard
            department={departments[DepartmentType.DETAILING]}
            onPress={() => handleDepartmentPress(DepartmentType.DETAILING)}
          />

          <View style={styles.statsBox}>
            <Text style={styles.statsText}>
              👥 Active Customers: {activeCustomers.length}
            </Text>
            <Text style={styles.statsText}>
              📊 Total Served: {statistics.customersServedTotal}
            </Text>
            <Text style={styles.statsText}>
              💰 Total Earnings: ${Math.floor(statistics.totalEarningsAllTime)}
            </Text>
          </View>
        </ScrollView>
      )}

      {/* Upgrade Modal */}
      <DepartmentUpgradeModal
        visible={showUpgradeModal}
        onClose={handleCloseModal}
        departmentId={selectedDepartment}
      />

      {/* Prestige Modal */}
      <PrestigeModal
        visible={showPrestigeModal}
        onClose={() => setShowPrestigeModal(false)}
      />

      {/* Offline Earnings Modal */}
      <OfflineEarningsModal
        visible={showOfflineModal}
        onClose={dismissOfflineModal}
        data={offlineData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cityName: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  viewToggle: {
    minWidth: 50,
    paddingHorizontal: 12,
  },
  visualContainer: {
    flex: 1,
  },
  infoOverlay: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 4,
  },
  tapHint: {
    color: '#4CAF50',
    fontSize: 12,
    fontStyle: 'italic',
  },
  quickAccess: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
  },
  quickButton: {
    backgroundColor: '#2a2a2a',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    minWidth: 100,
    alignItems: 'center',
  },
  quickButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  quickButtonLevel: {
    color: '#4CAF50',
    fontSize: 10,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 16,
  },
  statsBox: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  statsText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 8,
  },
});
