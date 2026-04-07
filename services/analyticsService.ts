
// FIX: Add this declaration to inform TypeScript about the global gtag function.
declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, eventParams?: { [key: string]: any }) => void;
  }
}

/**
 * Sends a custom event to Google Analytics 4.
 * This function checks if gtag is available on the window object before sending.
 *
 * @param {string} eventName - The name of the event (snake_case recommended for GA4).
 * @param {object} [eventParams] - An optional object of key-value pairs for event parameters.
 */
export const trackEvent = (eventName: string, eventParams?: { [key: string]: any }): void => {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, eventParams);
  } else {
    // Log for development/debugging if gtag is not available (e.g., ad blocker)
    console.log(`[Analytics Event (gtag not found)] Name: ${eventName}`, eventParams || {});
  }
};