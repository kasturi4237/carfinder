import axios from 'axios';

// Normally, you'd use an actual API endpoint
// For this example, we'll simulate API responses

// Sample car brands
const BRANDS = [
  'Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 
  'Ford', 'Tesla', 'Nissan', 'Hyundai', 'Kia',
  'Chevrolet', 'Volkswagen', 'Volvo', 'Mazda', 'Lexus'
];

// Sample fuel types
const FUEL_TYPES = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];

// Generate random cars
const generateCars = (count = 50) => {
  const cars = [];
  
  for (let i = 1; i <= count; i++) {
    const brand = BRANDS[Math.floor(Math.random() * BRANDS.length)];
    const fuelType = FUEL_TYPES[Math.floor(Math.random() * FUEL_TYPES.length)];
    const price = Math.floor(Math.random() * 90000) + 10000; // $10,000 to $100,000
    const seatingCapacity = Math.floor(Math.random() * 4) + 2; // 2 to 5
    
    const models = {
      'Toyota': ['Corolla', 'Camry', 'RAV4', 'Highlander', 'Tacoma'],
      'Honda': ['Civic', 'Accord', 'CR-V', 'Pilot', 'Odyssey'],
      'BMW': ['3 Series', '5 Series', 'X3', 'X5', 'i4'],
      'Mercedes': ['A-Class', 'C-Class', 'E-Class', 'GLC', 'S-Class'],
      'Audi': ['A3', 'A4', 'Q5', 'Q7', 'e-tron'],
      'Ford': ['F-150', 'Mustang', 'Explorer', 'Escape', 'Bronco'],
      'Tesla': ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'],
      'Nissan': ['Altima', 'Sentra', 'Rogue', 'Pathfinder', 'Leaf'],
      'Hyundai': ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Ioniq'],
      'Kia': ['Forte', 'K5', 'Sportage', 'Telluride', 'Soul'],
      'Chevrolet': ['Malibu', 'Silverado', 'Equinox', 'Tahoe', 'Bolt'],
      'Volkswagen': ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'ID.4'],
      'Volvo': ['S60', 'XC40', 'XC60', 'XC90', 'V60'],
      'Mazda': ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5'],
      'Lexus': ['ES', 'RX', 'NX', 'IS', 'UX']
    };
    
    const model = models[brand][Math.floor(Math.random() * models[brand].length)];
    const year = Math.floor(Math.random() * 5) + 2019; // 2019 to 2023
    
    cars.push({
      id: i,
      brand,
      model,
      year,
      price,
      fuelType,
      seatingCapacity,
      description: `The ${year} ${brand} ${model} is a ${seatingCapacity}-seater vehicle powered by a ${fuelType.toLowerCase()} engine. It offers excellent performance, comfort, and reliability for everyday driving and long trips.`,
      features: [
        'Bluetooth Connectivity',
        'USB Charging Ports',
        'Navigation System',
        'Backup Camera',
        'Keyless Entry'
      ],
      image: `https://source.unsplash.com/640x480/?car,${brand.toLowerCase()}`
    });
  }
  
  return cars;
};

// All cars data
const ALL_CARS = generateCars();

// Get all available car brands from the dataset
export const getBrands = () => {
  return [...new Set(ALL_CARS.map(car => car.brand))].sort();
};

// Get all available fuel types from the dataset
export const getFuelTypes = () => {
  return [...new Set(ALL_CARS.map(car => car.fuelType))].sort();
};

// Get seating capacity options
export const getSeatingOptions = () => {
  return [...new Set(ALL_CARS.map(car => car.seatingCapacity))].sort((a, b) => a - b);
};

// Simulate API request delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Filter cars based on parameters
export const fetchCars = async (params) => {
  // Simulate network delay
  await delay(800);
  
  const {
    search = '',
    brand = '',
    minPrice = 0,
    maxPrice = 100000,
    fuelType = '',
    seatingCapacity = '',
    page = 1,
    limit = 10,
    sortBy = '',
    sortOrder = 'asc'
  } = params;
  
  // Filter cars based on parameters
  let filteredCars = [...ALL_CARS];
  
  // Apply search filter
  if (search) {
    const searchLower = search.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.brand.toLowerCase().includes(searchLower) || 
      car.model.toLowerCase().includes(searchLower)
    );
  }
  
  // Apply brand filter
  if (brand) {
    filteredCars = filteredCars.filter(car => car.brand === brand);
  }
  
  // Apply price range filter
  filteredCars = filteredCars.filter(car => 
    car.price >= minPrice && car.price <= maxPrice
  );
  
  // Apply fuel type filter
  if (fuelType) {
    filteredCars = filteredCars.filter(car => car.fuelType === fuelType);
  }
  
  // Apply seating capacity filter
  if (seatingCapacity) {
    filteredCars = filteredCars.filter(car => car.seatingCapacity === Number(seatingCapacity));
  }
  
  // Apply sorting
  if (sortBy) {
    filteredCars.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }
  
  // Calculate pagination
  const total = filteredCars.length;
  const totalPages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const paginatedCars = filteredCars.slice(offset, offset + limit);
  
  return {
    data: paginatedCars,
    pagination: {
      total,
      totalPages,
      currentPage: page,
      limit
    }
  };
};

// Get car by ID
export const getCarById = async (id) => {
  // Simulate network delay
  await delay(300);
  
  const car = ALL_CARS.find(car => car.id === Number(id));
  
  if (!car) {
    throw new Error('Car not found');
  }
  
  return car;
};

// For a real app, you would define actual API calls using axios like this:
// export const fetchCars = async (params) => {
//   try {
//     const response = await axios.get('https://api.example.com/cars', { params });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching cars:', error);
//     throw error;
//   }
// };

// export default { fetchCars, getCarById, getBrands, getFuelTypes, getSeatingOptions };