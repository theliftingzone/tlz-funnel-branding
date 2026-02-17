
import React, { useEffect } from 'react';


// Replace with your actual IDs
// Prefer using environment variables
const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-TLM2QPZ6'; // Google Tag Manager ID
const PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '927028009376552'; // Facebook Pixel ID

export const trackPixelEvent = (eventName, options = {}) => {
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, options);
    }
};

const TrackingScripts = () => {
    useEffect(() => {
        const loadScripts = () => {
            const consent = localStorage.getItem('cookie_consent');
            if (consent !== 'granted') return; // STOP here if not granted

            // 1. Google Tag Manager (GTM) Initialization
            if (GTM_ID !== 'GTM-XXXXXXX' && !window.google_tag_manager) {
                const gtmScript = document.createElement('script');
                gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');`;
                document.head.appendChild(gtmScript);

                // GTM NoScript (Optional, for body)
                const gtmNoScript = document.createElement('noscript');
                gtmNoScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
                document.body.insertBefore(gtmNoScript, document.body.firstChild);
            }

            // 2. Facebook Pixel Initialization
            if (PIXEL_ID !== 'XXXXXXXXXXXXXXX' && !window.fbq) {
                !function (f, b, e, v, n, t, s) {
                    if (f.fbq) return; n = f.fbq = function () {
                        n.callMethod ?
                            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                    };
                    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
                    n.queue = []; t = b.createElement(e); t.async = !0;
                    t.src = v; s = b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t, s)
                }(window, document, 'script',
                    'https://connect.facebook.net/en_US/fbevents.js');

                // Initialize Pixel
                window.fbq('init', PIXEL_ID);
                window.fbq('track', 'PageView');
            }
        };

        // Try loading on mount
        loadScripts();

        // Listen for user accepting consent later
        const handleConsentUpdate = () => loadScripts();
        window.addEventListener('cookie_consent_updated', handleConsentUpdate);

        return () => window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
    }, []);

    return null; // This component renders nothing, just injects scripts
};

export default TrackingScripts;
