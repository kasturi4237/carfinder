import { useState, useEffect } from 'react';

// Mock data for demonstration
const mockCars = [
  {
    id: 1,
    brand: 'Toyota',
    model: 'Camry',
    year: 2022,
    price: 26500,
    fuelType: 'Gasoline',
    mileage: 12000,
    color: 'Silver',
    transmission: 'Automatic',
    engine: '2.5L I4',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Bluetooth Connectivity', 
      'Backup Camera', 
      'Apple CarPlay/Android Auto', 
      'Lane Departure Warning', 
      'Adaptive Cruise Control'
    ],
    description: 'This Toyota Camry is in excellent condition with low mileage. It includes many driver assistance features and modern connectivity options.'
  },
  {
    id: 2,
    brand: 'Honda',
    model: 'Civic',
    year: 2023,
    price: 24000,
    fuelType: 'Hybrid',
    mileage: 5000,
    color: 'Blue',
    transmission: 'CVT',
    engine: '1.5L Turbo',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Sunroof', 
      'Heated Seats', 
      'Wireless Charging', 
      'Blind Spot Monitoring', 
      'Premium Audio System'
    ],
    description: 'A nearly new Honda Civic with excellent fuel economy and a host of premium features. Perfect for city driving.'
  },
  {
    id: 3,
    brand: 'Ford',
    model: 'Explorer',
    year: 2021,
    price: 39500,
    fuelType: 'Gasoline',
    mileage: 28000,
    color: 'Black',
    transmission: 'Automatic',
    engine: '3.0L V6',
    seatingCapacity: 7,
    imageUrl: null,
    features: [
      'Third Row Seating', 
      'Leather Interior', 
      'Navigation System', 
      'Towing Package', 
      'Premium Sound System'
    ],
    description: 'Spacious family SUV with three-row seating and plenty of cargo space. Well maintained and ready for adventure.'
  },
  {
    id: 4,
    brand: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 48900,
    fuelType: 'Electric',
    mileage: 10000,
    color: 'White',
    transmission: 'Automatic',
    engine: 'Electric',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Autopilot', 
      'Glass Roof', 
      'Premium Interior', 
      'Long Range Battery', 
      'Supercharger Access'
    ],
    description: 'Tesla Model 3 with long-range battery and autopilot features. Clean history and in excellent condition.'
  },
  {
    id: 5,
    brand: 'BMW',
    model: '5 Series',
    year: 2021,
    price: 52000,
    fuelType: 'Gasoline',
    mileage: 18000,
    color: 'Gray',
    transmission: 'Automatic',
    engine: '3.0L I6',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Leather Seats', 
      'Harman Kardon Audio', 
      'Parking Assistant', 
      'Head-up Display', 
      'Heated Steering Wheel'
    ],
    description: 'Luxurious BMW 5 Series with premium features and excellent performance. A perfect blend of comfort and driving dynamics.'
  },
  {
    id: 6,
    brand: 'Chevrolet',
    model: 'Equinox',
    year: 2022,
    price: 28500,
    fuelType: 'Gasoline',
    mileage: 15000,
    color: 'Red',
    transmission: 'Automatic',
    engine: '1.5L Turbo',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Apple CarPlay/Android Auto', 
      'Backup Camera', 
      'WiFi Hotspot', 
      'Remote Start', 
      'Teen Driver Technology'
    ],
    description: 'Practical and efficient SUV with modern technology features. Great for daily commuting and weekend getaways.'
  },
  {
    id: 7,
    brand: 'Audi',
    model: 'Q5',
    year: 2023,
    price: 54000,
    fuelType: 'Hybrid',
    mileage: 8000,
    color: 'Silver',
    transmission: 'Automatic',
    engine: '2.0L Turbo Hybrid',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Quattro All-Wheel Drive', 
      'Panoramic Sunroof', 
      'Virtual Cockpit', 
      'Bang & Olufsen Sound', 
      'Adaptive Damping Suspension'
    ],
    description: 'Luxurious Audi Q5 hybrid with cutting-edge technology and refined driving experience. Excellent fuel efficiency with premium features.'
  },
  {
    id: 8,
    brand: 'Hyundai',
    model: 'Tucson',
    year: 2022,
    price: 29900,
    fuelType: 'Hybrid',
    mileage: 12000,
    color: 'Green',
    transmission: 'Automatic',
    engine: '1.6L Turbo Hybrid',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Smart Power Tailgate', 
      'Hands-free Smart Liftgate', 
      'Heated & Ventilated Seats', 
      'Blind-Spot View Monitor', 
      'Surround View Monitor'
    ],
    description: 'Modern Hyundai Tucson with distinctive styling and efficient hybrid powertrain. Loaded with convenient features for everyday use.'
  },
  {
    id: 9,
    brand: 'Jeep',
    model: 'Wrangler',
    year: 2021,
    price: 42000,
    fuelType: 'Gasoline',
    mileage: 20000,
    color: 'Blue',
    transmission: 'Manual',
    engine: '3.6L V6',
    seatingCapacity: 4,
    imageUrl: null,
    features: [
      'Removable Doors', 
      'Removable Roof', 
      'Four-Wheel Drive', 
      'Off-Road Package', 
      'Alpine Premium Audio'
    ],
    description: 'Iconic Jeep Wrangler ready for adventure with four-wheel drive and full off-road capabilities. Perfect for outdoor enthusiasts.'
  },
  {
    id: 10,
    brand: 'Lexus',
    model: 'RX 350',
    year: 2022,
    price: 48500,
    fuelType: 'Gasoline',
    mileage: 14000,
    color: 'White',
    transmission: 'Automatic',
    engine: '3.5L V6',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Mark Levinson Audio', 
      'Panoramic View Monitor', 
      'Heads-Up Display', 
      'Power Folding Rear Seats', 
      'Lexus Safety System+'
    ],
    description: 'Refined Lexus RX 350 combining luxury, comfort, and reliability. Excellent condition with premium features throughout.'
  },
  {
    id: 11,
    brand: 'Kia',
    model: 'Telluride',
    year: 2023,
    price: 44000,
    fuelType: 'Gasoline',
    mileage: 9000,
    color: 'Black',
    transmission: 'Automatic',
    engine: '3.8L V6',
    seatingCapacity: 8,
    imageUrl: null,
    features: [
      'Three-Row Seating', 
      'Captain\'s Chairs', 
      'Harman Kardon Audio', 
      'Highway Driving Assist', 
      'Dual Sunroof'
    ],
    description: 'Award-winning Kia Telluride with spacious three-row seating and premium features. Perfect for large families.'
  },
  {
    id: 12,
    brand: 'Mazda',
    model: 'CX-5',
    year: 2022,
    price: 32000,
    fuelType: 'Gasoline',
    mileage: 16000,
    color: 'Red',
    transmission: 'Automatic',
    engine: '2.5L Turbo',
    seatingCapacity: 5,
    imageUrl: null,
    features: [
      'Bose Audio System', 
      'Heated Steering Wheel', 
      'Ventilated Front Seats', 
      'Power Liftgate', 
      'i-Activ All-Wheel Drive'
    ],
    description: 'Stylish Mazda CX-5 with upscale interior and engaging driving dynamics. Combines practicality with a premium feel.'
  }
];

export function useCars() {
  // State for filtered cars, loading, and error
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 6,
    total: 0,
    totalPages: 0
  });

  // Filter state
  const [filters, setFilters] = useState({
    search: '',
    brand: '',
    fuelType: '',
    seatingCapacity: '',
    minPrice: 0,
    maxPrice: 100000,
    sortBy: 'price',
    sortOrder: 'asc'
  });

  // Extract unique brands, fuel types, and seating capacities for filter options
  const brands = [...new Set(mockCars.map(car => car.brand))].sort();
  const fuelTypes = [...new Set(mockCars.map(car => car.fuelType))].sort();
  const seatingOptions = [...new Set(mockCars.map(car => car.seatingCapacity))].sort();

  // Function to update filters
  const updateFilters = (newFilters) => {
    setFilters({
      ...filters,
      ...newFilters
    });
    // Reset to first page when filters change
    if (pagination.currentPage !== 1) {
      setPagination({
        ...pagination,
        currentPage: 1
      });
    }
  };

  // Function to reset all filters
  const resetFilters = () => {
    setFilters({
      search: '',
      brand: '',
      fuelType: '',
      seatingCapacity: '',
      minPrice: 0,
      maxPrice: 100000,
      sortBy: 'price',
      sortOrder: 'asc'
    });
  };

  // Function to handle page changes
  const handlePageChange = (page) => {
    setPagination({
      ...pagination,
      currentPage: page
    });
  };

  // Fetch and filter cars based on current filters and pagination
  useEffect(() => {
    setLoading(true);
    setError(null);

    try {
      // Filter cars based on current filters
      let filteredCars = [...mockCars];

      // Apply search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredCars = filteredCars.filter(car => 
          car.brand.toLowerCase().includes(searchLower) ||
          car.model.toLowerCase().includes(searchLower)
        );
      }

      // Apply brand filter
      if (filters.brand) {
        filteredCars = filteredCars.filter(car => car.brand === filters.brand);
      }

      // Apply fuel type filter
      if (filters.fuelType) {
        filteredCars = filteredCars.filter(car => car.fuelType === filters.fuelType);
      }

      // Apply seating capacity filter
      if (filters.seatingCapacity) {
        filteredCars = filteredCars.filter(car => car.seatingCapacity === parseInt(filters.seatingCapacity));
      }

      // Apply price range filter
      filteredCars = filteredCars.filter(car => 
        car.price >= filters.minPrice && car.price <= filters.maxPrice
      );

      // Apply sorting
      filteredCars.sort((a, b) => {
        const aValue = a[filters.sortBy];
        const bValue = b[filters.sortBy];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return filters.sortOrder === 'asc' 
            ? aValue.localeCompare(bValue) 
            : bValue.localeCompare(aValue);
        } else {
          return filters.sortOrder === 'asc' 
            ? aValue - bValue 
            : bValue - aValue;
        }
      });

      // Calculate pagination
      const total = filteredCars.length;
      const totalPages = Math.ceil(total / pagination.limit);
      
      // Get current page of cars
      const startIndex = (pagination.currentPage - 1) * pagination.limit;
      const paginatedCars = filteredCars.slice(startIndex, startIndex + pagination.limit);
      
      // Update state
      setCars(paginatedCars);
      setPagination({
        ...pagination,
        total,
        totalPages
      });
      
      // Simulate loading
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch cars. Please try again later.');
      setLoading(false);
      console.error('Error fetching cars:', err);
    }
  }, [filters, pagination.currentPage, pagination.limit]);

  return {
    cars,
    loading,
    error,
    pagination,
    filters,
    brands,
    fuelTypes,
    seatingOptions,
    handlePageChange,
    updateFilters,
    resetFilters
  };
}