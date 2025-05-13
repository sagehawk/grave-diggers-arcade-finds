
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Check for required environment variables
const requiredEnvVars = [
  { name: 'VITE_SUPABASE_URL', value: import.meta.env.VITE_SUPABASE_URL },
  { name: 'VITE_SUPABASE_KEY', value: import.meta.env.VITE_SUPABASE_KEY }
];

const missingEnvVars = requiredEnvVars.filter(env => !env.value);

if (missingEnvVars.length > 0) {
  const missingVarsList = missingEnvVars.map(env => env.name).join(', ');
  console.error(`Missing required environment variables: ${missingVarsList}`);
  
  if (document.body) {
    document.body.innerHTML = `
      <div style="font-family: system-ui; max-width: 600px; margin: 50px auto; padding: 20px; background: #2c2c2c; color: white; border-radius: 8px; text-align: center;">
        <h2 style="color: #f44336; margin-top: 0;">Environment Configuration Error</h2>
        <p>Missing required environment variables: <strong>${missingVarsList}</strong></p>
        <p>Please check your <code>.env.local</code> file and Vercel project settings.</p>
        <div style="background: #3c3c3c; padding: 15px; border-radius: 4px; text-align: left; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; font-weight: bold;">For local development:</p>
          <pre style="background: #1c1c1c; padding: 10px; border-radius: 4px; overflow: auto; margin: 0;">
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_anon_key</pre>
        </div>
        <p>For Vercel deployment, add these variables in your project settings.</p>
      </div>
    `;
  }
} else {
  createRoot(document.getElementById("root")!).render(<App />);
}
