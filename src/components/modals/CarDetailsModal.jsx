import { useWishlist } from '../../hooks/useWishlist';

export default function CarDetailsModal({ car, onClose }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(car.id);
  
  const handleWishlistToggle = () => {
    toggleWishlist(car);
  };

  // Close modal when clicking outside or escape key
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold">{car.brand} {car.model}</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleWishlistToggle}
              className="btn-icon"
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill={isWishlisted ? "currentColor" : "none"} 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                className={`h-6 w-6 ${isWishlisted ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="btn-icon"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Modal Content */}
        <div className="p-4">
          {/* Car Image */}
          <div className="mb-6 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
            <img 
              src={car.imageUrl || `/api/placeholder/800/450?text=${car.brand} ${car.model}`} 
              alt={`${car.brand} ${car.model}`}
              className="w-full h-auto object-cover"
            />
          </div>
          
          {/* Car Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Specifications</h3>
              <dl className="space-y-2">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Year</dt>
                  <dd>{car.year}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Fuel Type</dt>
                  <dd>{car.fuelType}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Mileage</dt>
                  <dd>{car.mileage.toLocaleString()} km</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Engine</dt>
                  <dd>{car.engine}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Transmission</dt>
                  <dd>{car.transmission}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Color</dt>
                  <dd>{car.color}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-500 dark:text-gray-400">Seating Capacity</dt>
                  <dd>{car.seatingCapacity} seats</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Features</h3>
              <ul className="space-y-1">
                {car.features && car.features.map(feature => (
                  <li key={feature} className="flex items-center">
                    <svg 
                      className="w-4 h-4 mr-2 text-green-500" 
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Description</h3>
            <p className="text-gray-600 dark:text-gray-400">{car.description}</p>
          </div>
          
          {/* Price and Contact */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-500 dark:text-gray-400 text-sm">Price</p>
              <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                ${car.price.toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <a 
                href={`tel:${car.contactPhone || '+1234567890'}`}
                className="btn-outline flex items-center"
              >
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>
                Call
              </a>
              <button className="btn-primary flex items-center">
                <svg 
                  className="w-4 h-4 mr-2" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
                  />
                </svg>
                Contact Seller
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}