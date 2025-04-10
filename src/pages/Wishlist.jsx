import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CarCard from '../components/ui/CarCard';
import CarDetailsModal from '../components/modals/CarDetailsModal';
import { useWishlist } from '../hooks/useWishlist';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const [selectedCar, setSelectedCar] = useState(null);
  
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
        <h1 className="text-3xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-gray-600 dark:text-gray-400">Cars you've saved for later</p>
      </div>
      
      {/* Empty wishlist */}
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 className="text-xl font-medium mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Start adding cars to your wishlist to see them here</p>
          <Link 
            to="/"
            className="btn-primary"
          >
            Browse Cars
          </Link>
        </div>
      ) : (
        <>
          {/* Results count */}
          <div className="mb-4 text-gray-600 dark:text-gray-400">
            {wishlist.length} {wishlist.length === 1 ? 'car' : 'cars'} in your wishlist
          </div>
          
          {/* Car grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </>
      )}
      
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