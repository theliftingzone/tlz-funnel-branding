import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, ChevronLeft, Play, CheckCircle, Calendar, ArrowRight, Dumbbell, Zap, Target, Mail, Award, TrendingUp, ShieldCheck, Eye, ArrowLeft, X, Lock, Menu, Loader2, ExternalLink, Star } from 'lucide-react';
import ProcessTimeline from './components/ProcessTimeline';
import GuaranteeCTA from './components/GuaranteeCTA';
import DownsellSection from './components/DownsellSection';
import SalesPage from './components/SalesPage';

// Custom Hook for Scroll Reveal Animations
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
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

const FadeInSection = ({ children, className = "" }) => {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.1 });
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      setHasAppeared(true);
    }
  }, [isIntersecting]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${hasAppeared ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
    >
      {children}
    </div>
  );
};

// Separated Background Component - Mobile Optimized
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

      {/* Static Ambient Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-200/20 rounded-full blur-[120px] animate-pulse-glow"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[30%] bg-indigo-200/20 rounded-full blur-[100px]"></div>
      <div className="absolute top-[40%] left-[20%] w-[20%] h-[20%] bg-sky-200/10 rounded-full blur-[80px]"></div>

      {/* Premium Grid Pattern */}
      <div className="absolute inset-0 bg-grid opacity-[0.4]"></div>
    </div>
  );
};

// Reusable Video Placeholder with Play Button
const VideoPlaceholder = ({ src, alt, className = "" }) => (
  <div className={`relative group cursor-pointer overflow-hidden rounded-[24px] border border-slate-200 shadow-2xl ${className}`}>
    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 group-hover:bg-slate-900/5 transition-all z-10">
      <div className="w-20 h-20 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-500 border border-white/20">
        <Play className="fill-white text-white w-8 h-8 ml-1" />
      </div>
    </div>
    <img src={src} alt={alt} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700" />
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-slate-900 uppercase tracking-wider border border-slate-200 shadow-sm">Click to Play</div>
    </div>
  </div>
);

// Custom Vimeo Player with Cover
const VimeoPlayer = ({ videoId, thumbnail, hash }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video bg-slate-900 rounded-[24px] overflow-hidden mb-12 border-4 border-slate-200 shadow-2xl group max-w-3xl mx-auto ring-1 ring-slate-100 cursor-pointer" onClick={() => setIsPlaying(true)}>
      {!isPlaying ? (
        <>
          {/* Custom Thumbnail & Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900/10 group-hover:bg-slate-900/5 transition-all z-20">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-500 border-4 border-white animate-pulse-glow">
              <Play className="fill-white text-white w-8 h-8 md:w-10 md:h-10 ml-1" />
            </div>
          </div>
          <img
            src={thumbnail || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
            alt="Video Thumbnail"
          />

        </>
      ) : (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1${hash ? `&h=${hash}` : ''}`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
          className="absolute top-0 left-0 w-full h-full"
          title="VSL Video"
        ></iframe>
      )}
    </div>
  );
};

const LogoPlaceholder = ({ className = "" }) => (
  <div className={`${className}`}>
    <img src="/the-lifting-zone-logo.svg" alt="The Lifting Zone" className="h-10 w-auto" />
  </div>
);

const WebinarPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md transition-all duration-300 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-2 relative shadow-2xl shadow-blue-900/20 border border-slate-200 overflow-hidden transform scale-100 transition-transform">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="bg-white rounded-[28px] p-8 text-center text-slate-900 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-blue-700"></div>
          <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 px-3 py-1 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-blue-700 text-[10px] font-bold uppercase tracking-widest">Live Webinar</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-heading font-black mb-4 uppercase italic leading-none">
            The Efficiency <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Masterclass</span>
          </h3>
          <p className="text-slate-600 text-sm mb-2 leading-relaxed font-bold">Sunday 15th Feb @ 6pm Dubai</p>
          <p className="text-slate-500 text-xs mb-8 leading-relaxed max-w-xs mx-auto">
            Join me as I reveal the "Olympic Efficiency" framework that adds kilos to your total without you needing to gain a single pound of muscle.
          </p>

          <a href="https://join.theliftingzone.com/" target="_blank" rel="noopener noreferrer" className="block w-full btn-pop bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white font-heading font-black py-4 rounded-xl text-lg uppercase tracking-widest shadow-xl shadow-blue-600/20">
            Reserve My Free Seat
          </a>
        </div>
      </div>
    </div>
  );
};

const LeadCaptureForm = ({ data, setData, onSubmit, onBack }) => (
  <div className="bg-[#f8fafc] min-h-screen relative font-body flex flex-col items-center justify-center p-6 text-slate-900 overflow-hidden selection:bg-[#2563eb] selection:text-white">
    <AnimatedBackground />
    {/* Navigation */}
    <div className="flex justify-center pt-8 pb-4 relative z-30">
      <button
        onClick={onBack}
        className="cursor-pointer group flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-200 transition-all uppercase text-[10px] font-bold tracking-widest text-slate-600 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        HOME
      </button>
    </div>
    <div className="relative z-10 w-full max-w-md">
      <FadeInSection>
        <div className="bg-white backdrop-blur-xl border border-slate-200 p-8 md:p-10 rounded-[32px] shadow-2xl">
          <div className="text-center mb-10">
            <span className="bg-slate-900 border border-slate-800 text-white px-4 py-1.5 rounded-full text-[10px] font-heading font-bold mb-6 inline-block uppercase tracking-[0.2em] shadow-lg shadow-slate-900/20">
              ALMOST THERE
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 tracking-tight text-slate-900">
              SAVE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">RESULTS.</span>
            </h2>
            <p className="text-slate-500 text-sm font-medium">We've analyzed your lifting profile. Enter your details to reveal your custom plan.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                  placeholder="Sonny"
                  value={data.firstName}
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                  placeholder="Webster"
                  value={data.lastName}
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                <span className="text-[10px] text-[#2563eb] italic">Received SMS notification</span>
              </div>
              <input
                required
                type="tel"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                placeholder="+44 7700 900000"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <span className="text-[10px] text-[#2563eb] italic">Your best email to</span>
              </div>
              <input
                required
                type="email"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                placeholder="sonny@theliftingzone.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black py-4 rounded-xl shadow-xl shadow-blue-900/20 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs mt-4"
            >
              SEE MY RESULTS
            </button>

            <p className="text-center text-[10px] text-slate-500 max-w-xs mx-auto leading-relaxed">
              By clicking above, you agree to receive your results and occasional lifting tips. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </FadeInSection>
    </div>
  </div >
);

const AnalyzingScreen = () => (
  <div className="bg-[#f8fafc] min-h-screen relative font-body flex items-center justify-center p-6 text-slate-900 overflow-hidden selection:bg-[#2563eb] selection:text-white">
    <AnimatedBackground />
    <div className="relative z-10 text-center max-w-lg">
      <div className="mb-12 relative">
        <div className="w-24 h-24 rounded-full border-4 border-slate-200 mx-auto animate-pulse flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-t-4 border-[#2563eb] animate-spin"></div>
          <ShieldCheck className="w-10 h-10 text-[#2563eb]" />
        </div>
      </div>
      <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 tracking-tight animate-pulse">
        ANALYZING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">INPUTS...</span>
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 justify-center text-slate-600 text-sm font-mono">
          <span className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></span> Checking Biomechanics...
        </div>
        <div className="flex items-center gap-3 justify-center text-slate-600 text-sm font-mono delay-75">
          <span className="w-2 h-2 bg-[#2563eb] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span> Calculating Strength Deficit...
        </div>
        <div className="flex items-center gap-3 justify-center text-slate-600 text-sm font-mono delay-150">
          <span className="w-2 h-2 bg-blue-800 rounded-full animate-ping" style={{ animationDelay: '1s' }}></span> Match Finding...
        </div>
      </div>
    </div>
  </div>
);

const BridgePage = ({ resource, onUpsellClick, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(15);

  // Auto-redirect logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = resource.url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resource.url]);

  return (
    <div className="bg-[#f8fafc] min-h-screen relative font-body overflow-x-hidden selection:bg-[#2563eb] selection:text-white">
      <AnimatedBackground />
      {/* Navigation */}
      <div className="flex justify-center pt-8 pb-0 relative z-30">
        <button
          onClick={onBack}
          className="cursor-pointer group flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-200 transition-all uppercase text-[10px] font-bold tracking-widest text-slate-600 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          HOME
        </button>
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">

        {/* Diagnosis Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-xl shadow-slate-900/20">
            <CheckCircle className="w-3.5 h-3.5 text-blue-500" /> Diagnosis Complete
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 leading-tight text-slate-900 uppercase">
            YOUR DIAGNOSIS: <br /> <span className="text-[#2563eb]">{resource.title}</span>
          </h1>

          {/* Redirect Bar */}
          <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl p-4 mb-8 shadow-lg">
            <div className="flex justify-between items-center text-xs text-slate-500 mb-2 font-mono">
              <span>Redirecting to {resource.name}...</span>
              <span>{timeLeft}s</span>
            </div>
            <div className="h-1 bg-slate-200 w-full rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
            </div>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block mt-3 text-[10px] font-bold text-[#2563eb] hover:text-blue-700 transition-colors uppercase tracking-widest text-center flex items-center justify-center gap-1">
              Click here if you are not redirected <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* While You Wait / Upsell Section */}
        <div className="bg-white text-slate-950 p-8 md:p-12 rounded-[32px] shadow-2xl border-4 border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-slate-900 text-white text-[10px] font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest z-10 border-l border-b border-slate-800">
            One-Time Offer
          </div>

          <div className="relative z-10">
            <span className="bg-slate-900 border border-slate-800 text-white shadow-lg shadow-slate-900/20 px-4 py-1.5 font-heading font-bold text-[10px] rounded-full uppercase mb-4 inline-block tracking-[0.2em]">WHILE YOU WAIT</span>
            <h4 className="text-2xl md:text-3xl font-heading font-black mb-4 tracking-tight text-slate-900 uppercase leading-none">
              FIX IT PERMANENTLY.
            </h4>
            <p className="text-slate-600 mb-8 leading-relaxed font-medium text-base">
              "The free guide I'm sending you is great for fixing one session. But if you want to fix your lifts permanently in the next 12 weeks, check out the full Technical System."
            </p>
            <button onClick={onUpsellClick} className="w-full btn-pop bg-gradient-to-r from-blue-600 to-blue-700 text-white font-heading font-black py-5 px-8 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-[0.15em] shadow-xl text-[10px] group">
              GET THE FULL SYSTEM FOR £99
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

const App = () => {
  const [step, setStep] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ fix_one_thing: 'snatch', athlete_type: 'Weightlifter' });
  const [leadData, setLeadData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [resultPage, setResultPage] = useState(null);
  const [showDevTools, setShowDevTools] = useState(false);
  const [showWebinar, setShowWebinar] = useState(false);

  useEffect(() => {
    if (step === 'landing') {
      const timer = setTimeout(() => setShowWebinar(true), 15000);
      return () => clearTimeout(timer);
    } else {
      setShowWebinar(false);
    }
  }, [step]);

  const questions = useMemo(() => [
    {
      id: 'athlete_type',
      text: "What type of athlete are you?",
      options: [
        { label: "CrossFit", value: "crossfit" },
        { label: "Weightlifter", value: "weightlifter" },
        { label: "General fitness", value: "general" }
      ]
    },
    {
      id: 'frequency',
      text: "On average, how many days per week are you currently lifting?",
      options: [
        { label: "Casual (1–2 days): I fit it in when I can.", value: "1-2" },
        { label: "Dedicated (3–4 days): I follow a routine but miss sessions occasionally.", value: "3-4" },
        { label: "Serious (5+ days): I rarely miss a session. My life revolves around training.", value: "5+" }
      ]
    },
    {
      id: 'fix_one_thing',
      text: "If you could wave a magic wand and fix ONE thing about your lifting today, what would it be?",
      options: [
        { label: "The Snatch: My bottom position is unstable, or I struggle with the turnover.", value: "snatch" },
        { label: "The Clean & Jerk: I crash in the clean, or my jerk drive is inconsistent.", value: "cj" },
        { label: "Raw Strength / Positional Power: My technique is okay, but I feel weak or slow.", value: "strength" },
        { label: "Technique and movement on both lifts.", value: "both" }
      ]
    },
    {
      id: 'main_driver',
      text: "This is important for our analysis: What is your main driver right now?",
      options: [
        { label: "Performance competition: I want to hit a new PR total and destroy my old numbers.", value: "performance" },
        { label: "Longevity & Mastery: I want to move beautifully, lift pain-free, and protect my joints for the long haul.", value: "longevity" }
      ]
    },
    {
      id: 'roadblock',
      text: "What has stopped you from fixing this on your own so far?",
      options: [
        { label: "Lack of feedback.", value: "feedback" },
        { label: "Information overload.", value: "overload" },
        { label: "Injury / niggles: My body feels beat up when I push the intensity.", value: "injury" },
        { label: "Lack of accountability.", value: "accountability" }
      ]
    },
    {
      id: 'location',
      text: "Where do you do the majority of your training?",
      options: [
        { label: "Commercial gym", value: "commercial" },
        { label: "Home / garage gym", value: "home" },
        { label: "CrossFit / weightlifting club", value: "club" }
      ]
    },
    {
      id: 'current_programming',
      text: "How are you currently handling your programming and technical correction?",
      options: [
        { label: "Winging it: I make it up as I go or cherry-pick workouts from Instagram.", value: "winging" },
        { label: "Static template: I follow a spreadsheet or PDF or class programming.", value: "template" },
        { label: "Coached: I have a coach, but I’m looking for more specialized expertise (Olympian level).", value: "coached" }
      ]
    },
    {
      id: 'solution_preference',
      text: "Based on your goals, how would you prefer to solve this?",
      options: [
        { label: "I want a world-class coach to analyze my videos weekly and handle my entire bespoke program with fast results.", value: "coach" },
        { label: "I want a proven, step-by-step technical program to follow on my own.", value: "program" },
        { label: "I just want some free tips to try in my next session.", value: "free" }
      ]
    }
  ], []);

  const handleAnswer = (value) => {
    const updatedAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setStep('lead-form');
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setStep('landing');
    }
  };

  const calculateResult = (finalAnswers) => {
    const pref = finalAnswers.solution_preference;
    const goal = finalAnswers.fix_one_thing;
    if (pref === 'coach') setResultPage('vip');
    else if (pref === 'program') setResultPage('sales');
    else {
      if (goal === 'snatch' || goal === 'both') setResultPage('free-snatch');
      else if (goal === 'cj') setResultPage('free-cj');
      else setResultPage('free-strength');
    }
  };

  const getFreeResource = () => {
    const issue = answers.fix_one_thing;
    if (issue === 'snatch' || issue === 'both') {
      return { title: "Snatch Error", name: "Free Snatch Plan", url: "https://start.theliftingzone.com/free-snatch-plan" };
    } else if (issue === 'cj') {
      return { title: "Clean and Jerk Error", name: "Free Clean & Jerk Plan", url: "https://start.theliftingzone.com/clean-and-jerk-plan" };
    } else {
      return { title: "Strength Error", name: "Free Squat Strength Plan", url: "https://start.theliftingzone.com/squat-strength-plan" };
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    calculateResult(answers);
    setStep('analyzing');

    // --- INTEGRATION: Send Data to Zapier / GHL / Sheets ---
    // 1. Calculate the result path locally to send immediately
    let calculatedPath = 'unknown';
    const pref = answers.solution_preference;
    const goal = answers.fix_one_thing;

    if (pref === 'coach') calculatedPath = 'vip';
    else if (pref === 'program') calculatedPath = 'sales';
    else {
      if (goal === 'snatch' || goal === 'both') calculatedPath = 'free-snatch';
      else if (goal === 'cj') calculatedPath = 'free-cj';
      else calculatedPath = 'free-strength';
    }

    // 2. Prepare the payload
    const payload = {
      ...leadData,          // firstName, lastName, email, phone
      ...answers,           // quiz answers
      result_path: calculatedPath,
      submitted_at: new Date().toISOString(),
      source: 'tlz_funnel_quiz'
    };

    // 3. Send to Zapier Webhook
    // REPLACE THIS URL with your specific Zapier Webhook URL (e.g., https://hooks.zapier.com/hooks/catch/...)
    const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/5054309/ul7nl6x/';

    if (ZAPIER_WEBHOOK_URL) {
      fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        // mode: 'no-cors', // Uncomment if you encounter CORS issues (note: this hides response status)
        body: JSON.stringify(payload)
      }).then(() => {
        console.log("Data sent to Zapier successfully");
      }).catch(err => {
        console.error("Failed to send to Zapier:", err);
      });
    }
    // ------------------------------------------------*******

    setTimeout(() => {
      // If it's a free result, show the Bridge Page first
      if (answers.solution_preference === 'free') {
        setStep('bridge');
      } else {
        setStep('result');
      }
    }, 2000);
  };

  const LandingPage = () => (
    <div className="relative text-slate-900 min-h-screen bg-[#f8fafc] font-body">
      <AnimatedBackground />
      <WebinarPopup isOpen={showWebinar} onClose={() => setShowWebinar(false)} />

      <nav className="relative z-50 p-6 flex justify-center items-center bg-transparent max-w-7xl mx-auto">
        <LogoPlaceholder />
      </nav>

      {/* Hero Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-900 border border-slate-800 text-white text-xs font-bold uppercase tracking-[0.2em] mb-10 shadow-xl shadow-slate-900/20 hover:scale-105 transition-transform duration-300">
            <Award className="w-4 h-4 text-blue-500" /> By The Lifting Zone Sonny Webster
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-10 tracking-tight leading-[0.95] text-slate-900">
            MASTER THE ART OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 drop-shadow-sm">WEIGHTLIFTING.</span>
          </h1>

          <p className="text-slate-600 font-medium text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Give us <span className="text-blue-900 font-bold bg-blue-100 px-2 py-0.5 rounded text-blue-700">60 seconds</span> to identify exactly where you need to be focusing your energy to reach your true potential and provide you with the next steps to action it. Could be a <span className="text-blue-900 font-bold bg-blue-100 px-2 py-0.5 rounded text-blue-700">free course</span> could be a <span className="text-blue-900 font-bold bg-blue-100 px-2 py-0.5 rounded text-blue-700">direct mentorship with Sonny Webster</span>. Let's find out.
          </p>

          {/* VSL Video - Vimeo Player - Custom component used here */}
          <VimeoPlayer videoId="1156819181" thumbnail="/images/sonny-main-video.png" hash="9d0e41e34e" />

          <button
            onClick={() => setStep('quiz')}
            className="font-heading bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-black py-5 px-12 rounded-2xl transition-all uppercase tracking-widest text-sm mb-6 shadow-2xl shadow-blue-600/20"
          >
            ASSESS YOUR LIFTING
          </button>
        </FadeInSection>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 py-12 bg-white/80 border-y border-slate-200 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 text-center">
          {[
            { val: "20K+", label: "Athletes Coached" },
            { val: "24K+", label: "New PBs" },
            { val: "2016", label: "Rio Olympian" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-heading font-black text-slate-900 mb-2 tracking-tight">{stat.val}</div>
              <div className="text-blue-600 uppercase font-bold tracking-[0.25em] text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto p-1 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeInSection>
              <h2 className="text-4xl md:text-6xl font-heading font-black mb-10 leading-[1] tracking-tight text-slate-900">
                I'LL GIVE YOU A <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">PLAN OF ACTION.</span>
              </h2>
              <ul className="space-y-8 mb-12">
                {[
                  "Figure out what areas you need to work on in your lifting",
                  "Gain direction on what steps you need to take to level up your operation",
                  "Take the assessment 100% for free"
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-blue-100 flex items-center justify-center border border-blue-200">
                      <CheckCircle className="text-blue-600 w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-700 font-medium text-lg leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setStep('quiz')}
                className="font-heading bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-black py-5 px-12 rounded-xl transition-all shadow-xl shadow-blue-600/20 uppercase tracking-widest text-xs"
              >
                ASSESS YOUR LIFTING
              </button>
            </FadeInSection>

            <FadeInSection className="relative w-full flex items-center justify-center perspective-1000">
              <div className="relative z-10 group">
                {/* Decorative Backing */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-blue-400/20 rounded-[40px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Main Image Container */}
                <div className="relative rounded-[32px] overflow-hidden border-[8px] border-white shadow-2xl shadow-blue-900/20 transform transition-transform duration-700 group-hover:scale-[1.02]">
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                  <img
                    src="/images/sonny-coaching.jpg"
                    className="w-full h-auto object-cover max-w-lg z-10 relative"
                    alt="Sonny Webster Coaching"
                  />

                  {/* Premium Badge Overlay */}
                  <div className="absolute bottom-6 left-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-white/50 shadow-lg flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Olympian Mentorship</span>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section >



      {/* Footer */}
      < footer className="relative z-10 py-10 px-6 border-t border-slate-200 bg-slate-50" >
        <div className="text-center">
          <p className="text-slate-400 text-[10px] uppercase font-bold tracking-[0.4em]">© 2026 THE LIFTING ZONE v2.0</p>
        </div>
      </footer >
    </div >
  );

  const QuizStep = () => {
    const q = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="bg-[#f8fafc] h-screen text-slate-900 font-body overflow-hidden relative selection:bg-[#2563eb] selection:text-white">
        <AnimatedBackground />

        {/* Top Navigation - Centered */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-center p-8 pointer-events-none">
          {/* Centered container with pointer-events-auto for the button */}
          <div className="pointer-events-auto">
            <button
              onClick={handleBack}
              className="cursor-pointer group flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-200 transition-all uppercase text-[10px] font-bold tracking-widest text-slate-600 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              {currentQuestion > 0 ? "GO BACK" : "HOME"}
            </button>
          </div>
        </div>

        {/* Main Content - Centered in Viewport */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl relative">
            <FadeInSection className="w-full">
              {/* Progress Header */}
              <div className="flex flex-col mb-10">
                <div className="flex justify-between items-end mb-4 px-1">
                  <div className="inline-flex items-center gap-2 text-blue-700 font-bold uppercase tracking-widest text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                    Question {currentQuestion + 1}
                  </div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">{Math.round(progress)}% Complete</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-3xl md:text-5xl font-heading font-black mb-12 text-center leading-[1.1] text-slate-900 tracking-tight drop-shadow-sm">
                {q.text}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-6 md:p-7 bg-white border border-slate-200 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300 rounded-2xl group flex justify-between items-center relative overflow-hidden active:scale-[0.98] shadow-sm hover:shadow-md ring-1 ring-transparent hover:ring-blue-100"
                  >
                    <span className="text-base md:text-lg font-medium text-slate-700 group-hover:text-blue-700 transition-colors relative z-10 pl-2">{opt.label}</span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 relative z-10 flex-shrink-0 ml-4 shadow-inner">
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </div>
                  </button>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>

        {/* Ambient Branding - Subtle, at bottom */}
        <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center opacity-30 pointer-events-none">
          <LogoPlaceholder className="scale-75 origin-bottom" />
        </div>
      </div>
    );
  };

  const ResultView = ({ onBack }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isAnnual, setIsAnnual] = useState(false); // Toggle state for pricing

    return (
      <div className="bg-[#f8fafc] text-slate-900 min-h-screen relative font-body">
        <AnimatedBackground />
        {/* Navigation */}
        <div className="flex justify-center pt-12 pb-6 relative z-30">
          <button
            onClick={onBack}
            className="cursor-pointer group flex items-center gap-3 px-8 py-3 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-blue-200 transition-all uppercase text-[10px] font-bold tracking-widest text-slate-600 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            HOME
          </button>
        </div>
        <div className="relative z-10 w-full">
          {resultPage === 'vip' && (
            <>
              {/* FadeInSection removed for top content to fix mobile loading/visibility issues */}
              <div className="max-w-6xl mx-auto px-6 pt-12 text-center flex flex-col items-center w-full">
                <span className="bg-slate-900 border border-slate-800 text-white shadow-xl shadow-slate-900/20 px-6 py-2 rounded-full text-[10px] font-heading font-bold mb-8 inline-block uppercase tracking-[0.3em]">ELITE QUALIFICATION MET</span>
                <h1 className="text-4xl md:text-6xl font-heading font-black mb-8 leading-tight tracking-tight text-slate-900 uppercase">
                  TRAIN LIKE AN OLYMPIAN. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">WITH AN OLYMPIAN.</span>
                </h1>

                {/* VIDEO PLAYER - Top for VIP */}
                <VimeoPlayer videoId="1128121321" thumbnail="https://i.vimeocdn.com/video/2071093259-e1f82c45f19badfe0e72d5ffbbf34379ea2860f9eb30c2343dedab3ebe3dcf19-d_1280" />

                <div className="mt-8 mb-24">
                  <button
                    onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                    className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black px-12 py-5 rounded-xl uppercase tracking-widest text-sm shadow-2xl shadow-blue-600/20 transition-all group relative overflow-hidden"
                  >
                    <span className="relative z-10">I'm Ready To Join</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>
                  <p className="text-slate-400 text-[10px] font-bold mt-4 uppercase tracking-widest">
                    <span className="text-red-500">*</span> Limited Team Spots Available
                  </p>
                </div>
              </div>

              {/* Trusted By Section */}
              {/* Authority / Trusted By Section - Redesigned */}
              <div className="max-w-6xl mx-auto mb-24 text-center relative">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div className="text-left order-2 md:order-1 relative z-10">
                    <div className="w-12 h-1 bg-blue-600 mb-8 ml-1"></div>
                    <h3 className="text-3xl md:text-5xl font-heading font-black mb-6  text-slate-900 leading-[0.9]">Trusted By The Best.</h3>
                    <p className="text-slate-800 text-lg font-bold leading-relaxed mb-6 font-heading border-l-4 border-slate-200 pl-6 py-1">
                      "We’ve coached with CrossFit Games champions, the World’s Strongest Man alongside founders, CEOs, and high performers who expect results."
                    </p>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed pl-7">
                      The same system we use with world champions is the one we use with every client—adapted to your goals, schedule, and life.
                    </p>
                  </div>

                  <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
                    <img src="/worlds-strongest-man.jpg" className="rounded-2xl shadow-xl rotate-3 hover:rotate-0 transition-all duration-500 w-full h-48 object-cover" alt="World's Strongest Man" />
                    <img src="/torian-pro-champions.png" className="rounded-2xl shadow-xl -rotate-2 hover:rotate-0 transition-all duration-500 w-full h-48 object-cover translate-y-8" alt="Torian Pro Champions" />
                    <img src="/Sara.jpg" className="rounded-2xl shadow-xl -rotate-1 hover:rotate-0 transition-all duration-500 w-full h-48 object-cover" alt="Sara Sigmundsdottir" />
                    <img src="/Ricky.jpg" className="rounded-2xl shadow-xl rotate-2 hover:rotate-0 transition-all duration-500 w-full h-48 object-cover translate-y-8" alt="Ricky Garard" />
                  </div>
                </div>
              </div>

              {/* "What Makes This Coaching Different" - Kevin Section (Organic & Designed) */}
              <div className="max-w-6xl mx-auto px-6 mb-24 mt-12 relative">
                <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center relative z-10">

                  {/* Left Column: Video (Vimeo) - Moved to Left as requested */}
                  <div className="relative w-full aspect-[4/5] md:aspect-square rounded-[32px] overflow-hidden shadow-2xl bg-black group/video cursor-pointer z-20 order-1 md:order-1"
                    onClick={(e) => {
                      const iframe = document.createElement('iframe');
                      iframe.src = "https://player.vimeo.com/video/775627130?h=9d0e41e34e&autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479";
                      iframe.width = "100%";
                      iframe.height = "100%";
                      iframe.frameBorder = "0";
                      iframe.allow = "autoplay; fullscreen; picture-in-picture";
                      iframe.title = "Kevin's Results";
                      iframe.className = "absolute inset-0 w-full h-full";
                      e.currentTarget.innerHTML = '';
                      e.currentTarget.appendChild(iframe);
                    }}>

                    <img
                      src="kevin4.jpg"
                      alt="Kevin Training"
                      className="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover/video:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center z-20">
                      <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover/video:scale-110 transition-transform duration-300 shadow-xl">
                        <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                          <Play className="w-6 h-6 fill-white text-white ml-1" />
                        </div>
                      </div>
                    </div>

                    <div className="absolute bottom-8 left-8 right-8 z-20">
                      <p className="text-white font-black text-lg uppercase tracking-wider mb-2 drop-shadow-md">Watch His Story</p>
                      <p className="text-white/90 text-sm line-clamp-2 font-medium drop-shadow-sm">See how Kevin transformed his strength at 66.</p>
                    </div>
                  </div>

                  {/* Right Column: Copy - Moved to Right as requested */}
                  <div className="text-center md:text-left space-y-8 md:pl-8 order-2 md:order-2">
                    {/* 'Client Spotlight' Pill Removed */}

                    <h3 className="text-2xl md:text-4xl font-heading font-black text-slate-900 leading-tight tracking-tight whitespace-pre-line">
                      What Makes This <br /> <span className="text-blue-600">Coaching Different.</span>
                    </h3>

                    <p className="text-slate-600 font-bold text-lg leading-relaxed border-l-4 border-blue-600 pl-8">
                      Whether you're rebuilding, chasing performance, or refusing to slow down—the standard stays the same.
                    </p>

                    <div className="space-y-6 text-slate-500 font-medium text-base leading-relaxed pl-8">
                      <p>The same system used with the very best.</p>
                      <p>Precision, accountability, and results that last.</p>
                      <p className="text-slate-900 text-lg font-black uppercase">
                        Take Kevin, 66 years old, a Senior Creative Director.
                      </p>
                      <p>Still training like an athlete. Focused on strength, mobility, and longevity.</p>
                    </div>
                  </div>

                </div>
              </div>


              {/* "Built By Olympians" Section - Dark Full Width */}
              <FadeInSection>
                <div className="w-full bg-[#0f172a] py-24 mb-24 overflow-hidden border-t border-b border-slate-800 relative">
                  {/* Subtle Mesh Grid Background */}
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

                  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left Column: Copy */}
                    <div className="flex flex-col justify-center text-left space-y-10 relative z-10 order-2 lg:order-1">
                      <div className="space-y-6">
                        <h3 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight">
                          When You Move <br /> Better, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Everything Improves.</span>
                        </h3>

                        <div className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full"></div>

                        <h4 className="text-xl md:text-2xl font-bold text-slate-300 leading-snug max-w-lg">
                          Most athletes train to lift more weight. <br />
                          <span className="text-white">We train you to move better.</span>
                        </h4>
                      </div>

                      <div className="space-y-6">
                        <p className="text-slate-400 font-medium leading-relaxed text-lg pl-6 border-l-2 border-slate-700">
                          Because when the machine works efficiently, the numbers go up automatically. No stiffness. No plateaus. No pain holding you back.
                        </p>

                        <p className="text-slate-200 font-bold leading-relaxed text-lg">
                          This isn't just about adding kilos. It's about building strength that lasts—powerful, mobile, and built for life.
                        </p>
                      </div>

                      <button
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black px-10 py-5 rounded-2xl uppercase tracking-widest text-sm w-full md:w-auto self-start shadow-2xl shadow-blue-600/20 transition-all"
                      >
                        Let's Do This Coach
                      </button>
                    </div>

                    {/* Right Column: Image - Poster Style */}
                    <div className="relative order-1 lg:order-2">
                      {/* Light glow behind the image */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div>

                      <img
                        src="Built-By.jpg"
                        alt="Built By Olympians"
                        className="relative w-full h-auto rounded-3xl shadow-2xl border border-slate-700/50 transform rotate-1 hover:rotate-0 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </FadeInSection>

              <FadeInSection>
                <div className="max-w-6xl mx-auto px-6">
                  {/* "Two Options" Comparison Section - Clean & Connected */}
                  <div className="mb-32 relative">
                    <div className="text-center mb-20 space-y-6">
                      <span className="text-blue-600 font-black tracking-widest uppercase text-xs">The Choice Is Yours</span>
                      <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight">
                        Want To Improve Your Lifting? <br />
                        <span className="text-slate-900">You Have Two Options.</span>
                      </h3>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 relative items-stretch max-w-5xl mx-auto">

                      {/* VS Badge - Absolute Center */}
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center w-12 h-12 bg-white rounded-full border-4 border-slate-50 shadow-xl">
                        <span className="text-slate-900 font-heading font-black text-xs">VS</span>
                      </div>

                      {/* Option 1: Go It Alone (De-emphasized) */}
                      <div className="bg-slate-50 p-8 rounded-[32px] border border-slate-100 transition-all duration-300 relative overflow-hidden group hover:bg-white hover:shadow-lg">
                        <div className="relative z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mb-6">
                            <X className="w-5 h-5 text-slate-500" />
                          </div>
                          <h4 className="text-2xl font-heading font-bold text-slate-500 mb-2">Go It Alone</h4>
                          <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-8">The Hard Way</p>

                          <ul className="space-y-4">
                            {[
                              "Stuck at the same plateau for years",
                              "Guessing what's wrong with your form",
                              "Generic programs not built for you",
                              "Risk of injury from poor technique",
                              "No accountability or support"
                            ].map((item, i) => (
                              <li key={i} className="flex gap-3 items-center text-slate-400 text-sm font-medium">
                                <X className="w-4 h-4 text-slate-300 shrink-0" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Option 2: Lead To Success (Premium/Highlighted) */}
                      <div className="bg-white p-8 rounded-[32px] border-2 border-blue-600 shadow-2xl shadow-blue-900/10 relative overflow-hidden transform md:-translate-y-4 md:scale-105 z-10">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-4 py-1 rounded-bl-xl uppercase tracking-widest">Recommended</div>

                        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/30">
                          <CheckCircle className="w-7 h-7 text-white" />
                        </div>

                        <h4 className="text-3xl font-heading font-black text-slate-900 mb-2 leading-tight">Lead To Success</h4>
                        <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-8">The Proven Path</p>

                        <ul className="space-y-4 relative z-10">
                          {[
                            "Break plateaus with expert analysis",
                            "Daily video feedback on your lifts",
                            "Custom roadmap built for your goals",
                            "Fix pain & improve mobility fast",
                            "Join a team of high performers"
                          ].map((item, i) => (
                            <li key={i} className="flex gap-3 items-start text-slate-700 font-bold text-sm">
                              <div className="bg-blue-100 rounded-full p-0.5 mt-0.5 shrink-0"><CheckCircle className="w-4 h-4 text-blue-600" /></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Decorative gradient blob */}
                        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -z-10 translate-x-10 translate-y-10"></div>
                      </div>
                    </div>

                    <div className="mt-12 text-center">
                      <button
                        onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black px-12 py-5 rounded-xl uppercase tracking-widest text-sm shadow-2xl shadow-blue-600/20 transition-all group relative overflow-hidden"
                      >
                        <span className="relative z-10">I'm Ready To Do This</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                      </button>
                      <p className="text-slate-400 text-[10px] font-bold mt-4 uppercase tracking-widest">
                        <span className="text-red-500">*</span> Limited Team Spots Available
                      </p>
                    </div>
                  </div>

                  {/* The Process Timeline */}
                  {/* The Process Timeline - Redesigned Vertical Connection */}
                  {/* The Process Timeline */}
                  <ProcessTimeline />

                  {/* Assessment to Action - Clean/Transparent Section */}
                  <div className="w-full py-16 relative text-center mb-12">
                    <div className="max-w-4xl mx-auto px-6 relative z-10">
                      <h4 className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4">Elite Coaching Personalised From Day One</h4>
                      <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 mb-6 leading-tight tracking-tight">
                        From Assessment to Action, <br /> What Happens When You Join
                      </h2>

                      <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto mb-12 leading-relaxed font-bold">
                        P.S. Julia's numbers are amazing, but don't let that scare you off.
                        We use this same proven process for first-time lifters, 60-year-olds, and busy parents chasing strength, confidence, and better movement!
                      </p>

                      {/* Video Container */}
                      <div className="relative aspect-video max-w-3xl mx-auto rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-black group cursor-pointer mb-12">
                        <iframe
                          width="100%"
                          height="100%"
                          src="https://www.youtube.com/embed/cRXR3UieHUc"
                          title="How I Fix Lifts"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full"
                        ></iframe>
                      </div>

                      <div className="flex flex-col items-center">
                        <button
                          onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                          className="cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black px-12 py-5 rounded-xl uppercase tracking-widest text-lg shadow-2xl shadow-blue-600/20 transition-all mb-4"
                        >
                          I'm Ready For This
                        </button>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-wider italic">
                          *Apply if you're tired of guessing and for results
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Real Results / Testimonials */}
                  {/* Real Results / Testimonials - Redesigned Masonry Mix */}
                  <div className="mb-20">
                    <div className="text-center mb-12">
                      <div className="flex justify-center mb-4">
                        <img src="/Truecoach-favicons.png" alt="TrueCoach" className="h-8 md:h-10 object-contain" />
                      </div>
                      <p className="text-blue-600 font-heading font-black text-xl md:text-2xl mb-2">You've Heard The Promise</p>
                      <h3 className="text-3xl md:text-5xl font-heading font-black text-slate-900 leading-tight mb-4">
                        These Are Real Lifters. Real <br className="hidden md:block" />Breakthroughs. And Real Results.
                      </h3>
                      <p className="text-slate-500 text-sm md:text-base font-medium">...what lifters had to say after 12 weeks of one to one coaching.</p>
                    </div>

                    {/* Slider Layout - Horizontal Scroll with Buttons */}
                    <div className="relative group/slider max-w-[1400px] mx-auto">
                      <button
                        onClick={() => {
                          const container = document.getElementById('results-slider');
                          container.scrollBy({ left: -340, behavior: 'smooth' });
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-slate-100 text-slate-900 hover:bg-white hover:scale-110 transition-all md:opacity-0 md:group-hover/slider:opacity-100"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>

                      <button
                        onClick={() => {
                          const container = document.getElementById('results-slider');
                          container.scrollBy({ left: 340, behavior: 'smooth' });
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center border border-slate-100 text-slate-900 hover:bg-white hover:scale-110 transition-all md:opacity-0 md:group-hover/slider:opacity-100"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>

                      <div id="results-slider" className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-12 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
                        {[
                          { type: "video", videoId: "1072004083", name: "Rebekah", thumbnail: "/Rebekah.jpg" },
                          { type: "video", videoId: "1072003829", name: "Jack", thumbnail: "/Jack-Urquhart1.jpg" },
                          { type: "video", videoId: "1072003978", name: "Laura", thumbnail: "/Laura-Meador-1-to-1.jpg" },
                          { type: "video", videoId: "1072004031", name: "Rashida", thumbnail: "/Raashida-1-to-1.jpg" },
                          { type: "video", videoId: "1072003668", name: "Dallas", thumbnail: "/Dallas-Smith.jpg" },
                          { type: "video", videoId: "1072003732", name: "Eddy", thumbnail: "/Eddy-Soriano.jpg" },
                          { type: "video", videoId: "1072003886", name: "Katie", thumbnail: "/Katie-Timasso.jpg" },
                        ].map((item, i) => (
                          <div key={i} className="flex-none w-[280px] md:w-[320px] snap-center bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-xl group hover:-translate-y-1 transition-transform duration-300">
                            {/* Media Only - Aspect Ratio Forced to prevent collapse */}
                            <div className="relative aspect-[9/16] bg-black group/play cursor-pointer" onClick={(e) => {
                              const container = e.currentTarget;
                              if (container.querySelector('iframe')) return;

                              const iframe = document.createElement('iframe');
                              iframe.src = `https://player.vimeo.com/video/${item.videoId}?autoplay=1&badge=0&autopause=0&player_id=0&app_id=58479`;
                              iframe.width = "100%";
                              iframe.height = "100%";
                              iframe.frameBorder = "0";
                              iframe.allow = "autoplay; fullscreen; picture-in-picture";
                              iframe.className = "absolute inset-0 w-full h-full object-cover z-20";

                              container.innerHTML = '';
                              container.appendChild(iframe);
                            }}>
                              <img src={item.thumbnail} alt={item.name} className="absolute inset-0 w-full h-full object-contain bg-black group-hover/play:scale-105 transition-transform duration-700 z-10" />
                              <div className="absolute inset-0 bg-black/20 group-hover/play:bg-black/10 transition-colors z-10"></div>
                              <div className="absolute inset-0 flex items-center justify-center z-10">
                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/40 group-hover/play:scale-110 transition-transform shadow-2xl">
                                  <Play className="w-6 h-6 fill-white text-white translate-x-0.5" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Final CTA Area */}
                  <GuaranteeCTA />
                  {/* Pricing Section */}
                  <div id="pricing" className="mb-24 scroll-mt-24">
                    <h3 className="text-3xl md:text-5xl font-heading font-black mb-8 text-center text-slate-900 leading-tight">Choose Your <span className="text-blue-600">Protocol</span></h3>

                    {/* Pricing Toggle with Sliding Animation */}
                    <div className="flex justify-center mb-16">
                      <div className="bg-slate-100 p-1.5 rounded-full flex relative cursor-pointer" onClick={() => setIsAnnual(!isAnnual)}>
                        {/* Sliding Background Pill */}
                        <div className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-md transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1) ${isAnnual ? 'left-[calc(50%+3px)]' : 'left-1.5'}`}></div>

                        <button
                          onClick={(e) => { e.stopPropagation(); setIsAnnual(false); }}
                          className={`relative z-10 w-48 py-3 rounded-full text-xs font-heading font-black uppercase tracking-widest transition-colors duration-300 ${!isAnnual ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          Monthly
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsAnnual(true); }}
                          className={`relative z-10 w-48 py-3 rounded-full text-xs font-heading font-black uppercase tracking-widest transition-colors duration-300 flex items-center justify-center gap-2 ${isAnnual ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                          Annual <div className={`overflow-hidden transition-all duration-300 ${isAnnual ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'}`}><span className="bg-green-100 text-green-600 px-1.5 py-0.5 rounded text-[9px] whitespace-nowrap">SAVE 15%</span></div>
                        </button>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-6 items-start max-w-7xl mx-auto px-6">
                      {/* Option 1: SOLO */}
                      <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-xl relative group hover:-translate-y-2 transition-transform duration-300">
                        <div className="mb-6 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">The Maintenance Option</span>
                          <h4 className="text-3xl font-heading font-black text-slate-900 mt-2 uppercase">Solo <br />Protocol</h4>
                        </div>

                        <div className="mb-8 h-32 flex flex-col justify-center items-center">
                          <div key={isAnnual ? 'solo-yr' : 'solo-mo'} className="animate-pop-in">
                            {isAnnual ? (
                              <>
                                <div><span className="text-5xl font-heading font-black text-slate-900">£2,034</span><span className="text-slate-500 font-medium">/yr</span></div>
                                <div className="mt-2 inline-flex bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded w-max">SAVE £354</div>
                              </>
                            ) : (
                              <>
                                <div><span className="text-5xl font-heading font-black text-slate-900">£199</span><span className="text-slate-500 font-medium">/mo</span></div>
                                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billed Monthly</div>
                              </>
                            )}
                          </div>
                        </div>

                        <ul className="space-y-4 mb-8 text-left">
                          <li className="flex gap-3 text-sm font-medium text-slate-500"><CheckCircle className="w-5 h-5 text-slate-300 shrink-0" /> Custom Program (Mobility OR Lift)</li>
                          <li className="flex gap-3 text-sm font-medium text-slate-500"><CheckCircle className="w-5 h-5 text-slate-300 shrink-0" /> 3x Video Reviews Per Week</li>
                          <li className="flex gap-3 text-sm font-medium text-slate-500"><CheckCircle className="w-5 h-5 text-slate-300 shrink-0" /> Monthly Community Call</li>
                        </ul>

                        <button className="cursor-pointer w-full py-4 border-2 border-slate-200 text-slate-900 font-heading font-bold rounded-xl hover:border-slate-900 transition-colors uppercase text-xs tracking-widest">Select Solo</button>
                        <p className="text-center text-[10px] text-red-400 font-bold mt-4 uppercase tracking-wider">Warning: 48hr feedback delay.</p>
                      </div>

                      {/* Option 2: ELITE (Highlighted) */}
                      <div className="bg-white rounded-[32px] p-8 border-2 border-blue-500 shadow-2xl relative transform lg:-translate-y-6 z-10">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white px-6 py-2 rounded-full font-heading font-bold text-[10px] uppercase tracking-widest shadow-lg">Most Popular</div>

                        <div className="mb-6 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-blue-500">For Serious Athletes</span>
                          <h4 className="text-4xl font-heading font-black text-slate-900 mt-2 uppercase">Elite <br />Protocol</h4>
                        </div>

                        <div className="mb-8 h-32 flex flex-col justify-center items-center">
                          <div key={isAnnual ? 'elite-yr' : 'elite-mo'} className="animate-pop-in">
                            {isAnnual ? (
                              <>
                                <div><span className="text-6xl font-heading font-black text-slate-900">£3,558</span><span className="text-slate-500 font-medium">/yr</span></div>
                                <div className="mt-2 inline-flex bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded w-max">SAVE £630</div>
                              </>
                            ) : (
                              <>
                                <div><span className="text-6xl font-heading font-black text-slate-900">£349</span><span className="text-slate-500 font-medium">/mo</span></div>
                                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billed Monthly</div>
                              </>
                            )}
                          </div>
                        </div>

                        <ul className="space-y-4 mb-8 text-left">
                          <li className="flex gap-3 text-sm font-bold text-slate-700">
                            <Zap className="w-5 h-5 text-blue-500 shrink-0" />
                            <div>
                              Daily "Rapid-Response" Audits
                              <p className="text-[10px] text-slate-400 font-normal">Mon-Fri frame-by-frame analysis.</p>
                            </div>
                          </li>
                          <li className="flex gap-3 text-sm font-bold text-slate-700">
                            <Target className="w-5 h-5 text-blue-500 shrink-0" />
                            <div>
                              The "Tribrid" Architecture
                              <p className="text-[10px] text-slate-400 font-normal">Mobility + Weightlifting + Accessories.</p>
                            </div>
                          </li>
                          <li className="flex gap-3 text-sm font-bold text-slate-700">
                            <Calendar className="w-5 h-5 text-blue-500 shrink-0" />
                            <div>
                              Live Strategy Onboarding
                              <p className="text-[10px] text-slate-400 font-normal">1-on-1 Zoom call to map your year.</p>
                            </div>
                          </li>
                          <li className="flex gap-3 text-sm font-bold text-slate-700">
                            <Eye className="w-5 h-5 text-blue-500 shrink-0" />
                            <div>
                              Weekly Technical Analysis Call
                              <p className="text-[10px] text-slate-400 font-normal">Live group technique review.</p>
                            </div>
                          </li>
                        </ul>

                        <button className="cursor-pointer w-full py-5 bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black rounded-xl shadow-xl shadow-blue-600/20 uppercase text-xs tracking-widest mb-4">Apply For Elite</button>

                        <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-500 bg-slate-50 py-3 rounded-lg border border-slate-100">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> 90-DAY PR GUARANTEE INCLUDED
                        </div>
                      </div>

                      {/* Option 3: INNER CIRCLE */}
                      <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-xl relative group hover:-translate-y-2 transition-transform duration-300">
                        <div className="mb-6 text-center">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-orange-500">The Mentorship</span>
                          <h4 className="text-3xl font-heading font-black text-slate-900 mt-2 uppercase">Inner <br />Circle</h4>
                        </div>

                        <div className="mb-8 h-32 flex flex-col justify-center items-center">
                          <div key={isAnnual ? 'inner-yr' : 'inner-mo'} className="animate-pop-in">
                            {isAnnual ? (
                              <>
                                <div><span className="text-5xl font-heading font-black text-slate-900">£5,100</span><span className="text-slate-500 font-medium">/yr</span></div>
                                <div className="mt-2 inline-flex bg-orange-100 text-orange-700 text-[10px] font-bold px-2 py-1 rounded w-max">SAVE £900</div>
                              </>
                            ) : (
                              <>
                                <div><span className="text-5xl font-heading font-black text-slate-900">£500</span><span className="text-slate-500 font-medium">/mo</span></div>
                                <div className="mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Billed Monthly</div>
                              </>
                            )}
                          </div>
                        </div>

                        <ul className="space-y-4 mb-8 text-left">
                          <li className="flex gap-3 text-sm font-bold text-slate-900"><Star className="w-5 h-5 text-orange-400 shrink-0 fill-orange-400" /> Everything in Elite, plus:</li>
                          <li className="flex gap-3 text-sm font-medium text-slate-500"><CheckCircle className="w-5 h-5 text-orange-400 shrink-0" /> Weekly 1-1 Private Coach Call</li>
                          <li className="flex gap-3 text-sm font-medium text-slate-500"><CheckCircle className="w-5 h-5 text-orange-400 shrink-0" /> Weekly Tech Session with Sonny</li>
                          <li className="flex gap-3 text-sm font-medium text-slate-500"><CheckCircle className="w-5 h-5 text-orange-400 shrink-0" /> Unlimited Video Reviews</li>
                        </ul>

                        <button className="cursor-pointer w-full py-4 border-2 border-orange-400 text-orange-500 font-heading font-bold rounded-xl hover:bg-orange-50 transition-colors uppercase text-xs tracking-widest">Join Inner Circle</button>
                      </div>
                    </div>

                    {/* Add-Ons */}
                    <div className="max-w-4xl mx-auto mt-16">
                      <h4 className="text-xl font-heading font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Available Add-Ons</h4>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex justify-between items-center shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-400 cursor-pointer group">
                          <div className="text-left">
                            <div className="font-heading font-black text-slate-900 uppercase">VIP Onboarding</div>
                            <div className="text-[10px] text-slate-500 font-medium">30-min strategy session w/ Sonny Webster.</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900">£500</div>
                            <button className="cursor-pointer text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800">Add +</button>
                          </div>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex justify-between items-center shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-blue-400 cursor-pointer group">
                          <div className="text-left">
                            <div className="font-heading font-black text-slate-900 uppercase">Performance Nutrition</div>
                            <div className="text-[10px] text-slate-500 font-medium">Dietitian support & monthly check-ins.</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-slate-900">£100<span className="text-slate-500 text-xs font-medium">/mo</span></div>
                            <button className="cursor-pointer text-[10px] font-bold text-blue-600 uppercase tracking-widest hover:text-blue-800">Add +</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </FadeInSection>

              {/* Downsell / Sales Page Link */}
              <DownsellSection onNavigate={() => {
                window.scrollTo({ top: 0, behavior: 'instant' });
                setResultPage('sales');
              }} />
            </>
          )}
          {resultPage === 'sales' && (
            <SalesPage onBack={() => setResultPage('vip')} />
          )}
          {/* NOTE: 'free' result page logic is now handled by the BridgePage component. 
              The 'calculateResult' function sets resultPage='sales' or 'vip', but 'handleLeadSubmit' intercepts 'free' path to show BridgePage first.
          */}
        </div >
      </div >
    );
  };

  const DevToolbar = () => (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-white/95 border border-slate-200 backdrop-blur-xl p-2 rounded-2xl shadow-2xl flex items-center gap-1 transition-all duration-500 ${showDevTools ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="px-4 py-1.5 text-[10px] font-heading font-bold text-blue-600 uppercase tracking-[0.2em] border-r border-slate-200 flex items-center gap-2">
        <Eye className="w-3.5 h-3.5" /> Preview
      </div>
      <button onClick={() => setStep('landing')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'landing' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Landing</button>
      <button onClick={() => setStep('quiz')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'quiz' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Quiz</button>
      <button onClick={() => setStep('lead-form')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'lead-form' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Leads</button>
      <button onClick={() => setStep('analyzing')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'analyzing' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Loading</button>
      <button onClick={() => setStep('bridge')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'bridge' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Bridge</button>
      <button onClick={() => { setStep('result'); setResultPage('vip'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'vip' && step === 'result' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>VIP</button>
      <button onClick={() => { setStep('result'); setResultPage('sales'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'sales' && step === 'result' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Sales</button>
      <button onClick={() => { setStep('result'); setResultPage('free-snatch'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-snatch' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Snatch</button>
      <button onClick={() => { setStep('result'); setResultPage('free-cj'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-cj' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>CJ</button>
      <button onClick={() => { setStep('result'); setResultPage('free-strength'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-strength' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-blue-600'}`}>Str</button>
      <button onClick={() => setShowDevTools(false)} className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors ml-2 font-bold">×</button>
    </div>
  );

  return (
    <div className="font-sans antialiased bg-[#f8fafc] overflow-x-hidden selection:bg-[#2563eb] selection:text-white">
      {/* Import Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {step === 'landing' && <LandingPage />}
      {step === 'quiz' && <QuizStep />}
      {step === 'lead-form' && <LeadCaptureForm data={leadData} setData={setLeadData} onSubmit={handleLeadSubmit} onBack={() => setStep('landing')} />}
      {step === 'analyzing' && <AnalyzingScreen />}
      {step === 'bridge' && <BridgePage resource={getFreeResource()} onUpsellClick={() => { setStep('result'); setResultPage('sales'); }} onBack={() => setStep('landing')} />}
      {step === 'result' && <ResultView onBack={() => setStep('landing')} />}

      <DevToolbar />

      {!showDevTools && (
        <button onClick={() => setShowDevTools(true)} className="fixed bottom-4 right-4 z-[100] w-12 h-12 bg-[#2563eb] rounded-2xl flex items-center justify-center text-white shadow-2xl opacity-60 hover:opacity-100 transition-opacity">
          <Eye className="w-5 h-5" />
        </button>
      )}

      <style>{`
        .font-heading { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        .text-gradient {
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #60a5fa 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: shimmer 5s linear infinite;
        }

        .btn-pop {
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0px 6px 0px 0px #1e40af, 0px 10px 20px rgba(0, 0, 0, 0.15);
            transform: translateY(0px);
        }
        .btn-pop:hover {
            transform: translateY(-2px);
            box-shadow: 0px 8px 0px 0px #1e40af, 0px 14px 28px rgba(0, 0, 0, 0.2);
        }
        .btn-pop:active {
            transform: translateY(4px);
            box-shadow: 0px 2px 0px 0px #1e40af, 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        .card-lift {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-lift:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(30, 58, 138, 0.15);
        }

        .bg-grid {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
        }

        @keyframes shimmer {
            to { background-position: 200% center; }
        }
        
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 40s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        .animate-float {
            animation: float 3s ease-in-out infinite;
        }
        .animate-pulse-glow {
            animation: pulseGlow 2s ease-in-out infinite;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float { 
            0%, 100% { transform: translateY(0px); } 
            50% { transform: translateY(-5px); } 
        }
        @keyframes pulseGlow { 
            0%, 100% { box-shadow: 0 0 20px rgba(37, 99, 235, 0.3); } 
            50% { box-shadow: 0 0 40px rgba(37, 99, 235, 0.6); } 
        }
        @keyframes popIn {
            0% { opacity: 0; transform: scale(0.9) translateY(10px); filter: blur(4px); }
            100% { opacity: 1; transform: scale(1) translateY(0); filter: blur(0); }
        }
        .animate-pop-in {
            animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;