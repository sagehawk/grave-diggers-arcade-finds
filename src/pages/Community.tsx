
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redirect /community to /community-games
const Community: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/community-games', { replace: true });
  }, [navigate]);

  return null;
};

export default Community;
