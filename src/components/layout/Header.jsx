import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useWishlist } from '../../hooks/useWishlist';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const { wishlist } = useWishlist();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <svg 
              className="w-8 h-8 text-primary-600 dark:text-primary-400" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M19 20H5V19H3V21H21V19H19V20Z" />
              <path d="M15 8H19L17.5 5H13.5L15 8Z" />
              <path d="M5 8H9L7.5 5H3.5L5 8Z" />
              <path d="M11 10V5H8L6 9H16L14 5H13V10H19V17H5V10H11Z" />
            </svg>
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">AutoMarket</span>
          </Link>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {/* Wishlist */}
            <Link to="/wishlist" className="btn-icon relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>
            
            {/* Theme Toggle */}
            <button 
              className="btn-icon"
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" 
                  />
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" 
                  />
                </svg>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}