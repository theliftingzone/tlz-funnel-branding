import React from 'react';
import { BookOpen, ArrowRight } from 'lucide-react';

const DownsellSection = ({ onNavigate }) => {
    return (
        <div className="max-w-3xl mx-auto mt-24 mb-12 px-6">
            <div className="bg-slate-900 rounded-[32px] p-8 md:p-12 text-center relative overflow-hidden shadow-2xl group cursor-pointer" onClick={onNavigate}>
                {/* Abstract Background Shapes */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-slate-700/20 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2"></div>

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-slate-700 mb-6">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Self-Paced Option</span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-heading font-black text-white mb-4">
                        Not Ready for 1:1 Coaching?
                    </h3>

                    <p className="text-slate-300 text-sm md:text-base font-medium leading-relaxed mb-8 max-w-xl mx-auto">
                        Get the exact same Olympian-level programming and technical system we use with our VIP clients, but in a self-guided format.
                    </p>

                    <button
                        className="inline-flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs md:text-sm group-hover:gap-4 transition-all duration-300"
                    >
                        View The Technical Handbook <ArrowRight className="w-4 h-4 text-blue-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownsellSection;
