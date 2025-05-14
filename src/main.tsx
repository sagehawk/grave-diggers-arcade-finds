
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// We're now using hardcoded environment variables so there's no need for the check
createRoot(document.getElementById("root")!).render(<App />);
