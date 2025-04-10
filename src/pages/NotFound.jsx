import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-16">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 text-gray-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8 text-center">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Go back home
        </Link>
      </div>
    </Layout>
  );
}