/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  ChevronRight,
  Clock,
  Award
} from 'lucide-react';
import { cn } from './utils';

// --- Components ---

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
      isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" aria-label="Startseite" className="flex items-center focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md">
          <img src="/logo.svg" alt="Ingenieurbüro Tonn Logo" className="h-12 md:h-16 w-auto object-contain drop-shadow-sm" />
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#services" className="hover:text-emerald-600 transition-colors">Leistungen</a>
          <a href="#process" className="hover:text-emerald-600 transition-colors">Ablauf</a>
          <a href="#subsidies" className="hover:text-emerald-600 transition-colors">Förderung</a>
          <a href="#contact" className="hover:text-emerald-600 transition-colors">Kontakt</a>
          <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
            Erstberatung buchen
          </button>
        </div>

        <button className="md:hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={isMenuOpen}>
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile Menu */}
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
            <button className="bg-emerald-600 text-white px-5 py-3 rounded-xl cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
              Kostenlose Erstberatung
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav >
  );
};

const Hero = () => {
  return (
    <section aria-labelledby="hero-heading" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920"
          alt="Modernes Einfamilienhaus mit Photovoltaikanlage auf dem Dach"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
            <Award size={14} aria-hidden="true" /> Zertifizierte Energieberatung Düren
          </div>
          <h1 id="hero-heading" className="text-5xl md:text-7xl font-display font-bold leading-[1.1] mb-6 text-slate-900">
            Ihr Zuhause. <br />
            Unsere Expertise. <br />
            <span className="text-emerald-600">Maximale Förderung.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
            Wir machen Ihr Haus fit für die Zukunft. Sparen Sie bis zu 70% Energiekosten durch staatlich geförderte Sanierungskonzepte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-all shadow-xl hover:scale-105 flex items-center justify-center gap-2 group cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 motion-reduce:hover:scale-100 motion-reduce:transition-none">
              Kostenlose Erstberatung <ArrowRight size={20} aria-hidden="true" className="group-hover:translate-x-1 transition-transform motion-reduce:group-hover:translate-x-0" />
            </button>
            <div className="flex items-center gap-3 px-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map(i => (
                  <img key={i} src={`https://i.pravatar.cc/40?u=${i}`} className="w-10 h-10 rounded-full border-2 border-white" alt={`Zufriedener Kunde ${i}`} loading="lazy" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-400">
                  <Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" />
                </div>
                <p className="font-medium text-slate-700">4.9/5 Google Bewertung</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Trust Badges Floating */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/50 backdrop-blur-sm border-t border-white/20 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-70 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-slate-400">BAFA ZERTIFIZIERT</div>
          <div className="flex items-center gap-2 font-bold text-slate-400">KfW EXPERTE</div>
          <div className="flex items-center gap-2 font-bold text-slate-400">DENA GELISTET</div>
          <div className="flex items-center gap-2 font-bold text-slate-400">TÜV RHEINLAND</div>
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    {
      title: "Kostenloses Erstgespräch",
      desc: "Wir klären Ihre Ziele und prüfen die Machbarkeit Ihrer Wünsche.",
      icon: <Phone className="text-emerald-600" />
    },
    {
      title: "Vor-Ort-Analyse",
      desc: "Wir untersuchen Ihr Gebäude vom Keller bis zum Dachboden.",
      icon: <Home className="text-emerald-600" />
    },
    {
      title: "Individueller Sanierungsfahrplan",
      desc: "Sie erhalten ein detailliertes Konzept mit allen Maßnahmen.",
      icon: <ShieldCheck className="text-emerald-600" />
    },
    {
      title: "Förderung & Umsetzung",
      desc: "Wir beantragen Ihre Gelder und begleiten die Sanierung.",
      icon: <Euro className="text-emerald-600" />
    }
  ];

  return (
    <section id="process" aria-labelledby="process-heading" className="section-padding bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 id="process-heading" className="text-3xl md:text-5xl font-bold mb-4">In 4 Schritten zum effizienten Zuhause</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Unser strukturierter Prozess macht die energetische Sanierung für Sie stressfrei und transparent.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-100 -translate-y-12 z-0"></div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform motion-reduce:group-hover:scale-100 border border-emerald-50" aria-hidden="true">
                {step.icon}
              </div>
              <div className="bg-emerald-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4">
                {idx + 1}
              </div>
              <h3 className="font-bold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SubsidySection = () => {
  const examples = [
    {
      label: "Wärmepumpe",
      amount: "bis zu 21.000 €",
      percentage: "70%",
      desc: "Austausch einer alten Ölheizung gegen eine moderne Wärmepumpe."
    },
    {
      label: "Dachdämmung",
      amount: "bis zu 12.000 €",
      percentage: "20%",
      desc: "Energetische Optimierung der Gebäudehülle für weniger Wärmeverlust."
    },
    {
      label: "Fenstertausch",
      amount: "bis zu 9.000 €",
      percentage: "20%",
      desc: "Einbau von 3-fach verglasten Fenstern inkl. Montage."
    }
  ];

  return (
    <section id="subsidies" aria-labelledby="subsidies-heading" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 id="subsidies-heading" className="text-3xl md:text-5xl font-bold mb-6">Bares Geld vom Staat sichern</h2>
            <p className="text-lg text-slate-600 mb-8">
              Wussten Sie, dass der Staat bis zu 70% Ihrer Sanierungskosten übernimmt? Wir wissen genau, welche Töpfe für Sie offen stehen.
            </p>
            <div className="space-y-4">
              {['BAFA Einzelmaßnahmen', 'KfW Kredit 261', 'Steuerliche Förderung', 'Regionale Zuschüsse NRW'].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-600" size={20} aria-hidden="true" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {examples.map((ex, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 10 }}
                className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h4 className="font-bold text-xl mb-1">{ex.label}</h4>
                  <p className="text-sm text-slate-500">{ex.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{ex.amount}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ex.percentage} Förderung</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const BookingSection = () => {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="section-padding bg-emerald-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none" aria-hidden="true">
        <Zap size={600} className="translate-x-1/2 -translate-y-1/4" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl md:text-5xl font-bold mb-4">Jetzt Termin sichern</h2>
          <p className="text-emerald-100/80 max-w-xl mx-auto">Wählen Sie einen freien Slot für Ihre kostenlose 15-minütige Erstberatung per Telefon oder Video-Call.</p>
        </div>

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
                <button type="submit" className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg hover:shadow-emerald-600/20 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
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
                <button key={time} aria-label={`Termin um ${time} Uhr wählen`} className="p-3 border border-slate-200 rounded-xl hover:border-emerald-600 hover:bg-emerald-50 transition-all text-sm font-medium cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500">
                  {time}
                </button>
              ))}
            </div>
            <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
              <div className="flex items-center gap-4 mb-4">
                <img src="https://i.pravatar.cc/60?u=expert" className="w-12 h-12 rounded-full" alt="Dipl.-Ing. Thomas Weber, Zertifizierter Energieberater" loading="lazy" />
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
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer aria-label="Fußbereich" className="bg-slate-900 text-slate-400 py-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-2">
          <div className="flex items-center mb-6">
            <div className="bg-white p-2 md:p-3 rounded-xl inline-block">
              <img src="/logo.svg" alt="Ingenieurbüro Tonn Logo" className="h-10 md:h-12 w-auto object-contain" />
            </div>
          </div>
          <p className="max-w-sm mb-8">
            Ihr Partner für nachhaltige Sanierung und maximale Energieeffizienz in Düren, Köln und Aachen.
          </p>
          <div className="flex gap-4">
            <a href="tel:+492421123456" aria-label="Anrufen" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors text-white focus-visible:ring-2 focus-visible:ring-emerald-500">
              <Phone size={18} aria-hidden="true" />
            </a>
            <a href="mailto:info@energie-dueren.de" aria-label="E-Mail senden" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors text-white focus-visible:ring-2 focus-visible:ring-emerald-500">
              <Mail size={18} aria-hidden="true" />
            </a>
            <a href="https://maps.google.com/?q=Marktplatz+1+52349+Düren" target="_blank" rel="noopener noreferrer" aria-label="Standort auf Google Maps öffnen" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-colors text-white focus-visible:ring-2 focus-visible:ring-emerald-500">
              <MapPin size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Links</h4>
          <ul className="space-y-4 text-sm">
            <li><a href="#" className="hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">Impressum</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">Datenschutz</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">AGB</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-sm">Förder-Check</a></li>
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
    <div className="min-h-screen selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <ProcessSection />
        <SubsidySection />

        {/* Statistics / Bento Grid Section */}
        <section className="section-padding bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
                  <p className="text-slate-500 font-medium">Sanierte Gebäude</p>
                </div>
                <div className="mt-8 text-sm text-slate-400">Erfahrung seit über 10 Jahren in der Region Düren.</div>
              </div>
              <div className="bg-emerald-600 p-8 rounded-3xl shadow-xl text-white md:scale-110 z-10">
                <div className="text-4xl font-bold mb-2">€4.2M</div>
                <p className="text-emerald-100 font-medium">Gesicherte Fördermittel</p>
                <div className="mt-8 flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
                  Aktuell 12 Anträge in Bearbeitung
                </div>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
                  <p className="text-slate-500 font-medium">Zufriedene Kunden</p>
                </div>
                <div className="mt-8 flex text-yellow-400">
                  <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}
