
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackEvent } from '../services/analyticsService';

/**
 * This component tracks page views for the single-page application and sends them to Google Analytics.
 * It should be placed inside the Router component (e.g., HashRouter, BrowserRouter).
 */
const AnalyticsTracker: React.FC = () => {
    const location = useLocation();
    
    useEffect(() => {
        // The page_view event is often handled by the gtag config snippet on initial load,
        // but for SPAs, it's crucial to send it manually on every subsequent route change.
        trackEvent('page_view', {
            page_path: location.pathname + location.search + location.hash,
            page_title: document.title, // It's good practice to set document.title for each "page"
            page_location: window.location.href,
        });
    }, [location]);
    
    return null; // This component does not render anything to the DOM.
};

export default AnalyticsTracker;
