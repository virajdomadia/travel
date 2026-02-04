"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface WeatherDestination {
    id: string;
    name: string;
    image: string;
    temperature: string;
    condition: string;
    season: string;
    bestFor: string[];
    price: string;
    description: string;
    category: "Domestic" | "International";
    bestMonths: number[]; // Month indices (0-11)
}

const WeatherCarousel = ({ dests }: { dests: WeatherDestination[] }) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const interval = setInterval(() => {
            if (!isPaused && scrollContainer) {
                const firstCard = scrollContainer.firstElementChild as HTMLElement;
                const cardWidth = firstCard ? firstCard.clientWidth : 0;
                const gap = 24;
                const scrollAmount = cardWidth + gap;

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
            className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
        >
            <AnimatePresence>
                {dests.map((destination, index) => (
                    <motion.div
                        key={destination.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="min-w-[85vw] md:min-w-[45vw] lg:min-w-[300px] snap-center shrink-0 group"
                    >
                        <Link href={`/tours/${destination.id}`}>
                            <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 h-full flex flex-col">
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden shrink-0">
                                    <Image
                                        src={destination.image}
                                        alt={destination.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />

                                    {/* Weather Badge */}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
                                        <span className="text-2xl">☀️</span>
                                        <span className="text-sm font-bold text-slate-900">{destination.temperature}</span>
                                    </div>

                                    {/* Category Badge */}
                                    <div className={`absolute top-3 left-3 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 ${destination.category === "Domestic"
                                        ? "bg-green-500/90"
                                        : "bg-blue-500/90"
                                        }`}>
                                        <span className="text-sm">{destination.category === "Domestic" ? "🇮🇳" : "🌍"}</span>
                                        <span className="text-white text-xs font-bold">{destination.category}</span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-white mb-2">{destination.name}</h3>
                                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">{destination.description}</p>

                                    {/* Weather Info */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-secondary">🌡️</span>
                                            <span className="text-slate-300">{destination.condition}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-secondary">📅</span>
                                            <span className="text-slate-300">{destination.season}</span>
                                        </div>
                                    </div>

                                    {/* Best For Tags (Limit to 2-3) */}
                                    <div className="flex flex-wrap gap-2 mb-auto">
                                        {destination.bestFor.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full whitespace-nowrap"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price */}
                                    <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
                                        <div>
                                            <span className="text-slate-500 text-xs">Starting from</span>
                                            <p className="text-secondary font-bold text-lg">{destination.price}</p>
                                        </div>
                                        <div className="text-secondary group-hover:translate-x-1 transition-transform">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

const weatherData: WeatherDestination[] = [
    // WINTER DESTINATIONS (Oct-Mar)
    {
        id: "kerala-backwaters",
        name: "Kerala, India",
        image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944",
        temperature: "25-32°C",
        condition: "Pleasant & Humid",
        season: "Winter (Oct-Mar)",
        bestFor: ["Backwaters", "Beaches", "Ayurveda"],
        price: "₹35,000",
        description: "Perfect weather for houseboat cruises and beach relaxation",
        category: "Domestic",
        bestMonths: [9, 10, 11, 0, 1, 2] // Oct-Mar
    },
    {
        id: "goa-beaches",
        name: "Goa, India",
        image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2",
        temperature: "22-30°C",
        condition: "Sunny & Breezy",
        season: "Winter (Nov-Feb)",
        bestFor: ["Beaches", "Nightlife", "Water Sports"],
        price: "₹28,000",
        description: "Perfect beach weather with minimal rainfall",
        category: "Domestic",
        bestMonths: [10, 11, 0, 1] // Nov-Feb
    },
    {
        id: "rajasthan-royals",
        name: "Rajasthan, India",
        image: "https://images.unsplash.com/photo-1477587458883-47145ed94245",
        temperature: "10-25°C",
        condition: "Cool & Dry",
        season: "Winter (Oct-Mar)",
        bestFor: ["Heritage", "Culture", "Desert"],
        price: "₹55,000",
        description: "Ideal weather to explore palaces and forts",
        category: "Domestic",
        bestMonths: [9, 10, 11, 0, 1, 2] // Oct-Mar
    },
    {
        id: "dubai-modern",
        name: "Dubai, UAE",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c",
        temperature: "20-30°C",
        condition: "Warm & Pleasant",
        season: "Winter (Nov-Mar)",
        bestFor: ["Luxury", "Shopping", "Desert Safari"],
        price: "₹80,000",
        description: "Comfortable weather for outdoor activities and desert adventures",
        category: "International",
        bestMonths: [10, 11, 0, 1, 2] // Nov-Mar
    },
    {
        id: "maldives-luxury",
        name: "Maldives",
        image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8",
        temperature: "26-30°C",
        condition: "Tropical & Dry",
        season: "Winter (Nov-Apr)",
        bestFor: ["Beaches", "Diving", "Luxury"],
        price: "₹1,50,000",
        description: "Dry season with crystal-clear waters and perfect diving conditions",
        category: "International",
        bestMonths: [10, 11, 0, 1, 2, 3] // Nov-Apr
    },
    {
        id: "egypt-pyramids",
        name: "Egypt",
        image: "https://images.unsplash.com/photo-1572252009286-268acec5ca0a",
        temperature: "15-25°C",
        condition: "Mild & Dry",
        season: "Winter (Oct-Apr)",
        bestFor: ["History", "Culture", "Nile Cruise"],
        price: "₹95,000",
        description: "Pleasant weather for exploring ancient wonders",
        category: "International",
        bestMonths: [9, 10, 11, 0, 1, 2, 3] // Oct-Apr
    },

    // SPRING DESTINATIONS (Mar-May)
    {
        id: "manali-mountains",
        name: "Manali, India",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
        temperature: "10-20°C",
        condition: "Cool & Pleasant",
        season: "Spring (Mar-Jun)",
        bestFor: ["Mountains", "Adventure", "Honeymoon"],
        price: "₹32,000",
        description: "Spring blooms and pleasant weather for outdoor activities",
        category: "Domestic",
        bestMonths: [2, 3, 4, 5] // Mar-Jun
    },
    {
        id: "kashmir-paradise",
        name: "Kashmir, India",
        image: "https://images.unsplash.com/photo-1548013146-72479768bada",
        temperature: "15-25°C",
        condition: "Pleasant & Blooming",
        season: "Spring (Apr-Jun)",
        bestFor: ["Gardens", "Lakes", "Valleys"],
        price: "₹42,000",
        description: "Tulip gardens in full bloom with perfect weather",
        category: "Domestic",
        bestMonths: [3, 4, 5] // Apr-Jun
    },
    {
        id: "kyoto-culture",
        name: "Kyoto, Japan",
        image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
        temperature: "15-25°C",
        condition: "Mild & Beautiful",
        season: "Spring (Mar-May)",
        bestFor: ["Cherry Blossoms", "Temples", "Culture"],
        price: "₹1,20,000",
        description: "Cherry blossom season with stunning pink landscapes",
        category: "International",
        bestMonths: [2, 3, 4] // Mar-May
    },
    {
        id: "amsterdam-canals",
        name: "Amsterdam, Netherlands",
        image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017",
        temperature: "10-18°C",
        condition: "Cool & Fresh",
        season: "Spring (Apr-May)",
        bestFor: ["Tulips", "Canals", "Museums"],
        price: "₹92,000",
        description: "Tulip season with colorful flower fields",
        category: "International",
        bestMonths: [3, 4] // Apr-May
    },
    {
        id: "paris-romance",
        name: "Paris, France",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
        temperature: "12-20°C",
        condition: "Pleasant & Romantic",
        season: "Spring (Apr-Jun)",
        bestFor: ["Romance", "Culture", "Cafes"],
        price: "₹1,10,000",
        description: "Perfect spring weather for strolling along the Seine",
        category: "International",
        bestMonths: [3, 4, 5] // Apr-Jun
    },

    // SUMMER DESTINATIONS (Jun-Aug)
    {
        id: "ladakh-adventure",
        name: "Ladakh, India",
        image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2",
        temperature: "15-25°C",
        condition: "Cool & Dry",
        season: "Summer (May-Sep)",
        bestFor: ["Trekking", "Monasteries", "Adventure"],
        price: "₹45,000",
        description: "Roads open with clear skies and mountain views",
        category: "Domestic",
        bestMonths: [4, 5, 6, 7, 8] // May-Sep
    },
    {
        id: "shimla-heritage",
        name: "Shimla, India",
        image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7",
        temperature: "15-25°C",
        condition: "Pleasant & Cool",
        season: "Summer (Apr-Jun)",
        bestFor: ["Hill Station", "Colonial", "Escape Heat"],
        price: "₹28,000",
        description: "Cool mountain retreat from summer heat",
        category: "Domestic",
        bestMonths: [3, 4, 5] // Apr-Jun
    },
    {
        id: "iceland-northern-lights",
        name: "Iceland",
        image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
        temperature: "10-15°C",
        condition: "Cool & Bright",
        season: "Summer (Jun-Aug)",
        bestFor: ["Midnight Sun", "Glaciers", "Waterfalls"],
        price: "₹1,40,000",
        description: "Midnight sun with 24-hour daylight and lush landscapes",
        category: "International",
        bestMonths: [5, 6, 7] // Jun-Aug
    },
    {
        id: "norway-fjords",
        name: "Norway",
        image: "https://images.unsplash.com/photo-1601439678777-b2b3c56fa627",
        temperature: "12-20°C",
        condition: "Pleasant & Scenic",
        season: "Summer (Jun-Aug)",
        bestFor: ["Fjords", "Hiking", "Midnight Sun"],
        price: "₹1,30,000",
        description: "Best time to explore stunning fjords and hiking trails",
        category: "International",
        bestMonths: [5, 6, 7] // Jun-Aug
    },
    {
        id: "swiss-alps",
        name: "Swiss Alps",
        image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99",
        temperature: "15-25°C",
        condition: "Pleasant & Clear",
        season: "Summer (Jun-Sep)",
        bestFor: ["Mountains", "Hiking", "Lakes"],
        price: "₹85,000",
        description: "Perfect weather for mountain activities and scenic train rides",
        category: "International",
        bestMonths: [5, 6, 7, 8] // Jun-Sep
    },

    // MONSOON/AUTUMN DESTINATIONS (Jul-Sep)
    {
        id: "meghalaya-waterfalls",
        name: "Meghalaya, India",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23",
        temperature: "20-25°C",
        condition: "Rainy & Lush",
        season: "Monsoon (Jun-Sep)",
        bestFor: ["Waterfalls", "Living Bridges", "Greenery"],
        price: "₹34,000",
        description: "Wettest place on Earth with spectacular waterfalls",
        category: "Domestic",
        bestMonths: [5, 6, 7, 8] // Jun-Sep
    },
    {
        id: "coorg-coffee",
        name: "Coorg, India",
        image: "https://images.unsplash.com/photo-1587241321921-91a834d82ffc",
        temperature: "15-25°C",
        condition: "Cool & Misty",
        season: "Monsoon (Jul-Sep)",
        bestFor: ["Coffee", "Waterfalls", "Nature"],
        price: "₹26,000",
        description: "Lush green landscapes and coffee plantations in full glory",
        category: "Domestic",
        bestMonths: [6, 7, 8] // Jul-Sep
    },
    {
        id: "bali-paradise",
        name: "Bali, Indonesia",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4",
        temperature: "26-30°C",
        condition: "Warm & Dry",
        season: "Dry Season (Apr-Oct)",
        bestFor: ["Beaches", "Temples", "Culture"],
        price: "₹65,000",
        description: "Dry season perfect for beach activities and temple visits",
        category: "International",
        bestMonths: [3, 4, 5, 6, 7, 8, 9] // Apr-Oct
    },
    {
        id: "santorini-sunset",
        name: "Santorini, Greece",
        image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff",
        temperature: "25-30°C",
        condition: "Warm & Sunny",
        season: "Summer (Jun-Sep)",
        bestFor: ["Sunsets", "Beaches", "Romance"],
        price: "₹95,000",
        description: "Perfect weather for island hopping and sunset views",
        category: "International",
        bestMonths: [5, 6, 7, 8] // Jun-Sep
    },
    {
        id: "barcelona-culture",
        name: "Barcelona, Spain",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efded",
        temperature: "22-28°C",
        condition: "Warm & Pleasant",
        season: "Summer (Jun-Sep)",
        bestFor: ["Architecture", "Beaches", "Culture"],
        price: "₹98,000",
        description: "Beach weather combined with cultural exploration",
        category: "International",
        bestMonths: [5, 6, 7, 8] // Jun-Sep
    },

    // YEAR-ROUND DESTINATIONS
    {
        id: "andaman-islands",
        name: "Andaman, India",
        image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
        temperature: "24-30°C",
        condition: "Tropical & Pleasant",
        season: "Oct-May (Best)",
        bestFor: ["Diving", "Beaches", "Islands"],
        price: "₹58,000",
        description: "Tropical paradise with clear waters year-round",
        category: "Domestic",
        bestMonths: [9, 10, 11, 0, 1, 2, 3, 4] // Oct-May
    },
    {
        id: "thailand-adventure",
        name: "Thailand",
        image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a",
        temperature: "25-32°C",
        condition: "Tropical & Warm",
        season: "Nov-Feb (Best)",
        bestFor: ["Beaches", "Temples", "Food"],
        price: "₹60,000",
        description: "Cool season perfect for exploring temples and beaches",
        category: "International",
        bestMonths: [10, 11, 0, 1] // Nov-Feb
    },
    {
        id: "singapore-modern",
        name: "Singapore",
        image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd",
        temperature: "26-32°C",
        condition: "Tropical Year-Round",
        season: "Feb-Apr (Best)",
        bestFor: ["Shopping", "Food", "Modern"],
        price: "₹70,000",
        description: "Year-round destination with less rain in spring",
        category: "International",
        bestMonths: [1, 2, 3] // Feb-Apr
    }
];

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

export default function WeatherRecommendations() {
    const [selectedMonth, setSelectedMonth] = useState<string>("");
    const [filteredDestinations, setFilteredDestinations] = useState<WeatherDestination[]>(weatherData);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        // Set current month as default
        const currentMonth = months[new Date().getMonth()];
        setSelectedMonth(currentMonth);
    }, []);

    useEffect(() => {
        // Filter destinations based on selected month
        if (!selectedMonth) return;

        const monthIndex = months.indexOf(selectedMonth);

        // Filter destinations where the selected month is in their bestMonths array
        const filtered = weatherData.filter(d => d.bestMonths.includes(monthIndex));

        // Shuffle and limit to 8 destinations for variety
        const shuffled = filtered.sort(() => 0.5 - Math.random());
        setFilteredDestinations(shuffled.slice(0, 8));
    }, [selectedMonth]);

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[150px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 blur-[150px] rounded-full" />

            <div className="max-w-7xl mx-auto px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-primary font-bold tracking-widest uppercase mb-4 block"
                    >
                        Weather-Based Recommendations
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold text-white mb-6"
                    >
                        Perfect Weather, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-sky-400">
                            Perfect Destination
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-400 text-lg max-w-2xl mx-auto"
                    >
                        Find destinations with optimal weather conditions for your travel dates
                    </motion.p>
                </div>

                {/* Month Selector */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="mb-12 relative z-50"
                >
                    <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                        <label className="text-white font-semibold mb-4 block">
                            When are you planning to travel?
                        </label>

                        {/* Desktop Grid (Hidden on Mobile) */}
                        <div className="hidden md:grid grid-cols-4 lg:grid-cols-6 gap-3">
                            {months.map((month) => (
                                <button
                                    key={month}
                                    onClick={() => setSelectedMonth(month)}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all ${selectedMonth === month
                                        ? "bg-secondary text-slate-900 shadow-lg shadow-secondary/25"
                                        : "bg-slate-700/50 text-slate-300 hover:bg-slate-700"
                                        }`}
                                >
                                    {month.slice(0, 3)}
                                </button>
                            ))}
                        </div>

                        {/* Mobile Dropdown (Visible on Mobile) */}
                        <div className="md:hidden relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="w-full flex items-center justify-between px-6 py-4 rounded-xl bg-slate-900/80 border border-white/10 text-white font-medium shadow-lg"
                            >
                                <span>{selectedMonth || "Select Month"}</span>
                                <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                            </button>

                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto z-50"
                                    >
                                        {months.map((month) => (
                                            <button
                                                key={month}
                                                onClick={() => {
                                                    setSelectedMonth(month);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-6 py-3 border-b border-white/5 last:border-0 ${selectedMonth === month ? "bg-secondary/20 text-secondary" : "text-slate-300 hover:bg-white/5"}`}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>

                {/* Destinations Carousel (Replaces Grid) */}
                <WeatherCarousel dests={filteredDestinations} />

                {/* No Results */}
                {filteredDestinations.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-slate-400 text-lg">
                            No destinations found for {selectedMonth}. Try selecting a different month!
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
