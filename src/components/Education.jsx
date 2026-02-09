import React, { useState, useEffect, useRef } from 'react';
import {
    ArrowLeft,
    CheckCircle,
    Play,
    Star,
    Award,
    ShieldCheck,
    Users,
    BookOpen,
    Video,
    Download,
    Zap
} from 'lucide-react';
import VimeoPlayer from './VimeoPlayer';

// Animation Hooks
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

const Education = ({ onBack }) => {
    const [activeModule, setActiveModule] = useState(0);

    const modules = [
        { title: "Technical Mastery", duration: "2 Hours" },
        { title: "Fault Identification", duration: "1.5 Hours" },
        { title: "Cueing & Communication", duration: "2 Hours" },
        { title: "Program Design", duration: "3 Hours" },
        { title: "Athlete Psychology", duration: "1 Hour" },
    ];

    return (
        <div className="min-h-screen font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden bg-[#f8fafc]">
            {/* Fixed Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-between px-6 py-6 pointer-events-none">
                <button
                    onClick={onBack}
                    className="pointer-events-auto cursor-pointer group flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border border-slate-200 hover:bg-white hover:border-blue-200 transition-all uppercase text-[10px] font-bold tracking-widest text-slate-600 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    BACK
                </button>
            </div>

            {/* HERO SECTION - Dark Premium Style */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
                <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <FadeInSection>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                            <Award className="w-3 h-3" /> Official Certification
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-[1.1] mb-8 uppercase tracking-tight">
                            Great Coaches Don't Just <br /> Teach the Lifts. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                                They Know What Makes It Work.
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
                            The comprehensive Level 1 Certification for coaches who want to master the art and science of Olympic Weightlifting.
                        </p>

                        <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="bg-white text-slate-900 font-heading font-black py-4 px-10 rounded-xl text-lg uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-2xl shadow-white/10">
                            Start Certification
                        </button>
                    </FadeInSection>
                </div>
            </section>

            {/* INTRO SECTION - White Clean */}
            <section className="py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeInSection>
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-slate-900 uppercase leading-tight mb-8">
                                On average, you'll spend over <span className="text-blue-600">twelve thousand hours</span> of your career coaching.
                            </h2>
                            <p className="text-slate-600 text-lg leading-relaxed mb-6 font-medium">
                                Why not spend just twelve hours learning how to do it well?
                            </p>
                            <p className="text-slate-500 leading-relaxed">
                                In the same time it takes to binge a TV series, you could master the skills that will define your career alongside an Olympian. This isn't just about lifting weights; it's about seeing the mechanics that others miss.
                            </p>
                        </FadeInSection>
                        <FadeInSection delay={200}>
                            <div className="relative rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 rotating-border-wrap">
                                <img
                                    src="/Coaches/coach-sonny.jpeg"
                                    alt="Coaching Session"
                                    className="w-full h-full object-cover aspect-[4/5]"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/80 to-transparent p-8">
                                    <p className="text-white font-heading font-bold uppercase tracking-widest text-sm">Master The Craft</p>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* FEATURE GRID */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Technical Mastery", icon: Zap, img: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop" },
                            { title: "Programming Logic", icon: BookOpen, img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" },
                            { title: "Video Analysis", icon: Video, img: "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=2069&auto=format&fit=crop" }
                        ].map((item, i) => (
                            <FadeInSection key={i} delay={i * 100}>
                                <div className="group bg-white rounded-[32px] overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500 border border-slate-100 flex flex-col h-full">
                                    <div className="h-48 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10"></div>
                                        <img src={item.img} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    </div>
                                    <div className="p-8 flex-grow flex flex-col items-center text-center">
                                        <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
                                            <item.icon className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-xl font-heading font-black text-slate-900 uppercase mb-2">{item.title}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">Master the fundamental principles that govern elite performance.</p>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* MEET YOUR MENTOR - Dark */}
            <section className="py-24 bg-slate-900 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeInSection>
                            {/* Image Container with Stylized Border */}
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[40px] transform rotate-3 scale-105 opacity-50 blur-sm"></div>
                                <div className="relative rounded-[40px] overflow-hidden border border-slate-700 shadow-2xl">
                                    <img src="/Coaches/coach-sonny.jpeg" alt="Sonny Webster" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={200}>
                            <h2 className="text-4xl font-heading font-black uppercase mb-6 leading-tight">
                                Meet Your Mentor <br /> <span className="text-blue-500">Sonny Webster</span>
                            </h2>
                            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                2016 Olympian and founder of The Lifting Zone. Sonny has spent the last decade deconstructing Olympic Weightlifting into a teachable system. He has delivered over 175 seminars globally and certified thousands of coaches.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {['2016 Olympian', 'Commonwealth Games', '175+ Seminars', 'Global Expert'].map((tag, i) => (
                                    <span key={i} className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-xs font-bold uppercase tracking-widest text-blue-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* CURRICULUM SECTION */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase mb-8">
                            What You Will <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Master</span>
                        </h2>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Module List */}
                        <div className="space-y-4">
                            {modules.map((mod, i) => (
                                <FadeInSection key={i} delay={i * 100}>
                                    <div
                                        className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${activeModule === i ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-[1.02]' : 'bg-white border-slate-200 hover:border-blue-400 text-slate-500'}`}
                                        onClick={() => setActiveModule(i)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${activeModule === i ? 'bg-blue-600 border-blue-600 text-white' : 'bg-slate-100 border-slate-200 text-slate-400'}`}>
                                                {i + 1}
                                            </div>
                                            <span className="font-heading font-bold uppercase tracking-wide text-sm">{mod.title}</span>
                                        </div>
                                        <Play className={`w-4 h-4 ${activeModule === i ? 'text-blue-400' : 'text-slate-300 group-hover:text-blue-500'}`} />
                                    </div>
                                </FadeInSection>
                            ))}
                        </div>

                        {/* Preview Area */}
                        <FadeInSection delay={300}>
                            <div className="bg-slate-900 rounded-[32px] p-2 shadow-2xl h-full border border-slate-800">
                                <div className="bg-slate-800 rounded-[24px] h-full flex flex-col items-center justify-center relative overflow-hidden group min-h-[300px]">
                                    <div className="absolute inset-0 opacity-40">
                                        <img src="https://images.unsplash.com/photo-1550259979-ed79b48d2a30?q=80&w=2068&auto=format&fit=crop" className="w-full h-full object-cover grayscale" />
                                    </div>
                                    <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-full border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                                        <Play className="w-8 h-8 text-white fill-current" />
                                    </div>
                                    <p className="relative z-10 mt-4 text-white font-bold uppercase tracking-widest text-xs">Preview: {modules[activeModule].title}</p>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* BONUSES - Dark Gradient */}
            <section className="py-24 bg-gradient-to-br from-slate-900 to-blue-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-[0.1]"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase mb-4">But Wait There's More...</h2>
                        <p className="text-blue-200 font-medium">Included free when you join Level 1 Certification</p>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 gap-8">
                        <FadeInSection delay={100}>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-8 flex items-center gap-6 hover:bg-white/10 transition-colors">
                                <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/30">
                                    <BookOpen className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-black uppercase mb-2">Coach Manual</h4>
                                    <p className="text-slate-300 text-sm">Comprehensive PDF guide covering every aspect of the system.</p>
                                </div>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={200}>
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[32px] p-8 flex items-center gap-6 hover:bg-white/10 transition-colors">
                                <div className="w-20 h-20 bg-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/30">
                                    <Download className="w-10 h-10 text-white" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-heading font-black uppercase mb-2">Template Library</h4>
                                    <p className="text-slate-300 text-sm">Downloadable programming templates for beginner to advanced athletes.</p>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* TWO OPTIONS */}
            <section className="py-24 bg-slate-50 relative" id="pricing">
                <div className="max-w-7xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase mb-4">You Have Two Options</h2>
                        <p className="text-slate-500">Choose how you want to become certified</p>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Option 1: Online */}
                        <FadeInSection>
                            <div className="bg-white rounded-[40px] border border-slate-200 p-10 shadow-xl relative overflow-hidden group hover:border-blue-400 transition-colors">
                                <span className="absolute top-6 right-6 bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Most Popular</span>
                                <h3 className="text-2xl font-heading font-black text-slate-900 uppercase mb-4">Online Certification</h3>
                                <div className="text-4xl font-heading font-black text-blue-600 mb-8">£299<span className="text-lg text-slate-400 font-sans font-medium line-through ml-3">£599</span></div>

                                <ul className="space-y-4 mb-10">
                                    {['Self-paced learning', 'Lifetime Access', 'Digital Certificate', 'Community Access'].map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                                            <CheckCircle className="w-5 h-5 text-blue-500" /> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-slate-900 text-white font-heading font-black py-5 rounded-xl uppercase tracking-widest hover:bg-blue-600 transition-colors">
                                    Join Online Now
                                </button>
                            </div>
                        </FadeInSection>

                        {/* Option 2: Live Seminar */}
                        <FadeInSection delay={100}>
                            <div className="bg-slate-900 rounded-[40px] border border-slate-800 p-10 shadow-xl relative overflow-hidden text-white group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]"></div>
                                <h3 className="text-2xl font-heading font-black text-white uppercase mb-4">Live Seminar</h3>
                                <div className="text-4xl font-heading font-black text-white mb-8">£499</div>

                                <ul className="space-y-4 mb-10 relative z-10">
                                    {['In-person coaching', 'Hands-on practice', 'Physical Certificate', 'Networking Lunch'].map((feat, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                                            <CheckCircle className="w-5 h-5 text-purple-500" /> {feat}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-white text-slate-900 font-heading font-black py-5 rounded-xl uppercase tracking-widest hover:bg-blue-50 transition-colors relative z-10">
                                    Check Dates
                                </button>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS/RESULTS */}
            <section className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase">Real Results. Proven Success.</h2>
                    </FadeInSection>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <FadeInSection key={i} delay={i * 100}>
                                <div className="rounded-[32px] overflow-hidden aspect-[4/5] relative group">
                                    <img
                                        src={`https://images.unsplash.com/photo-${i === 1 ? '1571019614242-c5c5dee9f50b' : i === 2 ? '1517836357463-c25dfe21529b' : '1534438327276-14e5300c3a48'}?q=80&w=2070&auto=format&fit=crop`}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        alt="Result"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-100 flex items-end p-8">
                                        <div className="text-white">
                                            <div className="flex gap-1 text-yellow-500 mb-2">
                                                {[...Array(5)].map((_, star) => <Star key={star} className="w-3 h-3 fill-current" />)}
                                            </div>
                                            <p className="font-heading font-bold uppercase text-sm">"Changed my entire coaching career"</p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 bg-slate-950 text-slate-500 text-center text-xs font-bold uppercase tracking-widest border-t border-slate-900">
                <p>&copy; 2024 The Lifting Zone. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Education;
