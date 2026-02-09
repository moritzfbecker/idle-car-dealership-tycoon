/**
 * Department Configuration Data
 * Idle Car Dealership Tycoon
 */

import { DepartmentType } from '@types/game.types';

export interface DepartmentConfig {
  id: DepartmentType;
  name: string;
  description: string;
  unlockCost: number;
  baseRevenue: number;
  baseServiceTime: number;
  upgradeTypes: {
    capacity: {
      baseCost: number;
      name: string;
      description: string;
    };
    quality: {
      baseCost: number;
      name: string;
      description: string;
    };
    speed: {
      baseCost: number;
      name: string;
      description: string;
    };
  };
  staffConfig: {
    baseCost: number;
    maxStaff: number;
  };
}

export const DEPARTMENT_DATA: Record<DepartmentType, DepartmentConfig> = {
  [DepartmentType.PARKING_LOT]: {
    id: DepartmentType.PARKING_LOT,
    name: 'Parking Lot',
    description: 'Where customers arrive. More spaces = more customers.',
    unlockCost: 0,
    baseRevenue: 0,
    baseServiceTime: 0,
    upgradeTypes: {
      capacity: {
        baseCost: 100,
        name: 'Parking Spaces',
        description: 'Increase max customer capacity',
      },
      quality: {
        baseCost: 500,
        name: 'Lot Amenities',
        description: 'Covered parking, charging stations',
      },
      speed: {
        baseCost: 250,
        name: 'Express Entry',
        description: 'Customers arrive faster',
      },
    },
    staffConfig: {
      baseCost: 500,
      maxStaff: 3,
    },
  },

  [DepartmentType.SHOWROOM]: {
    id: DepartmentType.SHOWROOM,
    name: 'Showroom',
    description: 'Main sales area. Display and sell vehicles.',
    unlockCost: 0,
    baseRevenue: 100,
    baseServiceTime: 10,
    upgradeTypes: {
      capacity: {
        baseCost: 500,
        name: 'Display Slots',
        description: 'More vehicles on display',
      },
      quality: {
        baseCost: 2000,
        name: 'Vehicle Quality',
        description: 'Sell better cars for more revenue',
      },
      speed: {
        baseCost: 1000,
        name: 'Sales Efficiency',
        description: 'Faster customer service',
      },
    },
    staffConfig: {
      baseCost: 750,
      maxStaff: 5,
    },
  },

  [DepartmentType.SERVICE_CENTER]: {
    id: DepartmentType.SERVICE_CENTER,
    name: 'Service Center',
    description: 'Auto repair and maintenance facility.',
    unlockCost: 5000,
    baseRevenue: 75,
    baseServiceTime: 15,
    upgradeTypes: {
      capacity: {
        baseCost: 1000,
        name: 'Service Bays',
        description: 'More vehicles serviced simultaneously',
      },
      quality: {
        baseCost: 3000,
        name: 'Service Quality',
        description: 'Offer advanced repairs',
      },
      speed: {
        baseCost: 1500,
        name: 'Service Speed',
        description: 'Faster repairs',
      },
    },
    staffConfig: {
      baseCost: 1000,
      maxStaff: 4,
    },
  },

  [DepartmentType.PARTS_SHOP]: {
    id: DepartmentType.PARTS_SHOP,
    name: 'Parts & Accessories',
    description: 'Aftermarket parts and customization.',
    unlockCost: 10000,
    baseRevenue: 50,
    baseServiceTime: 8,
    upgradeTypes: {
      capacity: {
        baseCost: 800,
        name: 'Product Variety',
        description: 'More products to sell',
      },
      quality: {
        baseCost: 2500,
        name: 'Premium Parts',
        description: 'High-end accessories and performance parts',
      },
      speed: {
        baseCost: 1200,
        name: 'Service Speed',
        description: 'Faster customer service',
      },
    },
    staffConfig: {
      baseCost: 800,
      maxStaff: 3,
    },
  },

  [DepartmentType.FINANCE_OFFICE]: {
    id: DepartmentType.FINANCE_OFFICE,
    name: 'Finance Office',
    description: 'Process transactions and financing. All customers pass through here.',
    unlockCost: 0,
    baseRevenue: 25,
    baseServiceTime: 5,
    upgradeTypes: {
      capacity: {
        baseCost: 2000,
        name: 'Finance Desks',
        description: 'Serve more customers simultaneously',
      },
      quality: {
        baseCost: 5000,
        name: 'Approval Rate',
        description: 'More loan approvals = more sales',
      },
      speed: {
        baseCost: 3000,
        name: 'Processing Speed',
        description: 'Reduce customer wait time',
      },
    },
    staffConfig: {
      baseCost: 1500,
      maxStaff: 4,
    },
  },

  [DepartmentType.DETAILING]: {
    id: DepartmentType.DETAILING,
    name: 'Detailing & Car Wash',
    description: 'Vehicle cleaning and aesthetic services.',
    unlockCost: 15000,
    baseRevenue: 40,
    baseServiceTime: 7,
    upgradeTypes: {
      capacity: {
        baseCost: 600,
        name: 'Wash Bays',
        description: 'More vehicles detailed simultaneously',
      },
      quality: {
        baseCost: 2000,
        name: 'Service Types',
        description: 'Offer ceramic coating and premium details',
      },
      speed: {
        baseCost: 1000,
        name: 'Service Speed',
        description: 'Faster detailing',
      },
    },
    staffConfig: {
      baseCost: 700,
      maxStaff: 3,
    },
  },
};
