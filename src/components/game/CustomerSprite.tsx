/**
 * Customer Sprite Component
 * Animated customer figure
 */

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Path } from 'react-native-svg';
import { Customer, CustomerType } from '@types/game.types';

interface CustomerSpriteProps {
  customer: Customer;
  size?: number;
}

export default function CustomerSprite({ customer, size = 40 }: CustomerSpriteProps) {
  const bounce = useSharedValue(0);

  useEffect(() => {
    // Bounce animation
    bounce.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 500 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: bounce.value }],
  }));

  // Color based on customer type
  const getColor = () => {
    switch (customer.type) {
      case CustomerType.BUDGET:
        return '#9E9E9E'; // Gray
      case CustomerType.MIDRANGE:
        return '#2196F3'; // Blue
      case CustomerType.LUXURY:
        return '#9C27B0'; // Purple
      case CustomerType.SERVICE:
        return '#FF9800'; // Orange
      case CustomerType.VIP:
        return '#FFD700'; // Gold
      default:
        return '#2196F3';
    }
  };

  const color = getColor();

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Svg width={size} height={size} viewBox="0 0 40 40">
        {/* Head */}
        <Circle cx="20" cy="12" r="8" fill={color} />

        {/* Body */}
        <Path
          d="M 20 20 L 20 32 M 12 24 L 28 24"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Legs */}
        <Path
          d="M 20 32 L 15 40 M 20 32 L 25 40"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* VIP Crown */}
        {customer.type === CustomerType.VIP && (
          <Path
            d="M 12 8 L 15 5 L 18 8 L 20 4 L 22 8 L 25 5 L 28 8"
            stroke="#FFD700"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        )}
      </Svg>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
