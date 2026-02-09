/**
 * Department Upgrade Modal
 * Shows all upgrade options for a department
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Department, DepartmentType, StaffRole } from '@types/game.types';
import { useGameStore } from '@store/gameStore';
import { DepartmentManager } from '@game/managers/DepartmentManager';
import { DEPARTMENT_DATA } from '@game/data/departments';
import Modal from './Modal';
import UpgradeButton from './UpgradeButton';
import StaffCard from './StaffCard';
import Button from '@components/common/Button';
import { calculateUpgradeCost, calculateStaffHireCost } from '@utils/calculations';

interface DepartmentUpgradeModalProps {
  visible: boolean;
  onClose: () => void;
  departmentId: DepartmentType | null;
}

export default function DepartmentUpgradeModal({
  visible,
  onClose,
  departmentId,
}: DepartmentUpgradeModalProps) {
  const cash = useGameStore((state) => state.cash);
  const departments = useGameStore((state) => state.departments);
  const spendCash = useGameStore((state) => state.spendCash);
  const unlockDepartment = useGameStore((state) => state.unlockDepartment);

  if (!departmentId) return null;

  const department = departments[departmentId];
  const departmentManager = new DepartmentManager();
  const config = DEPARTMENT_DATA[departmentId];

  // If department is locked, show unlock option
  if (!department.isUnlocked) {
    const unlockCost = config.unlockCost;
    const canAfford = cash >= unlockCost;

    return (
      <Modal visible={visible} onClose={onClose} title={`Unlock ${config.name}`}>
        <View style={styles.unlockContainer}>
          <Text style={styles.unlockIcon}>🔓</Text>
          <Text style={styles.unlockTitle}>{config.name}</Text>
          <Text style={styles.unlockDescription}>{config.description}</Text>

          <Button
            title={`Unlock for ${unlockCost === 0 ? 'FREE' : `$${unlockCost}`}`}
            onPress={() => {
              if (spendCash(unlockCost)) {
                unlockDepartment(departmentId);
                onClose();
              }
            }}
            disabled={!canAfford}
            variant="success"
            fullWidth
            style={styles.unlockButton}
          />
        </View>
      </Modal>
    );
  }

  // Upgrade costs
  const capacityCost = departmentManager.getUpgradeCost(department, 'capacity');
  const qualityCost = departmentManager.getUpgradeCost(department, 'quality');
  const speedCost = departmentManager.getUpgradeCost(department, 'speed');

  // Staff hiring cost
  const staffHireCost = calculateStaffHireCost(
    config.staffConfig.baseCost,
    department.staff.length
  );
  const canHireMoreStaff = department.staff.length < config.staffConfig.maxStaff;

  const handleUpgrade = (upgradeType: 'capacity' | 'quality' | 'speed') => {
    const cost = departmentManager.getUpgradeCost(department, upgradeType);
    if (spendCash(cost)) {
      const upgraded = departmentManager.applyUpgrade(department, upgradeType);
      useGameStore.setState({
        departments: {
          ...departments,
          [departmentId]: upgraded,
        },
      });
    }
  };

  const handleHireStaff = () => {
    if (spendCash(staffHireCost)) {
      // Create new staff member
      const newStaff = {
        id: `staff_${Date.now()}`,
        role: StaffRole.SALES_REP, // TODO: Map to correct role
        departmentId,
        efficiency: 1.2,
        salary: staffHireCost * 0.1,
        level: 1,
      };

      useGameStore.setState({
        departments: {
          ...departments,
          [departmentId]: {
            ...department,
            staff: [...department.staff, newStaff],
          },
        },
        staff: [...useGameStore.getState().staff, newStaff],
      });
    }
  };

  return (
    <Modal visible={visible} onClose={onClose} title={department.name}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔧 Upgrades</Text>

        <UpgradeButton
          title={config.upgradeTypes.capacity.name}
          description={config.upgradeTypes.capacity.description}
          currentLevel={department.capacity}
          cost={capacityCost}
          onPress={() => handleUpgrade('capacity')}
          canAfford={cash >= capacityCost}
        />

        <UpgradeButton
          title={config.upgradeTypes.quality.name}
          description={config.upgradeTypes.quality.description}
          currentLevel={department.quality}
          cost={qualityCost}
          onPress={() => handleUpgrade('quality')}
          canAfford={cash >= qualityCost}
        />

        <UpgradeButton
          title={config.upgradeTypes.speed.name}
          description={config.upgradeTypes.speed.description}
          currentLevel={department.level}
          cost={speedCost}
          onPress={() => handleUpgrade('speed')}
          canAfford={cash >= speedCost}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          👥 Staff ({department.staff.length}/{config.staffConfig.maxStaff})
        </Text>

        {department.staff.map((staff) => (
          <StaffCard key={staff.id} staff={staff} />
        ))}

        {canHireMoreStaff && (
          <StaffCard
            hireCost={staffHireCost}
            onHire={handleHireStaff}
            canAfford={cash >= staffHireCost}
          />
        )}

        {!canHireMoreStaff && (
          <Text style={styles.maxStaffText}>Maximum staff reached</Text>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
  },
  unlockContainer: {
    alignItems: 'center',
  },
  unlockIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  unlockTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  unlockDescription: {
    color: '#aaa',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  unlockButton: {
    marginTop: 16,
  },
  maxStaffText: {
    color: '#666',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
  },
});
