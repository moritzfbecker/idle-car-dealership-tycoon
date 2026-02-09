/**
 * Epic Upgrades Data
 * Permanent upgrades purchased with gems
 */

import { EpicUpgrade, DepartmentType } from '@types/game.types';

export const EPIC_UPGRADES: EpicUpgrade[] = [
  {
    id: 'robotic_finance',
    name: 'Robotic Finance System',
    description: '+50% finance office processing speed',
    cost: 100,
    multiplier: 1.5,
    affectedDepartment: DepartmentType.FINANCE_OFFICE,
    isPurchased: false,
  },
  {
    id: 'premium_showroom',
    name: 'Premium Showroom',
    description: '+100% showroom revenue',
    cost: 150,
    multiplier: 2.0,
    affectedDepartment: DepartmentType.SHOWROOM,
    isPurchased: false,
  },
  {
    id: 'express_service',
    name: 'Express Service Lane',
    description: '+50% service center speed',
    cost: 120,
    multiplier: 1.5,
    affectedDepartment: DepartmentType.SERVICE_CENTER,
    isPurchased: false,
  },
  {
    id: 'smart_parking',
    name: 'Smart Parking System',
    description: '+30% customer arrival rate',
    cost: 80,
    multiplier: 1.3,
    affectedDepartment: DepartmentType.PARKING_LOT,
    isPurchased: false,
  },
  {
    id: 'loyalty_program',
    name: 'Customer Loyalty Program',
    description: '+25% all department revenue',
    cost: 200,
    multiplier: 1.25,
    affectedDepartment: 'all',
    isPurchased: false,
  },
  {
    id: 'master_negotiator',
    name: 'Master Negotiator Training',
    description: '+20% all sales revenue',
    cost: 180,
    multiplier: 1.2,
    affectedDepartment: 'all',
    isPurchased: false,
  },
  {
    id: 'premium_parts',
    name: 'Premium Parts Supplier',
    description: '+75% parts shop revenue',
    cost: 100,
    multiplier: 1.75,
    affectedDepartment: DepartmentType.PARTS_SHOP,
    isPurchased: false,
  },
  {
    id: 'pro_detailing',
    name: 'Pro Detailing Equipment',
    description: '+60% detailing revenue',
    cost: 90,
    multiplier: 1.6,
    affectedDepartment: DepartmentType.DETAILING,
    isPurchased: false,
  },
];
