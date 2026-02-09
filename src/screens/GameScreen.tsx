/**
 * Game Screen
 * Main gameplay screen showing departments and customers
 */

import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
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
import { DepartmentType } from '@types/game.types';

export default function GameScreen() {
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showPrestigeModal, setShowPrestigeModal] = useState(false);

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
        <RevenuePerSecondDisplay revenuePerSecond={revenuePerSecond} />
      </View>

      {/* Departments List */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text style={styles.sectionTitle}>🚗 Your Dealership</Text>

        {/* Parking Lot */}
        <DepartmentCard
          department={departments[DepartmentType.PARKING_LOT]}
          onPress={() => handleDepartmentPress(DepartmentType.PARKING_LOT)}
        />

        {/* Showroom */}
        <DepartmentCard
          department={departments[DepartmentType.SHOWROOM]}
          onPress={() => handleDepartmentPress(DepartmentType.SHOWROOM)}
        />

        {/* Finance Office */}
        <DepartmentCard
          department={departments[DepartmentType.FINANCE_OFFICE]}
          onPress={() => handleDepartmentPress(DepartmentType.FINANCE_OFFICE)}
        />

        {/* Service Center */}
        <DepartmentCard
          department={departments[DepartmentType.SERVICE_CENTER]}
          onPress={() => handleDepartmentPress(DepartmentType.SERVICE_CENTER)}
        />

        {/* Parts Shop */}
        <DepartmentCard
          department={departments[DepartmentType.PARTS_SHOP]}
          onPress={() => handleDepartmentPress(DepartmentType.PARTS_SHOP)}
        />

        {/* Detailing */}
        <DepartmentCard
          department={departments[DepartmentType.DETAILING]}
          onPress={() => handleDepartmentPress(DepartmentType.DETAILING)}
        />

        {/* Active Customers Info */}
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
  cityName: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
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
