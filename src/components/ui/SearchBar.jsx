import { useState } from 'react';

export default function SearchBar({ value = '', onChange }) {
  const [searchTerm, setSearchTerm] = useState(value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(searchTerm);
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
    onChange('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search by brand or model..."
          value={searchTerm}
          onChange={handleInputChange}
          className="input w-full pl-10 pr-10"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {searchTerm && (
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              type="button"
              onClick={handleClear}
              className="p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-400 hover:text-gray-500"
              aria-label="Clear search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button 
              type="submit"
              className="p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 bg-primary-600 text-white rounded-r-md hover:bg-primary-700"
              aria-label="Submit search"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </form>
    </div>
  );
}