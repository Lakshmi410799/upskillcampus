import { Vehicle } from '../types';

export interface VehicleOptionTree {
  [make: string]: {
    models: {
      name: string;
      years: number[];
      trims: string[];
      engines?: string[];
    }[];
  };
}

export const POPULAR_YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015];

export const VEHICLE_DATABASE: VehicleOptionTree = {
  Ford: {
    models: [
      { name: 'F-150', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Raptor'], engines: ['3.5L EcoBoost V6', '5.0L V8', '2.7L Turbo V6'] },
      { name: 'Mustang', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['EcoBoost', 'GT', 'Mach 1', 'Dark Horse', 'Shelby GT500'], engines: ['2.3L EcoBoost', '5.0L Coyote V8'] },
      { name: 'Explorer', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['Base', 'XLT', 'Limited', 'ST', 'Platinum'], engines: ['2.3L EcoBoost', '3.0L Twin-Turbo V6'] },
      { name: 'Bronco', years: [2021, 2022, 2023, 2024, 2025], trims: ['Big Bend', 'Black Diamond', 'Outer Banks', 'Badlands', 'Wildtrak', 'Raptor'], engines: ['2.3L EcoBoost', '2.7L EcoBoost V6'] }
    ]
  },
  Toyota: {
    models: [
      { name: 'RAV4', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['LE', 'XLE', 'XLE Premium', 'Adventure', 'TRD Off-Road', 'Limited'], engines: ['2.5L 4-Cylinder', '2.5L Hybrid'] },
      { name: 'Camry', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['LE', 'SE', 'XLE', 'XSE', 'TRD'], engines: ['2.5L 4-Cylinder', '3.5L V6'] },
      { name: 'Tacoma', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['SR', 'SR5', 'TRD Sport', 'TRD Off-Road', 'TRD Pro', 'Limited'], engines: ['2.7L 4-Cylinder', '3.5L V6', '2.4L i-FORCE MAX Turbo'] },
      { name: 'Corolla', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['L', 'LE', 'SE', 'XSE', 'GR Corolla'], engines: ['1.8L 4-Cylinder', '2.0L 4-Cylinder'] },
      { name: 'Tundra', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['SR', 'SR5', 'Limited', 'Platinum', '1794 Edition', 'TRD Pro'], engines: ['5.7L V8', '3.4L Twin-Turbo V6'] }
    ]
  },
  Honda: {
    models: [
      { name: 'Civic', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['LX', 'Sport', 'EX', 'Touring', 'Si', 'Type R'], engines: ['2.0L 4-Cylinder', '1.5L Turbo', '2.0L Turbo (Type R)'] },
      { name: 'CR-V', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['LX', 'Special Edition', 'EX', 'EX-L', 'Touring'], engines: ['2.4L 4-Cylinder', '1.5L Turbo'] },
      { name: 'Accord', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['LX', 'Sport', 'EX-L', 'Touring', 'Sport-L'], engines: ['1.5L Turbo', '2.0L Turbo', '2.0L Hybrid'] }
    ]
  },
  Chevrolet: {
    models: [
      { name: 'Silverado 1500', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['WT', 'Custom', 'LT', 'RST', 'LT Trail Boss', 'LTZ', 'High Country', 'ZR2'], engines: ['5.3L EcoTec3 V8', '6.2L EcoTec3 V8', '3.0L Duramax Turbo-Diesel'] },
      { name: 'Corvette', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['Stingray 1LT', 'Stingray 2LT', 'Stingray 3LT', 'Z06', 'E-Ray'], engines: ['6.2L LT2 V8', '5.5L LT6 Flat-Plane V8'] },
      { name: 'Equinox', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['LS', 'LT', 'RS', 'Premier'], engines: ['1.5L Turbo'] }
    ]
  },
  BMW: {
    models: [
      { name: '3 Series (330i / M340i)', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['330i', '330i xDrive', '330e', 'M340i', 'M340i xDrive', 'M3'], engines: ['2.0L TwinPower Turbo', '3.0L Inline-6 Turbo'] },
      { name: 'X5', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['sDrive40i', 'xDrive40i', 'xDrive45e', 'M50i', 'M60i', 'X5 M'], engines: ['3.0L Turbo I6', '4.4L Twin-Turbo V8'] }
    ]
  },
  Jeep: {
    models: [
      { name: 'Wrangler', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['Sport', 'Willys Sport', 'Sport S', 'Sahara', 'Rubicon', 'Rubicon 392'], engines: ['3.6L Pentastar V6', '2.0L Turbo I4', '6.4L HEMI V8'] },
      { name: 'Grand Cherokee', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['Laredo', 'Altitude', 'Limited', 'Overland', 'Summit', 'Trailhawk'], engines: ['3.6L V6', '5.7L HEMI V8'] }
    ]
  },
  Subaru: {
    models: [
      { name: 'Outback', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['Base', 'Premium', 'Limited', 'Touring', 'Onyx Edition XT', 'Wilderness'], engines: ['2.5L Boxer 4-Cyl', '2.4L Turbo Boxer'] },
      { name: 'WRX', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['Base', 'Premium', 'Limited', 'GT', 'TR'], engines: ['2.0L Turbo Boxer', '2.4L Turbo Boxer'] }
    ]
  },
  Nissan: {
    models: [
      { name: 'Altima', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['S', 'SV', 'SR', 'SL'], engines: ['2.5L 4-Cylinder', '2.0L VC-Turbo'] },
      { name: 'Rogue', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], trims: ['S', 'SV', 'SL', 'Platinum'], engines: ['2.5L 4-Cylinder', '1.5L VC-Turbo 3-Cyl'] }
    ]
  }
};

export const SAMPLE_USER_VEHICLES: Vehicle[] = [
  { year: 2022, make: 'Ford', model: 'F-150', trim: 'Lariat', engine: '3.5L EcoBoost V6' },
  { year: 2021, make: 'Toyota', model: 'RAV4', trim: 'XLE', engine: '2.5L 4-Cylinder' }
];

export function isVehicleCompatible(productCompat: Vehicle[], universal: boolean, targetVehicle?: Vehicle | null): boolean {
  if (universal) return true;
  if (!targetVehicle) return true;
  
  return productCompat.some(v => {
    const matchMake = v.make.toLowerCase() === targetVehicle.make.toLowerCase();
    const matchModel = v.model.toLowerCase() === targetVehicle.model.toLowerCase();
    const matchYear = !v.year || v.year === targetVehicle.year;
    return matchMake && matchModel && matchYear;
  });
}
