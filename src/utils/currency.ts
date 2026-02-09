/**
 * Currency Utilities
 * Format and parse currency values
 */

import { CURRENCY_SUFFIXES } from './constants';

/**
 * Format a number as currency with K, M, B, T suffixes
 * @param value - The numeric value to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "$1.5M")
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  if (value < 0) {
    return '-' + formatCurrency(Math.abs(value), decimals);
  }

  if (value < 1000) {
    return '$' + value.toFixed(0);
  }

  let suffixIndex = 0;
  let scaledValue = value;

  while (scaledValue >= 1000 && suffixIndex < CURRENCY_SUFFIXES.length - 1) {
    scaledValue /= 1000;
    suffixIndex++;
  }

  const suffix = CURRENCY_SUFFIXES[suffixIndex];
  const formatted = scaledValue.toFixed(decimals);

  return '$' + formatted + suffix;
}

/**
 * Format gems (no $ sign, whole numbers only)
 * @param value - The gem count
 * @returns Formatted string (e.g., "150")
 */
export function formatGems(value: number): string {
  return Math.floor(value).toString();
}

/**
 * Format a number with K, M, B, T suffixes (no $ sign)
 * @param value - The numeric value to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted string (e.g., "1.5M")
 */
export function formatNumber(value: number, decimals: number = 2): string {
  const formatted = formatCurrency(value, decimals);
  return formatted.replace('$', '');
}

/**
 * Format time in seconds to HH:MM:SS
 * @param seconds - Time in seconds
 * @returns Formatted time string
 */
export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`;
  } else {
    return `${secs}s`;
  }
}

/**
 * Format revenue per second
 * @param revenuePerSec - Revenue per second value
 * @returns Formatted string (e.g., "$1.5K/s")
 */
export function formatRevenuePerSecond(revenuePerSec: number): string {
  return formatCurrency(revenuePerSec) + '/s';
}
