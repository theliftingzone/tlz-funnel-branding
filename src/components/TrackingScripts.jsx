
import React, { useEffect } from 'react';


// Replace with your actual IDs
// Prefer using environment variables
const GTM_ID = import.meta.env.VITE_GTM_ID || 'GTM-TLM2QPZ6'; // Google Tag Manager ID
const PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '927028009376552'; // Facebook Pixel ID
const TIKTOK_PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID || ''; // TikTok Pixel ID — set in env vars

export const trackPixelEvent = (eventName, options = {}) => {
    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', eventName, options);
    }
    // TikTok Pixel — map FB event names to TikTok equivalents
    if (typeof window !== 'undefined' && window.ttq) {
        const tiktokEventMap = {
            'ViewContent': 'ViewContent',
            'Lead': 'SubmitForm',
            'InitiateCheckout': 'InitiateCheckout',
            'PageView': 'Pageview',
        };
        const ttEvent = tiktokEventMap[eventName] || eventName;
        window.ttq.track(ttEvent, options);
    }
};

const TrackingScripts = () => {
    useEffect(() => {
        // --- GTM & Pixels load IMMEDIATELY ---
        // We use GTM Consent Mode to respect user choices.
        // Scripts load on every visit; GTM Consent Mode controls what data is collected.
        // This approach is GDPR-compliant when paired with a consent banner that
        // updates the consent state via gtag('consent', 'update', ...).

        // 0. Initialize Google Consent Mode defaults (denied until user accepts)
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
        });

        // Check if user already consented in a previous session
        const previousConsent = localStorage.getItem('cookie_consent');
        if (previousConsent === 'granted') {
            gtag('consent', 'update', {
                'ad_storage': 'granted',
                'ad_user_data': 'granted',
                'ad_personalization': 'granted',
                'analytics_storage': 'granted',
            });
        }

        // 1. Google Tag Manager (GTM) — always loads (consent mode controls behavior)
        if (GTM_ID !== 'GTM-XXXXXXX' && !window.google_tag_manager) {
            const gtmScript = document.createElement('script');
            gtmScript.innerHTML = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','${GTM_ID}');`;
            document.head.appendChild(gtmScript);

            // GTM NoScript (for body)
            const gtmNoScript = document.createElement('noscript');
            gtmNoScript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}"
      height="0" width="0" style="display:none;visibility:hidden"></iframe>`;
            document.body.insertBefore(gtmNoScript, document.body.firstChild);
        }

        // 2. Facebook Pixel — always loads (consent mode in GTM can gate data collection)
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

        // 3. TikTok Pixel — only loads if ID is configured
        if (TIKTOK_PIXEL_ID && TIKTOK_PIXEL_ID !== '' && !window.ttq) {
            !function (w, d, t) {
                w.TiktokAnalyticsObject = t;
                var ttq = w[t] = w[t] || [];
                ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
                ttq.setAndDefer = function (t, e) {
                    t[e] = function () {
                        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
                    };
                };
                for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                ttq.instance = function (t) {
                    for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
                    return e;
                };
                ttq.load = function (e, n) {
                    var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
                    ttq._i = ttq._i || {};
                    ttq._i[e] = [];
                    ttq._i[e]._u = i;
                    ttq._t = ttq._t || {};
                    ttq._t[e] = +new Date;
                    ttq._o = ttq._o || {};
                    ttq._o[e] = n || {};
                    var o = document.createElement("script");
                    o.type = "text/javascript";
                    o.async = !0;
                    o.src = i + "?sdkid=" + e + "&lib=" + t;
                    var a = document.getElementsByTagName("script")[0];
                    a.parentNode.insertBefore(o, a);
                };
                ttq.load(TIKTOK_PIXEL_ID);
                ttq.page();
            }(window, document, 'ttq');
        }

        // Listen for consent updates from cookie banner
        const handleConsentUpdate = () => {
            const consent = localStorage.getItem('cookie_consent');
            if (consent === 'granted') {
                // Update GTM Consent Mode to granted
                window.dataLayer = window.dataLayer || [];
                function gtagUpdate() { window.dataLayer.push(arguments); }
                gtagUpdate('consent', 'update', {
                    'ad_storage': 'granted',
                    'ad_user_data': 'granted',
                    'ad_personalization': 'granted',
                    'analytics_storage': 'granted',
                });
            }
        };
        window.addEventListener('cookie_consent_updated', handleConsentUpdate);

        return () => window.removeEventListener('cookie_consent_updated', handleConsentUpdate);
    }, []);

    return null; // This component renders nothing, just injects scripts
};

export default TrackingScripts;
