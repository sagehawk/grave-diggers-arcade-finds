
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Log environment variables for debugging (remove in production)
if (import.meta.env.DEV) {
  console.log('VITE_SUPABASE_URL:', import.meta.env.VITE_SUPABASE_URL ? 'Set' : 'Not set');
  console.log('VITE_SUPABASE_KEY:', import.meta.env.VITE_SUPABASE_KEY ? 'Set' : 'Not set');
}

createRoot(document.getElementById("root")!).render(<App />);
