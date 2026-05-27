/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll } from 'motion/react';
import {
  CheckCircle2,
  ArrowRight,
  Calendar,
  ShieldCheck,
  Euro,
  Home,
  Zap,
  Star,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Award,
  Leaf,
  Sun,
  Flame,
  Sparkles
} from 'lucide-react';
import { cn } from './utils';

// --- 3D Tilt Card – follows mouse pointer ---

type TiltCardProps = {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
};

const TiltCard: React.FC<TiltCardProps> = ({ children, className, intensity = 12 }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springConfig);
  const translateZ = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseEnter = () => translateZ.set(30);
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    translateZ.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d'
      }}
      className={className}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateZ,
          transformStyle: 'preserve-3d'
        }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// --- Navbar ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav aria-label="Hauptnavigation" className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_-10px_rgba(15,23,42,0.15)] py-3 border-b border-white/40" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" aria-label="Startseite" className="flex items-center focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md group">
          <div className="transition-transform duration-500 group-hover:[transform:rotateY(20deg)] [transform-style:preserve-3d]">
            <img src="/logo.svg" alt="Ingenieurbüro Tonn Logo" className="h-12 md:h-16 w-auto object-contain drop-shadow-md" />
          </div>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="hover:text-emerald-600 transition-colors">Leistungen</a>
          <a href="#process" className="hover:text-emerald-600 transition-colors">Ablauf</a>
          <a href="#subsidies" className="hover:text-emerald-600 transition-colors">Förderung</a>
          <a href="#contact" className="hover:text-emerald-600 transition-colors">Kontakt</a>
          <button className="btn-3d bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-500 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 font-semibold">
            Erstberatung buchen
          </button>
        </div>

        <button className="md:hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={isMenuOpen}>
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white border-t p-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <a href="#services" className="focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md px-1" onClick={() => setIsMenuOpen(false)}>Leistungen</a>
            <a href="#process" className="focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md px-1" onClick={() => setIsMenuOpen(false)}>Ablauf</a>
            <a href="#subsidies" className="focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md px-1" onClick={() => setIsMenuOpen(false)}>Förderung</a>
            <button className="btn-3d bg-emerald-600 text-white px-5 py-3 rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
              Kostenlose Erstberatung
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// --- Hero with 3D parallax illustration ---

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 80, damping: 20, mass: 0.5 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  const layer1X = useTransform(sx, [-1, 1], [-25, 25]);
  const layer1Y = useTransform(sy, [-1, 1], [-15, 15]);
  const layer2X = useTransform(sx, [-1, 1], [-50, 50]);
  const layer2Y = useTransform(sy, [-1, 1], [-30, 30]);
  const layer3X = useTransform(sx, [-1, 1], [-15, 15]);
  const layer3Y = useTransform(sy, [-1, 1], [-10, 10]);
  const sceneRotateY = useTransform(sx, [-1, 1], [-12, 12]);
  const sceneRotateX = useTransform(sy, [-1, 1], [8, -8]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(px * 2);
      mouseY.set(py * 2);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex items-center pt-24 pb-24 overflow-hidden"
    >
      {/* Animated background orbs (3D depth) */}
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-grid opacity-60" />
        <motion.div
          style={{ x: layer2X, y: layer2Y }}
          className="float-orb w-[500px] h-[500px] bg-emerald-400/40 -top-32 -left-32 animate-float-slow"
        />
        <motion.div
          style={{ x: layer1X, y: layer1Y }}
          className="float-orb w-[400px] h-[400px] bg-sky-300/30 top-40 -right-20 animate-float-fast"
        />
        <motion.div
          style={{ x: layer3X, y: layer3Y }}
          className="float-orb w-[350px] h-[350px] bg-amber-200/40 bottom-0 left-1/3 animate-float-slow"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-emerald-200/60 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-lg shadow-emerald-500/10"
          >
            <Sparkles size={14} aria-hidden="true" className="text-emerald-500" /> Zertifizierte Energieberatung Düren
          </motion.div>

          <h1 id="hero-heading" className="text-5xl md:text-7xl font-display font-bold leading-[1.05] mb-6 text-slate-900">
            Ihr Zuhause. <br />
            Unsere Expertise. <br />
            <span className="text-gradient-emerald">Maximale Förderung.</span>
          </h1>

          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Wir machen Ihr Haus fit für die Zukunft. Sparen Sie bis zu <strong className="text-slate-900">70 % Energiekosten</strong> durch staatlich geförderte Sanierungskonzepte.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <button className="btn-3d bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
              Kostenlose Erstberatung
              <ArrowRight size={20} aria-hidden="true" className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/40?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white shadow-md" alt={`Zufriedener Kunde ${i}`} loading="lazy" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (<Star key={i} size={14} fill="currentColor" />))}
                </div>
                <p className="font-medium text-slate-700">4.9/5 Google Bewertung</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3D Illustration Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="hidden lg:block relative h-[520px] scene-3d"
          aria-hidden="true"
        >
          <motion.div
            style={{
              rotateY: sceneRotateY,
              rotateX: sceneRotateX,
              transformStyle: 'preserve-3d'
            }}
            className="relative w-full h-full"
          >
            {/* Floor plate */}
            <div
              className="absolute left-1/2 bottom-10 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-emerald-100 via-white to-sky-100 opacity-80"
              style={{ transform: 'rotateX(75deg) translateZ(-60px)', transformStyle: 'preserve-3d', boxShadow: '0 80px 120px -40px rgba(16,185,129,0.4)' }}
            />

            {/* Central house card */}
            <div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-80 rounded-3xl bg-gradient-to-br from-white to-slate-50 border border-white shadow-3d flex flex-col items-center justify-center"
              style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}
            >
              <div
                className="w-24 h-24 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white mb-5 shadow-xl shadow-emerald-500/40"
                style={{ transform: 'translateZ(40px)' }}
              >
                <Home size={48} />
              </div>
              <div className="text-3xl font-bold text-slate-900" style={{ transform: 'translateZ(30px)' }}>A+ Effizienz</div>
              <div className="text-sm text-slate-500 mt-1" style={{ transform: 'translateZ(20px)' }}>Sanierungsfahrplan</div>

              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {['bg-rose-400', 'bg-orange-400', 'bg-amber-300', 'bg-lime-400', 'bg-emerald-500'].map((c, i) => (
                  <div key={i} className={cn("h-2.5 rounded-full", c, i === 4 ? 'w-10 ring-2 ring-white' : 'w-6')} />
                ))}
              </div>
            </div>

            {/* Floating chips around */}
            <motion.div
              style={{ x: layer1X, y: layer1Y, transform: 'translateZ(120px)' }}
              className="absolute top-6 right-2 bg-white rounded-2xl px-4 py-3 shadow-3d flex items-center gap-3 border border-emerald-100"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Leaf size={20} className="text-emerald-600" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">CO₂ pro Jahr</div>
                <div className="font-bold text-slate-900">−4.8 t</div>
              </div>
            </motion.div>

            <motion.div
              style={{ x: layer2X, y: layer2Y, transform: 'translateZ(150px)' }}
              className="absolute bottom-20 -left-4 bg-white rounded-2xl px-4 py-3 shadow-3d flex items-center gap-3 border border-amber-100"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                <Sun size={20} className="text-amber-600" />
              </div>
              <div>
                <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">PV-Ertrag</div>
                <div className="font-bold text-slate-900">9.2 kWp</div>
              </div>
            </motion.div>

            <motion.div
              style={{ x: layer3X, y: layer3Y, transform: 'translateZ(180px)' }}
              className="absolute top-1/3 -right-6 bg-gradient-to-br from-emerald-600 to-emerald-700 text-white rounded-2xl px-5 py-4 shadow-2xl shadow-emerald-600/30"
            >
              <div className="text-xs text-emerald-100 font-medium uppercase tracking-wider">Förderung</div>
              <div className="font-bold text-2xl">bis 70 %</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/40 backdrop-blur-md border-t border-white/40 py-6 z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 text-sm font-bold text-slate-400 tracking-wider">
          <div>BAFA ZERTIFIZIERT</div>
          <div>KfW EXPERTE</div>
          <div>DENA GELISTET</div>
          <div>TÜV RHEINLAND</div>
        </div>
      </div>
    </section>
  );
};

// --- Process Section with 3D tilt cards ---

const ProcessSection = () => {
  const steps = [
    { title: "Kostenloses Erstgespräch", desc: "Wir klären Ihre Ziele und prüfen die Machbarkeit Ihrer Wünsche.", icon: Phone, color: "from-emerald-400 to-emerald-600" },
    { title: "Vor-Ort-Analyse", desc: "Wir untersuchen Ihr Gebäude vom Keller bis zum Dachboden.", icon: Home, color: "from-sky-400 to-sky-600" },
    { title: "Individueller Sanierungsfahrplan", desc: "Sie erhalten ein detailliertes Konzept mit allen Maßnahmen.", icon: ShieldCheck, color: "from-amber-400 to-amber-600" },
    { title: "Förderung & Umsetzung", desc: "Wir beantragen Ihre Gelder und begleiten die Sanierung.", icon: Euro, color: "from-rose-400 to-rose-600" }
  ];

  return (
    <section id="process" aria-labelledby="process-heading" className="section-padding bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Unser Ablauf</div>
          <h2 id="process-heading" className="text-3xl md:text-5xl font-bold mb-4">In 4 Schritten zum effizienten Zuhause</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Unser strukturierter Prozess macht die energetische Sanierung für Sie stressfrei und transparent.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
              >
                <TiltCard className="h-full" intensity={10}>
                  <div className="relative h-full bg-white rounded-3xl p-8 border border-slate-100 shadow-3d shadow-3d-hover transition-shadow duration-500 overflow-hidden">
                    {/* Number watermark */}
                    <div className="absolute -top-4 -right-2 text-[7rem] font-display font-bold text-slate-50 leading-none select-none pointer-events-none" style={{ transform: 'translateZ(10px)' }}>
                      0{idx + 1}
                    </div>

                    <div
                      className={cn("relative w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white mb-6 shadow-lg", step.color)}
                      style={{ transform: 'translateZ(50px)' }}
                    >
                      <Icon size={28} aria-hidden="true" />
                      <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-br blur-xl opacity-50 -z-10", step.color)} />
                    </div>

                    <h3 className="font-bold text-lg mb-2 relative" style={{ transform: 'translateZ(30px)' }}>{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed relative" style={{ transform: 'translateZ(20px)' }}>{step.desc}</p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// --- Subsidy Section ---

const SubsidySection = () => {
  const examples = [
    { label: "Wärmepumpe", amount: "bis zu 21.000 €", percentage: "70%", desc: "Austausch einer alten Ölheizung gegen eine moderne Wärmepumpe.", icon: Flame, color: "from-rose-500 to-orange-500" },
    { label: "Dachdämmung", amount: "bis zu 12.000 €", percentage: "20%", desc: "Energetische Optimierung der Gebäudehülle für weniger Wärmeverlust.", icon: Home, color: "from-emerald-500 to-teal-500" },
    { label: "Fenstertausch", amount: "bis zu 9.000 €", percentage: "20%", desc: "Einbau von 3-fach verglasten Fenstern inkl. Montage.", icon: ShieldCheck, color: "from-sky-500 to-indigo-500" }
  ];

  return (
    <section id="subsidies" aria-labelledby="subsidies-heading" className="section-padding bg-white relative overflow-hidden">
      <div className="float-orb w-[500px] h-[500px] bg-emerald-200/30 -top-40 -right-40 animate-float-slow" aria-hidden="true" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Fördergelder</div>
            <h2 id="subsidies-heading" className="text-3xl md:text-5xl font-bold mb-6">Bares Geld vom <span className="text-gradient-emerald">Staat sichern</span></h2>
            <p className="text-lg text-slate-600 mb-8">
              Wussten Sie, dass der Staat bis zu 70 % Ihrer Sanierungskosten übernimmt? Wir wissen genau, welche Töpfe für Sie offen stehen.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {['BAFA Einzelmaßnahmen', 'KfW Kredit 261', 'Steuerliche Förderung', 'Regionale Zuschüsse NRW'].map(item => (
                <div key={item} className="flex items-center gap-3 bg-emerald-50/60 px-4 py-3 rounded-xl border border-emerald-100">
                  <CheckCircle2 className="text-emerald-600 shrink-0" size={20} aria-hidden="true" />
                  <span className="font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 perspective-1500">
            {examples.map((ex, idx) => {
              const Icon = ex.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 50, rotateY: 20 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.15, duration: 0.7 }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <TiltCard intensity={8}>
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-3d shadow-3d-hover transition-shadow duration-500 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn("w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white shadow-lg shrink-0", ex.color)}
                          style={{ transform: 'translateZ(50px)' }}
                        >
                          <Icon size={24} />
                        </div>
                        <div>
                          <h4 className="font-bold text-lg mb-1" style={{ transform: 'translateZ(30px)' }}>{ex.label}</h4>
                          <p className="text-xs text-slate-500" style={{ transform: 'translateZ(20px)' }}>{ex.desc}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0" style={{ transform: 'translateZ(40px)' }}>
                        <div className="text-xl font-bold text-emerald-600">{ex.amount}</div>
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{ex.percentage} Förderung</div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Stats Bento with 3D depth ---

const StatsBento = () => {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-slate-50 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <TiltCard intensity={6}>
            <div className="bg-white p-8 rounded-3xl shadow-3d shadow-3d-hover transition-shadow duration-500 border border-slate-100 h-full flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="text-5xl font-bold text-gradient-emerald mb-2" style={{ transform: 'translateZ(40px)' }}>500+</div>
                <p className="text-slate-500 font-medium">Sanierte Gebäude</p>
              </div>
              <div className="mt-6 text-sm text-slate-400 flex items-center gap-2">
                <Clock size={14} /> Erfahrung seit über 10 Jahren in Düren.
              </div>
            </div>
          </TiltCard>

          <TiltCard intensity={8}>
            <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 p-8 rounded-3xl shadow-2xl shadow-emerald-500/40 text-white md:scale-105 z-10 h-full overflow-hidden min-h-[220px]">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-300/30 rounded-full blur-2xl" />
              <div className="relative">
                <div className="text-5xl font-bold mb-2" style={{ transform: 'translateZ(50px)' }}>€4.2M</div>
                <p className="text-emerald-50 font-medium">Gesicherte Fördermittel</p>
                <div className="mt-8 flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-200 rounded-full animate-pulse" />
                  Aktuell 12 Anträge in Bearbeitung
                </div>
              </div>
            </div>
          </TiltCard>

          <TiltCard intensity={6}>
            <div className="bg-white p-8 rounded-3xl shadow-3d shadow-3d-hover transition-shadow duration-500 border border-slate-100 h-full flex flex-col justify-between min-h-[220px]">
              <div>
                <div className="text-5xl font-bold text-gradient-emerald mb-2" style={{ transform: 'translateZ(40px)' }}>98%</div>
                <p className="text-slate-500 font-medium">Zufriedene Kunden</p>
              </div>
              <div className="mt-6 flex text-yellow-400">
                {[...Array(5)].map((_, i) => (<Star key={i} size={18} fill="currentColor" />))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

// --- Booking Section ---

const BookingSection = () => {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-padding bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" aria-hidden="true">
        <Zap size={600} className="translate-x-1/2 -translate-y-1/4" />
      </div>
      <div className="float-orb w-[600px] h-[600px] bg-emerald-400/20 -top-40 -left-40 animate-float-slow" aria-hidden="true" />
      <div className="float-orb w-[400px] h-[400px] bg-sky-400/20 bottom-0 right-0 animate-float-fast" aria-hidden="true" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-emerald-700/50 backdrop-blur-md border border-emerald-500/30 text-emerald-100 rounded-full text-xs font-bold uppercase tracking-wider mb-4">Termin buchen</div>
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mb-4">Jetzt Termin sichern</h2>
          <p className="text-emerald-100/80 max-w-xl mx-auto">Wählen Sie einen freien Slot für Ihre kostenlose 15-minütige Erstberatung per Telefon oder Video-Call.</p>
        </div>

        <TiltCard intensity={4}>
          <div className="bg-white text-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Ihre Kontaktdaten</h3>
              <form className="space-y-4" aria-label="Kontaktformular">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="vorname" className="text-xs font-bold uppercase text-slate-400">Vorname</label>
                    <input id="vorname" name="vorname" type="text" autoComplete="given-name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors" placeholder="Max" required />
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="nachname" className="text-xs font-bold uppercase text-slate-400">Nachname</label>
                    <input id="nachname" name="nachname" type="text" autoComplete="family-name" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors" placeholder="Mustermann" required />
                  </div>
                </div>
                <div className="space-y-1">
                  <label htmlFor="email" className="text-xs font-bold uppercase text-slate-400">E-Mail</label>
                  <input id="email" name="email" type="email" autoComplete="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors" placeholder="max@beispiel.de" required />
                </div>
                <div className="space-y-1">
                  <label htmlFor="telefon" className="text-xs font-bold uppercase text-slate-400">Telefon</label>
                  <input id="telefon" name="telefon" type="tel" autoComplete="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-colors" placeholder="+49 123 456789" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="btn-3d w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-500 transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
                    Termin verbindlich anfragen
                  </button>
                </div>
              </form>
            </div>

            <div className="border-l border-slate-100 pl-0 md:pl-12">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calendar className="text-emerald-600" /> Verfügbarkeit
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {['09:00', '10:30', '13:00', '14:30', '16:00', '17:30'].map(time => (
                  <button key={time} aria-label={`Termin um ${time} Uhr wählen`} className="p-3 border border-slate-200 rounded-xl hover:border-emerald-600 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all text-sm font-medium cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-sm hover:shadow-md">
                    {time}
                  </button>
                ))}
              </div>
              <div className="mt-8 p-6 bg-gradient-to-br from-emerald-50 to-white rounded-2xl border border-emerald-100 shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <img src="https://i.pravatar.cc/60?u=expert" className="w-12 h-12 rounded-full ring-2 ring-emerald-200" alt="Dipl.-Ing. Thomas Weber, Zertifizierter Energieberater" loading="lazy" />
                  <div>
                    <p className="font-bold">Dipl.-Ing. Thomas Weber</p>
                    <p className="text-xs text-emerald-700 font-medium">Zertifizierter Energieberater</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 italic">
                  "Ich freue mich darauf, gemeinsam mit Ihnen das volle Potenzial Ihres Hauses zu entdecken."
                </p>
              </div>
            </div>
          </div>
        </TiltCard>
      </div>
    </section>
  );
};

// --- Footer ---

const Footer = () => {
  return (
    <footer aria-label="Fußbereich" className="bg-slate-950 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center mb-6">
            <div className="bg-white p-2 md:p-3 rounded-xl inline-block shadow-lg">
              <img src="/logo.svg" alt="Ingenieurbüro Tonn Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
          </div>
          <p className="max-w-sm mb-8">
            Ihr Partner für nachhaltige Sanierung und maximale Energieeffizienz in Düren, Köln und Aachen.
          </p>
          <div className="flex gap-3">
            <a href="tel:+492421123456" aria-label="Anrufen" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all text-white focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-lg">
              <Phone size={18} aria-hidden="true" />
            </a>
            <a href="mailto:info@energie-dueren.de" aria-label="E-Mail senden" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all text-white focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-lg">
              <Mail size={18} aria-hidden="true" />
            </a>
            <a href="https://maps.google.com/?q=Marktplatz+1+52349+Düren" target="_blank" rel="noopener noreferrer" aria-label="Standort auf Google Maps öffnen" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 transition-all text-white focus-visible:ring-2 focus-visible:ring-emerald-500 shadow-lg">
              <MapPin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Links</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Impressum</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Datenschutz</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">AGB</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Förder-Check</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Kontakt</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={16} className="mt-1 text-emerald-500" aria-hidden="true" />
              <span>Marktplatz 1<br />52349 Düren</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={16} className="text-emerald-500" aria-hidden="true" />
              <a href="tel:+492421123456" className="hover:text-emerald-500 transition-colors">02421 / 123 456 0</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={16} className="text-emerald-500" aria-hidden="true" />
              <a href="mailto:info@energie-dueren.de" className="hover:text-emerald-500 transition-colors">info@energie-dueren.de</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 text-center text-xs">
        &copy; {new Date().getFullYear()} Energieberatung Düren. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900 overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <ProcessSection />
        <SubsidySection />
        <StatsBento />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
