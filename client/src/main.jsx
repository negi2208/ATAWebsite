
// src/main.jsx
import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import authStore from './store/authStore';
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';

const { checkAuth } = authStore();

 ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>
)

// App load hote hi check karo
checkAuth();