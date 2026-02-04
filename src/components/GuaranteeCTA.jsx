import React from 'react';
import { ShieldCheck, ArrowDownCircle } from 'lucide-react';

const GuaranteeCTA = () => {
    return (
        <div className="max-w-5xl mx-auto text-center mb-12 px-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-blue-50/50 blur-3xl rounded-full z-0 pointer-events-none"></div>

            <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-8 leading-tight">
                    Yes Really, Your Results Are <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Guaranteed...</span>
                </h3>

                <p className="text-slate-600 text-lg md:text-xl font-medium leading-relaxed mb-10 max-w-3xl mx-auto">
                    We’ve coached over <span className="text-slate-900 font-bold">500 lifters</span> through this exact process. <span className="text-blue-600 font-bold">98% of them hit personal bests</span> within 90 days. If you follow the plan, we’re confident you will too.
                </p>

                <div className="relative group perspective-1000 mb-10">
                    <div className="bg-white border-2 border-slate-100 rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden max-w-4xl mx-auto transform transition-transform hover:scale-[1.01] duration-500">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <ShieldCheck className="w-32 h-32" />
                        </div>

                        <h4 className="text-sm font-bold text-blue-600 mb-6 uppercase tracking-[0.2em]">So Here's Our Promise</h4>

                        <p className="text-slate-800 text-xl md:text-2xl font-heading font-bold italic leading-relaxed relative z-10">
                            "If you show up, follow the coaching, and don't see clear technical improvement in your key lifts within 90 days... <span className="text-blue-600">we'll keep working with you for free until you do.</span>"
                        </p>

                        <div className="mt-8 flex justify-center">
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-xs font-bold uppercase tracking-wider">
                                <ShieldCheck className="w-4 h-4" /> Risk Free Guarantee
                            </span>
                        </div>
                    </div>
                </div>

                <p className="text-slate-900 font-bold text-lg md:text-xl mb-8 flex items-center justify-center gap-2">
                    No stress. No extra cost. <span className="underline decoration-blue-400 decoration-4 underline-offset-4">You've got nothing to lose!</span>
                </p>

                <button
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative inline-flex items-center justify-center gap-3 bg-slate-900 text-white font-heading font-black text-xl md:text-2xl uppercase tracking-widest px-12 py-6 rounded-2xl shadow-xl shadow-blue-900/20 hover:bg-blue-600 hover:scale-105 hover:shadow-blue-600/30 transition-all duration-300 w-full md:w-auto"
                >
                    <span>Let's Go I'm Ready</span>
                    <ArrowDownCircle className="w-6 h-6 group-hover:translate-y-1 transition-transform" />
                </button>

                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider mt-6 opacity-70">*We keep numbers low so the feedback stays high quality.</p>
            </div>
        </div>
    );
};

export default GuaranteeCTA;
