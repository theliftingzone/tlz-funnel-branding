import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronRight, Play, CheckCircle, Calendar, ArrowRight, Star, Dumbbell, Zap, Target, Mail, Users, Award, TrendingUp, ShieldCheck, Eye, Instagram, Youtube, Twitter, ArrowLeft } from 'lucide-react';

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
    // Check if window is defined (client-side) and if device supports fine pointer (mouse)
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
    <div ref={bgRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-950 transform-gpu">
      {/* Interactive Spotlight - Hidden on mobile for performance */}
      <div
        className="hidden md:block absolute w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] will-change-transform opacity-50"
        style={{
          left: 'var(--mouse-x, -1000px)',
          top: 'var(--mouse-y, -1000px)',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Static Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[80%] md:w-[50%] h-[50%] bg-blue-900/10 rounded-full blur-[80px] md:blur-[100px] animate-slow-spin transform-gpu"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] md:w-[40%] h-[40%] bg-slate-900/40 rounded-full blur-[80px] md:blur-[100px] transform-gpu"></div>
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>
    </div>
  );
};

const LogoPlaceholder = ({ className = "" }) => (
  <div className={`flex items-center ${className}`}>
    <img
      src="/the-lifting-zone-logo.svg"
      alt="The Lifting Zone"
      className="h-12 w-auto object-contain"
    />
  </div>
);

// LeadForm Component - Moved outside to prevent re-renders
// LeadForm Component - Moved outside to prevent re-renders
const LeadCaptureForm = ({ data, setData, onSubmit }) => (
  <div className="bg-slate-950 min-h-screen relative font-body flex items-center justify-center p-6 text-white overflow-hidden selection:bg-blue-500 selection:text-white">
    <AnimatedBackground />
    <div className="relative z-10 w-full max-w-md">
      <FadeInSection>
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[32px] shadow-2xl">
          <div className="text-center mb-10">
            <span className="bg-blue-600/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-heading font-bold border border-blue-500/20 mb-6 inline-block uppercase tracking-[0.2em] animate-pulse">
              ALMOST THERE
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 tracking-tight">
              SAVE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">RESULTS.</span>
            </h2>
            <p className="text-slate-400 text-sm font-medium">We've analyzed your lifting profile. Enter your details to reveal your custom plan.</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                <input
                  required
                  type="text"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
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
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
                  placeholder="Webster"
                  value={data.lastName}
                  onChange={(e) => setData({ ...data, lastName: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                <span className="text-[10px] text-blue-400 italic">Received SMS notification</span>
              </div>
              <input
                required
                type="tel"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
                placeholder="+44 7700 900000"
                value={data.phone}
                onChange={(e) => setData({ ...data, phone: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                <span className="text-[10px] text-blue-400 italic">Your best email to</span>
              </div>
              <input
                required
                type="email"
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
                placeholder="sonny@theliftingzone.com"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-heading font-bold py-4 rounded-xl shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs mt-4"
            >
              SEE MY RESULTS
            </button>

            <p className="text-center text-[10px] text-slate-600 max-w-xs mx-auto leading-relaxed">
              By clicking above, you agree to receive your results and occasional lifting tips. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </FadeInSection>
    </div>
  </div>
);

const AnalyzingScreen = () => (
  <div className="bg-slate-950 min-h-screen relative font-body flex items-center justify-center p-6 text-white overflow-hidden selection:bg-blue-500 selection:text-white">
    <AnimatedBackground />
    <div className="relative z-10 text-center max-w-lg">
      <div className="mb-12 relative">
        <div className="w-24 h-24 rounded-full border-4 border-slate-800 mx-auto animate-pulse flex items-center justify-center relative">
          <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
          <ShieldCheck className="w-10 h-10 text-blue-500" />
        </div>
      </div>
      <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 tracking-tight animate-pulse">
        ANALYZING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">INPUTS...</span>
      </h2>
      <div className="space-y-3">
        <div className="flex items-center gap-3 justify-center text-slate-400 text-sm font-mono">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Checking Biomechanics...
        </div>
        <div className="flex items-center gap-3 justify-center text-slate-400 text-sm font-mono delay-75">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span> Calculating Strength Deficit...
        </div>
        <div className="flex items-center gap-3 justify-center text-slate-400 text-sm font-mono delay-150">
          <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></span> Match Finding...
        </div>
      </div>
    </div>
  </div>
);

const App = () => {
  const [step, setStep] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({ fix_one_thing: 'snatch', athlete_type: 'Weightlifter' });
  const [leadData, setLeadData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [resultPage, setResultPage] = useState(null);
  const [showDevTools, setShowDevTools] = useState(true);

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
        { label: "Injury / niggles: My body feels beat up when I push the intensity.", value: "injury" }
      ]
    },
    {
      id: 'location',
      text: "Where do you do the majority of your training?",
      options: [
        { label: "Commercial gym: I train around general public and machines (distracting environment).", value: "commercial" },
        { label: "Home / garage gym: I train alone (zero feedback / isolation).", value: "home" },
        { label: "CrossFit / weightlifting club: I train in a group class setting.", value: "club" }
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

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    calculateResult(answers);
    setStep('analyzing');

    setTimeout(() => {
      setStep('result');
    }, 3000);
  };

  const LeadForm = () => (
    <div className="bg-slate-950 min-h-screen relative font-body flex items-center justify-center p-6 text-white overflow-hidden selection:bg-blue-500 selection:text-white">
      <AnimatedBackground />
      <div className="relative z-10 w-full max-w-md">
        <FadeInSection>
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-[32px] shadow-2xl">
            <div className="text-center mb-10">
              <span className="bg-blue-600/10 text-blue-400 px-4 py-1.5 rounded-full text-[10px] font-heading font-bold border border-blue-500/20 mb-6 inline-block uppercase tracking-[0.2em] animate-pulse">
                ALMOST THERE
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-black mb-4 tracking-tight">
                SAVE YOUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">RESULTS.</span>
              </h2>
              <p className="text-slate-400 text-sm font-medium">We've analyzed your lifting profile. Enter your details to reveal your custom plan.</p>
            </div>

            <form onSubmit={handleLeadSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">First Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
                    placeholder="Sonny"
                    value={leadData.firstName}
                    onChange={(e) => setLeadData({ ...leadData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Last Name</label>
                  <input
                    required
                    type="text"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
                    placeholder="Webster"
                    value={leadData.lastName}
                    onChange={(e) => setLeadData({ ...leadData, lastName: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>
                  <span className="text-[10px] text-blue-400 italic">Received SMS notification</span>
                </div>
                <input
                  required
                  type="tel"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
                  placeholder="+44 7700 900000"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                  <span className="text-[10px] text-blue-400 italic">Your best email to</span>
                </div>
                <input
                  required
                  type="email"
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors placeholder:text-slate-700 text-white"
                  placeholder="sonny@theliftingzone.com"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-heading font-bold py-4 rounded-xl shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all uppercase tracking-widest text-xs mt-4"
              >
                SEE MY RESULTS
              </button>

              <p className="text-center text-[10px] text-slate-600 max-w-xs mx-auto leading-relaxed">
                By clicking above, you agree to receive your results and occasional lifting tips. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </FadeInSection>
      </div>
    </div>
  );

  const AnalyzingView = () => (
    <div className="bg-slate-950 min-h-screen relative font-body flex items-center justify-center p-6 text-white overflow-hidden selection:bg-blue-500 selection:text-white">
      <AnimatedBackground />
      <div className="relative z-10 text-center max-w-lg">
        <div className="mb-12 relative">
          <div className="w-24 h-24 rounded-full border-4 border-slate-800 mx-auto animate-pulse flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin"></div>
            <ShieldCheck className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 tracking-tight animate-pulse">
          ANALYZING <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">INPUTS...</span>
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 justify-center text-slate-400 text-sm font-mono">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span> Checking Biomechanics...
          </div>
          <div className="flex items-center gap-3 justify-center text-slate-400 text-sm font-mono delay-75">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></span> Calculating Strength Deficit...
          </div>
          <div className="flex items-center gap-3 justify-center text-slate-400 text-sm font-mono delay-150">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></span> Match Finding...
          </div>
        </div>
      </div>
    </div>
  );

  const LandingPage = () => (
    <div className="relative text-white min-h-screen bg-slate-950 font-body">
      <AnimatedBackground />

      <nav className="relative z-50 p-6 flex justify-between items-center bg-transparent max-w-7xl mx-auto">
        <LogoPlaceholder />
        <div className="flex gap-4 items-center">
          <a href="https://www.instagram.com/sonnywebstergb" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Instagram className="w-4 h-4" /></a>
          <a href="https://www.youtube.com/@sonnywebsterGB" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 bg-white/5 rounded-full hover:bg-white/10"><Youtube className="w-4 h-4" /></a>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-8 text-center">
        <FadeInSection>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-10 shadow-[0_0_20px_rgba(37,99,235,0.15)]">
            <Award className="w-3.5 h-3.5" /> Olympian Mentorship
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-black mb-10 tracking-tight leading-[0.95] text-white">
            MASTER THE ART OF <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600 drop-shadow-sm">WEIGHTLIFTING.</span>
          </h1>

          <p className="text-slate-400 font-medium text-base md:text-lg mb-14 max-w-2xl mx-auto leading-relaxed">
            Fix your technique, add <span className="text-white font-bold bg-white/10 px-1 rounded">10kg to your total</span>, and build a body that lasts a lifetime. Direct mentorship from the world's best.
          </p>

          {/* VSL Video */}
          <div className="relative aspect-video bg-slate-900 rounded-[24px] overflow-hidden mb-12 border border-white/10 shadow-2xl group max-w-3xl mx-auto ring-1 ring-white/5">
            <iframe
              src="https://player.vimeo.com/video/1156819181?h=9d0e41e34e&badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
              className="absolute top-0 left-0 w-full h-full"
              title="VSL Video"
            ></iframe>
          </div>

          <button
            onClick={() => setStep('quiz')}
            className="font-heading bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-6 px-14 rounded-2xl transition-all transform hover:-translate-y-1 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] uppercase tracking-widest text-xs md:text-sm mb-24 border-t border-white/20"
          >
            ASSESS YOUR LIFTING
          </button>
        </FadeInSection>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 py-20 bg-slate-900/30 border-y border-white/5 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-4 text-center">
          {[
            { val: "20K+", label: "Athletes Coached" },
            { val: "24K+", label: "New PBs" },
            { val: "2016", label: "Rio Olympian" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-5xl md:text-6xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-2 tracking-tight">{stat.val}</div>
              <div className="text-blue-500 uppercase font-bold tracking-[0.25em] text-[10px]">{stat.label}</div>
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
                I'LL GIVE YOU A <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">PLAN OF ACTION.</span>
              </h2>
              <ul className="space-y-8 mb-12">
                {[
                  "Figure out what areas you need to work on in your lifting",
                  "Gain direction on what steps you need to take to level up your operation",
                  "Take the assessment 100% for free"
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                      <CheckCircle className="text-blue-400 w-3.5 h-3.5" />
                    </div>
                    <span className="text-slate-300 font-medium text-lg leading-snug">{point}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setStep('quiz')}
                className="font-heading bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-5 px-12 rounded-xl transition-all shadow-xl shadow-blue-500/20 hover:-translate-y-1 uppercase tracking-widest text-xs"
              >
                START THE QUIZ
              </button>
            </FadeInSection>

            <FadeInSection className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative rounded-[32px] overflow-hidden border border-white/10 shadow-2xl aspect-video transform group-hover:scale-[1.01] transition-transform duration-700">
                <img
                  src="/Sonny-Webster.webp"
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  alt="Sonny Webster Coaching"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-6 border-t border-white/5 bg-slate-950/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16">
          <div className="flex flex-col">
            <LogoPlaceholder className="mb-8" />
            <div className="flex gap-4">
              <a href="https://www.instagram.com/sonnywebstergb" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-blue-600/20"><Instagram className="w-5 h-5" /></a>
              <a href="https://www.youtube.com/@sonnywebsterGB" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-blue-600/20"><Youtube className="w-5 h-5" /></a>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-x-24 gap-y-12">
            <div className="space-y-4">
              <h4 className="font-heading font-bold text-slate-500 uppercase text-[10px] tracking-[0.2em]">Legal</h4>
              <ul className="space-y-3 text-sm font-medium text-slate-400">
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Terms & Conditions</li>
                <li className="hover:text-blue-500 cursor-pointer transition-colors">Refund Policy</li>
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
      <div className="bg-slate-950 h-screen text-white font-body overflow-hidden relative selection:bg-blue-500 selection:text-white">
        <AnimatedBackground />

        {/* Top Navigation - Centered */}
        <div className="absolute top-0 left-0 right-0 z-30 flex justify-center p-8">
          <button
            onClick={handleBack}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900/50 border border-white/5 hover:border-white/10 hover:bg-slate-800 transition-all uppercase text-[10px] font-bold tracking-widest text-slate-400 hover:text-white backdrop-blur-md"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            {currentQuestion > 0 ? "Back" : "Home"}
          </button>
        </div>

        {/* Main Content - Centered in Viewport */}
        <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
          <div className="w-full max-w-2xl relative">
            <FadeInSection className="w-full">
              {/* Progress Header */}
              <div className="flex flex-col mb-10">
                <div className="flex justify-between items-end mb-4 px-1">
                  <div className="inline-flex items-center gap-2 text-blue-500 font-bold uppercase tracking-widest text-[10px]">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Question {currentQuestion + 1}
                  </div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">{Math.round(progress)}% Complete</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm">
                  <div
                    className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-400 transition-all duration-700 ease-out shadow-[0_0_15px_rgba(59,130,246,0.5)]"
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
                    className="w-full text-left p-6 md:p-7 bg-slate-900/40 border border-white/5 hover:border-blue-500/40 hover:bg-blue-600/10 transition-all duration-300 rounded-2xl group flex justify-between items-center relative overflow-hidden active:scale-[0.98] backdrop-blur-xl shadow-lg ring-1 ring-transparent hover:ring-blue-500/20"
                  >
                    <span className="text-base md:text-lg font-medium text-slate-300 group-hover:text-white transition-colors relative z-10 pl-2">{opt.label}</span>
                    <div className="w-8 h-8 rounded-full border border-slate-700 group-hover:border-blue-500 group-hover:bg-blue-500 flex items-center justify-center transition-all duration-300 relative z-10 flex-shrink-0 ml-4 shadow-inner">
                      <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors" />
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
      <div className="bg-slate-950 text-white min-h-screen relative font-body">
        <AnimatedBackground />
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 text-center">
          {resultPage === 'vip' && (
            <FadeInSection>
              <span className="bg-blue-600/10 text-blue-400 px-6 py-2 rounded-full text-[10px] font-heading font-bold border border-blue-500/20 mb-8 inline-block uppercase tracking-[0.3em]">ELITE QUALIFICATION MET</span>
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-10 leading-[0.95] tracking-tight text-white uppercase">
                TRAIN LIKE AN OLYMPIAN. <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">WITH AN OLYMPIAN.</span>
              </h1>
              <p className="text-lg text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed font-medium">
                You told us you want high-level accountability. We are ready to take over your programming and video analysis.
              </p>
              <div className="max-w-4xl mx-auto bg-white text-slate-950 p-10 md:p-16 rounded-[40px] text-left shadow-2xl flex flex-col md:flex-row gap-16 items-center border border-white">
                <div className="flex-1">
                  <h3 className="text-3xl font-heading font-black mb-6 uppercase leading-tight tracking-tight">VIP MENTORSHIP.</h3>
                  <p className="text-slate-500 mb-10 text-base font-medium border-l-2 border-blue-600 pl-6 leading-relaxed italic">"Application only - direct technical slots with our Olympian staff."</p>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-heading font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 hover:-translate-y-1">
                    BOOK STRATEGY CALL <Calendar className="w-4 h-4" />
                  </button>
                </div>
                <div className="relative">
                  <img src="/Sonny-Webster.webp" className="relative w-64 h-64 md:w-72 md:h-72 rounded-[32px] object-cover shadow-2xl border-4 border-slate-50" alt="Sonny Webster" />
                </div>
              </div>
            </FadeInSection>
          )}
          {resultPage === 'sales' && (
            <FadeInSection>
              <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-heading font-bold mb-8 inline-block uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20">THE SYSTEM UNLOCKED</span>
              <h1 className="text-4xl md:text-6xl font-heading font-black mb-10 leading-[0.95] tracking-tight text-white uppercase">
                THE OLYMPIAN'S <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">TECHNICAL HANDBOOK.</span>
              </h1>
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 text-left bg-slate-900/40 border border-white/5 p-10 md:p-16 rounded-[40px] backdrop-blur-3xl shadow-2xl">
                <div>
                  <h3 className="text-xl font-heading font-bold uppercase mb-8 tracking-tight text-white">WORLD CLASS <br />PROGRAMMING.</h3>
                  <p className="text-slate-400 mb-8 font-medium text-base leading-relaxed">"You wanted a plan to fix your lifts. This is the exact 12-week technical cycle we use to build world-class technique."</p>
                  <ul className="space-y-4">
                    {[
                      "12-Week Progressive Cycle",
                      "High-Def Positional Matrix",
                      "Technical Warm-up Bible",
                      "Priority Access Included"
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span className="font-bold uppercase tracking-[0.2em] text-[10px] text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-950 p-10 rounded-[32px] border border-white/10 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl">
                  <span className="text-slate-600 line-through text-xl mb-3 font-bold">£149.00</span>
                  <span className="text-6xl font-heading font-black text-white mb-8 tracking-tighter">£99</span>
                  <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-heading font-bold py-5 rounded-xl shadow-xl shadow-blue-500/20 hover:-translate-y-1 transition-all uppercase tracking-[0.2em] text-[10px]">
                    BUY NOW
                  </button>
                </div>
              </div>
            </FadeInSection>
          )}
          {resultPage?.includes('free') && (
            <FadeInSection>
              <div className="bg-white text-slate-950 p-10 md:p-20 rounded-[40px] max-w-4xl mx-auto shadow-2xl border-[6px] border-white relative overflow-hidden">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-blue-500/20">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-heading font-black mb-8 tracking-tight leading-none text-slate-900 uppercase">
                    YOUR DIAGNOSIS: <br /> <span className="text-blue-600">{resultPage === 'free-snatch' ? 'UNSTABLE OVERHEAD POSITION' : resultPage === 'free-cj' ? 'INCONSISTENT JERK DRIVE' : 'POSITIONAL STRENGTH DEFICIT'}</span>
                  </h2>
                  <p className="text-slate-500 mb-12 font-bold uppercase tracking-[0.2em] text-[10px] leading-relaxed">
                    Great news. Your free '{resultPage === 'free-snatch' ? 'Unshakeable Overhead Protocol' : resultPage === 'free-cj' ? 'Fluid Clean & Jerk Protocol' : 'Positional Strength Protocol'}' is being sent to your email right now. It will arrive in 5 minutes.
                  </p>
                  <div className="h-px bg-slate-100 w-full mb-16"></div>
                  <div className="text-left bg-slate-50 p-10 rounded-[32px] border border-slate-200">
                    <span className="bg-blue-600 text-white px-4 py-1 font-heading font-bold text-[10px] rounded-full uppercase mb-6 inline-block tracking-[0.2em]">WHILE YOU WAIT</span>
                    <h4 className="text-xl md:text-2xl font-heading font-black mb-4 tracking-tight text-slate-900 uppercase">FIX IT PERMANENTLY.</h4>
                    <p className="text-slate-500 mb-8 leading-relaxed font-medium text-base">
                      "The guide I just sent you is great for fixing one session. But if you want to fix your {resultPage === 'free-snatch' ? 'snatch' : resultPage === 'free-cj' ? 'clean & jerk' : 'strength'} permanently in the next 12 weeks..."
                    </p>
                    <button onClick={() => setResultPage('sales')} className="bg-slate-950 text-white font-heading font-bold py-5 px-10 rounded-xl flex items-center gap-3 hover:bg-blue-600 transition-all uppercase tracking-[0.15em] shadow-xl text-[10px] group w-full justify-center">
                      CHECK OUT THE FULL TECHNIQUE SYSTEM FOR £99
                    </button>
                  </div>
                </div>
              </div>
            </FadeInSection>
          )}
        </div>
      </div>
    );
  };

  const DevToolbar = () => (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] bg-slate-900/95 border border-white/10 backdrop-blur-xl p-2 rounded-2xl shadow-2xl flex items-center gap-1 transition-all duration-500 ${showDevTools ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
      <div className="px-4 py-1.5 text-[10px] font-heading font-bold text-blue-500 uppercase tracking-[0.2em] border-r border-white/10 flex items-center gap-2">
        <Eye className="w-3.5 h-3.5" /> Preview
      </div>
      <button onClick={() => setStep('landing')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'landing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Landing</button>
      <button onClick={() => setStep('quiz')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'quiz' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Quiz</button>
      <button onClick={() => setStep('lead-form')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'lead-form' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Leads</button>
      <button onClick={() => setStep('analyzing')} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${step === 'analyzing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Loading</button>
      <button onClick={() => { setStep('result'); setResultPage('vip'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'vip' && step === 'result' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>VIP</button>
      <button onClick={() => { setStep('result'); setResultPage('sales'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'sales' && step === 'result' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Sales</button>
      <button onClick={() => { setStep('result'); setResultPage('free-snatch'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-snatch' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Snatch</button>
      <button onClick={() => { setStep('result'); setResultPage('free-cj'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-cj' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>CJ</button>
      <button onClick={() => { setStep('result'); setResultPage('free-strength'); }} className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all tracking-widest ${resultPage === 'free-strength' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>Str</button>
      <button onClick={() => setShowDevTools(false)} className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors ml-2 font-bold">×</button>
    </div>
  );

  return (
    <div className="font-sans antialiased bg-slate-950 overflow-x-hidden selection:bg-blue-500 selection:text-white">
      {/* Import Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {step === 'landing' && <LandingPage />}
      {step === 'quiz' && <QuizStep />}
      {step === 'lead-form' && <LeadCaptureForm data={leadData} setData={setLeadData} onSubmit={handleLeadSubmit} />}
      {step === 'analyzing' && <AnalyzingScreen />}
      {step === 'result' && <ResultView />}

      <DevToolbar />

      {!showDevTools && (
        <button onClick={() => setShowDevTools(true)} className="fixed bottom-4 right-4 z-[100] w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-2xl opacity-60 hover:opacity-100 transition-opacity">
          <Eye className="w-5 h-5" />
        </button>
      )}

      <style>{`
        .font-heading { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 40s linear infinite;
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default App;