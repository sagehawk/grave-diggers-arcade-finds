
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Upload, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useAuth } from '../hooks/useAuth';
import AuthModal from './AuthModal';
import { useToast } from "@/components/ui/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from '../hooks/use-mobile';

const Navbar: React.FC = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<'login' | 'register'>('login');
  const { user, isAuthenticated, logout } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const handleSubmitClick = () => {
    if (isAuthenticated) {
      navigate('/submit-game');
    } else {
      toast({
        title: "Authentication Required",
        description: "You need to be logged in to submit a game.",
        variant: "destructive"
      });
      setAuthModalView('login');
      setAuthModalOpen(true);
    }
  };

  return (
    <nav className="bg-ggrave-black border-b border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
              {isMobile ? (
                <img 
                  src="https://i.imgur.com/DeL4OIK.png" 
                  alt="GamerGrave Icon" 
                  className="h-10 w-10" 
                />
              ) : (
                <img 
                  src="https://i.imgur.com/ItKyOPt.jpeg" 
                  alt="GamerGrave Logo" 
                  className="h-12 sm:h-14" 
                />
              )}
            </Link>
          </div>
          
          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Games
            </Link>
            <Link to="/developers" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Developers
            </Link>
            <Link to="/community" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
              Community
            </Link>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Submit Game Button */}
            <Button 
              size="sm" 
              className="bg-ggrave-red text-white hover:bg-red-700 hidden sm:flex items-center transition-all hover:scale-105"
              onClick={handleSubmitClick}
            >
              <Upload size={16} className="mr-1.5" /> Submit Game
            </Button>
            
            {/* Authentication Controls */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="bg-transparent border border-gray-700 text-white hover:bg-ggrave-darkgray hover:border-gray-600 flex items-center gap-2 transition-all">
                      <User size={14} /> {user?.username || 'Profile'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border border-gray-800 text-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem 
                      className="hover:bg-gray-800 cursor-pointer"
                      onClick={() => navigate('/account/me')}
                    >
                      <User size={14} className="mr-2" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-800" />
                    <DropdownMenuItem 
                      className="hover:bg-gray-800 cursor-pointer text-red-400"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} className="mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="hidden sm:block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-transparent border border-ggrave-red text-white hover:bg-ggrave-red hover:border-ggrave-red focus:ring-2 focus:ring-ggrave-red focus:ring-opacity-50 transition-all"
                  onClick={() => {
                    setAuthModalView('login');
                    setAuthModalOpen(true);
                  }}
                >
                  Login
                </Button>
              </div>
            )}
            
            {/* Mobile Authentication Button */}
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                size="icon" 
                className="sm:hidden bg-transparent border border-ggrave-red text-white hover:bg-ggrave-red transition-all"
                onClick={() => {
                  setAuthModalView('login');
                  setAuthModalOpen(true);
                }}
              >
                <User size={18} />
              </Button>
            )}
            
            {/* Mobile Dropdown for Authenticated Users */}
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="sm:hidden">
                  <Button variant="outline" size="icon" className="bg-transparent border border-gray-700 text-white hover:bg-ggrave-darkgray transition-all">
                    <User size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-900 border border-gray-800 text-white">
                  <DropdownMenuLabel>{user?.username || 'My Account'}</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem 
                    className="hover:bg-gray-800 cursor-pointer"
                    onClick={() => navigate('/account/me')}
                  >
                    <User size={14} className="mr-2" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="hover:bg-gray-800 cursor-pointer"
                    onClick={() => navigate('/submit-game')}
                  >
                    <Upload size={14} className="mr-2" /> Submit Game
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-800" />
                  <DropdownMenuItem 
                    className="hover:bg-gray-800 cursor-pointer text-red-400"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} className="mr-2" /> Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* Mobile "Submit" Button */}
            {!isAuthenticated && (
              <Button 
                variant="default" 
                size="icon" 
                className="sm:hidden bg-ggrave-red text-white hover:bg-red-700 transition-all hover:scale-105"
                onClick={handleSubmitClick}
              >
                <Upload size={18} />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
        defaultView={authModalView}
      />
    </nav>
  );
};

export default Navbar;
