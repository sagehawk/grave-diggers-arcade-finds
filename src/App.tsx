
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import GameDetail from './pages/GameDetail';
import NotFound from './pages/NotFound';
import SubmitGame from './pages/SubmitGame';
import UserAccount from './pages/UserAccount';
import { AuthProvider } from './context/auth/AuthProvider';
import './App.css';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="max-w-[1440px] mx-auto">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/submit-game" element={<SubmitGame />} />
            <Route path="/account/:username" element={<UserAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
