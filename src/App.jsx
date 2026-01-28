import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, Play, CheckCircle, Calendar, ArrowRight, Star, Dumbbell, Zap, Target, Mail, Users, Award, TrendingUp, ShieldCheck, Eye, Instagram, Youtube, Twitter, ArrowLeft, X, Lock, Menu, Loader2, ExternalLink } from 'lucide-react';

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
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
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
    <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#0f172a] transform-gpu">
      <div
        className="hidden md:block absolute w-[800px] h-[800px] bg-[#2563eb]/10 rounded-full blur-[120px] will-change-transform opacity-50"
        style={{
          left: 'var(--mouse-x, -1000px)',
          top: 'var(--mouse-y, -1000px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-[#2563eb]/10 rounded-full blur-[80px] md:blur-[100px] animate-slow-spin transform-gpu"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-[#0f172a]/40 rounded-full blur-[80px] md:blur-[100px] transform-gpu"></div>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
    </div>
  );
};

// Reusable Video Placeholder with Play Button
const VideoPlaceholder = ({ src, alt, className = "" }) => (
  <div className={`relative group cursor-pointer overflow-hidden rounded-[24px] border border-white/10 shadow-2xl ${className}`}>
    <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a]/40 group-hover:bg-[#0f172a]/20 transition-all z-10">
      <div className="w-20 h-20 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] group-hover:scale-110 transition-transform duration-500 border border-white/20">
        <Play className="fill-white text-white w-8 h-8 ml-1" />
      </div>
    </div>
    <img src={src} alt={alt} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="bg-black/50 backdrop-blur px-3 py-1 rounded text-[10px] font-bold text-white uppercase tracking-wider">Click to Play</div>
    </div>
  </div>
);

// Custom Vimeo Player with Cover
const VimeoPlayer = ({ videoId, thumbnail }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative aspect-video bg-[#0f172a] rounded-[24px] overflow-hidden mb-12 border-4 border-white/10 shadow-2xl group max-w-3xl mx-auto ring-1 ring-white/5 cursor-pointer" onClick={() => setIsPlaying(true)}>
      {!isPlaying ? (
        <>
          {/* Custom Thumbnail & Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#0f172a]/20 group-hover:bg-[#0f172a]/10 transition-all z-20">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-[#facc15] via-[#eab308] to-[#ea580c] rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(234,179,8,0.5)] group-hover:scale-110 transition-transform duration-500 border-4 border-white animate-pulse-glow">
              <Play className="fill-white text-white w-8 h-8 md:w-10 md:h-10 ml-1" />
            </div>
          </div>
          <img
            src={thumbnail || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1200"}
            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-1000"
            alt="Video Thumbnail"
          />
          <div className="absolute bottom-6 left-0 right-0 text-center z-20">
            <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-white/10">
              Watch the 60-Second Analysis
            </span>
          </div>
        </>
      ) : (
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?h=9d0e41e34e&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1`}
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0f172a]/90 backdrop-blur-sm transition-all duration-300 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-[32px] p-2 relative shadow-2xl shadow-blue-900/50 border border-white/20 overflow-hidden transform scale-100 transition-transform">
        <button onClick={onClose} className="absolute top-4 right-4 z-20 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
          <X className="w-4 h-4" />
        </button>
        <div className="bg-[#0f172a] rounded-[28px] p-8 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#facc15] to-[#f59e0b]"></div>
          <div className="inline-flex items-center gap-2 bg-[#2563eb]/20 border border-[#2563eb]/30 px-3 py-1 rounded-full mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="text-[#2563eb] text-[10px] font-bold uppercase tracking-widest">Live Webinar</span>
          </div>

          <h3 className="text-3xl md:text-4xl font-heading font-black mb-4 uppercase italic leading-none">
            The Efficiency <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#facc15] to-orange-500">Masterclass</span>
          </h3>
          <p className="text-slate-400 text-sm mb-2 leading-relaxed font-bold">Sunday 8th Feb @ 6pm Dubai</p>
          <p className="text-slate-500 text-xs mb-8 leading-relaxed max-w-xs mx-auto">
            Join me as I reveal the "Olympic Efficiency" framework that adds kilos to your total without you needing to gain a single pound of muscle.
          </p>

          <a href="https://join.theliftingzone.com/" target="_blank" rel="noopener noreferrer" className="block w-full btn-pop bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-[#0f172a] font-heading font-black py-4 rounded-xl text-lg uppercase tracking-widest shadow-xl shadow-yellow-500/20">
            Reserve My Free Seat
          </a>
        </div>
      </div>
    </div>
  );
};

const LeadCaptureForm = ({ data, setData, onSubmit }) => (
  <div className="bg-[#0f172a] min-h-screen relative font-body flex items-center justify-center p-6 text-[#334155] overflow-hidden selection:bg-[#2563eb] selection:text-white">
    <AnimatedBackground />
    <div className="relative z-10 w-full max-w-md">
      <FadeInSection>
        <div className="bg-[#f8fafc] backdrop-blur-xl border border-[#e2e8f0] p-8 md:p-10 rounded-[32px] shadow-2xl">
          <div className="text-center mb-10">
            <span className="bg-[#ea580c]/10 text-[#ea580c] px-4 py-1.5 rounded-full text-[10px] font-heading font-bold border border-[#ea580c]/20 mb-6 inline-block uppercase tracking-[0.2em] animate-pulse">
              ALMOST THERE
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 tracking-tight text-[#0f172a]">
              SAVE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#facc15]">RESULTS.</span>
            </h2>
            <p className="text-[#64748b] text-sm font-medium">We've analyzed your lifting profile. Enter your details to reveal your custom plan.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] ml-1">First Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                  placeholder="Sonny"
                  value={data.firstName}
                  onChange={(e) => setData({ ...data, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] ml-1">Last Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                  placeholder="Webster"
                  value={data.lastName}
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] ml-1">Phone Number</label>
                <span className="text-[10px] text-[#2563eb] italic">Received SMS notification</span>
              </div>
              <input
                required
                type="tel"
                className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                placeholder="+44 7700 900000"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-[#64748b] ml-1">Email Address</label>
                <span className="text-[10px] text-[#2563eb] italic">Your best email to</span>
              </div>
              <input
                required
                type="email"
                className="w-full bg-white border border-[#e2e8f0] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#2563eb] transition-colors placeholder:text-slate-400 text-slate-900"
                placeholder="sonny@theliftingzone.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-t from-[#eab308] to-[#facc15] border-b-[6px] border-[#b45309] active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-[#0f172a] font-heading font-black py-4 rounded-xl shadow-xl shadow-[#b45309]/20 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs mt-4"
            >
              SEE MY RESULTS
            </button>

            <p className="text-center text-[10px] text-[#64748b] max-w-xs mx-auto leading-relaxed">
              By clicking above, you agree to receive your results and occasional lifting tips. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </FadeInSection>
    </div>
  </div>
);

const AnalyzingScreen = () => (
  <div className="bg-[#0f172a] min-h-screen relative font-body flex items-center justify-center p-6 text-white overflow-hidden selection:bg-[#2563eb] selection:text-white">
    <AnimatedBackground />
    <div className="relative z-10 text-center max-w-lg">
      <div className="mb-12 relative">
        <div className="w-24 h-24 rounded-full border-4 border-slate-700 mx-auto animate-pulse flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-t-4 border-[#2563eb] animate-spin"></div>
          <ShieldCheck className="w-10 h-10 text-[#2563eb]" />
        </div>
      </div>
      <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 tracking-tight animate-pulse">
        ANALYZING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#facc15]">INPUTS...</span>
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 justify-center text-slate-300 text-sm font-mono">
          <span className="w-2 h-2 bg-[#facc15] rounded-full animate-ping"></span> Checking Biomechanics...
        </div>
        <div className="flex items-center gap-3 justify-center text-slate-300 text-sm font-mono delay-75">
          <span className="w-2 h-2 bg-[#2563eb] rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span> Calculating Strength Deficit...
        </div>
        <div className="flex items-center gap-3 justify-center text-slate-300 text-sm font-mono delay-150">
          <span className="w-2 h-2 bg-[#ea580c] rounded-full animate-ping" style={{ animationDelay: '1s' }}></span> Match Finding...
        </div>
      </div>
    </div>
  </div>
);

// Bridge Page Component - Handles redirection to specific funnel
const BridgePage = ({ resource, onUpsellClick }) => {
  const [timeLeft, setTimeLeft] = useState(15);

  // Auto-redirect logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // In a real implementation, this would be:
          // window.location.href = resource.url;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [resource.url]);

  return (
    <div className="bg-[#0f172a] min-h-screen relative font-body overflow-x-hidden selection:bg-[#2563eb] selection:text-white">
      <AnimatedBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20">

        {/* Diagnosis Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 shadow-lg">
            <CheckCircle className="w-3.5 h-3.5" /> Diagnosis Complete
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-black mb-6 leading-tight text-white uppercase">
            YOUR DIAGNOSIS: <br /> <span className="text-[#2563eb]">{resource.title}</span>
          </h1>

          {/* Redirect Bar */}
          <div className="max-w-md mx-auto bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 mb-8">
            <div className="flex justify-between items-center text-xs text-slate-400 mb-2 font-mono">
              <span>Redirecting to {resource.name}...</span>
              <span>{timeLeft}s</span>
            </div>
            <div className="h-1 bg-slate-700 w-full rounded-full overflow-hidden">
              <div className="h-full bg-green-500 transition-all duration-1000 ease-linear" style={{ width: `${(timeLeft / 15) * 100}%` }}></div>
            </div>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="block mt-3 text-[10px] font-bold text-[#2563eb] hover:text-white transition-colors uppercase tracking-widest text-center flex items-center justify-center gap-1">
              Click here if you are not redirected <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* While You Wait / Upsell Section */}
        <div className="bg-white text-slate-950 p-8 md:p-12 rounded-[32px] shadow-2xl border-4 border-white relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#2563eb] text-white text-[10px] font-black px-4 py-2 rounded-bl-xl uppercase tracking-widest z-10">
            One-Time Offer
          </div>

          <div className="relative z-10">
            <span className="bg-[#2563eb]/10 text-[#2563eb] px-4 py-1.5 font-heading font-bold text-[10px] rounded-full uppercase mb-4 inline-block tracking-[0.2em]">WHILE YOU WAIT</span>
            <h4 className="text-2xl md:text-3xl font-heading font-black mb-4 tracking-tight text-[#0f172a] uppercase leading-none">
              FIX IT PERMANENTLY.
            </h4>
            <p className="text-[#64748b] mb-8 leading-relaxed font-medium text-base">
              "The free guide I'm sending you is great for fixing one session. But if you want to fix your lifts permanently in the next 12 weeks, check out the full Technical System."
            </p>
            <button onClick={onUpsellClick} className="w-full btn-pop bg-[#0f172a] text-white font-heading font-black py-5 px-8 rounded-xl flex items-center justify-center gap-3 transition-all uppercase tracking-[0.15em] shadow-xl text-[10px] group">
              GET THE FULL SYSTEM FOR £99
            </button>
          </div>
        </div>
      </div>
    </div>
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

  // Refs for scrolling to sections
  const teamRef = useRef(null);
  const resultsRef = useRef(null);
  const freeCourseRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (step === 'landing') {
      const timer = setTimeout(() => setShowWebinar(true), 3000);
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
        { label: "Static template: I follow a spreadsheet or PDF, but I have nobody to critique my movement.", value: "template" },
        { label: "Coached: I have a coach, but I’m looking for more specialized expertise (Olympian level).", value: "coached" }
      ]
    },
    {
      id: 'solution_preference',
      text: "Based on your goals, how would you prefer to solve this?",
      options: [
        { label: "I want a world-class coach to analyze my videos weekly and handle my entire bespoke program with fast results.", value: "A" },
        { label: "I want a proven, step-by-step technical program to follow on my own.", value: "B" },
        { label: "I just want some free tips to try in my next session.", value: "C" }
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
    if (pref === 'A') setResultPage('vip');
    else if (pref === 'B') setResultPage('sales');
    else {
      if (goal === 'snatch' || goal === 'both') setResultPage('free-snatch');
      else if (goal === 'cj') setResultPage('free-cj');
      else setResultPage('free-strength');
    }
  };

  const getFreeResource = () => {
    const issue = answers.fix_one_thing;
    if (issue === 'snatch' || issue === 'both') {
      return { title: "Unstable Overhead", name: "Free Snatch Plan", url: "https://start.theliftingzone.com/free-snatch-plan" };
    } else if (issue === 'cj') {
      return { title: "Inconsistent Drive", name: "Free Clean & Jerk Plan", url: "#" }; // Add C&J URL when ready
    } else {
      return { title: "Positional Weakness", name: "Free Strength Protocol", url: "#" }; // Add Strength URL when ready
    }
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    calculateResult(answers);
    setStep('analyzing');

    setTimeout(() => {
      // If it's a free result, show the Bridge Page first
      if (answers.solution_preference === 'C') {
        setStep('bridge');
      } else {
        setStep('result');
      }
    }, 2000);
  };

  const LandingPage = () => (
    <div className="relative text-white min-h-screen bg-[#0f172a] font-body">
      <AnimatedBackground />
      <WebinarPopup isOpen={showWebinar} onClose={() => setShowWebinar(false)} />

      <nav className="relative z-50 p-6 flex flex-col md:flex-row justify-between items-center bg-transparent max-w-7xl mx-auto gap-6 md:gap-0">
        <LogoPlaceholder />

        {/* Subtle Menu - Absolute Center for Desktop */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 bg-white/5 border border-white/5 px-8 py-3 rounded-full backdrop-blur-md z-20">
          <button onClick={() => scrollToSection(teamRef)} className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#2563eb]">Meet the Team</button>
          <button onClick={() => scrollToSection(resultsRef)} className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#2563eb]">Results</button>
          <button onClick={() => scrollToSection(freeCourseRef)} className="text-slate-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors hover:text-[#2563eb]">Free Course</button>
        </div>

        <div className="flex gap-4 items-center">
          <a href="https://www.instagram.com/sonnywebstergb" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Instagram className="w-4 h-4" /></a>
          <a href="https://www.youtube.com/@sonnywebsterGB" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Youtube className="w-4 h-4" /></a>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2563eb]/10 border border-[#2563eb]/20 text-[#2563eb] text-[10px] font-bold uppercase tracking-[0.2em] mb-10 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
            <Award className="w-3.5 h-3.5" /> Olympian Mentorship
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-10 tracking-tight leading-[0.95] text-white">
            MASTER THE ART OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] via-blue-500 to-[#facc15] drop-shadow-sm">WEIGHTLIFTING.</span>
          </h1>

          <p className="text-slate-400 font-medium text-base md:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Fix your technique, add <span className="text-white font-bold bg-[#2563eb]/20 px-2 py-0.5 rounded text-[#facc15]">10kg to your total</span>, and build a body that lasts a lifetime. Direct mentorship from the world's best.
          </p>

          {/* VSL Video - Vimeo Player - Custom component used here */}
          <VimeoPlayer videoId="1156819181" thumbnail="/images/sonny-main-video.png" />

          <button
            onClick={() => setStep('quiz')}
            className="font-heading bg-gradient-to-t from-[#eab308] to-[#facc15] border-b-[6px] border-[#b45309] active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-[#0f172a] font-black py-5 px-12 rounded-2xl transition-all uppercase tracking-widest text-sm mb-6 shadow-2xl shadow-yellow-500/20"
          >
            ASSESS YOUR LIFTING
          </button>
        </FadeInSection>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 py-12 bg-[#0f172a] border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 text-center">
          {[
            { val: "20K+", label: "Athletes Coached" },
            { val: "24K+", label: "New PBs" },
            { val: "2016", label: "Rio Olympian" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 tracking-tight">{stat.val}</div>
              <div className="text-[#2563eb] uppercase font-bold tracking-[0.25em] text-[10px]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Plan Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto p-1 text-center md:text-left">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeInSection>
              <h2 className="text-4xl md:text-6xl font-heading font-black mb-10 leading-[1] tracking-tight text-white">
                I'LL GIVE YOU A <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-[#facc15]">PLAN OF ACTION.</span>
              </h2>
              <ul className="space-y-8 mb-12">
                {[
                  "Figure out what areas you need to work on in your lifting",
                  "Gain direction on what steps you need to take to level up your operation",
                  "Take the assessment 100% for free"
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-[#2563eb]/20 flex items-center justify-center border border-[#2563eb]/30">
                      <CheckCircle className="text-[#2563eb] w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-300 font-medium text-lg leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setStep('quiz')}
                className="font-heading bg-gradient-to-t from-[#eab308] to-[#facc15] border-b-[6px] border-[#b45309] active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-[#0f172a] font-black py-5 px-12 rounded-xl transition-all shadow-xl shadow-yellow-500/20 uppercase tracking-widest text-xs"
              >
                ASSESS YOUR LIFTING
              </button>
            </FadeInSection>

            <div className="w-full">
              <img
                key="sonny-coaching-img-v4"
                src="/images/sonny-coaching.webp?force=true"
                className="w-full h-auto block opacity-100"
                style={{ background: 'transparent', boxShadow: 'none', filter: 'none' }}
                alt="Sonny Webster Coaching Graph"
              />
            </div>


          </div>
        </div>
      </section>

      {/* Meet the Team Section (Placeholder) */}
      <section ref={teamRef} className="relative z-10 py-32 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-16 text-white">MEET THE <span className="text-[#2563eb]">TEAM</span></h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Sonny Webster", role: "Rio Olympian / Founder", image: "/Sonny-Webster.webp" },
              { name: "Senior Coach", role: "Elite Performance Specialist", image: null },
              { name: "Head Nutritionist", role: "Performance Nutrition", image: null }
            ].map((member, i) => (
              <div key={i} className="bg-[#0f172a] border border-white/10 p-8 rounded-[32px] hover:border-[#2563eb]/50 transition-colors group">
                <div className="w-32 h-32 rounded-full mx-auto mb-6 overflow-hidden border-4 border-white/10 group-hover:border-[#2563eb] transition-colors relative bg-slate-800">
                  {member.image ? (
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                      <Users className="w-12 h-12" />
                    </div>
                  )}
                </div>
                <h4 className="font-heading font-bold text-xl mb-2 text-white">{member.name}</h4>
                <p className="text-[#2563eb] text-xs font-bold uppercase tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section (Placeholder) */}
      <section ref={resultsRef} className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-black mb-16 text-white">REAL <span className="text-[#facc15]">RESULTS</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Justin Garcia", role: "US ATHLETE", text: "TLZ is the perfect storm. You have access to not only an amazing group of coaches... but also an amazing community... These coaches gave me the confidence to compete in the sport knowing that I have the foundation to succeed. Truly a 1 of 1 group." },
              { name: "Jessica Nesbitt", role: "AU ATHLETE", text: "The set up, coaching team and community are the best I've experienced. Excellent technical analysis... The global community is supportive and the TLZ team goes above and beyond regardless of experience, age or ability." },
              { name: "Andrew Hallworth", role: "GB ATHLETE", text: "The coaches are fantastic, they break everything down so you can understand where you're going wrong and so you can fix it. The knowledge and expertise is second to none." },
              { name: "Pavol Rovnan", role: "US ATHLETE", text: "Worth every single penny. In just a short time, I gained a wealth of knowledge... Sonny expertly guided me through the steps to build unshakable confidence in dropping under the bar." },
              { name: "A.", role: "GB ATHLETE", text: "Learned a huge amount and had so much fun... Not to mentioned PBs in both the snatch and clean & jerk. Sonny was amazing." },
              { name: "Jonathan Gil", role: "CH ATHLETE", text: "In just a few hours, I made huge progress and it kind of changed my mindset... especially with the snatch, which I had been struggling with for two years." }
            ].map((t, i) => (
              <div key={i} className="bg-[#1e293b] p-8 rounded-2xl border border-white/5 relative text-left">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-[#facc15] text-[#facc15]" />)}
                </div>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed min-h-[80px]">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm">{t.name}</h4>
                    <p className="text-[#2563eb] text-[10px] font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Course Section */}
      <section ref={freeCourseRef} className="relative z-10 py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="relative rounded-[40px] overflow-hidden border-4 border-white/10 shadow-2xl bg-gradient-to-br from-[#2563eb] to-[#1e3a8a]">
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-grid opacity-20"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full"></div>

              <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center p-10 md:p-16">
                <div className="text-center md:text-left">
                  <div className="inline-block bg-white/10 border border-white/20 px-4 py-1.5 rounded-full text-white text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                    Instant Access
                  </div>
                  <h2 className="text-4xl md:text-5xl font-heading font-black mb-6 text-white leading-tight">
                    UNLOCK THE <br /><span className="text-[#facc15]">FOUNDATIONS.</span>
                  </h2>
                  <p className="text-blue-100 text-base md:text-lg mb-8 font-medium leading-relaxed">
                    Get immediate access to our 3-part technique primer series. No credit card required. Just pure value to get you started.
                  </p>
                  <button className="w-full md:w-auto btn-pop bg-white text-[#0f172a] font-heading font-black py-4 px-10 rounded-xl uppercase tracking-widest text-xs shadow-xl">
                    Get Free Access
                  </button>
                </div>

                {/* Visual Representation */}
                <div className="relative">
                  <div className="aspect-video rounded-2xl overflow-hidden border-4 border-white/20 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 cursor-pointer group bg-[#0f172a]">
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                    <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" alt="Free Course Preview" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-black/50 px-2 py-1 rounded">Module 1: Stance</span>
                    </div>
                  </div>
                  {/* Decorative elements behind */}
                  <div className="absolute -z-10 top-4 -right-4 w-full h-full rounded-2xl border-2 border-white/10 bg-white/5 transform -rotate-2"></div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="flex flex-col">
            <LogoPlaceholder className="mb-8" />
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sonnywebstergb" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-[#2563eb]/20"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@sonnywebsterGB" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-[#2563eb]/20"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-24 gap-y-12">
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-slate-500 uppercase text-[10px] tracking-[0.2em]">Legal</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li className="hover:text-[#2563eb] cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-[#2563eb] cursor-pointer transition-colors">Terms & Conditions</li>
                <li className="hover:text-[#2563eb] cursor-pointer transition-colors">Refund Policy</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center border-t border-white/5 pt-10">
          <p className="text-slate-600 text-[10px] uppercase font-bold tracking-[0.4em]">© 2026 THE LIFTING ZONE</p>
        </div>
      </footer>
    </div>
  );

  const QuizStep = () => {
    const q = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <div className="bg-[#0f172a] h-screen text-white font-body overflow-hidden relative selection:bg-[#2563eb] selection:text-white">
        <AnimatedBackground />

        {/* Top Navigation - Centered */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-center p-8 pointer-events-none">
          {/* Centered container with pointer-events-auto for the button */}
          <div className="pointer-events-auto">
            <button
              onClick={handleBack}
              className="group flex items-center gap-3 px-8 py-3 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all uppercase text-[10px] font-bold tracking-widest text-white backdrop-blur-md shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95"
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
                  <div className="inline-flex items-center gap-2 text-[#2563eb] font-bold uppercase tracking-widest text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-[#2563eb] animate-pulse"></span>
                    Question {currentQuestion + 1}
                  </div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">{Math.round(progress)}% Complete</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-[#2563eb] via-blue-500 to-[#facc15] transition-all duration-700 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <h2 className="text-3xl md:text-5xl font-heading font-black mb-12 text-center leading-[1.1] text-white tracking-tight drop-shadow-2xl">
                {q.text}
              </h2>

              {/* Options */}
              <div className="space-y-4">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full text-left p-6 md:p-7 bg-[#f8fafc] border border-[#e2e8f0] hover:border-[#2563eb] hover:bg-white transition-all duration-300 rounded-2xl group flex justify-between items-center relative overflow-hidden active:scale-[0.98] shadow-lg ring-1 ring-transparent hover:ring-[#2563eb]/20"
                  >
                    <span className="text-base md:text-lg font-medium text-[#334155] group-hover:text-[#2563eb] transition-colors relative z-10 pl-2">{opt.label}</span>
                    <div className="w-8 h-8 rounded-full border border-slate-200 group-hover:border-[#2563eb] group-hover:bg-[#2563eb] flex items-center justify-center transition-all duration-300 relative z-10 flex-shrink-0 ml-4 shadow-inner">
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

  const ResultView = () => {
    return (
      <div className="bg-[#0f172a] text-white min-h-screen relative font-body">
        <AnimatedBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          {resultPage === 'vip' && (
            <FadeInSection>
              <span className="bg-[#2563eb]/10 text-[#2563eb] px-6 py-2 rounded-full text-[10px] font-heading font-bold border border-[#2563eb]/20 mb-8 inline-block uppercase tracking-[0.3em]">ELITE QUALIFICATION MET</span>
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-8 leading-[0.95] tracking-tight text-white uppercase">
                TRAIN LIKE AN OLYMPIAN. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-blue-400">WITH AN OLYMPIAN.</span>
              </h1>

              {/* VIDEO PLACEHOLDER - Top for VIP */}
              <div className="w-full max-w-3xl mx-auto mb-12">
                <VideoPlaceholder src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&q=80&w=1200" alt="Sonny Mentorship Video" className="aspect-video" />
              </div>

              <div className="max-w-4xl mx-auto bg-white text-slate-950 p-10 md:p-16 rounded-[40px] text-center shadow-2xl border border-white">
                <h3 className="text-3xl font-heading font-black mb-6 uppercase leading-tight tracking-tight text-[#0f172a]">VIP MENTORSHIP.</h3>
                <p className="text-[#64748b] mb-10 text-lg font-medium leading-relaxed italic max-w-2xl mx-auto">"You told us you want high-level accountability. We are ready to take over your programming and video analysis. Direct slots with our Olympian staff."</p>
                <button className="w-full md:w-auto px-12 bg-gradient-to-t from-[#eab308] to-[#facc15] border-b-[6px] border-[#b45309] active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-[#0f172a] font-heading font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all text-xs uppercase tracking-widest shadow-xl shadow-yellow-500/20 hover:-translate-y-1 mx-auto">
                  BOOK STRATEGY CALL <Calendar className="w-4 h-4" />
                </button>
              </div>
            </FadeInSection>
          )}
          {resultPage === 'sales' && (
            <FadeInSection>
              <span className="bg-[#2563eb] text-white px-6 py-2 rounded-full text-[10px] font-heading font-bold mb-8 inline-block uppercase tracking-[0.3em] shadow-lg shadow-[#2563eb]/20">THE SYSTEM UNLOCKED</span>
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-8 leading-[0.95] tracking-tight text-white uppercase">
                THE OLYMPIAN'S <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563eb] to-blue-400">TECHNICAL HANDBOOK.</span>
              </h1>

              {/* VIDEO PLAYER - Top for Sales */}
              <div className="w-full max-w-3xl mx-auto mb-12">
                <VideoPlaceholder src="https://images.unsplash.com/photo-1541534401786-2077eed87a74?auto=format&fit=crop&q=80&w=1200" alt="Technical Handbook Walkthrough" className="aspect-video" />
              </div>

              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 text-left bg-[#f8fafc] border border-white/5 p-10 md:p-16 rounded-[40px] shadow-2xl relative overflow-hidden">
                <div className="z-10 relative">
                  <h3 className="text-xl font-heading font-bold uppercase mb-8 tracking-tight text-[#0f172a]">WORLD CLASS <br />PROGRAMMING.</h3>
                  <p className="text-[#64748b] mb-8 font-medium text-base leading-relaxed">"You wanted a plan to fix your lifts. This is the exact 12-week technical cycle we use to build world-class technique."</p>
                  <ul className="space-y-4">
                    {[
                      "12-Week Progressive Cycle",
                      "High-Def Positional Matrix",
                      "Technical Warm-up Bible",
                      "Priority Access Included"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-center">
                        <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-full"></div>
                        <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-[#334155]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* BUY BUTTON AREA */}
                <div className="flex flex-col justify-center">
                  <div className="bg-[#0f172a] p-10 rounded-[32px] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
                    <span className="text-slate-400 line-through text-xl mb-3 font-bold">£149.00</span>
                    <span className="text-6xl font-heading font-black text-white mb-8 tracking-tighter">£99</span>
                    <button className="w-full bg-gradient-to-t from-[#eab308] to-[#facc15] border-b-[6px] border-[#b45309] active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-[#0f172a] font-heading font-bold py-5 rounded-xl shadow-xl shadow-yellow-500/20 transition-all uppercase tracking-[0.2em] text-[10px]">
                      BUY NOW
                    </button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          )}
          {/* NOTE: 'free' result page logic is now handled by the BridgePage component. 
              The 'calculateResult' function sets resultPage='sales' or 'vip', but 'handleLeadSubmit' intercepts 'free' path to show BridgePage first.
          */}
        </div>
      </div>
    );
  };

  const DevToolbar = () => (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-[#0f172a]/95 border border-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl flex items-center gap-1 transition-all duration-500 ${showDevTools ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="px-4 py-1.5 text-[10px] font-heading font-bold text-[#2563eb] uppercase tracking-[0.2em] border-r border-white/10 flex items-center gap-2">
        <Eye className="w-3.5 h-3.5" /> Preview
      </div>
      <button onClick={() => setStep('landing')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'landing' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Landing</button>
      <button onClick={() => setStep('quiz')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'quiz' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Quiz</button>
      <button onClick={() => setStep('lead-form')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'lead-form' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Leads</button>
      <button onClick={() => setStep('analyzing')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'analyzing' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Loading</button>
      <button onClick={() => setStep('bridge')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'bridge' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Bridge</button>
      <button onClick={() => { setStep('result'); setResultPage('vip'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'vip' && step === 'result' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>VIP</button>
      <button onClick={() => { setStep('result'); setResultPage('sales'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'sales' && step === 'result' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Sales</button>
      <button onClick={() => { setStep('result'); setResultPage('free-snatch'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-snatch' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Snatch</button>
      <button onClick={() => { setStep('result'); setResultPage('free-cj'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-cj' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>CJ</button>
      <button onClick={() => { setStep('result'); setResultPage('free-strength'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-strength' ? 'bg-[#2563eb] text-white' : 'text-slate-400 hover:text-white'}`}>Str</button>
      <button onClick={() => setShowDevTools(false)} className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors ml-2 font-bold">×</button>
    </div>
  );

  return (
    <div className="font-sans antialiased bg-[#0f172a] overflow-x-hidden selection:bg-[#2563eb] selection:text-white">
      {/* Import Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {step === 'landing' && <LandingPage />}
      {step === 'quiz' && <QuizStep />}
      {step === 'lead-form' && <LeadCaptureForm data={leadData} setData={setLeadData} onSubmit={handleLeadSubmit} />}
      {step === 'analyzing' && <AnalyzingScreen />}
      {step === 'bridge' && <BridgePage resource={getFreeResource()} onUpsellClick={() => { setStep('result'); setResultPage('sales'); }} />}
      {step === 'result' && <ResultView />}

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
            background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #f59e0b 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-size: 200% auto;
            animation: shimmer 5s linear infinite;
        }

        .btn-pop {
            transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0px 6px 0px 0px #b45309, 0px 10px 20px rgba(0, 0, 0, 0.15);
            transform: translateY(0px);
        }
        .btn-pop:hover {
            transform: translateY(-2px);
            box-shadow: 0px 8px 0px 0px #b45309, 0px 14px 28px rgba(0, 0, 0, 0.2);
        }
        .btn-pop:active {
            transform: translateY(4px);
            box-shadow: 0px 2px 0px 0px #b45309, 0px 4px 8px rgba(0, 0, 0, 0.1);
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
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
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
            0%, 100% { box-shadow: 0 0 20px rgba(250, 204, 21, 0.3); } 
            50% { box-shadow: 0 0 40px rgba(250, 204, 21, 0.6); } 
        }
        /* Hide scrollbar */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;