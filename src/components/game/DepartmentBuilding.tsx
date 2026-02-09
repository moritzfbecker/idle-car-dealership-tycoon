/**
 * Department Building Component
 * Visual representation of a department
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Rect, Path, Circle } from 'react-native-svg';
import { DepartmentType } from '@types/game.types';

interface DepartmentBuildingProps {
  type: DepartmentType;
  size?: number;
  isUnlocked?: boolean;
}

export default function DepartmentBuilding({
  type,
  size = 100,
  isUnlocked = true
}: DepartmentBuildingProps) {
  const getIcon = () => {
    switch (type) {
      case DepartmentType.PARKING_LOT:
        return '🅿️';
      case DepartmentType.SHOWROOM:
        return '🚗';
      case DepartmentType.SERVICE_CENTER:
        return '🔧';
      case DepartmentType.PARTS_SHOP:
        return '🔩';
      case DepartmentType.FINANCE_OFFICE:
        return '💼';
      case DepartmentType.DETAILING:
        return '✨';
      default:
        return '🏢';
    }
  };

  const getColor = () => {
    if (!isUnlocked) return '#424242';

    switch (type) {
      case DepartmentType.PARKING_LOT:
        return '#607D8B';
      case DepartmentType.SHOWROOM:
        return '#2196F3';
      case DepartmentType.SERVICE_CENTER:
        return '#FF9800';
      case DepartmentType.PARTS_SHOP:
        return '#9C27B0';
      case DepartmentType.FINANCE_OFFICE:
        return '#4CAF50';
      case DepartmentType.DETAILING:
        return '#00BCD4';
      default:
        return '#757575';
    }
  };

  const color = getColor();

  return (
    <View style={styles.container}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {/* Building Base */}
        <Rect
          x="20"
          y="40"
          width="60"
          height="50"
          fill={color}
          stroke="#000"
          strokeWidth="2"
          opacity={isUnlocked ? 1 : 0.3}
        />

        {/* Roof */}
        <Path
          d="M 15 40 L 50 20 L 85 40 Z"
          fill={color}
          stroke="#000"
          strokeWidth="2"
          opacity={isUnlocked ? 0.8 : 0.3}
        />

        {/* Windows */}
        <Rect x="30" y="50" width="12" height="12" fill="#87CEEB" opacity={isUnlocked ? 0.7 : 0.2} />
        <Rect x="58" y="50" width="12" height="12" fill="#87CEEB" opacity={isUnlocked ? 0.7 : 0.2} />
        <Rect x="30" y="68" width="12" height="12" fill="#87CEEB" opacity={isUnlocked ? 0.7 : 0.2} />
        <Rect x="58" y="68" width="12" height="12" fill="#87CEEB" opacity={isUnlocked ? 0.7 : 0.2} />

        {/* Door */}
        <Rect x="44" y="70" width="12" height="20" fill="#8D6E63" opacity={isUnlocked ? 1 : 0.3} />

        {/* Lock icon if not unlocked */}
        {!isUnlocked && (
          <Circle cx="50" cy="50" r="15" fill="#000" opacity="0.7" />
        )}
      </Svg>

      {/* Icon */}
      <Text style={styles.icon}>{getIcon()}</Text>

      {/* Lock overlay */}
      {!isUnlocked && (
        <Text style={styles.lockIcon}>🔒</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    fontSize: 32,
    position: 'absolute',
    top: '45%',
    textAlign: 'center',
  },
  lockIcon: {
    fontSize: 24,
    position: 'absolute',
    top: '35%',
  },
});
