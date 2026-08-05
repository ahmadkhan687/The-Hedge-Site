type DataLayerEvent = {
  event: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- GTM payloads are loosely typed
  [key: string]: any;
};

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

/**
 * Push a custom event to the GTM dataLayer (no-op on the server).
 */
export function trackEvent(
  eventName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches GTM flexible event params
  params?: Record<string, any>,
): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}
