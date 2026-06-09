import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './Redux/store.js'
import { GoogleOAuthProvider } from '@react-oauth/google'

// ⚠️ Replace this with your real Google Client ID from:
// Firebase Console → Project Settings → Your Apps → Web App → OAuth 2.0 Client ID
// OR Google Cloud Console → APIs & Credentials → Web Client (auto created by Google Service)
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ""

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </GoogleOAuthProvider>
)

