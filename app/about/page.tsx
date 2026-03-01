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
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png" // Using existing hero image for consistency
            alt="About 7FoldWanders"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 text-center px-4">
          <ScrollReveal>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6">
              <TextReveal>About 7FoldWanders</TextReveal>
            </h1>
            <p className="text-secondary font-bold tracking-[0.3em] uppercase text-sm md:text-lg">
              Travel Smart. Travel Easy. Travel Happy.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content */}
      <Section className="bg-slate-900">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
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

      {/* Mission Section */}
      <Section className="bg-slate-950">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Offer</h2>
              <p className="text-slate-400 text-xl max-w-3xl mx-auto">
                At 7FoldWanders, we believe travel should be easy, memorable, and stress-free.
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Personalized Planning", desc: "Customized holidays and group tours designed for you." },
              { title: "Domestic & International", desc: "Global reach with local expertise in every destination." },
              { title: "Corporate Services", desc: "Seamless travel management for your business needs." },
              { title: "Honeymoon Packages", desc: "Romantic gateways with unforgettable memories." },
              { title: "Visa Assistance", desc: "Hassle-free documentation and support for your travels." },
              { title: "Transparent Pricing", desc: "No hidden costs, just honest and competitive rates." }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-secondary/40 transition-colors group">
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-secondary mb-3 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400">
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
                    <div className="w-16 h-1 w-secondary bg-secondary mb-8 rounded-full" />
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-secondary transition-colors uppercase tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-secondary/80 font-semibold text-sm mb-6 tracking-widest uppercase">
                      {member.title}
                    </p>
                    <div className="w-full h-[1px] bg-white/10 mb-6" />
                    <p className="text-slate-300 leading-relaxed text-base">
                      {member.desc}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Focus Points */}
      <Section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 md:p-20 rounded-2xl md:rounded-[3rem] border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Our Focus is Simple</h2>
                <ul className="space-y-6">
                  {[
                    "Personalized travel planning",
                    "Transparent pricing",
                    "Comfortable and safe experiences",
                    "Dedicated customer support"
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4 text-xl text-slate-200"
                    >
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <svg className="w-5 h-5 text-slate-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="text-center lg:text-left">
                <p className="text-slate-300 text-xl leading-relaxed mb-8">
                  Whether you’re planning a family vacation, a romantic honeymoon, a group trip, or a corporate tour,
                  7FoldWanders ensures smooth planning and unforgettable memories.
                </p>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="btn btn-secondary text-lg px-10 py-5"
                >
                  Plan Your Trip Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </main>
  );
}
