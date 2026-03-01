"use client";

import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";
import JourneyProgress from "@/components/JourneyProgress";
import ContactModal from "@/components/ContactModal";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section className={`py-16 md:py-24 relative overflow-hidden ${className}`}>
      {children}
    </section>
  );
};

export default function AboutPage() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main className="bg-slate-900 selection:bg-secondary selection:text-slate-900">
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <JourneyProgress />

      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="About 7FoldWanders"
            fill
            className="object-cover scale-110 opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900" />
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '48px 48px' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="inline-flex items-center gap-3 py-2 px-5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-10 group hover:border-secondary/30 transition-colors">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span className="text-secondary font-bold text-[10px] md:text-xs tracking-[0.3em] uppercase">
                Legacy Established 2011
              </span>
            </div>
            <h1 className="text-6xl md:text-9xl font-bold text-white mb-10 tracking-tighter leading-[0.9]">
              <TextReveal>The Art of</TextReveal> <br /><span className="text-secondary italic"><TextReveal>Global Discovery</TextReveal></span>
            </h1>
            <p className="text-slate-400 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed tracking-wide">
              7FoldWanders is a professionally managed travel house delivering <span className="text-white font-medium">uncompromising excellence</span> in hospitality and planning.
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3 opacity-40">
          <span className="text-[9px] text-white uppercase tracking-[0.5em] font-bold">Discovery</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="w-[1px] h-16 bg-gradient-to-b from-secondary to-transparent"
          />
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="relative z-20 -mt-24 py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-10 md:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 md:gap-20 text-center">
              {[
                { label: "Years of Legacy", value: "15+", accent: "secondary" },
                { label: "Happy Travelers", value: "10K+", accent: "primary" },
                { label: "Global Destinations", value: "50+", accent: "secondary" },
                { label: "Service Excellence", value: "100%", accent: "primary" }
              ].map((stat, i) => (
                <div key={i} className="space-y-4 group">
                  <div className={`text-4xl md:text-6xl font-black text-white group-hover:text-secondary group-hover:scale-105 transition-all duration-500`}>{stat.value}</div>
                  <div className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story & Legacy */}
      <Section className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <ScrollReveal>
              <div className="space-y-10">
                <div className="inline-flex items-center gap-4">
                  <div className="w-12 h-[1px] bg-secondary" />
                  <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px]">Institutional Roots</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none">
                  Institutional <br />Credibility
                </h2>
                <div className="space-y-8 text-slate-400 text-xl font-light leading-relaxed border-l border-white/5 pl-10">
                  <p>
                    7FoldWanders stands as a testament to professional integrity, powered by the robust foundation of
                    <span className="text-white font-medium"> Sevenfold Infratech Pvt. Ltd.</span>
                  </p>
                  <p>
                    With over a decade of corporate governance and structured systems, we bridge the gap between institutional reliability and boutique personalized travel.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-transparent blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="relative h-[550px] rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl bg-slate-800">
                  <ParallaxImage src="/kyoto.png" alt="Travel Experience" className="h-[650px] opacity-80" speed={20} />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12">
                    <span className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-2 block">Global Standards</span>
                    <p className="text-white text-2xl font-light italic">"Excellence is not an act, but a habit of fifteen years."</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-slate-950 py-40 border-y border-white/5 relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                title: "Our Mission",
                desc: "To deliver seamless, reliable, and value-driven travel experiences through professional planning, transparent pricing, and personalized service.",
                points: ["Corporate Integrity", "Operational Excellence", "Long-Term Relationships"],
                icon: "M13 10V3L4 14h7v7l9-11h-7z",
                accent: "primary"
              },
              {
                title: "Our Vision",
                desc: "To establish 7FoldWanders as a trusted leader in fixed group departures and curated international holidays across India, setting new benchmarks for governance.",
                points: ["Global Leadership", "Premium Experiences", "Ethical Governance"],
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
                accent: "secondary"
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="h-full p-12 md:p-16 rounded-[4rem] bg-slate-900 border border-white/5 relative overflow-hidden group shadow-3xl hover:border-white/10 transition-colors">
                  <div className={`absolute -top-10 -right-10 w-64 h-64 bg-${item.accent}/5 blur-[100px] rounded-full group-hover:bg-${item.accent}/10 transition-all duration-700`} />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className={`w-16 h-16 rounded-3xl bg-${item.accent}/10 flex items-center justify-center border border-${item.accent}/20 mb-12 text-${item.accent}`}>
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                      </svg>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter leading-none">{item.title}</h2>
                    <p className="text-slate-400 text-xl font-light leading-relaxed mb-12 flex-grow">
                      {item.desc}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {item.points.map((point, idx) => (
                        <span key={idx} className="text-[10px] font-bold tracking-[0.2em] uppercase py-2 px-4 rounded-full bg-white/5 border border-white/10 text-white/40">
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section className="bg-slate-900 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
            <ScrollReveal className="max-w-3xl">
              <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Expertise</span>
              <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter leading-none mb-8">Professional <br />Travel Solutions</h2>
              <p className="text-slate-400 text-xl font-light leading-relaxed">
                We provide end-to-end travel management designed for clients who value precision, safety, and a seamless global experience.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <button
                onClick={() => setIsContactOpen(true)}
                className="group relative px-10 py-5 rounded-2xl bg-secondary text-slate-950 font-bold overflow-hidden transition-all hover:pr-14"
              >
                <span className="relative z-10">Request a Proposal</span>
                <svg className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Fixed Group Departures", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "College & Institutional Tours", icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" },
              { title: "Customized Tours", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l5-2 5.553 2.221a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L15 17l-6 3z" },
              { title: "Visa Assistance", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
              { title: "Flight & Hotel Bookings", icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
              { title: "Corporate & MICE", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-10 rounded-[2.5rem] bg-slate-900 border border-white/5 hover:border-secondary/30 transition-all duration-500 group flex items-start gap-8 h-full">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-slate-950 transition-all duration-500 shrink-0">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary transition-colors tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm font-light leading-relaxed">
                      Strategically managed for global excellence and reliability.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Our Tour Segments */}
      <Section className="bg-slate-950 py-40 border-b border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-8 relative z-10">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-24">
              <div className="max-w-3xl">
                <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Global Network</span>
                <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-none">Our Tour Segments</h2>
                <p className="text-slate-400 text-xl font-light leading-relaxed">
                  Curated travel experiences across continents, managed with precision and corporate reliability.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              {
                title: "International Group Departures",
                desc: "We offer professionally planned fixed group departures across the world, featuring curated international tour packages with structured itineraries and seamless travel management. Our international holidays are designed for comfort, cultural immersion, and hassle-free global travel experiences.",
                items: ["Europe", "UK", "Italy", "Spain", "Japan", "South Korea", "Switzerland", "Northern Lights", "Turkey", "Dubai", "Singapore", "Malaysia", "Bali", "Sri Lanka", "Almaty", "Baku", "Bhutan"],
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                accent: "Global"
              },
              {
                title: "Domestic Group Tours",
                desc: "Explore India with our well-organized domestic group tours, covering scenic landscapes, hill stations, spiritual circuits, and adventure destinations. We ensure structured planning, comfortable stays, and professionally managed travel experiences across India.",
                items: ["Kashmir", "Leh–Ladakh", "Shimla–Manali", "Sikkim & Darjeeling", "Kerala", "Uttarakhand", "Dalhousie", "Dharamshala"],
                icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
                accent: "Domestic"
              },
              {
                title: "College & Educational Tours",
                desc: "We specialize in safe, supervised, and academically enriching college and educational tours designed to combine learning with travel. With detailed itineraries, faculty coordination, strict safety compliance, and experienced tour managers, we deliver secure, well-organized, and meaningful student travel experiences.",
                items: ["Industrial Visits", "Educational Study Tours", "Cultural Exchange Programs", "Domestic & International Study Trips", "Graduation Celebration Trips", "Management & Engineering Exposure Tours"],
                icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222",
                accent: "Educational"
              }
            ].map((segment, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex flex-col h-full rounded-[3.5rem] bg-slate-900 border border-white/5 overflow-hidden group hover:border-secondary/20 transition-all duration-500 shadow-3xl">
                  <div className="p-12 flex-grow space-y-10">
                    <div className="flex justify-between items-center">
                      <div className="w-16 h-16 rounded-3xl bg-slate-800 border border-white/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-slate-950 transition-all duration-500">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={segment.icon} />
                        </svg>
                      </div>
                      <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/20">{segment.accent}</span>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white tracking-tight leading-tight mb-4 group-hover:text-secondary transition-colors">
                        {segment.title}
                      </h3>
                      <p className="text-slate-500 text-sm font-light leading-relaxed">
                        {segment.desc}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                      {segment.items.map((item, idx) => (
                        <span key={idx} className="text-[9px] font-bold tracking-widest uppercase py-2 px-3 rounded-xl bg-slate-800 text-slate-400 group-hover:bg-secondary/10 group-hover:text-secondary transition-all">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-transparent via-secondary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section className="bg-slate-900 border-t border-white/5 py-40">
        <div className="max-w-7xl mx-auto px-8">
          <ScrollReveal className="text-center mb-24">
            <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Visionaries</span>
            <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-none">The Leadership</h2>
            <p className="text-slate-400 text-xl font-light max-w-3xl mx-auto leading-relaxed">
              Combining institutional strategy with entrepreneurship to redefine travel management standards.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "SALONI BORADE",
                title: "Chief Executive Officer (CEO)",
                role: "Strategic Growth & Innovation",
                desc: "Saloni leads the company’s business expansion and operational excellence, focusing on building a reliable brand known for quality service and long-term success."
              },
              {
                name: "REKHA SHAJI",
                title: "Managing Director (MD)",
                role: "Operational Governance",
                desc: "Rekha ensures structured operations and service quality, bringing strong administrative leadership to maintain high professional standards across all services."
              },
              {
                name: "SNEHA SHAJI",
                title: "Chairman & Legal Head",
                role: "Compliance & Ethics",
                desc: "Sneha oversees legal compliance and ethical practices, ensuring transparent operations and strong legal frameworks that strengthen credibility."
              }
            ].map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="h-full p-12 rounded-[3.5rem] bg-slate-800/20 backdrop-blur-xl border border-white/10 hover:border-secondary/30 transition-all duration-500 group relative flex flex-col overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-secondary/5 blur-[80px] rounded-full translate-x-20 -translate-y-20 group-hover:bg-secondary/10 transition-colors" />

                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-10 h-[1px] bg-secondary" />
                      <span className="text-secondary/60 text-[10px] font-bold tracking-[0.3em] uppercase">{member.role}</span>
                    </div>
                    <h3 className="text-3xl font-black text-white group-hover:text-secondary transition-colors uppercase tracking-tighter leading-none mb-4">
                      {member.name}
                    </h3>
                    <p className="text-white/40 font-bold text-[10px] tracking-[0.25em] uppercase mb-10 border-b border-white/5 pb-8">
                      {member.title}
                    </p>
                    <p className="text-slate-400 text-base font-light font-sans leading-relaxed flex-grow">
                      {member.desc}
                    </p>
                    <div className="pt-8 flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:text-secondary group-hover:border-secondary transition-all">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Our Commitment Section */}
      <Section className="bg-slate-900 border-t border-white/5 py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-slate-950/50 backdrop-blur-3xl p-12 md:p-24 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-3xl">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div className="space-y-12">
                <div>
                  <span className="text-secondary font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block">Our Commitment</span>
                  <h2 className="text-4xl md:text-7xl font-bold text-white mb-10 tracking-tighter leading-none">Built on <br />Trust & Integrity</h2>
                  <div className="space-y-8 text-slate-400 text-xl font-light leading-relaxed">
                    <p>
                      At 7FoldWanders, we blend the <span className="text-white font-medium">fresh energy of a new-age travel company</span> with the solid backing of a 15-year corporate legacy.
                    </p>
                    <p>
                      Our foundation is built on business credibility, structured systems, and customer-first values, maintaining the highest standards of professionalism.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Trust", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                    { title: "Transparency", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                    { title: "Safety", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                    { title: "Professionalism", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 py-4 px-6 rounded-2xl bg-white/5 border border-white/5 group hover:border-secondary/20 transition-colors">
                      <div className="text-secondary opacity-40 group-hover:opacity-100 transition-opacity">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                        </svg>
                      </div>
                      <span className="text-white font-bold text-xs tracking-widest uppercase">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-12">
                <div className="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 backdrop-blur-xl relative group">
                  <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-secondary/10 blur-[100px] rounded-full" />
                  <p className="text-slate-200 text-2xl md:text-3xl leading-[1.3] mb-12 font-light italic relative z-10">
                    "At 7FoldWanders, we don't just plan trips &ndash; we build <span className="text-secondary font-medium">relationships</span> that travel far beyond destinations."
                  </p>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full bg-secondary text-slate-950 font-bold text-lg px-12 py-7 rounded-3xl hover:bg-white hover:scale-[1.02] transition-all shadow-[0_32px_64px_-16px_rgba(237,204,38,0.25)] flex items-center justify-center gap-4"
                  >
                    <span>Start Your Journey</span>
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col gap-6 opacity-30 group hover:opacity-60 transition-opacity">
                  <span className="text-white text-[10px] font-bold tracking-[0.5em] uppercase px-2">Institutional Partners</span>
                  <div className="flex flex-wrap gap-x-12 gap-y-4 px-2">
                    {["CORPORATES", "INSTITUTIONS", "GOVERNMENT", "ELITE FAMILIES"].map((name, i) => (
                      <span key={i} className="text-white font-black text-lg italic tracking-tighter">{name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
