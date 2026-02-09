import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Video, Play, Check, ShieldCheck } from 'lucide-react';

// Reusing the same animation hooks and components for consistency
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
            <div
                className="hidden md:block absolute w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] will-change-transform mix-blend-multiply opacity-100 transition-transform duration-100 ease-out"
                style={{
                    left: 'var(--mouse-x, -1000px)',
                    top: 'var(--mouse-y, -1000px)',
                    transform: 'translate(-50%, -50%)',
                }}
            />
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[120px] animate-pulse-glow animate-float"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-purple-200/20 rounded-full blur-[100px] animate-float delay-700"></div>
            <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] bg-sky-200/10 rounded-full blur-[80px] animate-float delay-500"></div>
            <div className="absolute inset-0 bg-grid opacity-[0.4]"></div>
        </div>
    );
};

const CourseCard = ({ title, level, modules, index }) => (
    <FadeInSection delay={index * 100}>
        <div className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-start justify-between h-full">
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10"></div>
                <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                    <Video className="w-12 h-12 text-slate-400 opacity-50" />
                </div>
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-lg">
                        <Play className="w-6 h-6 text-white ml-1 fill-white" />
                    </div>
                </div>
            </div>

            <div className="p-8 flex-grow w-full relative">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 border border-green-100">
                    {level}
                </div>
                <h3 className="text-2xl font-heading font-black text-slate-900 uppercase leading-none mb-4 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <ul className="space-y-3 mb-8">
                    {[1, 2, 3].map((i) => (
                        <li key={i} className="flex items-center gap-3 text-sm text-slate-500 font-medium">
                            <Check className="w-4 h-4 text-blue-500" />
                            <span>Module {i}: Core Concepts</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="p-8 pt-0 w-full mt-auto">
                <button className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold uppercase text-xs tracking-[0.2em] hover:bg-blue-600 transition-colors shadow-lg shadow-slate-900/10">
                    Enroll Now
                </button>
            </div>
        </div>
    </FadeInSection>
);

const Courses = ({ onBack }) => {
    const courses = [
        { title: "Olympic Lifting 101", level: "Beginner", modules: 12 },
        { title: "Advanced Technique", level: "Advanced", modules: 8 },
        { title: "Strength Mastery", level: "Intermediate", modules: 10 },
        { title: "Mobility Flow", level: "All Levels", modules: 6 },
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen relative font-body text-slate-900 overflow-x-hidden">
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
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Training Programs
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-black text-slate-900 uppercase leading-[0.9] tracking-tighter mb-8">
                            proven systems. <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Real Results.</span>
                        </h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs max-w-2xl mx-auto border-t border-slate-200 pt-8 mt-8">
                            Follow the same programs used by Olympians and World Champions.
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {courses.map((course, index) => (
                        <CourseCard key={index} {...course} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Courses;
