import { Product, Coupon } from '../types';

export const MOCK_COUPONS: Coupon[] = [
  { code: 'SAVE10', description: '10% off on any order', discountPercent: 10 },
  { code: 'PROFIT20', description: '20% off on orders over ₹3,000', discountPercent: 20, minSpend: 3000 },
  { code: 'FREESHIP', description: 'Free Express Shipping', freeShipping: true },
  { code: 'GEAR500', description: '₹500 flat off on orders over ₹5,000', discountAmount: 500, minSpend: 5000 },
];

export const INITIAL_PRODUCTS: Product[] = [
  // 1. Brake Pads
  {
    id: 'prod-brk-01',
    name: 'Brembo Ceramic Premium Front Brake Pad Set',
    sku: 'BRM-P06024N',
    brand: 'Brembo',
    category: 'Brake Pads',
    price: 2499,
    originalPrice: 3299,
    rating: 4.9,
    reviewCount: 142,
    stockCount: 28,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Best Seller', 'OEM Standard', 'Low Dust'],
    description: 'Engineered specifically for superior stopping power, zero squeal, and ultra-low brake dust. Brembo proprietary ceramic compound delivers consistent thermal stability under demanding conditions.',
    shortDescription: 'Ultra-low dust ceramic front brake pads for high-performance stopping.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2022, make: 'Ford', model: 'F-150' },
      { year: 2023, make: 'Ford', model: 'F-150' },
      { year: 2024, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Toyota', model: 'Camry' },
      { year: 2022, make: 'Toyota', model: 'Camry' },
      { year: 2023, make: 'Toyota', model: 'Camry' },
      { year: 2022, make: 'Honda', model: 'Civic' },
      { year: 2023, make: 'Honda', model: 'Civic' },
      { year: 2024, make: 'Honda', model: 'Civic' },
      { year: 2020, make: 'BMW', model: '3 Series (330i / M340i)' },
      { year: 2021, make: 'BMW', model: '3 Series (330i / M340i)' }
    ],
    specifications: [
      { name: 'Pad Material', value: 'Formulated Ceramic Blend' },
      { name: 'Position', value: 'Front Axle (Left & Right)' },
      { name: 'Hardware Included', value: 'Yes (Stainless Shims & Clips)' },
      { name: 'Sensor Wire', value: 'Integrated Electronic Wear Sensor' },
      { name: 'Thickness', value: '17.8 mm' }
    ],
    features: [
      'Multi-layer rubber sound-insulating anti-squeal shims',
      'OE-matched chamfers and slots for silent friction contact',
      'Pre-scorched friction material for immediate pedal bite without bedding period'
    ],
    reviews: [
      { id: 'r1', author: 'Marcus V.', rating: 5, date: '2025-01-14', title: 'Zero dust and silent braking!', comment: 'Installed these on my 2022 F-150. Stopping distance is visibly shorter and my wheels stay silver with no black dust.', verifiedPurchase: true, helpfulCount: 23 },
      { id: 'r2', author: 'David K.', rating: 5, date: '2024-12-02', title: 'Top-tier Brembo quality', comment: 'Came with all clips and grease. Direct fitment, 45 min installation.', verifiedPurchase: true, helpfulCount: 9 }
    ],
    warranty: '3-Year / 36,000-Mile Limited Manufacturer Warranty',
    weightLbs: 4.8,
    oemPartNumber: 'OE-BRM-8490-X'
  },
  {
    id: 'prod-brk-02',
    name: 'PowerStop Z23 Evolution Sport Carbon-Fiber Rear Brake Pads',
    sku: 'PWS-Z23-1430',
    brand: 'PowerStop',
    category: 'Brake Pads',
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 88,
    stockCount: 19,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Sport Grade', 'Carbon Fiber Infused'],
    description: 'Engineered with carbon-fiber infused ceramic formula for daily drivers looking for enhanced braking torque without sacrificing everyday driveability.',
    shortDescription: 'Carbon-fiber ceramic rear brake pads for improved pedal response.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2019, make: 'Ford', model: 'Mustang' },
      { year: 2020, make: 'Ford', model: 'Mustang' },
      { year: 2021, make: 'Ford', model: 'Mustang' },
      { year: 2022, make: 'Ford', model: 'Mustang' },
      { year: 2023, make: 'Ford', model: 'Mustang' },
      { year: 2020, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2021, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2022, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2021, make: 'Subaru', model: 'WRX' },
      { year: 2022, make: 'Subaru', model: 'WRX' }
    ],
    specifications: [
      { name: 'Pad Material', value: 'Carbon-Fiber Ceramic Matrix' },
      { name: 'Position', value: 'Rear Axle' },
      { name: 'Hardware Included', value: 'Premium Stainless Clips & Hi-Temp Lube' },
      { name: 'Backing Plate', value: 'Powder-coated rust inhibitor' }
    ],
    features: [
      'Resists brake fade up to 1,200°F (650°C)',
      'Dual-layer rubberized shims isolate noise',
      'Includes ceramic brake lubricant packet'
    ],
    reviews: [
      { id: 'r3', author: 'Tyler S.', rating: 5, date: '2025-02-01', title: 'Great upgrade over factory stock', comment: 'Put these on my Mustang GT. Rear bite is fantastic through twisty backroads.', verifiedPurchase: true, helpfulCount: 14 }
    ],
    warranty: '2-Year / 24,000-Mile Warranty',
    weightLbs: 3.6,
    oemPartNumber: 'OE-PWS-2309-R'
  },

  // 2. Batteries
  {
    id: 'prod-bat-01',
    name: 'Optima RedTop AGM High-Performance Starting Battery',
    sku: 'OPT-RED-34-78',
    brand: 'Optima Batteries',
    category: 'Batteries',
    price: 14999,
    originalPrice: 17999,
    rating: 4.9,
    reviewCount: 310,
    stockCount: 14,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1597762612216-95308bca0f0d?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Top Pick', '15x Vibration Resistant', 'Spill-Proof AGM'],
    description: 'The Optima RedTop high-performance AGM battery delivers unmatched starting burst for hard-working trucks, SUVs, and high-horsepower vehicles. SpiralCell technology provides 15 times more vibration resistance.',
    shortDescription: '800 CCA ultra-durable AGM starting battery with SpiralCell technology.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2018, make: 'Ford', model: 'F-150' },
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2022, make: 'Ford', model: 'F-150' },
      { year: 2023, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Jeep', model: 'Wrangler' },
      { year: 2021, make: 'Jeep', model: 'Wrangler' },
      { year: 2022, make: 'Jeep', model: 'Wrangler' },
      { year: 2023, make: 'Jeep', model: 'Wrangler' },
      { year: 2020, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2021, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2022, make: 'Toyota', model: 'Tacoma' },
      { year: 2023, make: 'Toyota', model: 'Tacoma' }
    ],
    specifications: [
      { name: 'Cold Cranking Amps (CCA)', value: '800 A' },
      { name: 'Cranking Amps (CA)', value: '1,000 A' },
      { name: 'Reserve Capacity (RC)', value: '100 Minutes' },
      { name: 'Voltage', value: '12 Volts' },
      { name: 'Group Size', value: '34/78 Dual Terminal' },
      { name: 'Technology', value: 'Absorbent Glass Mat (AGM)' }
    ],
    features: [
      'Strongest 5-second ignition burst in freezing temperatures (-20°F)',
      '100% spill-proof and mountable in virtually any orientation',
      '3x longer service life compared to conventional lead-acid batteries'
    ],
    reviews: [
      { id: 'r4', author: 'Brian H.', rating: 5, date: '2025-01-20', title: 'Starts instantly in freezing snow', comment: 'Installed in my Jeep Wrangler. Left it outside in 5°F weather in Minnesota, started on first key turn like butter.', verifiedPurchase: true, helpfulCount: 42 }
    ],
    warranty: '3-Year Free Replacement Warranty',
    weightLbs: 38.8,
    oemPartNumber: 'OPT-8004-003'
  },
  {
    id: 'prod-bat-02',
    name: 'NOCO Boost Plus GB40 1000A UltraSafe Car Jump Starter Pack',
    sku: 'NOC-GB40-1000',
    brand: 'NOCO',
    category: 'Batteries',
    price: 6499,
    originalPrice: 7999,
    rating: 4.9,
    reviewCount: 450,
    stockCount: 42,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1597762612216-95308bca0f0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Universal Fit', 'Essential Gear', 'Emergency Ready'],
    description: 'Compact yet powerful 1000-amp lithium jump starter that safely jump-starts a dead battery in seconds. Spark-proof technology and reverse polarity protection make it safe for anyone to use.',
    shortDescription: '1000 Amp lithium emergency jump starter box & USB power bank.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Peak Current', value: '1,000 Amps' },
      { name: 'Gas Engine Rating', value: 'Up to 6.0 Liters' },
      { name: 'Diesel Engine Rating', value: 'Up to 3.0 Liters' },
      { name: 'Internal Battery', value: '24 Watt-Hour Lithium-Ion' },
      { name: 'Flashlight', value: '100 Lumen LED (7 light modes + SOS)' }
    ],
    features: [
      'Up to 20 jump starts on a single USB charge',
      'UltraSafe spark-proof connection cables with rugged heavy-duty clamps',
      'Recharges smartphones, tablets, and other 5V USB electronics on the go'
    ],
    reviews: [
      { id: 'r5', author: 'Elena R.', rating: 5, date: '2025-02-10', title: 'Saved me in an airport parking garage', comment: 'Every driver must keep this in their glove box. Super compact and jumped my SUV instantly.', verifiedPurchase: true, helpfulCount: 38 }
    ],
    warranty: '1-Year Limited Warranty',
    weightLbs: 2.4,
    oemPartNumber: 'NOC-BOOST-GB40'
  },

  // 3. Tires & Wheels
  {
    id: 'prod-tir-01',
    name: 'Michelin Defender LTX M/S All-Season Highway Tire (275/55R20)',
    sku: 'MCH-DEF-2755520',
    brand: 'Michelin',
    category: 'Tires & Wheels',
    price: 8999,
    originalPrice: 10499,
    rating: 4.9,
    reviewCount: 215,
    stockCount: 16,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['70k Mile Warranty', 'Best in Wet Traction', 'Quiet Ride'],
    description: 'Michelin premier truck & SUV tire offering exceptional tread life, unmatched wet traction, and fuel efficiency via Evertread compound.',
    shortDescription: 'All-season truck & SUV tire with outstanding tread life and wet grip.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2022, make: 'Ford', model: 'F-150' },
      { year: 2023, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2021, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2022, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2021, make: 'Toyota', model: 'Tundra' },
      { year: 2022, make: 'Toyota', model: 'Tundra' }
    ],
    specifications: [
      { name: 'Tire Size', value: '275/55R20 113T' },
      { name: 'Load Index / Speed', value: '113T (2,535 lbs / 118 mph)' },
      { name: 'Tread Depth', value: '12/32"' },
      { name: 'UTQG', value: '720 A A' },
      { name: 'Max PSI', value: '44 PSI' }
    ],
    features: [
      'Evertread compound resists wear under severe torque loads and towing',
      'MaxTouch Construction optimizes road contact patch for longer life',
      'Active siping locks together under pressure for sharp steering response'
    ],
    reviews: [
      { id: 'r6', author: 'Tom G.', rating: 5, date: '2025-01-05', title: 'Quietest highway tire on my truck', comment: 'Replaced OEM tires with these Defenders. 15,000 miles later they still look brand new and rain driving is rock solid.', verifiedPurchase: true, helpfulCount: 19 }
    ],
    warranty: '70,000-Mile Manufacturer Treadwear Warranty',
    weightLbs: 41.2,
    oemPartNumber: 'MCH-04351'
  },
  {
    id: 'prod-tir-02',
    name: 'Gorilla Automotive 24-Piece Black Chrome Spline Lug Nut Kit (14mm x 1.5)',
    sku: 'GOR-21144BC',
    brand: 'Gorilla Automotive',
    category: 'Tires & Wheels',
    price: 2499,
    originalPrice: 3199,
    rating: 4.7,
    reviewCount: 94,
    stockCount: 35,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Anti-Theft Spline', 'Rust-Proof Finish'],
    description: 'Cold-forged triple black chrome plated steel lug nuts with closed-end spline drive design. Includes dual-hex key adapter for maximum security and wheel protection.',
    shortDescription: 'Heavy-duty black chrome locking lug nuts set with security tool.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2018, make: 'Ford', model: 'F-150' },
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2022, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Chevrolet', model: 'Silverado 1500' },
      { year: 2021, make: 'Chevrolet', model: 'Silverado 1500' }
    ],
    specifications: [
      { name: 'Thread Pitch', value: 'M14 x 1.50' },
      { name: 'Seating', value: '60° Conical Acorn' },
      { name: 'Overall Length', value: '2.00 inches' },
      { name: 'Finish', value: 'Triple Plated Black Chrome' },
      { name: 'Quantity', value: '24 Lugs + 1 Key Tool' }
    ],
    features: [
      'Cold-forged and heat-treated steel alloy for extreme shear strength',
      'Narrow 0.80" diameter fits tight aftermarket and OEM wheel recessed pockets'
    ],
    reviews: [
      { id: 'r7', author: 'Derek W.', rating: 5, date: '2024-11-18', title: 'Clean aggressive look', comment: 'Gives my black wheels a flawless flush finish. No chipping after multiple tire rotations.', verifiedPurchase: true, helpfulCount: 8 }
    ],
    warranty: '1-Year Finish Warranty',
    weightLbs: 4.1,
    oemPartNumber: 'GOR-BC-14150'
  },

  // 4. Engine Parts
  {
    id: 'prod-eng-01',
    name: 'K&N High-Flow Washable Air Filter Drop-In Replacement',
    sku: 'KNN-33-2287',
    brand: 'K&N Engineering',
    category: 'Engine Parts',
    price: 3499,
    originalPrice: 4299,
    rating: 4.8,
    reviewCount: 380,
    stockCount: 32,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Million Mile Warranty', 'Reusable / Washable', '+50% Airflow'],
    description: 'Designed to increase horsepower and acceleration while providing exceptional engine filtration. Washable and reusable for the entire lifespan of your vehicle.',
    shortDescription: 'High-flow oiled cotton gauze drop-in replacement air filter.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2018, make: 'Ford', model: 'F-150' },
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2022, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'Mustang' },
      { year: 2021, make: 'Ford', model: 'Mustang' },
      { year: 2022, make: 'Ford', model: 'Mustang' },
      { year: 2020, make: 'Toyota', model: 'Camry' },
      { year: 2021, make: 'Toyota', model: 'Camry' },
      { year: 2022, make: 'Toyota', model: 'Camry' },
      { year: 2021, make: 'Honda', model: 'Civic' },
      { year: 2022, make: 'Honda', model: 'Civic' }
    ],
    specifications: [
      { name: 'Filter Material', value: '4-Ply Layered Cotton Gauze' },
      { name: 'Washable', value: 'Yes (Wash every 50,000 miles)' },
      { name: 'Shape', value: 'Panel OE Exact Fit' },
      { name: 'Height', value: '1.25 in (32 mm)' }
    ],
    features: [
      'Increases engine horsepower and throttle response',
      'Saves money: Never buy disposable paper air filters again',
      'Emissions legal in all 50 US states (CARB EO compliant)'
    ],
    reviews: [
      { id: 'r8', author: 'Austin P.', rating: 5, date: '2025-01-30', title: 'Better throttle pickup immediately', comment: 'Dropped right into the factory airbox in 2 minutes. Noticeable induction sound and slight MPG improvement.', verifiedPurchase: true, helpfulCount: 16 }
    ],
    warranty: '10-Year / 1,000,000-Mile Limited Warranty',
    weightLbs: 1.5,
    oemPartNumber: 'OE-KNN-FA1883'
  },
  {
    id: 'prod-eng-02',
    name: 'NGK Laser Iridium Spark Plug 4-Pack (ILZKR7B11)',
    sku: 'NGK-93175-4PK',
    brand: 'NGK Spark Plugs',
    category: 'Engine Parts',
    price: 1899,
    originalPrice: 2499,
    rating: 4.9,
    reviewCount: 190,
    stockCount: 45,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['OEM Recommended', 'Laser Welded Iridium', '100k Mile Life'],
    description: 'Laser-welded iridium center electrode tip ensures high durability and greater spark efficiency. Platinum disc welded to backside of ground electrode provides long life.',
    shortDescription: 'Ultra-fine tip laser iridium spark plugs for maximum combustion efficiency.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2018, make: 'Honda', model: 'Civic' },
      { year: 2019, make: 'Honda', model: 'Civic' },
      { year: 2020, make: 'Honda', model: 'Civic' },
      { year: 2021, make: 'Honda', model: 'Civic' },
      { year: 2022, make: 'Honda', model: 'Civic' },
      { year: 2019, make: 'Honda', model: 'CR-V' },
      { year: 2020, make: 'Honda', model: 'CR-V' },
      { year: 2021, make: 'Honda', model: 'CR-V' },
      { year: 2020, make: 'Toyota', model: 'RAV4' },
      { year: 2021, make: 'Toyota', model: 'RAV4' },
      { year: 2022, make: 'Toyota', model: 'RAV4' }
    ],
    specifications: [
      { name: 'Center Electrode Tip', value: '0.6mm Laser Welded Iridium' },
      { name: 'Ground Electrode', value: 'Platinum Tipped' },
      { name: 'Thread Size', value: '14mm x 1.25' },
      { name: 'Pre-gapped', value: 'Yes (0.044 in / 1.1mm)' }
    ],
    features: [
      'Superior anti-fouling characteristics and faster cold starts',
      'Trivalent metal plating provides superior anti-corrosion & anti-seizing',
      'Smooths out rough engine idles and optimizes fuel consumption'
    ],
    reviews: [
      { id: 'r9', author: 'Sam T.', rating: 5, date: '2025-02-04', title: 'Factory idle returned to smooth like new', comment: 'Installed at 90k miles on my Honda CR-V. Cold start misfires eliminated completely.', verifiedPurchase: true, helpfulCount: 22 }
    ],
    warranty: 'Factory Lifetime Warranty',
    weightLbs: 0.8,
    oemPartNumber: 'NGK-93175'
  },
  {
    id: 'prod-eng-03',
    name: 'Mobil 1 Extended Performance Full Synthetic 5W-30 Motor Oil (5 Litres)',
    sku: 'MOB-5W30-EP5Q',
    brand: 'Mobil 1',
    category: 'Engine Parts',
    price: 2899,
    originalPrice: 3499,
    rating: 4.9,
    reviewCount: 520,
    stockCount: 60,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1597762612216-95308bca0f0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['20k km Protection', 'Triple Action Formula', 'Full Synthetic'],
    description: 'Advanced full synthetic motor oil designed to protect for 20,000 km between oil changes. Controls oxidation to prevent oil breakdown and maintain thermal stability.',
    shortDescription: 'Advanced 20,000-km guaranteed engine wear protection synthetic oil.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Viscosity Grade', value: 'SAE 5W-30' },
      { name: 'Volume', value: '5 Litres' },
      { name: 'Specification Approvals', value: 'API SP, ILSAC GF-6A, GM dexos1 Gen 3' },
      { name: 'Pour Point', value: '-42°C (-44°F)' }
    ],
    features: [
      'Triple Action+ formula enhances engine performance, power, and cleanliness',
      'Protects critical turbochargers under intense heat up to 500°F (260°C)'
    ],
    reviews: [
      { id: 'r10', author: 'Frank M.', rating: 5, date: '2025-01-28', title: 'Only oil I use in my trucks', comment: 'Lab oil analysis at 10,000 miles showed virtually zero wear metals.', verifiedPurchase: true, helpfulCount: 31 }
    ],
    warranty: 'Mobil 1 20,000-Mile Limited Warranty',
    weightLbs: 9.8,
    oemPartNumber: 'MOB-124317'
  },

  // 5. Lights & Bulbs
  {
    id: 'prod-lig-01',
    name: 'Philips Ultinon Pro9000 LED Headlight Bulb Pair (H11 / H8 / H16)',
    sku: 'PHI-11362U90CWX2',
    brand: 'Philips Automotive',
    category: 'Lights & Bulbs',
    price: 4499,
    originalPrice: 5999,
    rating: 4.8,
    reviewCount: 164,
    stockCount: 22,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['+250% Brighter', '5800K Cool White', 'No Glare Beam'],
    description: 'Up to 250% brighter light output on the road with precision beam cutoff that will not blind oncoming motorists. Built with automotive-grade Lumileds TopContact LEDs with AirBoost cooling.',
    shortDescription: 'High-power 5800K pure white LED conversion kit with precision optics.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2018, make: 'Ford', model: 'F-150' },
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Toyota', model: 'RAV4' },
      { year: 2022, make: 'Toyota', model: 'RAV4' },
      { year: 2020, make: 'Honda', model: 'CR-V' },
      { year: 2021, make: 'Honda', model: 'CR-V' },
      { year: 2021, make: 'Subaru', model: 'Outback' },
      { year: 2022, make: 'Subaru', model: 'Outback' }
    ],
    specifications: [
      { name: 'Bulb Socket', value: 'H11 / H8 / H16' },
      { name: 'Color Temperature', value: '5,800 Kelvin (Crisp Daylight)' },
      { name: 'Lumen Output', value: '5,800 Lumens Pair' },
      { name: 'Cooling', value: 'AirBoost Copper Heat-Pipe + Fan' },
      { name: 'Lifespan', value: '5,000+ Hours' }
    ],
    features: [
      'Perfect OEM beam pattern with sharp optical cutoff line',
      'CANbus ready driver prevents dashboard error warnings or bulb flickering',
      'IP65 water and dust resistant aluminum alloy body'
    ],
    reviews: [
      { id: 'r11', author: 'Carlos N.', rating: 5, date: '2025-01-19', title: 'Night and day difference!', comment: 'Total visibility transformation on dark unlit country roads. Clear cutoff line so oncoming drivers never flash me.', verifiedPurchase: true, helpfulCount: 27 }
    ],
    warranty: '5-Year Extended Manufacturer Warranty',
    weightLbs: 1.1,
    oemPartNumber: 'PHI-U90-H11'
  },
  {
    id: 'prod-lig-02',
    name: 'Rigid Industries 10" E-Series PRO Spot/Flood Combo LED Light Bar',
    sku: 'RIG-110312',
    brand: 'Rigid Industries',
    category: 'Lights & Bulbs',
    price: 11999,
    originalPrice: 14999,
    rating: 4.9,
    reviewCount: 78,
    stockCount: 8,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Off-Road Grade', 'IP68 Submersible', 'Rugged Alloy'],
    description: 'Extruded aluminum housing with unbreakable polycarbonate lens. Combination optic creates a concentrated center spot beam with wide flood peripheral illumination for off-road trails.',
    shortDescription: 'Torture-tested off-road combo LED light bar with wiring harness.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2019, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2022, make: 'Ford', model: 'Bronco' },
      { year: 2023, make: 'Ford', model: 'Bronco' },
      { year: 2020, make: 'Jeep', model: 'Wrangler' },
      { year: 2021, make: 'Jeep', model: 'Wrangler' },
      { year: 2022, make: 'Jeep', model: 'Wrangler' },
      { year: 2021, make: 'Toyota', model: 'Tacoma' },
      { year: 2022, make: 'Toyota', model: 'Tacoma' }
    ],
    specifications: [
      { name: 'Raw Lumens', value: '11,100 Lumens' },
      { name: 'Wattage', value: '79 Watts' },
      { name: 'Beam Distance', value: '625 Meters (1 lux)' },
      { name: 'Housing', value: 'Black Anodized 6063 Aluminum' }
    ],
    features: [
      'Includes plug-and-play wiring harness with illuminated dashboard switch and relay',
      'Tested against vibration, pressure washing, saltwater corrosion, and dust ingress'
    ],
    reviews: [
      { id: 'r12', author: 'Logan B.', rating: 5, date: '2024-12-15', title: 'Indestructible light bar', comment: 'Mounted onto my Jeep bumper. Been through rock crawling and river crossings with zero moisture condensation inside.', verifiedPurchase: true, helpfulCount: 18 }
    ],
    warranty: 'Limited Lifetime Warranty',
    weightLbs: 4.5,
    oemPartNumber: 'RIG-EPRO-10'
  },

  // 6. Electronics & Audio
  {
    id: 'prod-ele-01',
    name: 'Pioneer DMH-W4660NEX 6.8" Wireless Apple CarPlay & Android Auto Receiver',
    sku: 'PIO-DMH-W4660',
    brand: 'Pioneer',
    category: 'Electronics & Audio',
    price: 18999,
    originalPrice: 22999,
    rating: 4.7,
    reviewCount: 122,
    stockCount: 11,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Wireless CarPlay', 'Capacitive HD Touch', 'Hi-Res Audio'],
    description: 'Double-DIN digital multimedia receiver featuring built-in Wi-Fi for wireless Apple CarPlay and Android Auto connectivity, Bluetooth audio streaming, 13-band graphic EQ, and backup camera input.',
    shortDescription: '6.8" capacitive touchscreen receiver with wireless smartphone mirroring.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Display Size', value: '6.8-inch Capacitive Touch Panel' },
      { name: 'Connectivity', value: 'Wi-Fi, Bluetooth 5.0, USB Type-C' },
      { name: 'Preamp Outputs', value: '6-channel (4V Front, Rear, Sub)' },
      { name: 'Audio DAC', value: '24-Bit / 96 kHz Hi-Res Playback' }
    ],
    features: [
      'Seamless wireless Apple CarPlay and wireless Android Auto without cables',
      'Dual backup camera inputs with customizable parking guide distance lines',
      'Short chassis (depth < 3.5 inches) for effortless mounting in tight vehicle dashes'
    ],
    reviews: [
      { id: 'r13', author: 'Jason K.', rating: 5, date: '2025-01-11', title: 'Wireless CarPlay connects instantly', comment: 'Screen is responsive like an iPad. Boots up in 4 seconds when turning the car key.', verifiedPurchase: true, helpfulCount: 35 }
    ],
    warranty: '1-Year Limited Manufacturer Warranty',
    weightLbs: 3.2,
    oemPartNumber: 'PIO-W4660-NEX'
  },
  {
    id: 'prod-ele-02',
    name: 'VIOFO A129 Pro Duo 4K UHD Front & 1080P Rear Dual Dash Cam',
    sku: 'VIO-A129-PRO-DUO',
    brand: 'VIOFO',
    category: 'Electronics & Audio',
    price: 8999,
    originalPrice: 10999,
    rating: 4.8,
    reviewCount: 280,
    stockCount: 24,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Real 4K Sony Sensor', 'Buffered Parking Mode', 'Dual Channel'],
    description: 'Equipped with Sony 8MP Starvis sensor delivering true 3840x2160P 4K resolution at 30fps with HDR night vision. Dual-band Wi-Fi and built-in GPS logger track speed and coordinates.',
    shortDescription: 'True 4K front + 1080P rear dual dash cam with Sony Starvis sensor.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Front Resolution', value: 'Ultra HD 4K (3840 x 2160 @ 30fps)' },
      { name: 'Rear Resolution', value: 'Full HD 1080P (1920 x 1080 @ 30fps)' },
      { name: 'Lens Angle', value: '130° Front Wide Angle + 140° Rear' },
      { name: 'Storage Support', value: 'MicroSD up to 256GB (U3 required)' },
      { name: 'Power Source', value: 'Supercapacitor (Heat & Cold proof)' }
    ],
    features: [
      'Supercapacitor withstands extreme summer heat (-10°C to 65°C) without swelling',
      'G-sensor auto locks collision footage to prevent overwriting during accidents',
      'Buffered 24/7 parking mode records 15 seconds before motion or impact'
    ],
    reviews: [
      { id: 'r14', author: 'Rachel M.', rating: 5, date: '2025-02-08', title: 'License plates legible day & night', comment: 'License plates are crisp and readable even at highway speeds. App makes downloading video clips easy.', verifiedPurchase: true, helpfulCount: 41 }
    ],
    warranty: '18-Month Manufacturer Warranty',
    weightLbs: 1.2,
    oemPartNumber: 'VIO-A129-4K'
  },
  {
    id: 'prod-ele-03',
    name: 'BlueDriver Pro Bluetooth OBDII Scan Tool & Code Reader',
    sku: 'BLU-OBD2-PRO',
    brand: 'BlueDriver',
    category: 'Electronics & Audio',
    price: 4999,
    originalPrice: 6499,
    rating: 4.9,
    reviewCount: 610,
    stockCount: 50,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Mechanic Approved', 'iOS & Android Sync', 'All-System Diagnostics'],
    description: 'Professional-grade scan tool trusted by certified mechanics. Reads and clears Check Engine codes, ABS, Airbag, TPMS, and transmission error codes with verified repair reports.',
    shortDescription: 'Wireless smartphone OBD2 diagnostic scanner with verified repair fixes.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Connection', value: 'Bluetooth Low Energy (BLE)' },
      { name: 'Supported Protocols', value: 'CAN, ISO9141, KWP2000, J1850 PWM & VPW' },
      { name: 'Vehicle Compatibility', value: 'All 1996+ gas/diesel OBDII vehicles' }
    ],
    features: [
      'Access database of over 30 million verified fixes reported by certified mechanics',
      'Live engine telemetry data graphing (RPM, coolant temp, fuel trims, O2 sensor voltage)',
      'Smog check readiness check before state vehicle inspections'
    ],
    reviews: [
      { id: 'r15', author: 'Greg D.', rating: 5, date: '2025-01-25', title: 'Diagnosed a bad O2 sensor in 30 seconds', comment: 'Paid for itself on the first day. Told me exact part number to replace and cleared the check engine light.', verifiedPurchase: true, helpfulCount: 65 }
    ],
    warranty: '1-Year Limited Warranty',
    weightLbs: 0.4,
    oemPartNumber: 'BLU-SCAN-V2'
  },

  // 7. Tools & Garage
  {
    id: 'prod-too-01',
    name: 'Daytona 3-Ton Heavy-Duty Professional Steel Floor Jack with Rapid Pump',
    sku: 'DAY-3T-RP-OR',
    brand: 'Daytona',
    category: 'Tools & Garage',
    price: 8499,
    originalPrice: 9999,
    rating: 4.9,
    reviewCount: 340,
    stockCount: 15,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Pro Garage', 'Dual Piston Rapid Pump', '3-Ton Capacity'],
    description: 'Heavy duty steel construction floor jack designed for professional shops and home garages. Dual-piston hydraulic system lifts heavy pickup trucks and SUVs to maximum height in just 3-1/2 pumps.',
    shortDescription: '3-ton low-profile hydraulic steel floor jack with dual piston pump.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Weight Capacity', value: '6,000 lbs (3 Ton)' },
      { name: 'Minimum Lift Height', value: '3-1/4 inches (Low Profile)' },
      { name: 'Maximum Lift Height', value: '19-7/8 inches' },
      { name: 'Handle Length', value: '50-1/4 inches with foam bumper pad' }
    ],
    features: [
      'Universal joint release mechanism provides smooth, controlled descent',
      'Heavy-duty swiveling rear casters with ball bearings for smooth garage maneuvering',
      'Padded rubber saddle protects vehicle chassis pinch welds from scratches'
    ],
    reviews: [
      { id: 'r16', author: 'Ken B.', rating: 5, date: '2025-02-02', title: 'Lifts my lifted F-150 effortlessly', comment: 'Solid steel construction, feels like shop equipment. Dual pistons reach lift point in seconds.', verifiedPurchase: true, helpfulCount: 33 }
    ],
    warranty: '3-Year Manufacturer Warranty',
    weightLbs: 78.5,
    oemPartNumber: 'DAY-3TON-LP'
  },
  {
    id: 'prod-too-02',
    name: 'DeWalt 20V MAX XR 1/2" High Torque Cordless Impact Wrench Kit (DCF899)',
    sku: 'DEW-DCF899P2',
    brand: 'DeWalt',
    category: 'Tools & Garage',
    price: 13999,
    originalPrice: 16999,
    rating: 4.9,
    reviewCount: 410,
    stockCount: 18,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['1,200 ft-lbs Breakaway', 'Brushless Motor', 'Includes 2x 5Ah Batteries'],
    description: 'Delivers up to 700 ft-lbs of maximum fastening torque and 1,200 ft-lbs of breakaway torque to remove stubborn rusted lug nuts and suspension bolts with zero effort.',
    shortDescription: '1/2" cordless brushless high-torque impact wrench kit with batteries & charger.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Breakaway Torque', value: '1,200 ft-lbs' },
      { name: 'Fastening Torque', value: '700 ft-lbs' },
      { name: 'Anvil Size', value: '1/2-inch Detent Pin' },
      { name: 'Speed Settings', value: '3-Speed Selector (400 / 1,200 / 1,900 RPM)' }
    ],
    features: [
      'Brushless motor for increased runtime and long-term durability',
      'Built-in LED work light with 20-second delay for dark undercarriage visibility',
      'Includes two 20V MAX 5.0Ah XR batteries, fast charger, and contractor storage case'
    ],
    reviews: [
      { id: 'r17', author: 'Mike R.', rating: 5, date: '2025-01-18', title: 'Breaks off rusted suspension bolts like butter', comment: 'Saved me hours during a strut and brake overhaul on my truck. No air hose dragging necessary!', verifiedPurchase: true, helpfulCount: 48 }
    ],
    warranty: '3-Year Limited Warranty + 1-Year Free Service',
    weightLbs: 12.4,
    oemPartNumber: 'DEW-DCF899P2'
  },
  {
    id: 'prod-too-03',
    name: 'CRAFTSMAN 159-Piece Mechanics Tool Set with 3-Drawer Storage Case',
    sku: 'CRF-CMMT12025',
    brand: 'CRAFTSMAN',
    category: 'Tools & Garage',
    price: 6499,
    originalPrice: 7999,
    rating: 4.8,
    reviewCount: 220,
    stockCount: 25,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Full Lifetime Warranty', '72-Tooth Ratchets', 'SAE & Metric'],
    description: 'Comprehensive mechanics tool set with 1/4" and 3/8" drive 72-tooth pear-head ratchets, 6-point sockets, wrenches, and driver bits organized in a durable 3-drawer metal tool chest.',
    shortDescription: '159-pc SAE & Metric mechanic socket and wrench set in 3-drawer chest.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Piece Count', value: '159 Pieces' },
      { name: 'Finish', value: 'Full Polish Chrome' },
      { name: 'Drive Sizes', value: '1/4-inch & 3/8-inch' },
      { name: 'Ratchet Swing Arc', value: '5° Minimum Swing' }
    ],
    features: [
      'Large stamped socket markings for quick size identification in low light',
      'Corrosion resistant chrome finish cleans up easily from greasy oil spills'
    ],
    reviews: [
      { id: 'r18', author: 'Tony G.', rating: 5, date: '2024-12-28', title: 'Every size socket I needed', comment: 'Has both shallow and deep sockets in both metric and imperial. Sturdy metal chest drawers.', verifiedPurchase: true, helpfulCount: 20 }
    ],
    warranty: 'Full Lifetime Replacement Warranty',
    weightLbs: 22.0,
    oemPartNumber: 'CRF-159PC'
  },

  // 8. Accessories & Care
  {
    id: 'prod-acc-01',
    name: 'WeatherTech Custom Laser Measured FloorLiner HP All-Weather Mat Set',
    sku: 'WT-449441-1',
    brand: 'WeatherTech',
    category: 'Accessories & Care',
    price: 8499,
    originalPrice: 9999,
    rating: 4.9,
    reviewCount: 380,
    stockCount: 20,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Laser Measured Fit', 'Raised Spill Lip', 'Heavy Duty'],
    description: 'Custom molded High-Performance TPE material provides ultimate interior carpet protection against rain, snow, mud, and drink spills. Features deep channels and a high lip to contain liquids.',
    shortDescription: 'Laser measured front & 2nd row deep reservoir all-weather floor liners.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2020, make: 'Ford', model: 'F-150' },
      { year: 2021, make: 'Ford', model: 'F-150' },
      { year: 2022, make: 'Ford', model: 'F-150' },
      { year: 2023, make: 'Ford', model: 'F-150' },
      { year: 2024, make: 'Ford', model: 'F-150' },
      { year: 2020, make: 'Toyota', model: 'RAV4' },
      { year: 2021, make: 'Toyota', model: 'RAV4' },
      { year: 2022, make: 'Toyota', model: 'RAV4' },
      { year: 2023, make: 'Toyota', model: 'RAV4' },
      { year: 2021, make: 'Jeep', model: 'Grand Cherokee' },
      { year: 2022, make: 'Jeep', model: 'Grand Cherokee' }
    ],
    specifications: [
      { name: 'Material', value: 'Thermoplastic Elastomer (TPE)' },
      { name: 'Coverage', value: '1st Row (Driver + Pass) & 2nd Row' },
      { name: 'Color', value: 'Satin Black' },
      { name: 'Retention', value: 'Factory Floor Post Locking' }
    ],
    features: [
      'Advanced surfacing channels fluids away from footwear to a lower reservoir',
      '100% recyclable material contains no harmful PVCs, cadmium, or lead',
      'Flexible even in sub-zero freezing winter temperatures'
    ],
    reviews: [
      { id: 'r19', author: 'Nate C.', rating: 5, date: '2025-01-22', title: 'Saved my carpets from melted snow & coffee', comment: 'Snaps right into the factory floor tabs. Lift out, hose down with water, dry and put back in.', verifiedPurchase: true, helpfulCount: 36 }
    ],
    warranty: 'Lifetime Limited Warranty',
    weightLbs: 11.2,
    oemPartNumber: 'WT-HP-44944'
  },
  {
    id: 'prod-acc-02',
    name: 'Chemical Guys HydroSlick Intense Gloss SiO2 Ceramic Coating Wax (16 oz)',
    sku: 'CG-WAC22916',
    brand: 'Chemical Guys',
    category: 'Accessories & Care',
    price: 1899,
    originalPrice: 2499,
    rating: 4.8,
    reviewCount: 260,
    stockCount: 40,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Hydrophobic Beading', 'SiO2 Ceramic Shield', 'Deep Mirror Gloss'],
    description: 'Hydrophobic ceramic gel that delivers the ease of a liquid wax with the unmatched longevity, hydrophobic water beading, and hyper-gloss reflection of a true SiO2 ceramic coating.',
    shortDescription: 'Hyper-gloss SiO2 ceramic coating gel with up to 1-year paint protection.',
    universalFit: true,
    compatibleVehicles: [],
    specifications: [
      { name: 'Volume', value: '16 fl. oz. (473 mL)' },
      { name: 'Formula', value: 'SiO2 Ceramic Suspension Gel' },
      { name: 'Durability', value: 'Up to 12 Months of Protection' },
      { name: 'Surfaces Safe On', value: 'Paint, Glass, Headlights, Gloss Wheels' }
    ],
    features: [
      'Creates intense water contact angle causing water to bead and roll right off',
      'Protects vehicle clear coat from UV rays, acid rain, bird droppings, and industrial fallout'
    ],
    reviews: [
      { id: 'r20', author: 'Julian S.', rating: 5, date: '2025-02-09', title: 'Mirror gloss and water flies off', comment: 'Wiped onto my black truck. Easiest ceramic wax I have ever applied. Water beads like marbles.', verifiedPurchase: true, helpfulCount: 29 }
    ],
    warranty: 'Satisfaction Guaranteed',
    weightLbs: 1.3,
    oemPartNumber: 'CG-HYDRO-16'
  },
  {
    id: 'prod-acc-03',
    name: 'Bosch ICON 26A & 16A ClearMax 365 Premium Beam Wiper Blade Pair',
    sku: 'BOS-IC-2616-PR',
    brand: 'Bosch Automotive',
    category: 'Accessories & Care',
    price: 1499,
    originalPrice: 1999,
    rating: 4.9,
    reviewCount: 510,
    stockCount: 38,
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80'
    ],
    badges: ['Top Rated Wipers', 'All-Weather ClearMax', '40% Longer Life'],
    description: 'Patented beam design with ClearMax 365 rubber technology provides up to 40% longer life than other premium blades. Aerodynamic spoiler reduces wind lift at highway speeds.',
    shortDescription: 'All-season aerodynamic beam wiper blades with dual rubber compound.',
    universalFit: false,
    compatibleVehicles: [
      { year: 2019, make: 'Toyota', model: 'RAV4' },
      { year: 2020, make: 'Toyota', model: 'RAV4' },
      { year: 2021, make: 'Toyota', model: 'RAV4' },
      { year: 2022, make: 'Toyota', model: 'RAV4' },
      { year: 2020, make: 'Honda', model: 'Civic' },
      { year: 2021, make: 'Honda', model: 'Civic' },
      { year: 2022, make: 'Honda', model: 'Civic' },
      { year: 2020, make: 'Nissan', model: 'Altima' },
      { year: 2021, make: 'Nissan', model: 'Altima' }
    ],
    specifications: [
      { name: 'Driver Blade Length', value: '26 inches (650 mm)' },
      { name: 'Passenger Blade Length', value: '16 inches (400 mm)' },
      { name: 'Rubber Compound', value: 'ClearMax 365 Dual Rubber' },
      { name: 'Connector Adapter', value: 'Top Lock / Hook / Side Pin Multi-Clip' }
    ],
    features: [
      'Enclosed tension spring keeps blade curved to match windshield curvature',
      'Quiet glide with zero chatter in heavy downpours or freezing sleet'
    ],
    reviews: [
      { id: 'r21', author: 'Ashley V.', rating: 5, date: '2025-01-16', title: 'Crystal clear streak-free wipe', comment: 'Replaced streak-prone factory wipers. Literally silent in heavy rain.', verifiedPurchase: true, helpfulCount: 44 }
    ],
    warranty: '1-Year Quality Guarantee',
    weightLbs: 1.4,
    oemPartNumber: 'BOS-26A16A'
  }
];

export const CATEGORIES_LIST: { name: string; icon: string; count: number; image: string; description: string }[] = [
  { name: 'Brake Pads', icon: 'Disc', count: 48, image: 'https://images.unsplash.com/photo-1600790142055-619df03207e6?auto=format&fit=crop&w=400&q=80', description: 'Ceramic, semi-metallic & sport brake pads & rotors' },
  { name: 'Batteries', icon: 'Zap', count: 32, image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80', description: 'AGM, heavy-duty starting batteries & jump starters' },
  { name: 'Tires & Wheels', icon: 'CircleDot', count: 64, image: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=400&q=80', description: 'All-season tires, lug nuts, rims & tire sensors' },
  { name: 'Engine Parts', icon: 'Cpu', count: 85, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=400&q=80', description: 'Filters, spark plugs, synthetic oils & gaskets' },
  { name: 'Lights & Bulbs', icon: 'Sun', count: 52, image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80', description: 'LED headlight conversions, fog lights & light bars' },
  { name: 'Electronics & Audio', icon: 'Radio', count: 39, image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80', description: 'Apple CarPlay stereos, 4K dash cams & OBD2 scanners' },
  { name: 'Tools & Garage', icon: 'Wrench', count: 70, image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80', description: 'Floor jacks, impact wrenches & socket sets' },
  { name: 'Accessories & Care', icon: 'Sparkles', count: 91, image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=400&q=80', description: 'WeatherTech mats, ceramic waxes & beam wipers' }
];

export const INITIAL_ORDERS = [
  {
    id: 'PW-84920',
    date: '2025-02-12',
    status: 'Shipped' as const,
    items: [
      {
        product: INITIAL_PRODUCTS[0], // Brembo pads
        quantity: 1,
        selectedVehicle: { year: 2022, make: 'Ford', model: 'F-150', trim: 'Lariat' }
      },
      {
        product: INITIAL_PRODUCTS[4], // K&N Air filter
        quantity: 1,
        selectedVehicle: { year: 2022, make: 'Ford', model: 'F-150', trim: 'Lariat' }
      }
    ],
    subtotal: 5998,
    discount: 600,
    couponCode: 'SAVE10',
    shippingFee: 0,
    tax: 431.84,
    total: 5829.84,
    shippingAddress: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+91 98765 43210',
      streetAddress: '742 Park Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    paymentDetails: {
      method: 'card' as const,
      cardLastFour: '4242',
      cardBrand: 'Visa',
      cardExp: '09/28'
    },
    trackingNumber: 'IN9928374610',
    carrier: 'BlueDart Express',
    estimatedDelivery: 'Feb 15, 2025'
  },
  {
    id: 'PW-73104',
    date: '2025-01-20',
    status: 'Delivered' as const,
    items: [
      {
        product: INITIAL_PRODUCTS[7], // BlueDriver OBD2
        quantity: 1
      }
    ],
    subtotal: 4999,
    discount: 0,
    shippingFee: 0,
    tax: 399.92,
    total: 5398.92,
    shippingAddress: {
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      phone: '+91 98765 43210',
      streetAddress: '742 Park Avenue',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India'
    },
    paymentDetails: {
      method: 'google_pay' as const
    },
    trackingNumber: 'DEL884920194',
    carrier: 'Delhivery Surface',
    estimatedDelivery: 'Jan 24, 2025'
  }
];
