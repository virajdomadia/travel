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
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="About 7FoldWanders"
            fill
            className="object-cover scale-105"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-transparent to-slate-900" />
          {/* Subtle Grid Overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        </div>

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <ScrollReveal>
            <span className="inline-block py-1 px-4 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-bold text-xs md:text-sm tracking-[0.2em] uppercase mb-8">
              Explore Our Journey
            </span>
            <h1 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tight">
              <TextReveal>Crafting Unforgettable Memories</TextReveal>
            </h1>
            <p className="text-slate-300 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
              7FoldWanders – A Legacy of Excellence in Corporate Travel & Personalized Holidays.
            </p>
          </ScrollReveal>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-50">
          <span className="text-[10px] text-white uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="relative z-20 -mt-16 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-800/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
              {[
                { label: "Years of Legacy", value: "15+" },
                { label: "Happy Travelers", value: "10K+" },
                { label: "Global Destinations", value: "50+" },
                { label: "Service Excellence", value: "100%" }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="text-3xl md:text-5xl font-bold text-secondary">{stat.value}</div>
                  <div className="text-slate-400 text-xs md:text-sm font-semibold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story & Legacy */}
      <Section className="bg-slate-900 pb-12">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="text-secondary font-bold tracking-widest uppercase mb-4 block">Our Heritage</span>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
                  Our Story & Legacy
                </h2>
                <div className="space-y-6 text-slate-300 text-lg leading-relaxed">
                  <p>
                    7FoldWanders is a professionally managed travel company powered by the strong foundation of
                    <span className="text-secondary font-semibold"> Sevenfold Infratech Pvt. Ltd.</span>,
                    a company with 15 years of trusted corporate experience.
                  </p>
                  <p>
                    With years of business credibility, structured operations, and financial stability,
                    we bring reliability and professionalism to every journey we plan.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <ParallaxImage src="/kyoto.png" alt="Travel Experience" className="h-[500px]" speed={30} />
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section className="bg-slate-950 py-32 border-y border-white/5 relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none" />
        <div className="max-w-6xl mx-auto px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <ScrollReveal>
              <div className="h-full p-12 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 relative overflow-hidden group shadow-2xl">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/10 blur-[90px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
                <div className="mb-10 text-primary">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Our Mission</h2>
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  <p>
                    At 7FoldWanders, our mission is to deliver <span className="text-white font-semibold">seamless, reliable, and value-driven travel experiences</span> through professional planning, transparent pricing, and personalized service.
                  </p>
                  <p>
                    We are committed to providing <span className="text-secondary/80 font-medium italic underline decoration-secondary/30 underline-offset-4">high-quality global solutions</span> while upholding the corporate integrity and operational excellence of our 15-year foundation.
                  </p>
                  <p>
                    Our goal is to build a trusted travel brand in India that combines customer satisfaction, ethical business practices, and long-term relationships.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="h-full p-12 rounded-[3rem] bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 relative overflow-hidden group shadow-2xl">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-secondary/10 blur-[90px] rounded-full group-hover:bg-secondary/20 transition-all duration-700" />
                <div className="mb-10 text-secondary">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center border border-secondary/20">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-white mb-8 tracking-tight">Our Vision</h2>
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  <p>
                    To establish 7FoldWanders as a <span className="text-white font-semibold">trusted leader in fixed group departures and curated international holidays</span> across India, delivering excellence and integrity.
                  </p>
                  <p>
                    We aim to be the preferred choice for professionally managed group tours and premium holiday planning, setting new benchmarks in the travel and tourism industry with <span className="text-primary font-medium italic underline decoration-primary/30 underline-offset-4">strong corporate governance.</span>
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section className="bg-slate-900">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="text-secondary font-bold tracking-widest uppercase mb-4 block">Expert Solutions</span>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Services</h2>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                Comprehensive travel management tailored to your needs.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Fixed Group Departures",
                desc: "Pre-planned, structured tours with guaranteed departures.",
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
              {
                title: "College & Institutional Tours",
                desc: "Complete end-to-end coordination including transport, accommodation, permissions, safety planning, and faculty assistance.",
                icon: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              },
              {
                title: "Customized Tours",
                desc: "Tailor-made travel experiences for families, couples, and corporate groups.",
                icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7l5-2 5.553 2.221a1 1 0 01.447.894v10.764a1 1 0 01-1.447.894L15 17l-6 3z"
              },
              {
                title: "Visa Assistance",
                desc: "Full documentation support with compliance tracking.",
                icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              },
              {
                title: "Flight & Hotel Bookings",
                desc: "Competitive pricing with reliable supplier network.",
                icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              },
              {
                title: "Corporate & MICE Travel",
                desc: "Incentive trips, conferences, and business travel management.",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-10 rounded-[2rem] bg-slate-800/20 border border-white/5 hover:border-secondary/30 transition-all duration-500 group relative">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-secondary mb-8 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-secondary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Leadership Team */}
      <Section className="bg-slate-900 border-t border-white/5">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-20">
            <ScrollReveal>
              <span className="text-secondary font-bold tracking-widest uppercase mb-4 block">Our Visionaries</span>
              <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">Leadership Team</h2>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                Together, our leadership team combines strategy, structure, and integrity to deliver professional travel solutions.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "SALONI BORADE",
                title: "Chief Executive Officer (CEO)",
                desc: "Saloni Borade is the driving force behind 7FoldWanders. With a clear vision for growth and innovation, she leads the company’s business expansion, strategic planning, and operational excellence. Her leadership focuses on building a reliable travel brand known for customer satisfaction, quality service, and long-term success in the Indian travel industry."
              },
              {
                name: "REKHA SHAJI",
                title: "Managing Director (MD)",
                desc: "Rekha Shaji brings strong administrative leadership and strategic direction to the organization. She ensures structured operations, service quality, team management, and sustainable growth. Her expertise supports smooth execution of domestic and international travel services while maintaining high professional standards."
              },
              {
                name: "SNEHA SHAJI",
                title: "Chairman & Head – Legal Department",
                desc: "Sneha Shaji oversees corporate governance, legal compliance, risk management, and ethical business practices. She ensures transparent operations, secure partnerships, and strong legal frameworks across all travel and tourism activities, strengthening the company’s credibility and trust."
              }
            ].map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.2}>
                <div className="h-full p-6 md:p-10 rounded-3xl md:rounded-[2.5rem] bg-slate-800/40 backdrop-blur-xl border border-white/10 hover:border-secondary/30 transition-all duration-500 group relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 blur-3xl rounded-full translate-x-16 -translate-y-16 group-hover:bg-secondary/10 transition-colors" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-1 bg-secondary rounded-full" />
                      <span className="text-secondary/60 text-xs font-bold tracking-[0.3em] uppercase">Executive</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2 group-hover:text-secondary transition-colors uppercase tracking-tight leading-none">
                      {member.name}
                    </h3>
                    <p className="text-secondary/80 font-bold text-[10px] md:text-xs mb-8 tracking-[0.25em] uppercase px-0">
                      {member.title}
                    </p>
                    <div className="w-full h-[1px] bg-white/5 mb-8" />
                    <p className="text-slate-300 leading-relaxed text-base font-light">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Our Commitment Section */}
      <Section className="bg-slate-900 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-8 md:p-20 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 relative overflow-hidden backdrop-blur-sm shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Our Commitment</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">Built on Trust & Integrity</h2>
                <div className="space-y-6 text-slate-300 text-lg md:text-xl font-light leading-relaxed mb-10">
                  <p>
                    At 7FoldWanders, we blend the <span className="text-white font-medium">fresh energy of a new-age travel company</span> with the solid backing of a 15-year corporate legacy.
                  </p>
                  <p>
                    Our foundation is built on business credibility, structured systems, and customer-first values, maintaining the highest standards of professionalism in every tour.
                  </p>
                </div>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { title: "Trust", desc: "Honest communication & dependable service.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                    { title: "Transparency", desc: "Clear pricing & ethical practices.", icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
                    { title: "Safety", desc: "Secure travel with trusted partners.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                    { title: "Professionalism", desc: "Organized & seamless execution.", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                    { title: "Relationships", desc: "Lasting connections with travelers.", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" }
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-secondary/20 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary shrink-0 group-hover:bg-secondary group-hover:text-slate-900 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">{item.desc}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="text-center lg:text-left space-y-12">
                <div className="bg-white/5 p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary/10 blur-3xl rounded-full" />
                  <p className="text-slate-300 text-xl md:text-2xl leading-relaxed mb-10 font-light italic relative z-10">
                    "At 7FoldWanders, <span className="text-white font-medium">we don’t just plan trips</span> – we build relationships that travel far beyond destinations."
                  </p>
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="w-full bg-secondary text-slate-900 font-bold text-lg px-12 py-6 rounded-2xl hover:bg-white transition-all transform hover:-translate-y-1 shadow-[0_20px_50px_rgba(237,204,38,0.2)]"
                  >
                    Plan Your Journey Now
                  </button>
                </div>

                <div className="flex flex-wrap justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                  <span className="text-white font-bold tracking-widest text-sm border-r border-white/20 pr-8">TRUSTED BY</span>
                  <div className="flex gap-12">
                    <span className="text-white font-black text-xl italic tracking-tighter">CORPORATES</span>
                    <span className="text-white font-black text-xl italic tracking-tighter">EDUCATIONAL</span>
                    <span className="text-white font-black text-xl italic tracking-tighter">FAMILIES</span>
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
