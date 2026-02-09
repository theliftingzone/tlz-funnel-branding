import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Star, Medal, Award, ShieldCheck } from 'lucide-react';

// Custom Hook for Scroll Reveal Animations
const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
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

const AnimatedBackground = () => {
    const bgRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia("(pointer: fine)").matches) {
            const handleMouseMove = (e) => {
                if (bgRef.current) {
                    bgRef.current.style.setProperty('--mouse-x', `${e.clientX}px`);
                    bgRef.current.style.setProperty('--mouse-y', `${e.clientY}px`);
                }
            };
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#f8fafc] transform-gpu">
            {/* Dynamic Mouse Blob */}
            <div
                className="hidden md:block absolute w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] will-change-transform mix-blend-multiply opacity-100 transition-transform duration-100 ease-out"
                style={{
                    left: 'var(--mouse-x, -1000px)',
                    top: 'var(--mouse-y, -1000px)',
                    transform: 'translate(-50%, -50%)',
                }}
            />

            {/* Static Ambient Blobs with Float Animation */}
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[120px] animate-pulse-glow animate-float"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-indigo-200/20 rounded-full blur-[100px] animate-float delay-700"></div>
            <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] bg-sky-200/10 rounded-full blur-[80px] animate-float delay-500"></div>

            {/* Premium Grid Pattern */}
            <div className="absolute inset-0 bg-grid opacity-[0.4]"></div>
        </div>
    );
};

const TeamMemberRow = ({ member, index }) => {
    const isEven = index % 2 === 0;
    return (
        <FadeInSection className="mb-24 last:mb-0">
            <div className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${!isEven ? 'md:flex-row-reverse' : ''}`}>
                {/* Image Side */}
                <div className="w-full md:w-1/2 relative group perspective-1000">
                    <div className={`absolute inset-0 bg-blue-600/5 rounded-[40px] transform transition-transform duration-500 ${isEven ? '-rotate-2 group-hover:rotate-0' : 'rotate-2 group-hover:rotate-0'}`}></div>
                    <div className="relative rounded-[32px] overflow-hidden shadow-2xl shadow-slate-200 border-4 border-white aspect-[4/5] md:aspect-square">
                        <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Subtle gradient overlay for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent"></div>
                    </div>


                </div>

                {/* Content Side */}
                <div className="w-full md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-slate-900 uppercase leading-[0.9] tracking-tight mb-6">
                        {member.name.split(' ').map((word, i) => (
                            <span key={i} className="block">{word}</span>
                        ))}
                    </h2>

                    <div className={`flex flex-wrap gap-2 mb-8 ${!isEven ? 'md:justify-end' : ''} justify-center md:justify-start`}>
                        {member.roles && member.roles.map((role, idx) => (
                            <span key={idx} className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                                {role}
                            </span>
                        ))}
                    </div>

                    <div className="relative">
                        <div className={`absolute top-0 ${isEven ? '-left-4' : '-right-4'} w-1 h-full bg-blue-200/50 rounded-full hidden md:block`}></div>
                        <p className={`text-slate-600 text-lg leading-relaxed font-medium ${isEven ? 'md:pl-8' : 'md:pr-8 md:text-right'}`}>
                            {member.bio}
                        </p>
                    </div>
                </div>
            </div>
        </FadeInSection>
    );
};

const MeetTheTeam = ({ onBack, onStartQuiz }) => {
    const teamMembers = [
        {
            name: "Sonny Webster",
            roles: ["2016 Olympian", "2014 Commonwealth Games"],
            image: "/Coaches/coach-sonny.jpeg",
            bio: "2016 Olympian and 2014 Commonwealth Games athlete, founder of The Lifting Zone and globally recognized coach, having delivered over 175 seminars worldwide. Sonny has coached multiple Home Games athletes and Worlds Strongest Man competitors, and is a leading specialist in programming for athletes over 30 and mobility for long-term performance.",
            icon: Medal
        },
        {
            name: "Gareth Evans",
            roles: ["2012 Olympian", "2014 Commonwealth Gold"],
            image: "/Coaches/coach-gareth.jpeg",
            bio: "A former multiple British record holder who achieved the rare feat of double bodyweight snatch in two different weight categories. Gareth is the Head Coach of the Welsh National Team and a true specialist in competition performance and elite level programming.",
            icon: Medal
        },
        {
            name: "Kevin Doherty",
            roles: ["2x Olympic Games Coach"],
            image: "/Coaches/coach-kevin.jpeg",
            bio: "With over 30 years of weightlifting coaching experience, Kevin has coached at two Olympic Games and guided multiple Pan American champions and Commonwealth athletes. Renowned for his expertise in competition performance, he is also a leading specialist in youth athlete development, long-term programming structure, and building champions from the ground up.",
            icon: Award
        },
        {
            name: "Sam Serruya",
            roles: ["International Coach", "S&C Degree"],
            image: "/Coaches/coach-sam-serruya.jpeg",
            bio: "Based in Australia, Sam brings over 15 years of weightlifting experience and a degree in Strength & Conditioning to his coaching. He has coached at international weightlifting camps and is a specialist in accessory programming, imbalance correction, and building structurally sound, powerful lifters. Sam's detailed, technical approach helps athletes move better, lift stronger, and progress with long-term consistency.",
            icon: ShieldCheck
        },
        {
            name: "Vuyani Mashego",
            roles: ["National Record Holder", "International Lifter"],
            image: "/Coaches/coach-vuyani.jpeg",
            bio: "International weightlifter from South Africa and national record holder. Founder/Head Performance and Strength Coach at one of Dubai's leading training boxes, he is a specialist in strength development, technical analysis, and male and female weightlifting performance. He is highly regarded for his personalized coaching programming and his ability to build strong, technically sound lifters through precise video feedback.",
            icon: Star
        },
        {
            name: "Sam Bishop",
            roles: ["Olympic WL Coach", "2x CrossFit Regionals Athlete"],
            image: "/Coaches/coach-sam.jpeg",
            bio: "CrossFit Games Regional athlete and former Head Coach at one of the world's largest CrossFit franchises. With over 15 years of weightlifting coaching experience, Sam has helped more than 150 athletes achieve new personal bests. He specializes in building structured, competition ready programming for CrossFit athletes who want to elevate their weightlifting performance and technical consistency.",
            icon: Award
        }
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen relative font-body text-slate-900 selection:bg-[#2563eb] selection:text-white overflow-x-hidden">
            <AnimatedBackground />

            {/* Navigation */}
            <div className="fixed top-0 left-0 right-0 z-50 flex justify-between px-6 py-6 pointer-events-none">
                <button
                    onClick={onBack}
                    className="pointer-events-auto cursor-pointer group flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 border border-slate-200 hover:bg-white hover:border-blue-200 transition-all uppercase text-[10px] font-bold tracking-widest text-slate-600 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    BACK
                </button>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
                <FadeInSection>
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-xl shadow-slate-900/20">
                            <Star className="w-3.5 h-3.5 text-blue-500" /> The Lifting Zone Team
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-black text-slate-900 uppercase leading-[0.9] tracking-tighter mb-8">
                            World Class <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Authority.</span>
                        </h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs max-w-2xl mx-auto border-t border-slate-200 pt-8 mt-8">
                            "You are only as good as the people you learn from."
                        </p>
                    </div>
                </FadeInSection>

                <div className="space-y-32">
                    {teamMembers.map((member, index) => (
                        <TeamMemberRow key={index} member={member} index={index} />
                    ))}
                </div>

                {/* FooterCTA */}
                <FadeInSection className="mt-40 text-center">
                    <div className="max-w-4xl mx-auto bg-slate-900 rounded-[40px] p-12 md:p-20 shadow-2xl border border-slate-800 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -mr-32 -mt-32 group-hover:bg-blue-600/30 transition-colors duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px] -ml-32 -mb-32"></div>
                        <div className="absolute inset-0 bg-grid opacity-[0.1]"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-8 uppercase tracking-tighter leading-none">
                                Are you ready to <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-200">Level Up?</span>
                            </h2>
                            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">
                                Join the thousands of athletes who have transformed their lifting with our proven systems.
                            </p>
                            <button
                                onClick={onStartQuiz}
                                className="bg-white text-blue-900 border-b-[6px] border-blue-200 active:border-b-0 active:translate-y-[6px] hover:brightness-110 font-heading font-black py-6 px-12 rounded-2xl shadow-2xl shadow-blue-900/50 hover:-translate-y-1 transition-all uppercase tracking-widest text-sm"
                            >
                                Start Your Assessment
                            </button>
                        </div>
                    </div>
                </FadeInSection>
            </div>
        </div>
    );
};

export default MeetTheTeam;
