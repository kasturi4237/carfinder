import { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // Get wishlist from localStorage or initialize empty array
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem('carWishlist');
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });
  
  // Update localStorage when wishlist changes
  useEffect(() => {
    localStorage.setItem('carWishlist', JSON.stringify(wishlist));
  }, [wishlist]);
  
  // Check if car is in wishlist
  const isInWishlist = (carId) => {
    return wishlist.some(car => car.id === carId);
  };
  
  // Add car to wishlist
  const addToWishlist = (car) => {
    setWishlist(prev => [...prev, car]);
  };
  
  // Remove car from wishlist
  const removeFromWishlist = (carId) => {
    setWishlist(prev => prev.filter(car => car.id !== carId));
  };
  
  // Toggle car in wishlist
  const toggleWishlistItem = (car) => {
    if (isInWishlist(car.id)) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };
  
  return (
    <WishlistContext.Provider value={{
      wishlist,
      isInWishlist,
      addToWishlist,
      removeFromWishlist,
      toggleWishlistItem
    }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  
  return context;
}