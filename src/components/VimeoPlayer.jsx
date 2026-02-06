import React, { useState } from 'react';
import { Play } from 'lucide-react';

const VimeoPlayer = ({ videoId, thumbnail, hash }) => {
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="relative w-full aspect-video bg-slate-900 rounded-[24px] overflow-hidden mb-12 border-4 border-slate-200 shadow-2xl group max-w-3xl mx-auto ring-1 ring-slate-100 cursor-pointer" onClick={() => setIsPlaying(true)}>
            {/* The Iframe - Always rendered to ensure native thumbnail is visible if no custom thumb is provided */}
            <iframe
                src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479${hash ? `&h=${hash}` : ''}${isPlaying ? '&autoplay=1' : ''}`}
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                className="absolute inset-0 w-full h-full z-0"
                title="VSL Video"
            ></iframe>

            {/* Overlay - Visible only when not playing */}
            {!isPlaying && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    {/* Optional Custom Thumbnail Image (High Priority) */}
                    {thumbnail && (
                        <div className="absolute inset-0">
                            <img
                                src={thumbnail}
                                className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-105"
                                alt="Video Thumbnail"
                            />
                            {/* Darken overlay for better button visibility */}
                            <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/5 transition-all"></div>
                        </div>
                    )}

                    {/* Fallback Transparent/Gradient Overlay for Native Thumbnails */}
                    {!thumbnail && (
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-all"></div>
                    )}

                    {/* The Blue Play Button */}
                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-500 border-4 border-white animate-pulse-glow relative z-20">
                        <Play className="fill-white text-white w-8 h-8 md:w-10 md:h-10 ml-1" />
                    </div>

                    {/* CTA Text */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        <div className="bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-slate-900 uppercase tracking-wider border border-slate-200 shadow-sm">Click to Play</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VimeoPlayer;
