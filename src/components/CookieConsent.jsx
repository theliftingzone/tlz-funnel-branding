import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            // Short delay for animation
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'granted');
        setIsVisible(false);
        // Trigger scripts to load immediately
        window.dispatchEvent(new Event('cookie_consent_updated'));
    };

    const handleDecline = () => {
        localStorage.setItem('cookie_consent', 'denied');
        setIsVisible(false);
        // Update GTM Consent Mode to explicitly denied
        window.dataLayer = window.dataLayer || [];
        function gtag() { window.dataLayer.push(arguments); }
        gtag('consent', 'update', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied',
        });
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 animate-fade-in-up">
            <div className="max-w-5xl mx-auto bg-slate-900/95 backdrop-blur-xl border border-slate-700 text-white p-6 md:p-8 rounded-[24px] shadow-2xl shadow-black/50 flex flex-col md:flex-row items-center gap-6 md:gap-12 relative overflow-hidden">

                {/* Decorative glow */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"></div>
                <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex-1 text-center md:text-left relative z-10">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2 text-blue-400 font-bold uppercase tracking-widest text-[10px]">
                        <ShieldCheck className="w-4 h-4" /> Privacy & Data
                    </div>
                    <h4 className="text-xl md:text-2xl font-heading font-black uppercase mb-3">We Value Your Privacy</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                        We use cookies to enhance your experience, analyze site traffic, and deliver personalized content.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 min-w-[300px] w-full md:w-auto relative z-10">
                    <button
                        onClick={handleDecline}
                        className="px-6 py-4 rounded-xl border border-slate-700 text-slate-400 font-bold uppercase tracking-wider text-xs hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        Essential Only
                    </button>
                    <button
                        onClick={handleAccept}
                        className="px-8 py-4 rounded-xl bg-blue-600 text-white font-bold uppercase tracking-wider text-xs hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/20 transition-all transform hover:-translate-y-1"
                    >
                        Accept & Continue
                    </button>
                </div>

                {/* Close X for "Dismiss" implies decline/ignore */}
                <button
                    onClick={() => {
                        setIsVisible(false);
                        // Optional: treat dismiss as deny or just hide for session
                    }}
                    className="absolute top-4 right-4 text-slate-600 hover:text-white transition-colors md:hidden"
                >
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CookieConsent;
