import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, Utensils, Activity, Smartphone, Video, Target, ShieldCheck, HeartPulse, GraduationCap, Calendar, Users, Award } from 'lucide-react';
import SEO from './SEO';
import { trackPixelEvent } from './TrackingScripts';

const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const targetRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsIntersecting(true);
            }
        }, options);

        if (targetRef.current) observer.observe(targetRef.current);
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

const Nutrition = ({ onBack }) => {
    return (
        <div className="min-h-screen font-sans text-slate-900 selection:bg-blue-600 selection:text-white overflow-x-hidden bg-[#f8fafc]">
            <SEO
                title="Nutrition Coaching | The Lifting Zone"
                description="Evidence-based nutrition coaching service structured around physiology, measurable data, and progressive refinement."
            />

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

            {/* HERO SECTION */}
            <section className="relative pt-12 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <FadeInSection>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                            <Utensils className="w-3 h-3" /> Fully Integrated Nutrition
                        </div>

                        <h1 className="text-4xl md:text-6xl font-heading font-black text-slate-900 mb-6 uppercase leading-tight tracking-tight">
                            Nutrition Coaching at <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">The Lifting Zone</span>
                        </h1>

                        <p className="text-xl md:text-2xl font-medium text-slate-600 mb-8 max-w-2xl mx-auto">
                            Led by Mike Nicholson, M.Sc. Sports Nutrition
                        </p>

                        <div className="max-w-3xl mx-auto space-y-6 text-slate-600 text-lg leading-relaxed font-medium mb-12">
                            <p>
                                At The Lifting Zone, training is structured, technical, and performance-focused. Nutrition should follow the same standard.
                            </p>
                            <p>
                                This is a fully integrated, evidence-based nutrition coaching service designed specifically for weightlifters, strength-focused athletes, individuals improving body composition, and clients prioritising long-term health and longevity.
                            </p>
                            <p className="font-bold text-slate-900 bg-white inline-block px-6 py-3 rounded-xl border border-slate-200 mt-4 shadow-sm">
                                This is not a template meal plan. It is a structured coaching system built around physiology, measurable data, and progressive refinement.
                            </p>
                        </div>

                        <a
                            href="https://buy.stripe.com/6oU8wPb338XG3HO96lbV62w"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackPixelEvent('InitiateCheckout', {
                                content_name: 'Nutrition Coaching Lead',
                                value: 169.50, // Assuming a value if it goes to Stripe, else leave as is or 0
                                currency: 'USD'
                            })}
                            className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black py-5 px-10 rounded-2xl text-lg uppercase tracking-widest shadow-2xl shadow-blue-600/20 transition-all hover:scale-105"
                        >
                            Apply For Nutrition Coaching
                        </a>

                    </FadeInSection>
                </div>
            </section>

            {/* PROFESSIONAL OVERSIGHT */}
            <section className="py-16 bg-white relative overflow-hidden border-y border-slate-200">
                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <FadeInSection>
                            <h2 className="text-3xl font-heading font-black text-slate-900 uppercase mb-6">Professional Oversight</h2>
                            <p className="text-slate-600 font-bold text-xl mb-8">
                                Your nutrition is led directly by Mike Nicholson.
                            </p>

                            <ul className="space-y-4 mb-8">
                                <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <GraduationCap className="w-6 h-6 text-blue-600" />
                                    <span className="font-bold text-slate-700 uppercase tracking-wide text-sm">M.Sc. Sports Nutrition</span>
                                </li>
                                <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <Target className="w-6 h-6 text-blue-600" />
                                    <span className="font-bold text-slate-700 uppercase tracking-wide text-sm">Registered Dietician and Diabetes Educator</span>
                                </li>
                                <li className="flex gap-4 items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <Award className="w-6 h-6 text-blue-600" />
                                    <span className="font-bold text-slate-700 uppercase tracking-wide text-sm">22 years applied coaching experience</span>
                                </li>
                            </ul>

                            <p className="text-slate-600 leading-relaxed font-medium">
                                All programming is grounded in established research in sports nutrition, metabolic adaptation, muscle protein synthesis, glycogen management, and long-term metabolic health. Adjustments are made using objective trend analysis rather than subjective reaction to short-term fluctuations.
                            </p>
                        </FadeInSection>

                        <FadeInSection delay={200}>
                            <div className="relative group perspective-1000 h-full">
                                <div className="absolute inset-0 bg-blue-600/5 rounded-[40px] transform rotate-3 group-hover:rotate-0 transition-transform duration-700"></div>
                                <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white h-full min-h-[400px] flex items-center justify-center bg-slate-100">
                                    {/* Placeholder for Mike's photo */}
                                    <img
                                        src="/Coaches/coach-mike.jpeg"
                                        alt="Mike Nicholson Nutrition Coaching"
                                        className="w-full h-full object-cover aspect-[4/5] transform group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent p-8">
                                        <p className="text-white font-heading font-black text-xl uppercase italic">"Expert Guidance Built on Data."</p>
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* FULL VIP ACCESS & POCKET PT */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
                {/* Decorative background gradients */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-6 relative z-10">
                    <FadeInSection className="text-center mb-16">
                        <span className="text-blue-400 font-bold tracking-widest uppercase text-xs">The Digital Ecosystem</span>
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-white mt-4 uppercase">Full VIP Access to Elite Pocket PT</h2>
                        <p className="text-slate-300 mt-6 max-w-2xl mx-auto leading-relaxed text-lg">
                            All nutrition clients receive full VIP access to the Elite Pocket PT app, a structured monitoring and feedback system designed to support measurable performance and body composition outcomes.
                        </p>
                        <p className="text-slate-400 mt-4 max-w-2xl mx-auto italic">
                            This functions as a central performance dashboard where nutrition, adherence, communication, and progression are integrated into one ecosystem.
                        </p>
                    </FadeInSection>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Calculated Targets",
                                desc: "Personalised calorie and macronutrient targets calculated from body mass, lean mass estimates, training frequency, and current phase. Protein intake is structured to optimise muscle protein synthesis. Carbohydrate allocation supports glycogen availability and training output. Fat intake supports hormonal stability and long-term metabolic function.",
                                icon: Target
                            },
                            {
                                title: "Nutrient Timing",
                                desc: "Structured nutrient timing guidance aligned with training demands to support recovery kinetics, neuromuscular performance, and energy stability.",
                                icon: Clock
                            },
                            {
                                title: "Trend Analysis",
                                desc: "Body composition trend analysis using rolling weekly averages rather than isolated daily measurements to reduce distortion from fluid shifts and glycogen variability.",
                                icon: Activity
                            },
                            {
                                title: "Precision Logging",
                                desc: "Precision food logging with adherence monitoring. The system quantifies calorie variance, protein distribution consistency, and overall compliance percentage.",
                                icon: Smartphone
                            },
                            {
                                title: "Structured Check-Ins",
                                desc: "Weekly structured check-ins capturing weight trends, progress images, performance feedback, recovery scores, sleep quality, and digestive markers. This creates a multi-variable physiological assessment rather than relying on body weight alone.",
                                icon: CheckCircle
                            },
                            {
                                title: "Real-Time Adjustments",
                                desc: "Automated feedback indicators & real-time plan modifications. When energy intake or macronutrient distribution changes, tracking targets update immediately, maintaining alignment between prescription and execution.",
                                icon: HeartPulse
                            }
                        ].map((feature, idx) => (
                            <FadeInSection key={idx} delay={idx * 100}>
                                <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-8 rounded-[24px] h-full hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-slate-700/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors">
                                        <feature.icon className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                                    </div>
                                    <h3 className="text-xl font-heading font-bold text-white mb-4 uppercase">{feature.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                                </div>
                            </FadeInSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* EDUCATION AND CONSULTATION */}
            <section className="py-20 bg-slate-50 border-b border-slate-200">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Weekly Webinar */}
                        <FadeInSection>
                            <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-xl h-full flex flex-col">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                                    <Video className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-heading font-black text-slate-900 uppercase mb-4">Weekly Community Education Webinar</h3>
                                <div className="space-y-4 text-slate-600 font-medium leading-relaxed flex-grow">
                                    <p>
                                        Each week includes a live education session focused on fueling for strength output, improving body composition without compromising performance, managing metabolic adaptation during dieting phases, hormonal considerations during prolonged energy restriction, insulin sensitivity, supplement science, and recovery nutrition.
                                    </p>
                                    <p className="font-bold text-blue-800 bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        The objective is to build understanding alongside compliance so that athletes develop long-term nutritional competence.
                                    </p>
                                </div>
                            </div>
                        </FadeInSection>

                        {/* 1:1 Consultation */}
                        <FadeInSection delay={200}>
                            <div className="bg-white p-10 rounded-[32px] border border-slate-200 shadow-xl h-full flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 rounded-full -mr-16 -mt-16 z-0"></div>
                                <div className="relative z-10">
                                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 border border-blue-100">
                                        <Users className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-2xl font-heading font-black text-slate-900 uppercase mb-4">Weekly One to One Consultation</h3>
                                    <p className="text-slate-800 font-bold mb-4">Each client receives one private Zoom consultation per week.</p>
                                    <ul className="space-y-3 text-slate-600 font-medium leading-relaxed mb-6">
                                        <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> Review of body composition trends</li>
                                        <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> Training performance markers</li>
                                        <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> Adherence data & recovery status</li>
                                        <li className="flex gap-2"><CheckCircle className="w-5 h-5 text-blue-500 shrink-0" /> Psychological compliance</li>
                                    </ul>
                                    <p className="text-slate-600 font-medium leading-relaxed">
                                        Long-term strategy planning ensures progression across training blocks, body composition cycles, and competition timelines.
                                    </p>
                                </div>
                            </div>
                        </FadeInSection>
                    </div>
                </div>
            </section>

            {/* SPECIALISED STRATEGIES */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-6 space-y-16">
                    <FadeInSection className="text-center">
                        <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 uppercase mb-4">Specialised Strategies</h2>
                        <p className="text-slate-500 text-lg">Tailored approaches for your specific phase of training.</p>
                    </FadeInSection>

                    {[
                        {
                            title: "Competition Preparation and Making Weight",
                            desc: "For weightlifters competing within weight categories, nutrition is structured around performance preservation while achieving required body mass targets. Preparation includes gradual body composition manipulation rather than aggressive last-minute restriction. Calorie periodisation is used to reduce fat mass while preserving lean tissue and neuromuscular output. Protein intake is maintained at levels shown to support lean mass retention during energy deficits. Carbohydrate distribution is adjusted strategically to protect training intensity during preparation phases.\n\nWhere weight class reduction is required, a structured timeline is implemented to avoid excessive acute dehydration. Emphasis is placed on maintaining strength to bodyweight ratio rather than scale weight alone.",
                            icon: Award
                        },
                        {
                            title: "Peak Week and Competition Day Nutrition",
                            desc: "Final week strategy is planned in detail and individualised. This includes controlled carbohydrate modulation to optimise glycogen storage without unnecessary gastrointestinal stress. Hydration and sodium management are implemented cautiously to maintain performance while ensuring weigh-in compliance. Fibre intake may be adjusted to minimise gut residue where appropriate.\n\nOn competition day, athletes receive a structured fueling protocol covering pre weigh-in intake if required, post weigh-in glycogen restoration, pre session fueling, intra competition carbohydrate strategy, and post competition recovery nutrition. Timing, quantity, and composition are individualised based on body mass, competition schedule, and previous response to carbohydrate loading.\n\nThe objective is maximal neuromuscular output, stable energy availability, and gastrointestinal comfort under competitive conditions.",
                            icon: Target
                        },
                        {
                            title: "Body Composition Optimisation",
                            desc: "For athletes not preparing for competition, strategies include structured calorie periodisation, controlled surplus phases for lean mass accretion, controlled deficit phases for fat reduction, and planned maintenance periods to mitigate metabolic adaptation.\n\nRate of loss or gain is monitored against expected physiological norms to protect performance and long-term health markers.",
                            icon: Activity
                        },
                        {
                            title: "Longevity and Health Focus",
                            desc: "Long-term performance requires metabolic resilience. Nutrition strategies incorporate insulin sensitivity support, lipid profile management, micronutrient sufficiency, gut health considerations, inflammation control, and sustainable behavioural systems.\n\nThe objective is strength development and health preservation across decades, not short-term results at the expense of physiology.",
                            icon: ShieldCheck
                        }
                    ].map((item, idx) => (
                        <FadeInSection key={idx} delay={0}>
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-shadow duration-300 group">
                                <div className="shrink-0 relative">
                                    <div className="w-16 h-16 bg-white rounded-2xl border-2 border-slate-200 flex items-center justify-center group-hover:border-blue-500 transition-colors shadow-sm">
                                        <item.icon className="w-8 h-8 text-slate-700 group-hover:text-blue-600 transition-colors" />
                                    </div>
                                    {idx !== 3 && <div className="absolute top-16 bottom-[-2rem] left-8 w-px bg-slate-200 hidden md:block group-hover:bg-blue-200 transition-colors"></div>}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-heading font-black text-slate-900 uppercase mb-4">{item.title}</h3>
                                    <div className="space-y-4 text-slate-600 leading-relaxed font-medium whitespace-pre-line">
                                        {item.desc}
                                    </div>
                                </div>
                            </div>
                        </FadeInSection>
                    ))}
                </div>
            </section>

            {/* CLOSING / FINAL CTA */}
            <section className="py-24 bg-slate-900 relative">
                <div className="absolute inset-0 bg-blue-900/10 pattern-dots pointer-events-none"></div>
                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <FadeInSection>
                        <div className="bg-white rounded-[32px] p-10 md:p-16 shadow-2xl relative overflow-hidden text-slate-900">
                            <span className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-heading font-bold mb-6 inline-block uppercase tracking-[0.2em] shadow-lg shadow-slate-900/20">The Standard</span>
                            <h2 className="text-3xl md:text-5xl font-heading font-black mb-6 uppercase tracking-tight">This Is a Structured <br /><span className="text-blue-600">Coaching System</span></h2>

                            <p className="text-slate-600 text-lg md:text-xl font-bold mb-6">
                                This is not a downloadable plan or a single consultation.
                            </p>

                            <p className="text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                                It is an integrated, data-driven nutrition coaching system aligned directly with your training at The Lifting Zone, designed to support performance, body composition, competition readiness, and long-term health.
                            </p>

                            <a
                                href="https://buy.stripe.com/6oU8wPb338XG3HO96lbV62w"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-700 border-b-[6px] border-blue-800 active:border-b-0 active:translate-y-[6px] hover:brightness-110 text-white font-heading font-black py-5 px-12 rounded-xl text-lg uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all hover:-translate-y-1"
                            >
                                Apply Now
                            </a>
                        </div>
                    </FadeInSection>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-12 bg-slate-950 text-slate-500 text-center text-[10px] font-bold uppercase tracking-widest border-t border-slate-900">
                <p>&copy; 2026 The Lifting Zone. All rights reserved.</p>
            </footer>
        </div>
    );
};

// Simple Clock component since it wasn't imported from lucide-react initially
const Clock = (props) => (
    <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
)

export default Nutrition;
