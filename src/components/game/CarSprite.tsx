/**
 * Car Sprite Component
 * Simple car illustration
 */

import React from 'react';
import Svg, { Rect, Circle, Path } from 'react-native-svg';

interface CarSpriteProps {
  size?: number;
  color?: string;
  type?: 'sedan' | 'suv' | 'luxury' | 'sports';
}

export default function CarSprite({
  size = 60,
  color = '#2196F3',
  type = 'sedan'
}: CarSpriteProps) {
  // Different car shapes based on type
  const getCarPath = () => {
    switch (type) {
      case 'sedan':
        return 'M 10 25 L 10 20 L 15 15 L 25 15 L 30 20 L 30 25 L 35 25 L 35 30 L 30 30 L 30 28 L 10 28 L 10 30 L 5 30 L 5 25 Z';
      case 'suv':
        return 'M 8 25 L 8 18 L 12 12 L 28 12 L 32 18 L 32 25 L 35 25 L 35 30 L 30 30 L 30 28 L 10 28 L 10 30 L 5 30 L 5 25 Z';
      case 'luxury':
        return 'M 10 26 L 10 22 L 14 16 L 26 16 L 30 22 L 30 26 L 35 26 L 35 29 L 32 29 L 32 27 L 8 27 L 8 29 L 5 29 L 5 26 Z';
      case 'sports':
        return 'M 12 27 L 12 23 L 16 18 L 24 18 L 28 23 L 28 27 L 34 27 L 34 28 L 30 28 L 30 26 L 10 26 L 10 28 L 6 28 L 6 27 Z';
      default:
        return 'M 10 25 L 10 20 L 15 15 L 25 15 L 30 20 L 30 25 L 35 25 L 35 30 L 30 30 L 30 28 L 10 28 L 10 30 L 5 30 L 5 25 Z';
    }
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 40 40">
      {/* Car Body */}
      <Path
        d={getCarPath()}
        fill={color}
        stroke="#000"
        strokeWidth="1"
      />

      {/* Windows */}
      <Rect
        x="13"
        y={type === 'suv' ? '14' : '17'}
        width="6"
        height="6"
        fill="#87CEEB"
        opacity="0.7"
      />
      <Rect
        x="21"
        y={type === 'suv' ? '14' : '17'}
        width="6"
        height="6"
        fill="#87CEEB"
        opacity="0.7"
      />

      {/* Wheels */}
      <Circle cx="12" cy="30" r="3" fill="#333" />
      <Circle cx="28" cy="30" r="3" fill="#333" />

      {/* Luxury details */}
      {type === 'luxury' && (
        <>
          <Path d="M 14 20 L 26 20" stroke="#FFD700" strokeWidth="1" />
          <Circle cx="35" cy="27" r="1" fill="#FFD700" />
        </>
      )}

      {/* Sports details */}
      {type === 'sports' && (
        <>
          <Path d="M 15 22 L 25 22" stroke="#FF0000" strokeWidth="1.5" />
          <Rect x="32" y="27" width="2" height="1" fill="#FF0000" />
        </>
      )}
    </Svg>
  );
}
