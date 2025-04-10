import { useState, useEffect } from 'react';

export function useWishlist() {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage on component mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('carWishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('carWishlist', JSON.stringify(wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [wishlist]);

  // Check if a car is in the wishlist
  const isInWishlist = (carId) => {
    return wishlist.some(item => item.id === carId);
  };

  // Add or remove a car from the wishlist
  const toggleWishlist = (car) => {
    setWishlist(prevWishlist => {
      if (isInWishlist(car.id)) {
        return prevWishlist.filter(item => item.id !== car.id);
      } else {
        return [...prevWishlist, car];
      }
    });
  };

  // Get the full wishlist
  const getWishlist = () => {
    return wishlist;
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return {
    wishlist,
    isInWishlist,
    toggleWishlist,
    getWishlist,
    clearWishlist
  };
}