import React, { useState, useEffect, useRef } from 'react';
import { Zap, Target, Mail, Award, CheckCircle, Star } from 'lucide-react';

const ProcessTimeline = () => {
    const containerRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const { top, height } = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start animating when the top of the section enters the viewport
            const startPoint = windowHeight * 0.6; // Trigger when section is 60% down the screen

            // Calculate progress
            const distance = startPoint - top;

            // Animate through ~90% of the section to hit all numbers
            const trackingHeight = height * 0.9;

            let p = distance / trackingHeight;
            if (p < 0) p = 0;
            if (p > 1) p = 1;

            setScrollProgress(p);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (threshold) => scrollProgress >= threshold;

    return (
        <div ref={containerRef} id="process-timeline" className="mb-12 text-left p-4 scroll-mt-24">
            <div className="text-center mb-20">
                <h3 className="text-3xl md:text-5xl font-heading font-black mb-6 text-slate-900 leading-tight">
                    Designed For High Performers <br /> <span className="text-blue-600">Who Want To Stay Strong For Life</span>
                </h3>
            </div>

            <div className="max-w-6xl mx-auto relative">
                <div className="relative">
                    {/* Central Vertical Line (Desktop) - Background */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -translate-x-1/2 rounded-full"></div>

                    {/* Animated Foreground Line */}
                    <div
                        className="hidden md:block absolute left-1/2 top-0 w-1 bg-gradient-to-b from-blue-600 via-blue-500 to-cyan-400 -translate-x-1/2 rounded-full transition-all duration-300 ease-out shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                        style={{ height: `${scrollProgress * 100}%` }}
                    ></div>

                    {/* Step 1 & 2 Block */}
                    <div className="grid md:grid-cols-2 gap-16 mb-24 relative">
                        <div className="space-y-16 pr-8">
                            {/* Step 1 */}
                            <div className="relative group">
                                {/* Number Circle - Threshold 0.1 */}
                                <div className={`hidden md:flex absolute top-0 -right-[5.5rem] w-12 h-12 rounded-full z-10 items-center justify-center font-heading font-black text-2xl transition-all duration-500 border-[3px] 
                  ${isActive(0.1)
                                        ? 'bg-blue-600 border-white text-white scale-125 shadow-xl shadow-blue-600/30'
                                        : 'bg-white border-blue-100 text-blue-200 scale-100 opacity-60'}`}
                                >
                                    1
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-pink-100 text-pink-600 p-2 rounded-lg">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-heading font-black text-xl text-slate-900 uppercase">Technical Breakdown</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                                    We start by analysing your lifts through an Olympian’s eyes. Every rep is broken down to identify the smallest details holding you back: bar path, timing, balance, and control.
                                </p>
                                <p className="text-slate-500 text-xs border-l-2 border-slate-200 pl-3">This is the same process used with world-class athletes.</p>
                            </div>

                            {/* Step 2 */}
                            <div className="relative group">
                                {/* Number Circle - Threshold 0.3 */}
                                <div className={`hidden md:flex absolute top-0 -right-[5.5rem] w-12 h-12 rounded-full z-10 items-center justify-center font-heading font-black text-2xl transition-all duration-500 border-[3px]
                  ${isActive(0.3)
                                        ? 'bg-blue-600 border-white text-white scale-125 shadow-xl shadow-blue-600/30'
                                        : 'bg-white border-blue-100 text-blue-200 scale-100 opacity-60'}`}
                                >
                                    2
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                                        <Target className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-heading font-black text-xl text-slate-900 uppercase">Custom Program Built</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                                    Once we've identified the issues, we build a fully tailored plan to address them fast. Every lift, accessory, mobility piece, and progression is chosen with purpose.
                                </p>
                                <p className="text-slate-500 text-xs border-l-2 border-slate-200 pl-3">No rigid templates, actual coaching. Think of this as a live living program that adapts daily.</p>
                            </div>
                        </div>

                        {/* Image Block 1 */}
                        <div className="relative">
                            <div className="sticky top-24">
                                <img src="/Gui-Analysis.png" alt="Technical Analysis Tablet" className="w-full h-auto rounded-[2rem] shadow-2xl border-4 border-slate-900 rotate-2 hover:rotate-0 transition-all duration-500" />
                                <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 hidden md:block animate-float">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600"><CheckCircle className="w-5 h-5" /></div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-slate-400">Analysis Complete</div>
                                            <div className="text-xs font-bold text-slate-900">Path Deviation Detected</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 3 & 4 Block - Reversed Layout */}
                    <div className="grid md:grid-cols-2 gap-16 relative">
                        {/* Image Block 2 */}
                        <div className="relative order-2 md:order-1">
                            <div className="sticky top-24">
                                <img src="/High-Achievers.png" alt="Community Feedback Tablet" className="w-full h-auto rounded-[2rem] shadow-2xl border-4 border-slate-900 -rotate-2 hover:rotate-0 transition-all duration-500" />
                            </div>
                        </div>

                        <div className="space-y-16 pl-0 md:pl-8 order-1 md:order-2">
                            {/* Step 3 */}
                            <div className="relative group">
                                {/* Number Circle - Threshold 0.6 */}
                                <div className={`hidden md:flex absolute top-0 -left-[5.5rem] w-12 h-12 rounded-full z-10 items-center justify-center font-heading font-black text-2xl transition-all duration-500 border-[3px]
                  ${isActive(0.6)
                                        ? 'bg-blue-600 border-white text-white scale-125 shadow-xl shadow-blue-600/30'
                                        : 'bg-white border-blue-100 text-blue-200 scale-100 opacity-60'}`}
                                >
                                    3
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-purple-100 text-purple-600 p-2 rounded-lg">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-heading font-black text-xl text-slate-900 uppercase">Daily Feedback</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                                    You'll receive direct video feedback on every single lift you send in. From world-class coaches who know exactly what to look for and how to fix it.
                                </p>
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 inline-block">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2"><Star className="w-3 h-3 text-orange-400 fill-orange-400" /> "The feedback is instant."</span>
                                </div>
                            </div>

                            {/* Step 4 */}
                            <div className="relative group">
                                {/* Number Circle - Threshold 0.8 */}
                                <div className={`hidden md:flex absolute top-0 -left-[5.5rem] w-12 h-12 rounded-full z-10 items-center justify-center font-heading font-black text-2xl transition-all duration-500 border-[3px]
                  ${isActive(0.8)
                                        ? 'bg-blue-600 border-white text-white scale-125 shadow-xl shadow-blue-600/30'
                                        : 'bg-white border-blue-100 text-blue-200 scale-100 opacity-60'}`}
                                >
                                    4
                                </div>

                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
                                        <Award className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-heading font-black text-xl text-slate-900 uppercase">Learn the 'Why'</h4>
                                </div>
                                <p className="text-slate-600 text-sm leading-relaxed mb-4 font-medium">
                                    Each week, join other high performers to break down lifts live. You'll learn how to analyse your own lifts and others. This is about long-term growth.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black px-12 py-5 rounded-2xl uppercase tracking-widest text-sm shadow-2xl shadow-blue-600/20 transition-all">
                        Apply For Coaching
                    </button>
                    <p className="text-[10px] text-slate-400 mt-4 italic font-medium">*Not everyone gets in, but if you do, we go all in.</p>
                </div>

            </div>
        </div>
    );
};

export default ProcessTimeline;
