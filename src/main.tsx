import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AnalyticsTracker from './components/AnalyticsTracker';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { ApiSettingsProvider } from './contexts/ApiSettingsContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <ApiSettingsProvider>
          <BrowserRouter>
            <AnalyticsTracker />
            <App />
          </BrowserRouter>
        </ApiSettingsProvider>
      </AuthProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
