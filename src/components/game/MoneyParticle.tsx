/**
 * Money Particle Effect
 * Animated money particles that float up
 */

import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

interface MoneyParticleProps {
  amount: number;
  onComplete?: () => void;
}

export default function MoneyParticle({ amount, onComplete }: MoneyParticleProps) {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Float up animation
    translateY.value = withTiming(-100, {
      duration: 2000,
      easing: Easing.out(Easing.ease),
    });

    // Fade out
    opacity.value = withSequence(
      withTiming(1, { duration: 500 }),
      withTiming(0, { duration: 1500 })
    );

    // Scale up then down
    scale.value = withSequence(
      withTiming(1.5, { duration: 300 }),
      withTiming(1, { duration: 1700 })
    );

    // Call onComplete after animation
    const timeout = setTimeout(() => {
      onComplete?.();
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const formatAmount = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
    return `$${val}`;
  };

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>+{formatAmount(amount)}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: '700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
