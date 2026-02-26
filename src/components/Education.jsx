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
    Check,
    GraduationCap
} from 'lucide-react';
import VimeoPlayer from './VimeoPlayer';
import SEO from './SEO';

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
            <SEO
                title="Coach Certification | The Lifting Zone"
                description="Become a certified weightlifting coach. Master the art of teaching lifting."
            />
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
                            <h2 className="text-2xl md:text-4xl font-heading font-black text-slate-900 uppercase leading-[1.1] mb-8">
                                On average, you'll spend over <br />
                                <span className="text-blue-600">twelve thousand hours</span> <br />
                                of your career coaching.
                            </h2>
                            <p className="text-slate-700 text-lg md:text-xl font-black leading-tight mb-12 uppercase italic border-l-[6px] border-slate-900 pl-8 max-w-lg">
                                Why not spend just twelve hours <br />learning how to do it well?
                            </p>
                            <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">
                                Get the secrets I’ve gained from leading over <span className="text-slate-900 font-bold">200 seminars</span>, helping over <span className="text-slate-900 font-bold">40,000 people</span> improve their mobility, and helping over <span className="text-slate-900 font-bold">10,000 athletes</span> hit personal bests. I’ve never shared all of this until now.
                            </p>
                        </FadeInSection>
                        <FadeInSection delay={200} className="relative">
                            {/* Decorative Elements */}
                            <div className="absolute -top-6 -right-6 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl"></div>
                            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-indigo-600/10 rounded-full blur-3xl"></div>

                            <div className="relative group perspective-1000">
                                <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] transform rotate-3 scale-[1.02] group-hover:rotate-0 transition-transform duration-700"></div>
                                <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-2 border-white">
                                    <img
                                        src="/Sonny-teaching.jpg"
                                        alt="Sonny Webster Teaching"
                                        className="w-full h-full object-cover aspect-[4/5] transform group-hover:scale-105 transition-transform duration-1000"
                                    />
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
            {/* 6. BONUSES - PREMIUM SHOWCASE */}
            <section className="py-32 bg-[#f8fafc] relative overflow-hidden">
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-400/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        {/* Left Column: Heading & Introduction */}
                        <div className="lg:col-span-12 text-center mb-16">
                            <FadeInSection>
                                <span className="text-blue-600 font-black tracking-[0.3em] uppercase text-xs mb-4 inline-block">The Coaching Powerhouse</span>
                                <h2 className="text-5xl md:text-7xl font-heading font-black text-slate-900 uppercase leading-[0.9] tracking-tighter mb-8">
                                    But Wait... <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-900">There Is More.</span>
                                </h2>
                                <p className="text-slate-500 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
                                    This isn't just a course. It's the complete <span className="text-slate-900 font-bold italic">Elite Ecosystem</span> Sonny uses to build world-class athletes.
                                </p>
                            </FadeInSection>
                        </div>

                        {/* Showcase Grid */}
                        <div className="lg:col-span-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Feature 1: The Library */}
                            <FadeInSection delay={100} className="md:col-span-2 lg:col-span-1">
                                <div className="bg-white rounded-[40px] p-8 h-full border border-slate-100 shadow-xl group hover:-translate-y-2 transition-all duration-500 flex flex-col">
                                    <div className="mb-8 relative rounded-3xl overflow-hidden aspect-video shadow-lg">
                                        <img src="/laptop-showing-videos.webp" alt="Technical Library" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-blue-600/10 group-hover:opacity-0 transition-opacity"></div>
                                    </div>
                                    <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest self-start mb-6">Bonus #1</span>
                                    <h3 className="text-2xl font-heading font-black text-slate-900 uppercase mb-4 leading-tight">20 In-Depth "How-To" Videos</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-grow">
                                        Covering the common faults and fine details of technique. From thumb taping to squat mechanics—it's all here.
                                    </p>
                                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                                        <Video className="w-4 h-4" /> 20+ Exclusive Lessons
                                    </div>
                                </div>
                            </FadeInSection>

                            {/* Feature 2: The Software (Large Highlight) */}
                            <FadeInSection delay={200} className="md:col-span-2 lg:col-span-2">
                                <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 h-full relative overflow-hidden group shadow-2xl">
                                    <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32"></div>

                                    <div className="grid md:grid-cols-2 gap-8 items-center relative z-10 h-full">
                                        <div className="order-2 md:order-1">
                                            <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest self-start mb-8 inline-block shadow-lg shadow-blue-600/30">Bonus #2</span>
                                            <h3 className="text-3xl md:text-4xl font-heading font-black text-white uppercase mb-6 leading-tight">Sonny's Secret <br /><span className="text-blue-400">Analysis Software</span></h3>
                                            <p className="text-slate-400 font-medium text-base leading-relaxed mb-8">
                                                The exact software used to create viral technical breakdowns for Olympians like Gui Malheiros and Clarence Kennedy. Now yours to master.
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex -space-x-3">
                                                    {[1, 2, 3].map(i => <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center"><Star className="w-3 h-3 text-blue-400" /></div>)}
                                                </div>
                                                <span className="text-slate-300 text-[10px] font-bold uppercase tracking-widest">Industry Gold Standard</span>
                                            </div>
                                        </div>
                                        <div className="order-1 md:order-2 group-hover:scale-105 transition-transform duration-700">
                                            <img src="/sonny-secret-software.webp" alt="Secret Software" className="w-full h-auto drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)] rounded-2xl" />
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>

                            {/* Feature 3: The Program Template */}
                            <FadeInSection delay={300} className="md:col-span-1">
                                <div className="bg-white rounded-[40px] p-8 h-full border border-slate-100 shadow-xl group hover:-translate-y-2 transition-all duration-500 flex flex-col">
                                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                        <BookOpen className="w-8 h-8" />
                                    </div>
                                    <span className="text-blue-600 font-black text-[10px] uppercase tracking-widest mb-2">Bonus #3</span>
                                    <h3 className="text-2xl font-heading font-black text-slate-900 uppercase mb-4 leading-tight">12-Week Client Template</h3>
                                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 flex-grow">
                                        The same structure used for high-ticket clients paying £2,500+. Plug and play elite programming for your own athletes.
                                    </p>
                                    <div className="pt-6 border-t border-slate-100 mt-auto">
                                        <span className="text-slate-400 font-bold text-[10px] uppercase">Value: £500.00</span>
                                    </div>
                                </div>
                            </FadeInSection>

                            {/* Feature 4: The Certification Level 1 */}
                            <FadeInSection delay={400} className="md:col-span-2 lg:col-span-2">
                                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[40px] p-8 h-full relative overflow-hidden group shadow-xl flex items-center">
                                    <div className="absolute inset-0 bg-grid opacity-[0.1]"></div>
                                    <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center w-full">
                                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shrink-0">
                                            <Award className="w-12 h-12 md:w-16 md:h-16 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-heading font-black text-white uppercase mb-4 leading-tight">Level 1 <br />Certification</h3>
                                            <p className="text-blue-100 font-medium text-base leading-relaxed opacity-80">
                                                Your badge of expertise and credibility. A world-recognized accreditation as an Olympic weightlifting coach.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </FadeInSection>
                        </div>
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

                            <a href="https://learn.theliftingzone.com/offers/Rp5sqNWw?utm_source=quiz_funnel" className="block w-full text-center bg-slate-900 border-b-[6px] border-slate-700 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black py-6 rounded-2xl text-2xl uppercase tracking-widest shadow-xl transition-all btn-pop">
                                Save £250 Off
                            </a>
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

            {/* 11. SOCIAL PROOF - UPDATED WITH IMAGES */}
            <section className="py-24 bg-slate-900 text-white relative">
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <FadeInSection>
                        <h2 className="text-3xl md:text-5xl font-heading font-black uppercase mb-16">Real Results, Proven Success</h2>
                        <div className="grid md:grid-cols-3 gap-8 items-center">
                            {[
                                { name: "Mitchell Hooper", title: "World’s Strongest Man", image: "/Mitchell-Hooper.jpg" },
                                { name: "Khan Porter", title: "CrossFit Games Champion", image: "/Khan-Porter.webp" },
                                { name: "Sara Sigmundsdottir", title: "CrossFit Legend", image: "/Sara Sigmundsdóttir.webp" }
                            ].map((athlete, i) => (
                                <div key={i} className="group relative aspect-[4/5] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl hover:-translate-y-2 transition-transform duration-500">
                                    <img
                                        src={athlete.image}
                                        alt={athlete.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                                        <h3 className="font-heading font-black text-xl uppercase mb-1">{athlete.name}</h3>
                                        <p className="text-[10px] font-bold uppercase tracking-widest text-blue-500">{athlete.title}</p>
                                    </div>
                                </div>
                            ))}
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
