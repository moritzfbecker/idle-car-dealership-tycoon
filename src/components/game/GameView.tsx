/**
 * Game View Component
 * Visual representation of the entire dealership
 */

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useGameStore } from '@store/gameStore';
import DepartmentBuilding from './DepartmentBuilding';
import CustomerSprite from './CustomerSprite';
import CarSprite from './CarSprite';
import MoneyParticle from './MoneyParticle';
import { DepartmentType } from '@types/game.types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUILDING_SIZE = 120;
const SPACING = 20;

export default function GameView() {
  const departments = useGameStore((state) => state.departments);
  const activeCustomers = useGameStore((state) => state.activeCustomers);
  const [moneyParticles, setMoneyParticles] = useState<{ id: string; amount: number; x: number; y: number }[]>([]);

  // Generate money particles periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const randomDept = Math.random();
      let x = SCREEN_WIDTH / 2;
      let y = 200;

      if (randomDept < 0.3) {
        x = SCREEN_WIDTH * 0.25;
      } else if (randomDept < 0.6) {
        x = SCREEN_WIDTH * 0.5;
      } else {
        x = SCREEN_WIDTH * 0.75;
      }

      setMoneyParticles((prev) => [
        ...prev,
        {
          id: `particle_${Date.now()}_${Math.random()}`,
          amount: Math.floor(Math.random() * 500) + 100,
          x,
          y,
        },
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const removeParticle = (id: string) => {
    setMoneyParticles((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Parking Lot */}
      <View style={styles.section}>
        <View style={styles.buildingContainer}>
          <DepartmentBuilding
            type={DepartmentType.PARKING_LOT}
            size={BUILDING_SIZE}
            isUnlocked={departments[DepartmentType.PARKING_LOT].isUnlocked}
          />
        </View>

        {/* Cars in parking lot */}
        <View style={styles.carsRow}>
          <CarSprite size={50} color="#2196F3" type="sedan" />
          <CarSprite size={50} color="#FF9800" type="suv" />
          <CarSprite size={50} color="#9C27B0" type="luxury" />
        </View>
      </View>

      {/* Main Departments Row */}
      <View style={styles.row}>
        {/* Showroom */}
        <View style={styles.buildingContainer}>
          <DepartmentBuilding
            type={DepartmentType.SHOWROOM}
            size={BUILDING_SIZE}
            isUnlocked={departments[DepartmentType.SHOWROOM].isUnlocked}
          />
          {departments[DepartmentType.SHOWROOM].isUnlocked && (
            <View style={styles.showroomCars}>
              <CarSprite size={40} color="#2196F3" type="luxury" />
              <CarSprite size={40} color="#FF0000" type="sports" />
            </View>
          )}
        </View>

        {/* Service Center */}
        <View style={styles.buildingContainer}>
          <DepartmentBuilding
            type={DepartmentType.SERVICE_CENTER}
            size={BUILDING_SIZE}
            isUnlocked={departments[DepartmentType.SERVICE_CENTER].isUnlocked}
          />
        </View>
      </View>

      {/* Second Row */}
      <View style={styles.row}>
        {/* Parts Shop */}
        <View style={styles.buildingContainer}>
          <DepartmentBuilding
            type={DepartmentType.PARTS_SHOP}
            size={BUILDING_SIZE}
            isUnlocked={departments[DepartmentType.PARTS_SHOP].isUnlocked}
          />
        </View>

        {/* Finance Office */}
        <View style={styles.buildingContainer}>
          <DepartmentBuilding
            type={DepartmentType.FINANCE_OFFICE}
            size={BUILDING_SIZE}
            isUnlocked={departments[DepartmentType.FINANCE_OFFICE].isUnlocked}
          />
        </View>
      </View>

      {/* Detailing */}
      <View style={styles.section}>
        <View style={styles.buildingContainer}>
          <DepartmentBuilding
            type={DepartmentType.DETAILING}
            size={BUILDING_SIZE}
            isUnlocked={departments[DepartmentType.DETAILING].isUnlocked}
          />
        </View>
      </View>

      {/* Active Customers */}
      <View style={styles.customersOverlay}>
        {activeCustomers.slice(0, 10).map((customer, index) => (
          <View
            key={customer.id}
            style={[
              styles.customerPosition,
              {
                left: (index % 5) * 70 + 20,
                top: Math.floor(index / 5) * 100 + 50,
              },
            ]}
          >
            <CustomerSprite customer={customer} size={50} />
          </View>
        ))}
      </View>

      {/* Money Particles */}
      {moneyParticles.map((particle) => (
        <View
          key={particle.id}
          style={[
            styles.particleContainer,
            { left: particle.x, top: particle.y },
          ]}
        >
          <MoneyParticle
            amount={particle.amount}
            onComplete={() => removeParticle(particle.id)}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a3a1a', // Green grass-like
  },
  content: {
    padding: SPACING,
    alignItems: 'center',
    minHeight: 800,
  },
  section: {
    marginBottom: SPACING,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: SPACING,
  },
  buildingContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  carsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  showroomCars: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  customersOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  customerPosition: {
    position: 'absolute',
  },
  particleContainer: {
    position: 'absolute',
    pointerEvents: 'none',
  },
});
