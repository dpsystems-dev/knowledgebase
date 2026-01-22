/**
 * Client module to handle scroll-to-anchor after page layout stabilizes.
 *
 * Mermaid diagrams and other async content cause layout shifts that break
 * anchor navigation. This module waits for the document height to stabilize
 * before scrolling to the correct anchor position.
 */

// Track the current navigation to cancel stale scroll attempts
let currentNavigationId = 0;

export function onRouteDidUpdate({ location }) {
  // Increment navigation ID to invalidate any pending scroll operations
  const navigationId = ++currentNavigationId;

  if (!location.hash) {
    return;
  }

  // Capture current location for validation before scrolling
  const targetPathname = location.pathname;
  const targetHash = location.hash;

  // Decode the hash for getElementById (handles URL-encoded characters)
  const id = decodeURIComponent(targetHash.slice(1));

  // Function to scroll to the anchor
  const scrollToAnchor = () => {
    // Guard against stale navigation - don't scroll if route changed
    if (navigationId !== currentNavigationId) {
      return;
    }

    // Double-check we're still on the same page
    if (window.location.pathname !== targetPathname || window.location.hash !== targetHash) {
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'auto' });
    }
  };

  // Wait for layout to stabilize by monitoring document height
  const waitForStableLayout = () => {
    let lastHeight = 0;
    let stableCount = 0;
    const requiredStableChecks = 3; // Height must be stable for 3 consecutive checks
    const checkInterval = 200; // Check every 200ms
    const maxWaitTime = 5000; // Maximum wait time of 5 seconds
    const startTime = Date.now();

    const checkHeight = () => {
      // Abort if navigation changed
      if (navigationId !== currentNavigationId) {
        return;
      }

      const currentHeight = document.documentElement.scrollHeight;

      if (currentHeight === lastHeight) {
        stableCount++;
        if (stableCount >= requiredStableChecks) {
          // Layout is stable, scroll to anchor
          scrollToAnchor();
          return;
        }
      } else {
        // Height changed, reset stability counter
        stableCount = 0;
        lastHeight = currentHeight;
      }

      // Check if we've exceeded max wait time
      if (Date.now() - startTime > maxWaitTime) {
        // Timeout reached, scroll anyway
        scrollToAnchor();
        return;
      }

      // Schedule next check
      setTimeout(checkHeight, checkInterval);
    };

    // Start checking after a short delay to let initial render complete
    setTimeout(checkHeight, 100);
  };

  waitForStableLayout();
}
