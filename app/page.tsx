"use client";

import JourneyProgress from "@/components/JourneyProgress";
import DestinationCard from "@/components/DestinationCard";
import SmartSearch from "@/components/SmartSearch";
import PreferencesModal from "@/components/PreferencesModal";
import BookingModal from "@/components/BookingModal";
import RecommendedTours from "@/components/RecommendedTours";
import PersonalizedDeals from "@/components/PersonalizedDeals";
import TravelAssistant from "@/components/TravelAssistant";
import WeatherRecommendations from "@/components/WeatherRecommendations";
import BudgetCalculator from "@/components/BudgetCalculator";
import CategoryFilter from "@/components/CategoryFilter";
import { usePersonalization } from "@/context/PersonalizationContext";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";
import TextReveal from "@/components/TextReveal";
import ParallaxImage from "@/components/ParallaxImage";
import MagneticButton from "@/components/MagneticButton";

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
        // Get width of first card + gap
        const firstCard = scrollContainer.firstElementChild as HTMLElement;
        const cardWidth = firstCard ? firstCard.clientWidth : 0;
        const gap = 24; // md:gap-8 is 32px, gap-6 is 24px. Let's approx or get computed style.
        // Actually, scrollBy with behavior smooth works well with snap points.

        const scrollAmount = cardWidth + 32; // Approx width + gap

        if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth - 10) {
          // Reset to start instantly or smoothly
          scrollContainer.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000); // Change every 3 seconds

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
            <DestinationCard destination={dest} index={i} />
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
  const [destinations, setDestinations] = useState<any[]>([]);
  const [sortedDestinations, setSortedDestinations] = useState<any[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [isBudgetCalcOpen, setIsBudgetCalcOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Domestic" | "International">("All");

  // Itinerary Builder State
  const [itineraryDestination, setItineraryDestination] = useState("Kerala, India");
  const [itineraryDate, setItineraryDate] = useState("");
  const [itineraryGuests, setItineraryGuests] = useState(2);

  useEffect(() => {
    let isMounted = true;
    // Fetch destinations from API
    fetch('/api/destinations')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setDestinations(data);
          setSortedDestinations(data);
        }
      })
      .catch(err => console.error(err));

    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    if (destinations.length > 0) {
      const sorted = [...destinations].sort((a, b) => {
        // Prioritize destinations that match the selected travel style
        const matchStyle = preferences ? preferences.travelStyle : "";
        const aMatch = a.tags ? a.tags.includes(matchStyle) : false;
        const bMatch = b.tags ? b.tags.includes(matchStyle) : false;
        return (bMatch ? 1 : 0) - (aMatch ? 1 : 0);
      });
      setSortedDestinations(sorted);
    }
  }, [preferences, destinations]);

  // Dynamic Hero Text Map
  const heroTextMap: Record<string, string> = {
    adventure: "Your Adventure",
    relax: "Pure Serenity",
    culture: "Timeless Stories",
    luxury: "Royal Heritage",
  };

  const dynamicTitle = preferences ? heroTextMap[preferences.travelStyle] || "Soul of" : "Soul of";
  const dynamicSubtitle = preferences ? "Awaits You" : "India";

  // Parallax transforms
  const yHero = useTransform(scrollY, [0, 1000], [0, 400]);
  const yClouds = useTransform(scrollY, [0, 1000], [0, -200]);
  const yText = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <main ref={containerRef} className="bg-slate-900 overflow-hidden relative selection:bg-primary selection:text-white">
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
      <TravelAssistant />
      <JourneyProgress />

      {/* 1. HERO: The Departure */}
      <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">

        {/* Parallax Background */}
        <motion.div style={{ y: yHero }} className="absolute inset-0 z-0 scale-110">
          <Image
            src={preferences?.travelStyle === "relax" ? "/hero.png" : (preferences?.travelStyle === "culture" ? "/kyoto.png" : (preferences?.travelStyle === "adventure" ? "/swiss-alps.png" : "/hero.png"))}
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
          <div className="absolute top-[40%] right-[10%] w-96 h-96 bg-primary/20 blur-[120px] rounded-full" />
        </motion.div>

        {/* Content */}
        <motion.div style={{ y: yText }} className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-50px]">
          <ScrollReveal delay={0.2} duration={1}>
            <motion.h2
              className="text-primary font-bold uppercase text-xs md:text-xl mb-4 md:mb-6 tracking-[0.2em]"
            >
              {preferences ? "Curated Just For You" : "The Journey Begins Here"}
            </motion.h2>

            <motion.h1
              className="text-5xl md:text-9xl font-bold text-white mb-6 md:mb-8 tracking-tight drop-shadow-2xl"
            >
              {dynamicTitle} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-teal-400 to-sky-400 bg-300% animate-gradient">
                {dynamicSubtitle}
              </span>
            </motion.h1>

            <p className="text-white/80 text-base md:text-xl max-w-xl mx-auto mb-8 px-4">
              {preferences
                ? `We've designed a ${preferences.budget} ${preferences.travelStyle} experience for your ${preferences.companions} trip.`
                : "Curated expeditions to the world's most untamed corners."}
            </p>

            <div className="mb-12 w-full px-4 transform hover:scale-[1.02] transition-transform duration-500">
              <SmartSearch />
            </div>
          </ScrollReveal>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20"
        >
          <span className="text-xs tracking-widest uppercase">Start Exploring</span>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
        </motion.div>
      </section>

      {/* Personalized Deals Banner */}
      <PersonalizedDeals />

      {/* 2. DESTINATIONS: The First Stop */}
      <Section className="z-10 bg-slate-900">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-8">
              <div>
                <span className="text-primary font-bold tracking-widest uppercase mb-2 block">01. Destinations</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white">
                  <TextReveal>Choose Your Adventure</TextReveal>
                </h2>
              </div>
              <p className="text-slate-400 max-w-sm text-lg">
                {preferences ? `Handpicked ${preferences.travelStyle} destinations for you.` : "From the icy peaks of the Alps to the tropical tranquility of the Maldives."}
              </p>
            </div>
          </ScrollReveal>

          {/* Category Filter */}
          <ScrollReveal delay={0.2}>
            <div className="mb-12">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                domesticCount={destinations.filter(d => d.category === "Domestic").length}
                internationalCount={destinations.filter(d => d.category === "International").length}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <Carousel dests={sortedDestinations.filter(dest => selectedCategory === "All" || dest.category === selectedCategory).slice(0, 6)} />
          </ScrollReveal>
        </div>
      </Section>


      {/* Recommended for User */}
      <RecommendedTours />

      {/* Weather-Based Recommendations */}
      <WeatherRecommendations />

      {/* 3. EXPERIENCES: The Journey */}
      <Section className="bg-slate-950">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/kyoto.png" alt="Texture" fill className="object-cover grayscale" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="text-primary font-bold tracking-widest uppercase mb-2 block">02. Experiences</span>
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">
                  <TextReveal>Not Just a Trip, A Transformation.</TextReveal>
                </h2>
                <div className="space-y-8">
                  <motion.div whileHover={{ x: 10 }} className="flex gap-6">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">🏔️</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Private Expeditions</h3>
                      <p className="text-slate-400">Access restricted areas and hidden gems with our expert local guides.</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 10 }} className="flex gap-6">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">🥂</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Luxury & Comfort</h3>
                      <p className="text-slate-400">Handpicked 5-star accommodations and first-class travel logistics.</p>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ x: 10 }} className="flex gap-6">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl shrink-0">🧘</div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Holistic Wellness</h3>
                      <p className="text-slate-400">Rejuvenate with exclusive spa treatments, yoga, and mindfulness sessions.</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="relative h-[600px] w-full rounded-[2rem] overflow-hidden border border-white/10">
                <ParallaxImage src="/swiss-alps.png" alt="Experience" className="h-[600px]" speed={50} />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay pointer-events-none" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </Section>

      {/* 4. PACKAGES / MAP: The Plan */}
      <Section className="bg-slate-900">
        <div className="max-w-7xl mx-auto px-8 text-center w-full">
          <span className="text-primary font-bold tracking-widest uppercase mb-4 block">03. Packages</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-16">
            <TextReveal>Curate Your Perfect Itinerary</TextReveal>
          </h2>

          {/* Package Builder Interface Mockup */}
          <div className="bg-slate-800/50 border border-white/10 rounded-3xl p-8 backdrop-blur-xl max-w-4xl mx-auto relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {/* Destination Input */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left hover:bg-white/10 transition-colors">
                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Destination</label>
                <select
                  value={itineraryDestination}
                  onChange={(e) => setItineraryDestination(e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-lg focus:outline-none border-none p-0 cursor-pointer [&>option]:bg-slate-800"
                >
                  <option value="Kerala, India">Kerala, India</option>
                  {destinations.map(d => (
                    <option key={d.id} value={d.name}>{d.name}</option>
                  ))}
                  <option value="Goa, India">Goa, India</option>
                  <option value="Jaipur, Rajasthan">Jaipur, Rajasthan</option>
                  <option value="Ladakh, India">Ladakh, India</option>
                </select>
              </div>

              {/* Date Input */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left hover:bg-white/10 transition-colors relative">
                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Start Date</label>
                <input
                  type="date"
                  value={itineraryDate}
                  onChange={(e) => setItineraryDate(e.target.value)}
                  className="w-full bg-transparent text-white font-bold text-lg focus:outline-none border-none p-0 [color-scheme:dark]"
                />
              </div>

              {/* Travelers Input */}
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-left hover:bg-white/10 transition-colors">
                <label className="text-xs text-slate-500 uppercase tracking-wider block mb-1">Travelers</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setItineraryGuests(Math.max(1, itineraryGuests - 1))}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"
                  >-</button>
                  <span className="font-bold text-white text-lg">{itineraryGuests} Adults</span>
                  <button
                    onClick={() => setItineraryGuests(itineraryGuests + 1)}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 text-white"
                  >+</button>
                </div>
              </div>
            </div>

            <div className="relative h-96 bg-slate-900 rounded-2xl border border-white/10 overflow-hidden mb-8 z-0">
              <Image
                src="/hero.png"
                alt="Destination Map"
                fill
                className="object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="bg-black/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-white text-sm font-bold flex items-center gap-2">
                  <span className="text-primary">📍</span> Visualizing Itinerary
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setIsBudgetCalcOpen(true)}
                className="btn btn-outline py-4 text-lg font-bold flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
                Budget Calculator
              </button>
              <button
                onClick={() => setIsBookingOpen(true)}
                className="btn btn-primary py-4 text-lg font-bold shadow-lg shadow-primary/25"
              >
                Start Building My Trip
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. TESTIMONIALS: The Stories */}
      <Section className="bg-slate-950">
        <div className="max-w-7xl mx-auto px-8 w-full">
          <span className="text-primary font-bold tracking-widest uppercase mb-4 block">04. Stories</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Travelers&apos; Diaries</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-all hover:-translate-y-2">
                <div className="flex gap-1 text-amber-400 mb-6 text-sm">★★★★★</div>
                <p className="text-slate-300 italic mb-8 leading-relaxed">
                  &quot;I&apos;ve never experienced travel like this. It wasn&apos;t just a vacation; it was a carefully crafted narrative that unfolded every day.&quot;
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden relative">
                    <Image src="/hero.png" alt="User" fill className="object-cover" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Alex Morgan</div>
                    <div className="text-slate-500 text-xs">Verified Traveler</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 6. CTA: The Arrival */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <Image src="/santorini.png" alt="CTA" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />

        <div className="relative z-10 text-center px-4">
          <h2 className="text-5xl md:text-8xl font-bold text-white mb-8 tracking-tighter">
            <TextReveal>Your Story Awaits</TextReveal>
          </h2>
          <div className="flex justify-center">
            <MagneticButton
              onClick={() => setIsBookingOpen(true)}
              className="group relative px-12 py-6 bg-white text-slate-900 font-bold rounded-full overflow-hidden text-xl hover:scale-105 transition-transform duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                Book Your Journey
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-sky-300 to-teal-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>
          </div>
        </div>
      </section>

    </main>
  );
}
