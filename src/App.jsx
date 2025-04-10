import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { WishlistProvider } from './context/WishlistContext';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <WishlistProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WishlistProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}