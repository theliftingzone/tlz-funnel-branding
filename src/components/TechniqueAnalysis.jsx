import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Clock, Calendar, CheckCircle, Video, Play, ShieldCheck, Mail } from 'lucide-react';
import SEO from './SEO';
import { trackPixelEvent } from './TrackingScripts';

const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
            }
        }, options);

        if (targetRef.current) observer.observe(targetRef.current);
        return () => {
            if (targetRef.current) observer.unobserve(targetRef.current);
        };
    }, [options]);

    return [targetRef, isIntersecting];
};

const FadeInSection = ({ children, className = "", delay = 0 }) => {
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                } ${className}`}
        >
            {children}
        </div>
    );
};

const TechniqueAnalysis = ({ onBack }) => {
    return (
        <div className="min-h-screen font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden bg-[#f8fafc]">
            <SEO
                title="Technique Analysis Call | The Lifting Zone"
                description="Book a 30-Minute Technical Analysis Call with Olympian Sonny Webster to receive expert feedback on your lifts."
            />


            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeInSection>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                            <Clock className="w-3 h-3" /> Limited Availability
                        </div>

                        <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-6 uppercase leading-tight tracking-tight">
                            30-Minute Technical <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Analysis Call</span>
                        </h1>

                        <p className="text-xl md:text-2xl font-medium text-slate-600 mb-8 max-w-2xl mx-auto">
                            Work directly with Olympian Sonny Webster to fix your lifts in a focused, one-to-one session.
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 mb-12">
                            <div className="flex items-baseline gap-3">
                                <span className="text-slate-400 text-xl font-bold line-through decoration-red-500 decoration-2">$249</span>
                                <span className="text-5xl md:text-6xl font-heading font-black text-blue-600 tracking-tighter">$99</span>
                            </div>
                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Exclusive Offer</span>
                        </div>

                        <a
                            href="https://calendly.com/sonnywebsterappointments/30minute-technical-analysis-with-sonny-webster"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackPixelEvent('InitiateCheckout', {
                                content_name: 'Technique Analysis Call',
                                value: 99.00,
                                currency: 'USD'
                            })}
                            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black py-5 px-10 rounded-2xl text-lg uppercase tracking-widest shadow-2xl shadow-blue-600/20 transition-all hover:scale-105"
                        >
                            Book My Session Now
                        </a>
                    </FadeInSection>
                </div>
            </section>

            {/* MAIN CONTENT SPLIT */}
            <section className="py-16 bg-white relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Left: Image/Video Placeholder */}
                        <FadeInSection>
                            <div className="relative group perspective-1000">
                                <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] transform -rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                                <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white">
                                    <img
                                        src="/Sonny-teaching.jpg"
                                        alt="Sonny Webster Teaching"
                                        className="w-full h-full object-cover aspect-[4/5] transform group-hover:scale-105 transition-transform duration-1000"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-8">
                                        <p className="text-white font-heading font-black text-xl uppercase italic">"Expert eyes on your lifts."</p>
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>

                        {/* Right: Copy */}
                        <FadeInSection delay={200}>
                            <h2 className="text-3xl font-heading font-black text-slate-900 uppercase mb-6">Unlock Your Potential</h2>
                            <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                                <p>
                                    Whether you’re struggling with a sticking point, chasing a new personal best, or just want expert eyes on your lifts, this call will give you clear, actionable feedback to immediately improve your performance.
                                </p>
                                <p>
                                    This isn't just generic feedback. It's an opportunity to unlock the small changes that create big results, with guidance from one of the most experienced Olympic weightlifting coaches in the world.
                                </p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs font-bold uppercase text-slate-500">Video Analysis</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs font-bold uppercase text-slate-500">Live Feedback</span>
                                </div>
                                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-4 py-2 rounded-lg">
                                    <CheckCircle className="w-4 h-4 text-blue-500" />
                                    <span className="text-xs font-bold uppercase text-slate-500">Action Plan</span>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* HOW IT WORKS */}
            <section className="py-20 bg-slate-50 border-y border-slate-200">
                <div className="max-w-4xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase">How It Works</h2>
                    </FadeInSection>

                    <div className="space-y-8">
                        {[
                            {
                                step: "01",
                                title: "Submit Your Lifts",
                                desc: "Send two videos (one snatch and one clean & jerk, or two variations of your choice) filmed from a front 45° angle. Please email them to sonny@theliftingzone.com at least 12 hours prior to your call.",
                                icon: Mail
                            },
                            {
                                step: "02",
                                title: "One-to-One Analysis",
                                desc: "On the 30-minute Zoom call, Sonny will break down your technique in detail, highlight key areas for improvement, and give you precise coaching cues to implement straight away.",
                                icon: Video
                            },
                            {
                                step: "03",
                                title: "Personalised Action Plan",
                                desc: "Walk away with clear drills and adjustments tailored to your goals so you know exactly what to focus on in your training.",
                                icon: CheckCircle
                            },
                            {
                                step: "04",
                                title: "Call Recording",
                                desc: "After the session, you’ll receive a full recording of the call emailed directly to you, so you can revisit the analysis and coaching cues anytime.",
                                icon: Play
                            }
                        ].map((item, i) => (
                            <FadeInSection key={i} delay={i * 100}>
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-shadow flex flex-col md:flex-row gap-6 md:items-start group">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors duration-300">
                                        <item.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className="text-slate-300 font-heading font-black text-3xl opacity-50">{item.step}</span>
                                            <h3 className="text-xl font-heading font-black text-slate-900 uppercase">{item.title}</h3>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* IMPORTANT DETAILS */}
            <section className="py-16 bg-white">
                <div className="max-w-3xl mx-auto px-6 text-center">
                    <FadeInSection>
                        <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>

                            <h3 className="text-2xl font-heading font-black uppercase mb-6 relative z-10">Important Details</h3>
                            <ul className="text-left space-y-4 relative z-10 mb-8 max-w-lg mx-auto">
                                <li className="flex gap-3 text-slate-300 font-medium text-sm md:text-base">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                    Please ensure your videos are well-lit and in good quality, so every detail of your lift can be analysed.
                                </li>
                                <li className="flex gap-3 text-slate-300 font-medium text-sm md:text-base">
                                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0"></div>
                                    For the live call, make sure you are in a quiet, distraction-free space with a stable internet connection.
                                </li>
                            </ul>

                            <a
                                href="https://calendly.com/sonnywebsterappointments/30minute-technical-analysis-with-sonny-webster"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => trackPixelEvent('InitiateCheckout', {
                                    content_name: 'Technique Analysis Call',
                                    value: 99.00,
                                    currency: 'USD'
                                })}
                                className="block w-full bg-white text-slate-900 font-heading font-black py-4 rounded-xl text-lg uppercase tracking-widest hover:bg-blue-50 transition-colors"
                            >
                                Secure Your Spot
                            </a>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 bg-slate-950 text-slate-500 text-center text-[10px] font-bold uppercase tracking-widest border-t border-slate-900">
                <p>&copy; 2026 The Lifting Zone. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default TechniqueAnalysis;
