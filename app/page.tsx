"use client";

import SimplePackageCard from "@/components/SimplePackageCard";
import PreferencesModal from "@/components/PreferencesModal";
import BookingModal from "@/components/BookingModal";
import BudgetCalculator from "@/components/BudgetCalculator";
import JourneyProgress from "@/components/JourneyProgress";
import { usePersonalization } from "@/context/PersonalizationContext";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";
// Section Transition Wrapper

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <section
      className={`min-h-screen relative flex flex-col justify-center py-24 ${className}`}
    >
      {children}
    </section>
  );
};

const Carousel = ({ dests }: { dests: any[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      if (!isPaused && scrollContainer) {
        const firstCard = scrollContainer.firstElementChild as HTMLElement;
        const cardWidth = firstCard ? firstCard.clientWidth : 0;
        const scrollAmount = cardWidth + 32;

        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div
      ref={scrollRef}
      className="flex overflow-x-auto pb-12 gap-6 md:gap-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <AnimatePresence>
        {dests.map((dest, i) => (
          <motion.div
            key={dest.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            layout
            className="min-w-[85vw] md:min-w-[350px] snap-center shrink-0"
          >
            <SimplePackageCard destination={dest} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const { preferences } = usePersonalization();
  const [packages, setPackages] = useState<any[]>([]);
  const [siteContent, setSiteContent] = useState<any>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isBudgetCalcOpen, setIsBudgetCalcOpen] = useState(false);

  // Itinerary Builder State (Restored for BookingModal)
  const [itineraryDestination, setItineraryDestination] = useState("Kerala, India");
  const [itineraryDate, setItineraryDate] = useState("");
  const [itineraryGuests, setItineraryGuests] = useState(2);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setPackages(data);
        }
      })
      .catch(err => console.error(err));

    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setSiteContent(data);
        }
      })
      .catch(err => console.error(err));

    return () => { isMounted = false; };
  }, []);

  // Dynamic Hero Text Map
  const heroTextMap: Record<string, string> = {
    adventure: "Your Adventure",
    relax: "Pure Serenity",
    culture: "Timeless Stories",
    luxury: "Royal Heritage",
  };

  const dynamicTitle = preferences ? heroTextMap[preferences.travelStyle] || siteContent?.hero?.title || "Soul of" : siteContent?.hero?.title || "Soul of";
  const dynamicSubtitle = preferences ? "Awaits You" : siteContent?.hero?.subtitle || "India";

  // Parallax transforms
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const yClouds = useTransform(scrollY, [0, 1000], [0, -200]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main ref={containerRef} className="bg-slate-900 overflow-hidden relative selection:bg-secondary selection:text-slate-900">
      <PreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
      />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        tourName={itineraryDestination}
        initialDate={itineraryDate}
        initialGuests={itineraryGuests}
        basePrice="₹45,000"
      />
      <BudgetCalculator
        isOpen={isBudgetCalcOpen}
        onClose={() => setIsBudgetCalcOpen(false)}
        initialDestination={itineraryDestination}
        initialDuration={5}
      />
      <JourneyProgress />

      {/* 1. HERO: The Departure */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">

        {/* Parallax Background */}
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0 scale-110">
          <Image
            src={siteContent?.hero?.bgImage || (preferences?.travelStyle === "relax" ? "/hero.png" : (preferences?.travelStyle === "culture" ? "/kyoto.png" : (preferences?.travelStyle === "adventure" ? "/swiss-alps.png" : "/hero.png")))}
            alt="Cinematic Travel"
            fill
            className="object-cover opacity-80 transition-opacity duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-slate-900" />
        </motion.div>

        {/* Floating Clouds/Elements (Abstract) */}
        <motion.div style={{ y: yClouds }} className="absolute inset-0 z-[5] pointer-events-none opacity-30">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-white/20 blur-[100px] rounded-full" />
          <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-secondary/20 blur-[120px] rounded-full" />
        </motion.div>

        {/* Content */}
        <motion.div style={{ y: yText }} className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-50px]">
          <ScrollReveal delay={0.2} duration={1}>
            <motion.h2
              className="text-secondary font-bold uppercase text-xs md:text-xl mb-4 md:mb-6 tracking-[0.2em]"
            >
              {preferences ? "Curated Just For You" : "The Journey Begins Here"}
            </motion.h2>

            <motion.h1
              className="text-5xl md:text-9xl font-bold text-white mb-6 md:mb-8 tracking-tight drop-shadow-2xl"
            >
              {dynamicTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-300% animate-gradient">
                {dynamicSubtitle}
              </span>
            </motion.h1>

            <p className="text-white/80 text-base md:text-xl max-w-xl mx-auto mb-8 px-4">
              {preferences
                ? `We've designed a ${preferences.budget} ${preferences.travelStyle} experience for your ${preferences.companions} trip.`
                : "Curated expeditions to the world's most untamed corners."}
            </p>




          </ScrollReveal>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20"
        >
          <span className="text-xs tracking-widest uppercase text-secondary">Start Exploring</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* 2. ABOUT US: Company Info */}
      <div id="about">
        <Section className="bg-slate-950">
          <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <ScrollReveal>
                <div>
                  <span className="text-secondary font-bold tracking-widest uppercase mb-2 block">Who We Are</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                    <TextReveal>{siteContent?.about?.title || "Your Trusted Travel Partner"}</TextReveal>
                  </h2>
                  <div className="prose prose-invert prose-lg text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {siteContent?.about?.description || "At TravelDCT, we believe that travel is more than just visiting a place—it's about the experience, the memories, and the transformation that happens along the way.\n\nWith years of expertise in curating bespoke itineraries, we specialize in both domestic and international holidays that cater to your unique preferences. From serene beach getaways to adrenaline-pumping adventures, we handle every detail so you can focus on making memories."}
                  </div>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                  <ParallaxImage src={siteContent?.about?.image || "/swiss-alps.png"} alt="About Us" className="h-[600px]" speed={50} />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay pointer-events-none" />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Section>
      </div>

      {/* 3. PACKAGES: Simple Showcase */}
      <Section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-secondary font-bold tracking-widest uppercase mb-2 block">Featured Packages</span>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
                <TextReveal>Explore Our Top Picks</TextReveal>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                A glimpse into the amazing destinations waiting for you. Contact us for customized packages.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <Carousel dests={Array.isArray(packages) ? packages.slice(0, 8) : []} />
          </ScrollReveal>
        </div>
      </Section>

      {/* 4. CTA: Contact */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-bold text-white mb-8">
            <TextReveal>Ready to Plan Your Trip?</TextReveal>
          </h2>
          <p className="text-slate-300 text-xl mb-12">
            Get in touch with our travel experts today.
          </p>
          <a
            href={`mailto:${siteContent?.contact?.email || "contact@traveldct.com"}`}
            className="inline-flex items-center gap-3 px-12 py-6 bg-secondary text-slate-900 font-bold rounded-full overflow-hidden text-xl hover:scale-105 transition-transform duration-300 shadow-xl shadow-white/10"
          >
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>
          </a>
        </div>
      </section>

    </main>
  );
}
