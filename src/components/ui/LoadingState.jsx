export default function LoadingState() {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 dark:border-primary-400 mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading cars...</p>
      </div>
    );
  }