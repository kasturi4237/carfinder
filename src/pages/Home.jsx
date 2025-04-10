import { useState } from 'react';
import Layout from '../components/layout/Layout';
import SearchBar from '../components/ui/SearchBar';
import FilterBar from '../components/ui/FilterBar';
import CarCard from '../components/ui/CarCard';
import Pagination from '../components/ui/Pagination';
import CarDetailsModal from '../components/modals/CarDetailsModal';
// import EmptyState from '../components/ui/EmptyState';
import LoadingState from '../components/ui/LoadingState';
import { useCars } from '../hooks/useCars';

export default function Home() {
  const { 
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
  } = useCars();
  
  const [selectedCar, setSelectedCar] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  
  // Toggle filters visibility on mobile
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };
  
  // Handle search
  const handleSearch = (searchTerm) => {
    updateFilters({ search: searchTerm });
  };
  
  // View car details
  const handleViewDetails = (car) => {
    setSelectedCar(car);
  };
  
  // Close car details modal
  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Car</h1>
        <p className="text-gray-600 dark:text-gray-400">Browse our selection of premium vehicles</p>
      </div>
      
      {/* Search and filter toggle */}
      <div className="flex flex-col md:flex-row items-center mb-6 gap-4">
        <div className="w-full md:flex-1">
          <SearchBar 
            value={filters.search} 
            onChange={handleSearch} 
          />
        </div>
        <button 
          className="btn-secondary w-full md:w-auto"
          onClick={toggleFilters}
        >
          {filtersVisible ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
      
      {/* Main content area with filters and results */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters panel (conditionally visible on mobile) */}
        <div className={`w-full md:w-64 ${filtersVisible ? 'block' : 'hidden md:block'}`}>
          <FilterBar 
            filters={filters}
            brands={brands}
            fuelTypes={fuelTypes}
            seatingOptions={seatingOptions}
            updateFilters={updateFilters}
            resetFilters={resetFilters}
          />
        </div>
        
        {/* Results area */}
        <div className="flex-1">
          {/* Loading state */}
          {loading && <LoadingState />}
          
          {/* Error state */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 p-4 rounded-md mb-6">
              <p>{error}</p>
            </div>
          )}
          
          {/* Empty state */}
          {!loading && !error && cars.length === 0 && (
            <EmptyState 
              title="No cars found"
              description="Try adjusting your filters or search terms"
              onReset={resetFilters}
            />
          )}
          
          {/* Results count */}
          {!loading && !error && cars.length > 0 && (
            <div className="mb-4 text-gray-600 dark:text-gray-400">
              Showing {Math.min(pagination.limit, pagination.total)} of {pagination.total} cars
            </div>
          )}
          
          {/* Car grid */}
          {!loading && !error && cars.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {cars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination 
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </div>
      
      {/* Car Details Modal */}
      {selectedCar && (
        <CarDetailsModal 
          car={selectedCar}
          onClose={handleCloseModal}
        />
      )}
    </Layout>
  );
}