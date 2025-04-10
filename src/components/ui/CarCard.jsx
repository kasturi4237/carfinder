import { useWishlist } from '../../hooks/useWishlist';

export default function CarCard({ car, onViewDetails }) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(car.id);
  
  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(car);
  };
  
  const handleCardClick = () => {
    onViewDetails(car);
  };

  return (
    <div 
      className="card cursor-pointer hover:shadow-lg transition-shadow"
      onClick={handleCardClick}
    >
      {/* Car Image */}
      <div className="relative bg-gray-200 dark:bg-gray-700 aspect-[16/9] overflow-hidden">
        <img 
          src={car.imageUrl || `/api/placeholder/400/225?text=${car.brand} ${car.model}`} 
          alt={`${car.brand} ${car.model}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill={isWishlisted ? "currentColor" : "none"} 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            className={`h-5 w-5 ${isWishlisted ? 'text-red-500' : 'text-gray-600 dark:text-gray-400'}`}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
            />
          </svg>
        </button>
      </div>
      
      {/* Car Details */}
      <div className="p-4">
        <h3 className="text-lg font-medium mb-1">{car.brand} {car.model}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-2">{car.year} · {car.fuelType}</p>
        
        {/* Price and View Details */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-primary-600 dark:text-primary-400">
            ${car.price.toLocaleString()}
          </p>
          <button 
            className="btn-outline text-sm"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(car);
            }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}