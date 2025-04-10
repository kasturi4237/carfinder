export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    
    // Show at most 5 page numbers including current page
    let pagesToShow = pages;
    
    if (totalPages > 5) {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + 4);
      pagesToShow = pages.slice(start - 1, end);
      
      // Ensure we show exactly 5 pages if possible
      if (pagesToShow.length < 5) {
        if (currentPage > totalPages - 2) {
          // We're near the end, so take the last 5 pages
          pagesToShow = pages.slice(totalPages - 5);
        }
      }
    }
    
    if (totalPages <= 1) {
      return null;
    }
  
    return (
      <nav aria-label="Pagination" className="flex justify-center">
        <ul className="flex items-center -space-x-px">
          {/* Previous Button */}
          <li>
            <button
              onClick={() => onPageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`px-3 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 
                ${currentPage === 1 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              aria-label="Previous page"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
          
          {/* Page Numbers */}
          {pagesToShow.map(page => (
            <li key={page}>
              <button
                onClick={() => onPageChange(page)}
                className={`px-3 py-2 border border-gray-300 dark:border-gray-600 
                  ${currentPage === page
                    ? 'bg-primary-600 text-white border-primary-600 dark:border-primary-600 z-10' 
                    : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            </li>
          ))}
          
          {/* Next Button */}
          <li>
            <button
              onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className={`px-3 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 
                ${currentPage === totalPages 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed' 
                  : 'bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
              aria-label="Next page"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    );
  }