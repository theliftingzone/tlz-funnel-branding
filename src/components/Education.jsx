import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, BookOpen, GraduationCap, Video, FileText } from 'lucide-react';

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
            <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-purple-200/20 rounded-full blur-[120px] animate-pulse-glow animate-float"></div>
            <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-blue-200/20 rounded-full blur-[100px] animate-float delay-700"></div>
            <div className="absolute inset-0 bg-grid opacity-[0.4]"></div>
        </div>
    );
};

const EducationResultCard = ({ title, category, readTime, index }) => (
    <FadeInSection delay={index * 100}>
        <div className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-8 h-full flex flex-col items-start justify-between">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <FileText className="w-24 h-24 text-blue-600 rotate-12" />
            </div>

            <div className="relative z-10 w-full">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    {category}
                </div>
                <h3 className="text-2xl font-heading font-black text-slate-900 uppercase leading-tight mb-4 group-hover:text-blue-600 transition-colors">
                    {title}
                </h3>
                <p className="text-slate-500 text-sm font-medium mb-8 line-clamp-3">
                    Discover the science behind effective lifting techniques and programming strategies tailored for master athletes.
                </p>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-100 w-full flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{readTime} Read</span>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider group-hover:translate-x-1 transition-transform cursor-pointer">Read Article &rarr;</span>
            </div>
        </div>
    </FadeInSection>
);

const Education = ({ onBack }) => {
    const articles = [
        { title: "The Art of the Snatch", category: "Technique", readTime: "5 min" },
        { title: "Mobility for Masters", category: "Recovery", readTime: "8 min" },
        { title: "Periodization Basics", category: "Programming", readTime: "12 min" },
        { title: "Nutrition for Power", category: "Health", readTime: "6 min" },
        { title: "Mental Game Strong", category: "Psychology", readTime: "10 min" },
        { title: "Accessory Work 101", category: "Training", readTime: "7 min" },
    ];

    return (
        <div className="bg-[#f8fafc] min-h-screen relative font-body text-slate-900 overflow-x-hidden">
            <AnimatedBackground />

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
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-6 shadow-xl shadow-slate-900/20">
                            <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Knowledge Base
                        </div>
                        <h1 className="text-5xl md:text-8xl font-heading font-black text-slate-900 uppercase leading-[0.9] tracking-tighter mb-8">
                            Master Your <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Craft.</span>
                        </h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs max-w-2xl mx-auto border-t border-slate-200 pt-8 mt-8">
                            In-depth articles, guides, and resources for the modern lifter.
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <EducationResultCard key={index} {...article} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Education;
