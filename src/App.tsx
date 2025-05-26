
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import GameDetail from './pages/GameDetail';
import NotFound from './pages/NotFound';
import SubmitGame from './pages/SubmitGame';
import UserAccount from './pages/UserAccount';
import Developers from './pages/Developers';
import Community from './pages/Community';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { AuthProvider } from './context/auth/AuthProvider';
import './App.css';
import { Toaster } from './components/ui/toaster';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/games/:id" element={<GameDetail />} />
            <Route path="/submit-game" element={<SubmitGame />} />
            <Route path="/account/:username" element={<UserAccount />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/community" element={<Community />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
