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
    Zap,
    ChevronDown,
    ChevronUp,
    AlertTriangle,
    Check
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

const AccordionItem = ({ title, children, isOpen, onClick }) => {
    return (
        <div className={`border rounded-2xl overflow-hidden mb-4 transition-all duration-300 ${isOpen ? 'bg-white border-blue-200 shadow-md' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
            <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none group"
                onClick={onClick}
            >
                <div className="flex items-center gap-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${isOpen ? 'bg-blue-600 border-blue-600 text-white rotate-180' : 'bg-slate-50 border-slate-200 text-slate-400 group-hover:border-blue-300 group-hover:text-blue-500'}`}>
                        <ChevronDown className="w-5 h-5 transition-transform" />
                    </div>
                    <span className={`font-heading font-bold text-lg transition-colors ${isOpen ? 'text-blue-700' : 'text-slate-900 group-hover:text-blue-700'}`}>{title}</span>
                </div>
            </button>
            <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className="overflow-hidden">
                    <div className="px-8 pb-8 pt-0 text-slate-600 leading-relaxed pl-[4.5rem]">
                        <div className="pt-2 border-t border-dashed border-slate-200">
                            <div className="mt-4">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Education = ({ onBack }) => {
    const [openModule, setOpenModule] = useState(0);
    const [openFaq, setOpenFaq] = useState(null);

    const toggleModule = (index) => {
        setOpenModule(openModule === index ? null : index);
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const modules = [
        {
            title: "5.1 Unlocking Athletic Potential",
            content: [
                "Importance of Assessment",
                "Wrist Mobility",
                "Thoracic Mobility",
                "Shoulder Mobility",
                "Hip Mobility",
                "Foundational Strength vs Hyper Mobility",
                "Ankle Mobility"
            ]
        },
        {
            title: "5.2 The Art of Warming Up for Weightlifting",
            content: [
                "Warming Up for the Olympic Lifts",
                "Snatch-Specific Warm-Up",
                "Overhead-Specific Warm-Up"
            ]
        },
        {
            title: "5.3 Mastering the Snatch",
            content: [
                "What Makes a Great Snatch",
                "The Transition",
                "The Stand Up & Receive",
                "The Second Pull (Push)",
                "The First Pull (Push)",
                "Snatch Set-Up Position",
                "Mastering the Overhead Position",
                "Finding the Optimal Grip",
                "Applying the Principles of the Snatch"
            ]
        },
        {
            title: "5.4 Conquering the Clean & Jerk",
            content: [
                "What Makes a Great Clean and Jerk",
                "Mastering the Jerk",
                "Front Squat & Transition",
                "Clean Set-Up Position",
                "Clean Second Pull",
                "Clean First Pull",
                "Approach and Timing",
                "Applying the Principles of the Clean and Jerk"
            ]
        },
        {
            title: "5.5 Building Winning Programs",
            content: [
                "Introduction to Principles for Programming",
                "Volume and Intensity",
                "Testing & Monitoring",
                "Session Structure",
                "Periodisation",
                "Exercise Selection",
                "Building the Program"
            ]
        }
    ];

    const faqs = [
        {
            q: "Who is this course designed for?",
            a: "Coaches who want to master Olympic weightlifting and elevate their athletes’ performance. Whether they’re working with beginners or experienced lifters."
        },
        {
            q: "What if I’ve already been coaching for years?",
            a: "Even experienced coaches will gain exclusive insights from this course, learning proven techniques and shortcuts that aren’t available anywhere else."
        },
        {
            q: "Will this course help me coach athletes of all levels?",
            a: "Absolutely. The methods taught here are tailored to work for anyone, from CrossFit Champs to 85kg lifters."
        },
        {
            q: "What if I don’t have a lot of clients yet?",
            a: "This course will give you the skills and confidence to attract more clients, including how to market yourself as a top-tier Olympic weightlifting coach."
        },
        {
            q: "Will I get lifetime access to the course materials?",
            a: "Yes. You’ll have unlimited access to all 36 videos and resources, so you can revisit them whenever needed."
        }
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

            {/* 1. HERO / ABOVE THE FOLD */}
            <section className="relative pt-32 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-slate-900 text-white">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-slate-900"></div>
                <div className="absolute inset-0 bg-grid opacity-[0.05]"></div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <FadeInSection>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-8">
                            <Award className="w-3 h-3" /> Official Certification
                        </div>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-[1] mb-8 uppercase tracking-tight">
                            Great Coaches Don't Just <br /> Teach the Lift. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                                They Know What Makes It Work.
                            </span>
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
                            Start Coaching Like an Olympian Today.
                        </p>

                        <button onClick={() => document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' })} className="bg-white text-slate-900 font-heading font-black py-4 px-10 rounded-xl text-lg uppercase tracking-widest hover:bg-blue-50 transition-colors shadow-2xl shadow-white/10 btn-pop">
                            Start Coaching Like an Olympian Today
                        </button>
                    </FadeInSection>
                </div>
            </section>

            {/* 2. BIG IDEA / VALUE FRAME */}
            <section className="py-24 bg-white relative">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeInSection>
                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase leading-none mb-8">
                                On average, you'll spend over <span className="text-blue-600">twelve thousand hours</span> of your career coaching.
                            </h2>
                            <p className="text-slate-600 text-2xl font-black leading-relaxed mb-8 uppercase italic border-l-4 border-slate-900 pl-6">
                                Why not spend just twelve hours learning how to do it well?
                            </p>
                            <p className="text-slate-500 leading-relaxed font-medium">
                                Get the secrets I’ve gained from leading over <span className="text-slate-900 font-bold">200 seminars</span>, helping over <span className="text-slate-900 font-bold">40,000 people</span> improve their mobility, and helping over <span className="text-slate-900 font-bold">10,000 athletes</span> hit personal bests. I’ve never shared all of this until now.
                            </p>
                        </FadeInSection>
                        <FadeInSection delay={200}>
                            {/* Stats visual */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                                    <div className="text-4xl font-heading font-black text-blue-600 mb-2">200+</div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Seminars Led</div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center">
                                    <div className="text-4xl font-heading font-black text-blue-600 mb-2">40K+</div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">People Helped</div>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 text-center col-span-2">
                                    <div className="text-5xl font-heading font-black text-slate-900 mb-2">10,000+</div>
                                    <div className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Athletes Hit Personal Bests</div>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* 3. CORE BENEFITS */}
            <section className="py-24 bg-slate-50 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { title: "Confident to Coach", desc: "Learn adaptable coaching cues and methods that ensure success for all skill levels.", icon: ShieldCheck },
                            { title: "Build Winning Programs", desc: "Walk away knowing how to structure effective weightlifting programs that get results.", icon: Zap },
                            { title: "Modernised Approach", desc: "Designed to bring teaching and coaching weightlifting into the future.", icon: CheckCircle }
                        ].map((item, i) => (
                            <FadeInSection key={i} delay={i * 100}>
                                <div className="group bg-white rounded-[32px] overflow-hidden shadow-xl hover:-translate-y-2 transition-transform duration-500 border border-slate-100 flex flex-col h-full p-8 md:p-10">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm">
                                        <item.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-black text-slate-900 uppercase mb-4">{item.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. AUTHORITY / MENTOR INTRO */}
            <section className="py-24 bg-slate-900 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeInSection>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-[40px] transform rotate-3 scale-105 opacity-50 blur-sm"></div>
                                <div className="relative rounded-[40px] overflow-hidden border border-slate-700 shadow-2xl">
                                    <img src="/Coaches/coach-sonny.jpeg" alt="Sonny Webster" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </FadeInSection>
                        <FadeInSection delay={200}>
                            <h2 className="text-4xl md:text-5xl font-heading font-black uppercase mb-8 leading-none">
                                Meet Your Mentor <br /> <span className="text-blue-500">Sonny Webster</span>
                            </h2>
                            <div className="space-y-6 text-slate-300 font-medium text-lg leading-relaxed">
                                <p>
                                    Sonny represented Great Britain at the <span className="text-white font-bold">2016 Rio Olympics</span> and every major international weightlifting competition for over 20 years.
                                </p>
                                <p>
                                    With over <span className="text-white font-bold">20 years of experience</span> in the sport, Sonny has built a reputation as one of the world’s most knowledgeable and engaging weightlifting coaches.
                                </p>
                                <p>
                                    He’s led over 200 seminars around the globe, helping over 40,000 athletes improve their mobility, and a modern, accessible approach that works for everyone, from first-time lifters to CrossFit champions.
                                </p>
                                <p>
                                    He’s also known for his viral lifts and technical breakdowns that make complex lifts easy to understand and apply.
                                </p>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* 5. CURRICULUM */}
            <section className="py-24 bg-white relative">
                <div className="max-w-4xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase mb-8">
                            What You Will <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Master</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-3xl mx-auto">
                            With <span className="text-slate-900 font-bold">36 in-depth videos</span>, this course delivers access to <span className="text-slate-900 font-bold">20 years of expert knowledge</span>, tools, and techniques that have helped thousands of lifters achieve new personal bests.
                        </p>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-3xl mx-auto mt-4">
                            From assessing athletes and creating tailored warm-up routines, to breaking down the snatch and clean & jerk step-by-step, you’ll gain the skills, knowledge, and systems that work through the seasons.
                        </p>

                        <div className="mt-12 w-full max-w-4xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200 relative group">
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/BF0Zs4pdvQk"
                                title="Coach Certification Overview"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </FadeInSection>

                    <FadeInSection>
                        <div className="space-y-2">
                            {modules.map((mod, i) => (
                                <AccordionItem
                                    key={i}
                                    title={mod.title}
                                    isOpen={openModule === i}
                                    onClick={() => toggleModule(i)}
                                >
                                    <ul className="grid md:grid-cols-2 gap-3">
                                        {mod.content.map((item, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm font-medium">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></div>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionItem>
                            ))}
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* 6. BONUSES */}
            {/* 6. BONUSES - REDESIGNED */}
            <section className="py-32 bg-[#020617] relative overflow-hidden">
                {/* Background ambient effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-600 rounded-full blur-[150px]"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-600 rounded-full blur-[150px]"></div>
                </div>

                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <FadeInSection className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-heading font-black uppercase mb-8 leading-none tracking-tight text-white drop-shadow-2xl">
                            But Wait... <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">There Is More.</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">
                            We don't just give you a course. We give you an entire coaching ecosystem.
                        </p>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 gap-10">
                        {[
                            {
                                title: "20 In-Depth “How-To” Videos",
                                desc: "Access to videos from the Ultimate Guide to Weightlifting, covering common faults and fine details of specific techniques.",
                                image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=2069&auto=format&fit=crop",
                                tag: "Technical Library"
                            },
                            {
                                title: "Sonny’s Secret Software",
                                desc: "The exact tools used to create viral technical breakdowns with top lifters like C.J. Cummings and Mattie Rogers.",
                                image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
                                tag: "Exclusive Tool"
                            },
                            {
                                title: "12-Week Program Template",
                                desc: "The same structure used for high-ticket clients. Worth £500, now included so you can apply elite-level programming immediately.",
                                image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=2071&auto=format&fit=crop",
                                tag: "Plug & Play"
                            },
                            {
                                title: "Level 1 Certification",
                                desc: "Your badge of expertise. A physical and digital certificate to display your mastery and attract new clients.",
                                image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                                tag: "Accreditation"
                            }
                        ].map((bonus, i) => (
                            <FadeInSection key={i} delay={i * 100}>
                                <div className="group relative h-96 rounded-[40px] overflow-hidden border border-white/10 hover:border-blue-500/50 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(37,99,235,0.25)] hover:-translate-y-2">
                                    {/* Background Image with Zoom Effect */}
                                    <div className="absolute inset-0">
                                        <img
                                            src={bonus.image}
                                            alt={bonus.title}
                                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent/20 group-hover:via-[#020617]/70 transition-all duration-500"></div>
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end items-start text-left">
                                        <div className="mb-auto self-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20">
                                                {bonus.tag}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl md:text-4xl font-heading font-black text-white uppercase mb-4 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all">
                                            {bonus.title}
                                        </h3>
                                        <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed max-w-lg group-hover:text-slate-200 transition-colors">
                                            {bonus.desc}
                                        </p>
                                    </div>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* 7. PRICE / OFFER Section */}
            <section className="py-24 bg-blue-600 relative overflow-hidden" id="pricing">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900"></div>
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <FadeInSection>
                        <div className="bg-white rounded-[40px] p-8 md:p-10 text-center shadow-2xl relative overflow-hidden border-8 border-white/10 backdrop-blur-sm max-w-3xl mx-auto">
                            <div className="absolute top-0 right-0 bg-black text-white px-5 py-2 rounded-bl-2xl font-heading font-black uppercase tracking-widest text-xs">Early Bird Special</div>

                            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 uppercase">Get Certified Now</h2>

                            <div className="flex flex-col items-center justify-center mb-8">
                                <div className="flex items-baseline gap-3">
                                    <span className="text-slate-400 text-xl font-bold line-through decoration-red-500 decoration-2">£500.00</span>
                                    <span className="text-5xl md:text-7xl font-heading font-black text-blue-600 tracking-tighter">£249.50</span>
                                </div>
                                <span className="mt-3 bg-red-100 text-red-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">Save 50% Today</span>
                            </div>

                            <div className="bg-slate-50 rounded-3xl p-8 mb-10 text-left border border-slate-100">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 text-center">Everything Included:</p>
                                <ul className="space-y-4">
                                    {[
                                        "36 in-depth modules covering Olympic lifts, mobility, assessments, and program design",
                                        "Exclusive access to the same software used by Sonny Webster",
                                        "12-week customizable training template used in Sonny’s high-ticket one-on-one coaching",
                                        "Over 200 instructional videos with detailed step-by-step guidance",
                                        "Bonus materials on fault correction and advanced lifting nuances",
                                        "Insider tips from a coach who’s led 200+ seminars and helped 10,000+ athletes PB",
                                        "Level 1 Certification upon course completion"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-4 text-slate-700 font-medium text-sm md:text-base">
                                            <CheckCircle className="w-6 h-6 text-blue-500 shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="w-full bg-slate-900 border-b-[6px] border-slate-700 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black py-6 rounded-2xl text-2xl uppercase tracking-widest shadow-xl transition-all btn-pop">
                                Save £500 Off
                            </button>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* 8. TESTIMONIAL / BELIEF SHIFT */}
            {/* 8. QUOTE / BELIEF SHIFT - REDESIGNED */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 text-[400px] leading-none text-slate-50 opacity-50 font-serif font-black select-none pointer-events-none -translate-y-1/2 translate-x-1/4">”</div>
                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    <FadeInSection>
                        <div className="relative pl-8 md:pl-12 border-l-4 border-blue-600">
                            <blockquote className="text-2xl md:text-4xl font-heading font-black text-slate-900 uppercase leading-snug mb-6">
                                "Mastering the key principles of weightlifting is one thing, but <span className="text-blue-600">seeing your athletes hit new PRs</span> in just weeks is where this course truly delivers."
                            </blockquote>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-2xl">
                                You’ll walk away knowing how to troubleshoot mobility issues, refine technique, and see your clients excel faster than ever before.
                            </p>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* 9. PROBLEM-AGITATION / CHOICE FRAME */}
            <section className="py-24 bg-slate-50 relative border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase">
                            Want to be an Olympic Lifting Coach? <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">You have two options.</span>
                        </h2>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {/* Option 1 */}
                        <FadeInSection>
                            <div className="bg-white rounded-[40px] border border-slate-200 p-10 h-full opacity-70 hover:opacity-100 transition-opacity">
                                <h3 className="text-2xl font-heading font-black text-slate-400 uppercase mb-8">Option 1: Go It Alone</h3>
                                <ul className="space-y-6">
                                    {[
                                        "Spend 12,000 hours coaching without real direction",
                                        "Struggle to explain the “why” behind every lift",
                                        "Piece together random advice from multiple sources",
                                        "Create generic programs and hope for the best"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start text-slate-500 font-medium">
                                            <AlertTriangle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeInSection>

                        {/* Option 2 */}
                        <FadeInSection delay={100}>
                            <div className="bg-slate-900 rounded-[40px] border border-slate-800 p-10 h-full relative overflow-hidden shadow-2xl transform scale-105">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
                                <h3 className="text-2xl font-heading font-black text-white uppercase mb-8">Option 2: Lead to Success</h3>
                                <ul className="space-y-6 relative z-10">
                                    {[
                                        "Master Olympic lifts in just 12 hours",
                                        "Know how to fix mobility, form, and technique issues",
                                        "Learn from an expert with over 20 years coaching experience",
                                        "Build tailored programs for every skill level"
                                    ].map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start text-white font-medium">
                                            <CheckCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* 10. FAQ SECTION */}
            <section className="py-24 bg-white relative">
                <div className="max-w-3xl mx-auto px-6">
                    <FadeInSection className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase">Frequently Asked Questions</h2>
                    </FadeInSection>
                    <div className="space-y-4">
                        {faqs.map((item, i) => (
                            <AccordionItem
                                key={i}
                                title={item.q}
                                isOpen={openFaq === i}
                                onClick={() => toggleFaq(i)}
                            >
                                <p className="text-base">{item.a}</p>
                            </AccordionItem>
                        ))}
                    </div>
                </div>
            </section>

            {/* 11. SOCIAL PROOF */}
            <section className="py-24 bg-slate-900 text-white relative">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <FadeInSection>
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase mb-16">Real Results, Proven Success</h2>
                        <div className="grid md:grid-cols-3 gap-8 items-center opacity-70">
                            {/* Placeholders for logos/names */}
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                                <h3 className="font-heading font-black text-xl uppercase mb-2">Mitchell Hooper</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-500">World’s Strongest Man</p>
                            </div>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                                <h3 className="font-heading font-black text-xl uppercase mb-2">Khan Porter</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-500">CrossFit Games Champion</p>
                            </div>
                            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
                                <h3 className="font-heading font-black text-xl uppercase mb-2">Sara Sigmundsdottir</h3>
                                <p className="text-xs font-bold uppercase tracking-widest text-blue-500">CrossFit Legend</p>
                            </div>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* 12. PHILOSOPHY / BRAND STATEMENT */}
            <section className="py-24 bg-white border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <FadeInSection>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase mb-8">What Truly Defines Great Coaching</h2>
                        <div className="text-lg md:text-xl font-medium text-slate-600 leading-relaxed space-y-6">
                            <p>
                                The ability to adapt and help any athlete, whether they’re just starting or pushing past limits later in life.
                            </p>
                            <p>
                                This course teaches you to become a versatile coach, capable of following your approach season after season. From elite lifters refining technique to 50-year-olds gaining confidence, you’ll learn skills that coach anyone and make adaptability your superpower.
                            </p>
                        </div>
                        <div className="mt-12">
                            <img src="/the-lifting-zone-logo.svg" alt="The Lifting Zone" className="h-12 mx-auto opacity-50 grayscale hover:grayscale-0 transition-all opacity-100" />
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 bg-slate-950 text-slate-500 text-center text-xs font-bold uppercase tracking-widest border-t border-slate-900">
                <p>&copy; 2026 The Lifting Zone. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Education;
