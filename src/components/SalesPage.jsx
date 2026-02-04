import React, { useState, useEffect, useRef } from 'react';
import {
    CheckCircle,
    AlertTriangle,
    Trophy,
    Zap,
    ShieldCheck,
    Play,
    ArrowRight,
    User,
    Star,
    X,
    Target,
    Calendar,
    Lock,
    ArrowDownCircle,
    Eye,
    Award,
    TrendingUp,
    Mail,
    Dumbbell
} from 'lucide-react';

// Custom Hook for Scroll Reveal Animations
const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            // Once it intersects, we keep it visible
            if (entry.isIntersecting) {
                setIsIntersecting(true);
            }
        }, options);

        if (targetRef.current) {
            observer.observe(targetRef.current);
        }

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

const SalesPage = ({ onBack }) => {
    return (
        <div className="min-h-screen font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden">


            {/* SECTION 1: THE HERO */}
            <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden flex flex-col items-center justify-center min-h-[70vh]">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent -z-10"></div>

                {/* Decorative Accents */}
                <div className="absolute top-1/4 left-10 md:left-20 w-px h-24 bg-gradient-to-b from-transparent via-blue-200 to-transparent hidden lg:block"></div>
                <div className="absolute top-1/3 right-10 md:right-20 w-px h-32 bg-gradient-to-b from-transparent via-blue-200 to-transparent hidden lg:block"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <FadeInSection>
                        <div className="flex justify-center mb-8">
                            <span className="bg-blue-50 border border-blue-100 text-blue-600 px-5 py-1.5 rounded-full text-[10px] font-heading font-black uppercase tracking-[0.25em] animate-fade-in shadow-sm">
                                The Technique Accelerator
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-slate-900 leading-[1] tracking-tight mb-8 uppercase">
                            Install the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-800 drop-shadow-sm">
                                Olympian Operating System
                            </span>
                            <br />
                            In Just 12 Weeks.
                        </h1>

                        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto mb-14 leading-relaxed">
                            For lifters who want world-class mechanics without the world-class price tag. The 22-session technical protocol for precision and power.
                        </p>

                        <div className="flex flex-col items-center gap-8">
                            <button
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="cursor-pointer group relative bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] text-white font-heading font-black text-xl md:text-2xl uppercase tracking-[0.15em] px-14 py-6 rounded-2xl shadow-2xl shadow-blue-600/30 hover:brightness-110 transition-all duration-300 transform"
                            >
                                Get Instant Access - £99
                            </button>

                            <div className="flex items-center gap-8 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-blue-500/60" /> One-Time Payment</div>
                                <div className="flex items-center gap-3"><span className="w-1 h-1 bg-slate-200 rounded-full"></span></div>
                                <div className="flex items-center gap-2"><Lock className="w-4 h-4 text-blue-500/60" /> Secure Checkout</div>
                            </div>
                        </div>

                        <div className="mt-20 flex justify-center animate-bounce opacity-20">
                            <ArrowDownCircle className="w-8 h-8 text-slate-400" />
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* SECTION 2: THE AGITATION */}
            <section className="py-16 md:py-24 bg-[#0f172a] text-white overflow-hidden relative border-y border-white/5">
                <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
                <div className="max-w-5xl mx-auto px-6 relative">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-900/20 rounded-full blur-[100px]"></div>

                    <FadeInSection className="text-center">
                        <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">The Hard Truth</div>
                        <h2 className="text-3xl md:text-5xl font-heading font-black mb-16 leading-[1.1] uppercase max-w-4xl mx-auto">
                            There are two ways to learn weightlifting... <br />
                            <span className="text-blue-500 italic">Only one leads to mastery.</span>
                        </h2>

                        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto text-left">
                            {/* Path 1: The Hard Way */}
                            <div className="bg-slate-800/50 rounded-[32px] p-3 border border-slate-700 hover:border-red-500/30 transition-colors duration-500 group">
                                <div className="bg-slate-900 rounded-[24px] p-8 h-full flex flex-col">
                                    <div className="h-56 mb-8 rounded-2xl overflow-hidden relative grayscale group-hover:grayscale-0 transition-all duration-700">
                                        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" alt="Struggling lifter" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                                        <div className="absolute inset-0 bg-red-900/30 mix-blend-multiply"></div>
                                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">The Painful Way</div>
                                    </div>

                                    <h3 className="text-2xl font-heading font-black text-slate-200 mb-4 uppercase">Guesswork & Grinding</h3>
                                    <p className="text-slate-400 leading-relaxed font-medium mb-6 flex-grow">
                                        Most lifters guess. They watch random videos, load the bar too early, and bake in technical flaws.
                                    </p>
                                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest">
                                        <AlertTriangle className="w-4 h-4" /> Plateaus & Injury
                                    </div>
                                </div>
                            </div>

                            {/* Path 2: The Olympian Way */}
                            <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-[32px] p-1 shadow-2xl shadow-blue-900/20 transform md:-translate-y-6 md:scale-105 transition-transform duration-500">
                                <div className="bg-slate-900 rounded-[28px] p-8 h-full flex flex-col relative overflow-hidden">
                                    {/* Blue Glow */}
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] pointer-events-none"></div>

                                    <div className="h-56 mb-8 rounded-2xl overflow-hidden relative shadow-lg">
                                        <img src="https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop" alt="Perfect Technique" className="absolute inset-0 w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay"></div>
                                        <div className="absolute top-4 left-4 bg-white text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">The Olympian Way</div>
                                    </div>

                                    <h3 className="text-2xl font-heading font-black text-white mb-4 uppercase">Foundation & Physics</h3>
                                    <p className="text-slate-300 leading-relaxed font-medium mb-6 flex-grow">
                                        We ignore the weight on the bar. We focus on the engine. Better mechanics means easier lifts, no pain, and new PRs on auto-pilot.
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                        <CheckCircle className="w-4 h-4" /> Longevity & Power
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* SECTION 3: EXPERTISE GAP (THE COMPARISON) */}
            <section className="py-16 md:py-24 relative">
                <div className="max-w-6xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 uppercase leading-tight tracking-tight">
                            Average Advice is <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">The Most Expensive Advice.</span>
                        </h2>
                        <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed italic">
                            You aren't just learning slowly—you are learning wrong. <br />We call this the <span className="text-slate-900 font-extrabold text-2xl">"Unlearning Tax."</span>
                        </p>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* The Local Approach */}
                        <FadeInSection delay={100}>
                            <div className="h-full bg-slate-50 rounded-[40px] p-10 border border-slate-100 group hover:border-slate-200 transition-colors duration-500">
                                <div className="flex items-center gap-4 mb-10 opacity-50">
                                    <h3 className="text-xl font-heading font-black text-slate-400 uppercase tracking-widest">The "Local" Gym</h3>
                                </div>

                                <ul className="space-y-6">
                                    <li className="flex gap-4 items-start text-slate-500 font-medium">
                                        <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                                        <span>Focuses on "muscling" the weight up.</span>
                                    </li>
                                    <li className="flex gap-4 items-start text-slate-500 font-medium">
                                        <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                                        <span>Cues based on generic textbooks.</span>
                                    </li>
                                    <li className="flex gap-4 items-start text-slate-500 font-medium">
                                        <X className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                                        <span>Treats the Snatch like a gym exercise.</span>
                                    </li>
                                </ul>

                                <div className="mt-12 pt-8 border-t border-slate-200">
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-2">The Dead End</p>
                                    <p className="text- slate-400 text-xl font-heading font-black uppercase italic">Plateaus & Joint Pain.</p>
                                </div>
                            </div>
                        </FadeInSection>

                        {/* The Olympian Standard */}
                        <FadeInSection delay={200}>
                            <div className="h-full bg-slate-900 rounded-[40px] p-10 relative overflow-hidden group shadow-2xl hover:scale-[1.02] transition-transform duration-500">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>

                                <div className="flex items-center gap-4 mb-10 relative z-10">
                                    <h3 className="text-xl font-heading font-black text-white uppercase tracking-widest italic">The Olympian Way</h3>
                                </div>

                                <ul className="space-y-6 relative z-10">
                                    <li className="flex gap-4 items-start text-white font-medium">
                                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <span>Focuses on efficiency & biomechanics.</span>
                                    </li>
                                    <li className="flex gap-4 items-start text-white font-medium">
                                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <span>Decades of elite competition experience.</span>
                                    </li>
                                    <li className="flex gap-4 items-start text-white font-medium">
                                        <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                        <span>Treats the Snatch like a precision skill.</span>
                                    </li>
                                </ul>

                                <div className="mt-12 pt-8 border-t border-white/10 relative z-10">
                                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">The Outcome</p>
                                    <p className="text-white text-xl font-heading font-black uppercase italic">Longevity & New PRs.</p>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* SECTION 4: WHO IS THIS FOR? */}
            <section className="py-16 md:py-24 relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
                <div className="max-w-6xl mx-auto px-6">
                    <FadeInSection className="text-center mb-20">
                        <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-[10px] mb-4 block">Candidate Profile</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase tracking-tighter">Who Needs The Accelerator?</h2>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
                        <div className="bg-white/80 backdrop-blur-sm p-12 rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors duration-500"></div>
                            <div className="h-48 rounded-2xl overflow-hidden mb-8 relative shadow-lg">
                                <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=2070&auto=format&fit=crop" alt="Beginner Lifter" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply"></div>
                            </div>
                            <h3 className="text-2xl font-heading font-black text-slate-900 mb-2 uppercase tracking-tight">The New Athlete</h3>
                            <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block bg-blue-50 px-4 py-1.5 rounded-full">The Blank Slate</p>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                Start from zero without the bad habits. Don't waste 6 months 'figuring it out.' Start with the Olympian framework from Rep 1.
                            </p>
                            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-3 text-slate-400 group-hover:text-blue-600 transition-colors">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Accelerated Progress</span>
                            </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm p-12 rounded-[48px] shadow-2xl shadow-slate-200/50 border border-slate-100 group hover:-translate-y-3 transition-all duration-500 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:bg-blue-100 transition-colors duration-500"></div>
                            <div className="h-48 rounded-2xl overflow-hidden mb-8 relative shadow-lg">
                                <img src="https://images.unsplash.com/photo-1521804906057-1df8fdb718b7?q=80&w=2070&auto=format&fit=crop" alt="Advanced Lifter" className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-blue-900/10 mix-blend-multiply"></div>
                            </div>
                            <h3 className="text-2xl font-heading font-black text-slate-900 mb-2 uppercase tracking-tight">The Experienced Lifter</h3>
                            <p className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block bg-blue-50 px-4 py-1.5 rounded-full">The Re-Builder</p>
                            <p className="text-slate-500 text-lg leading-relaxed font-medium">
                                You are strong, but you are leaking power. We will strip your movement down to the studs and rebuild for maximum efficiency.
                            </p>
                            <div className="mt-8 pt-8 border-t border-slate-50 flex items-center gap-3 text-slate-400 group-hover:text-blue-600 transition-colors">
                                <CheckCircle className="w-5 h-5" />
                                <span className="text-xs font-bold uppercase tracking-widest">Plateau Breakthrough</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: PRODUCT REVEAL */}
            <section id="pricing" className="py-16 md:py-24 bg-slate-900 relative overflow-hidden flex flex-col items-center">
                <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] -z-0"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <FadeInSection className="mb-20 text-white">
                        <span className="bg-blue-600/20 text-blue-400 border border-blue-600/30 px-6 py-2 rounded-full text-[10px] font-heading font-black mb-6 inline-block uppercase tracking-[0.3em] shadow-xl shadow-blue-900/40">
                            The System Unlocked
                        </span>
                        <h2 className="text-4xl md:text-6xl font-heading font-black leading-[1.1] uppercase tracking-tighter">
                            The Olympian <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">Technique Accelerator</span>
                        </h2>
                    </FadeInSection>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700 p-8 md:p-12 rounded-[40px] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 left-0 w-2 h-full bg-blue-600"></div>
                                <h3 className="text-2xl font-heading font-black text-white mb-8 uppercase tracking-tight">The Curriculum</h3>
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {[
                                        { title: "22 Step-by-Step Sessions", img: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop" },
                                        { title: "HD Video Encyclopedia", img: "https://images.unsplash.com/photo-1574680096141-1c570926b753?q=80&w=2070&auto=format&fit=crop" },
                                        { title: "Safety First Protocols", img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop" },
                                        { title: "Self-Check System", img: "https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1984&auto=format&fit=crop" }
                                    ].map((item, i) => (
                                        <div key={i} className="relative h-24 rounded-2xl overflow-hidden group/item cursor-pointer">
                                            <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" />
                                            <div className="absolute inset-0 bg-black/60 group-hover/item:bg-black/40 transition-colors"></div>
                                            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                                <p className="text-white text-xs font-bold leading-tight uppercase tracking-wider">{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="p-8 md:p-12 border-2 border-dashed border-slate-800 rounded-[40px]">
                                <p className="text-slate-400 text-lg font-medium leading-relaxed italic">
                                    "Not everyone is ready for the intensity of our 1-1 Mentorship yet. We designed The Accelerator to be the ultimate starting point for self-paced lifters."
                                </p>
                            </div>
                        </div>

                        <div className="relative group perspective-1000">
                            <div className="bg-gradient-to-br from-blue-600 to-blue-900 rounded-[50px] aspect-[4/5] md:aspect-square flex items-center justify-center p-12 overflow-hidden relative shadow-[0_50px_100px_-20px_rgba(37,99,235,0.3)] group-hover:scale-[1.05] transition-transform duration-700 transform-gpu">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
                                <Trophy className="w-48 h-48 text-white opacity-20 group-hover:scale-110 transition-transform duration-1000 relative z-10" />
                                <div className="absolute bottom-10 left-10 right-10 z-20">
                                    <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-8 rounded-[32px] text-white">
                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Status: Elite</p>
                                        <h4 className="text-3xl font-heading font-black uppercase tracking-tighter italic leading-none">Technique <br />Bible Vol.1</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: THE UPSELL GUARANTEE */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
                <div className="max-w-4xl mx-auto px-6">
                    <FadeInSection>
                        <div className="bg-slate-900 rounded-[40px] p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl shadow-slate-900/20 border border-slate-800">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px] -ml-32 -mb-32"></div>
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>

                            <div className="relative z-10 flex flex-col items-center">
                                <div className="inline-block border border-blue-500/30 bg-blue-500/10 rounded-full px-6 py-2 mb-8 backdrop-blur-sm">
                                    <span className="text-blue-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center gap-2">
                                        <ShieldCheck className="w-4 h-4" /> The Guarantee
                                    </span>
                                </div>

                                <h2 className="text-4xl md:text-6xl font-heading font-black mb-8 uppercase tracking-tight leading-none">
                                    Our Investment <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-white">In You.</span>
                                </h2>

                                <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-2xl mx-auto">
                                    Buy the Accelerator today for <span className="text-white font-bold decoration-blue-500 underline underline-offset-4">£99</span>.
                                    If you upgrade to our 1-1 Mentorship later, we will credit that full amount back to you.
                                </p>

                                <div className="w-full max-w-lg mx-auto bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 p-8 rounded-3xl relative overflow-hidden group hover:border-blue-500/50 transition-colors duration-500">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                                    <div className="flex justify-between items-end relative z-10">
                                        <div className="text-left">
                                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Total Credit</p>
                                            <p className="text-4xl font-heading font-black text-white">£99.00</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mb-1">Status</p>
                                            <p className="text-white font-bold text-sm bg-blue-600/20 px-3 py-1 rounded-lg border border-blue-500/30">Active</p>
                                        </div>
                                    </div>
                                    {/* Shine effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
                                </div>

                                <div className="mt-12">
                                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">The Result?</p>
                                    <p className="text-2xl md:text-3xl font-heading font-black text-white uppercase italic">
                                        Step up & The Accelerator is <span className="text-blue-500">FREE.</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* SECTION 7: AUTHORITY */}
            <section className="py-16 md:py-24 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-[0.03] pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeInSection className="relative">
                            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border-[12px] border-slate-800 max-w-sm mx-auto md:max-w-none transform md:-rotate-2 hover:rotate-0 transition-transform duration-700 group">
                                <img src="/Sonny-Webster.webp" alt="Sonny Webster Olympian" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                <div className="absolute bottom-10 left-10">
                                    <p className="text-blue-500 font-black text-xs uppercase tracking-widest mb-1">Coach Sonny</p>
                                    <h4 className="text-white text-3xl font-heading font-black uppercase leading-none italic tracking-tight">London 2012 <br />Olympian</h4>
                                </div>
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-blue-600 rounded-[32px] -z-0 opacity-10"></div>
                        </FadeInSection>

                        <FadeInSection delay={200}>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-white mb-6 uppercase leading-[1.1] tracking-tighter">
                                Don't Learn From <br /> <span className="text-slate-500 line-through">Influencers.</span> <br />
                                <span className="text-blue-600">Learn From Olympians.</span>
                            </h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                                We've lived this sport at the highest level. We don't teach "trends." We teach physics, biomechanics, and the exact drills used on the world platform.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <div className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3 group hover:border-blue-500 transition-colors">
                                    <Award className="w-5 h-5 text-blue-600" />
                                    <span className="font-heading font-black text-slate-300 uppercase text-xs tracking-widest">Olympian</span>
                                </div>
                                <div className="bg-slate-800 border border-slate-700 px-6 py-3 rounded-2xl shadow-sm flex items-center gap-3 group hover:border-blue-500 transition-colors">
                                    <Trophy className="w-5 h-5 text-blue-600" />
                                    <span className="font-heading font-black text-slate-300 uppercase text-xs tracking-widest">Commonwealth Gold</span>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* SECTION 8: CLOSE */}
            <section className="py-24 md:py-40 text-center relative overflow-hidden flex flex-col items-center">
                <div className="absolute top-0 left-0 w-full h-full bg-grid opacity-[0.03] pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
                    <FadeInSection>
                        <h2 className="text-4xl md:text-7xl font-heading font-black text-slate-900 mb-10 uppercase leading-[1.1] tracking-tighter">
                            30 Days to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Better Technique.</span>
                        </h2>
                        <p className="text-slate-500 text-lg md:text-2xl font-medium mb-16 max-w-2xl mx-auto leading-relaxed italic">
                            If you don't feel a massive difference in your movement quality within the first 5 sessions, <span className="text-slate-900 font-bold">we'll give you a full refund.</span> No questions.
                        </p>

                        <div className="relative inline-block group mb-12 transform hover:scale-105 transition-transform duration-500">
                            <div className="absolute -inset-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-[40px] blur-3xl opacity-30 group-hover:opacity-50 transition duration-500"></div>
                            <button
                                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                                className="cursor-pointer relative bg-gradient-to-r from-blue-600 to-blue-700 border-b-[10px] border-blue-800 active:border-b-0 active:translate-y-[10px] text-white font-heading font-black text-2xl md:text-4xl uppercase tracking-[0.2em] px-20 py-10 rounded-[40px] shadow-[0_25px_60px_-15px_rgba(37,99,235,0.4)] hover:brightness-110 transition-all duration-300 transform-gpu"
                            >
                                Start Accelerator
                            </button>
                        </div>

                        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6 text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.4em] pt-12">
                            <span className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-blue-500" /> Instant Access</span>
                            <span className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-blue-500" /> Lifetime Updates</span>
                            <span className="flex items-center gap-3"><CheckCircle className="w-4 h-4 text-blue-500" /> Mobile Friendly</span>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* Footer Area */}
            <footer className="py-12 border-t border-slate-200 text-center">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">© 2026 The Lifting Zone. All Rights Reserved.</p>
            </footer>

        </div>
    );
};

export default SalesPage;
