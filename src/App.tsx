
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import GameDetail from './pages/GameDetail';
import NotFound from './pages/NotFound';
import './App.css';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <Router>
      <div className="max-w-[1440px] mx-auto">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/games/:id" element={<GameDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
