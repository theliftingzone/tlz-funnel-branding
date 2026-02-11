import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Video, Play, FileText, Calculator, GraduationCap, Utensils, Download, ArrowUpRight, Library } from 'lucide-react';

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

const ResourceTypeIcon = ({ type, className }) => {
    switch (type) {
        case 'Video': return <Video className={className} />;
        case 'Blueprint': return <FileText className={className} />;
        case 'Tool': return <Calculator className={className} />;
        case 'Coach': return <GraduationCap className={className} />;
        case 'Nutrition': return <Utensils className={className} />;
        default: return <FileText className={className} />;
    }
};

const ResourceCard = ({ title, category, type, index, image }) => (
    <FadeInSection delay={index * 100}>
        <div className="group cursor-pointer">
            {/* Image Container */}
            <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden mb-6 bg-slate-100 shadow-sm border border-slate-100">
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-all duration-500 z-10"></div>

                {/* Type Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/95 backdrop-blur-md text-slate-600 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/50 shadow-sm">
                        <ResourceTypeIcon type={type} className="w-3 h-3 text-blue-500" />
                        {type}
                    </div>
                </div>

                {image ? (
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center">
                        <ResourceTypeIcon type={type} className="w-12 h-12 text-slate-400 opacity-50" />
                    </div>
                )}

                {/* Hover Action Button */}
                <div className="absolute bottom-4 right-4 z-20 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <div className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center shadow-xl border border-white hover:bg-slate-900 hover:text-white transition-colors">
                        <ArrowUpRight className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Minimal Content */}
            <div className="px-2">
                <div className="flex flex-col gap-2">
                    <p className="text-blue-600 font-bold text-[10px] tracking-[0.2em] uppercase">
                        {category}
                    </p>
                    <h3 className="text-2xl font-heading font-black text-slate-900 uppercase leading-[1.1] group-hover:text-blue-600 transition-colors duration-300">
                        {title}
                    </h3>
                </div>
            </div>
        </div>
    </FadeInSection>
);

const Resources = ({ onBack }) => {
    const resources = [
        { title: "Snatch Mastery", category: "Technique", type: "Video", image: "https://placehold.co/800x600/e2e8f0/1e293b?text=Snatch+Mastery" },
        { title: "Sonny Squat Protocol", category: "Strength", type: "Blueprint", image: "https://placehold.co/800x600/e2e8f0/1e293b?text=Sonny+Squat" },
        { title: "Clean & Jerk Blueprint", category: "Program", type: "Blueprint", image: "https://placehold.co/800x600/e2e8f0/1e293b?text=Clean+%26+Jerk" },
        { title: "Efficiency Calculator", category: "Analysis", type: "Tool", image: "https://placehold.co/800x600/e2e8f0/1e293b?text=Efficiency" },
        { title: "Nutrition Guide", category: "Health", type: "Nutrition", image: "https://placehold.co/800x600/e2e8f0/1e293b?text=Nutrition" },
        { title: "Coaching & Programming", category: "Professional", type: "Coach", image: "https://placehold.co/800x600/e2e8f0/1e293b?text=Coaching" },
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
                    <div className="mb-20">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            <Library className="w-3.5 h-3.5" /> Learning Resources
                        </div>
                        <h1 className="text-5xl md:text-7xl font-heading font-black text-slate-900 uppercase leading-[0.9] tracking-tighter mb-6">
                            Elite <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Knowledge Base</span>
                        </h1>
                        <p className="text-slate-500 text-lg md:text-xl max-w-2xl leading-relaxed">
                            Access our complete library of training protocols, calculation tools, and nutritional guides designed for elite performance.
                        </p>
                    </div>
                </FadeInSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {resources.map((resource, index) => (
                        <ResourceCard key={index} {...resource} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Resources;
