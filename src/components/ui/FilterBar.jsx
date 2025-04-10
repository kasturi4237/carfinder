export default function FilterBar({ 
    filters, 
    brands, 
    fuelTypes, 
    seatingOptions, 
    updateFilters, 
    resetFilters 
  }) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      updateFilters({ [name]: value });
    };
    
    const handlePriceChange = (e) => {
      const { name, value } = e.target;
      updateFilters({ [name]: parseInt(value) });
    };
    
    const handleReset = () => {
      resetFilters();
    };
  
    return (
      <div className="card p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Filters</h2>
          <button 
            onClick={handleReset}
            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Reset
          </button>
        </div>
        
        {/* Brand filter */}
        <div className="form-group">
          <label htmlFor="brand" className="input-label">Brand</label>
          <select 
            id="brand"
            name="brand"
            value={filters.brand}
            onChange={handleChange}
            className="input-select"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>
        
        {/* Fuel Type filter */}
        <div className="form-group">
          <label htmlFor="fuelType" className="input-label">Fuel Type</label>
          <select 
            id="fuelType"
            name="fuelType"
            value={filters.fuelType}
            onChange={handleChange}
            className="input-select"
          >
            <option value="">All Fuel Types</option>
            {fuelTypes.map(fuelType => (
              <option key={fuelType} value={fuelType}>{fuelType}</option>
            ))}
          </select>
        </div>
        
        {/* Seating Capacity filter */}
        <div className="form-group">
          <label htmlFor="seatingCapacity" className="input-label">Seating Capacity</label>
          <select 
            id="seatingCapacity"
            name="seatingCapacity"
            value={filters.seatingCapacity}
            onChange={handleChange}
            className="input-select"
          >
            <option value="">Any Capacity</option>
            {seatingOptions.map(capacity => (
              <option key={capacity} value={capacity}>{capacity} Seats</option>
            ))}
          </select>
        </div>
        
        {/* Price Range filters */}
        <div className="form-group">
          <label htmlFor="minPrice" className="input-label">Min Price: ${filters.minPrice.toLocaleString()}</label>
          <input 
            type="range"
            id="minPrice"
            name="minPrice"
            min="0"
            max="100000"
            step="1000"
            value={filters.minPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="maxPrice" className="input-label">Max Price: ${filters.maxPrice.toLocaleString()}</label>
          <input 
            type="range"
            id="maxPrice"
            name="maxPrice"
            min="0"
            max="100000"
            step="1000"
            value={filters.maxPrice}
            onChange={handlePriceChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        {/* Sort options */}
        <div className="form-group">
          <label htmlFor="sortBy" className="input-label">Sort By</label>
          <select 
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="input-select"
          >
            <option value="price">Price</option>
            <option value="year">Year</option>
            <option value="brand">Brand</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="sortOrder" className="input-label">Order</label>
          <select 
            id="sortOrder"
            name="sortOrder"
            value={filters.sortOrder}
            onChange={handleChange}
            className="input-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    );
  }