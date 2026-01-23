"use client";

import { useState, useEffect } from "react";
import shortid from 'shortid';
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { createPortal } from "react-dom";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    tourName?: string;
    basePrice?: string;
    initialDate?: string;
    initialGuests?: number;
}

const hotels = [
    { id: "standard", name: "Seaside Resort", price: 0, image: "/santorini.png" },
    { id: "suite", name: "Luxury Suite +₹15,000", price: 15000, image: "/hero.png" },
    { id: "villa", name: "Private Villa +₹30,000", price: 30000, image: "/swiss-alps.png" },
];

const activities = [
    { id: "dinner", name: "Candlelit Dinner", price: 5000 },
    { id: "tour", name: "Guided Local Tour", price: 3000 },
    { id: "spa", name: "Couples Spa Day", price: 10000 },
];

const steps = ["Dates", "Hotel", "Activities", "Overview"];

import { generateItineraryPDF } from "@/utils/pdfGenerator";

export default function BookingModal({ isOpen, onClose, tourName = "Santorini Dreams", basePrice = "₹12,999", initialDate = "", initialGuests = 2 }: BookingModalProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [bookingData, setBookingData] = useState<any>(null);

    const [form, setForm] = useState({
        date: initialDate,
        guests: initialGuests,
        hotel: "standard",
        selectedActivities: [] as string[],
        fullName: "",
        email: "",
        phone: ""
    });

    const numericBasePrice = parseInt(basePrice.replace(/[^0-9]/g, "")) || 1299;

    // Reset form when modal opens with new props
    useEffect(() => {
        if (isOpen) {
            setForm(prev => ({
                ...prev,
                date: initialDate || prev.date,
                guests: initialGuests || prev.guests
            }));
        }
    }, [isOpen, initialDate, initialGuests]);

    const toggleActivity = (id: string) => {
        setForm(prev => {
            const newActivities = prev.selectedActivities.includes(id)
                ? prev.selectedActivities.filter(a => a !== id)
                : [...prev.selectedActivities, id];
            return { ...prev, selectedActivities: newActivities };
        });
    };

    const getDynamicPriceModifier = (dateString: string) => {
        if (!dateString) return 0;
        const date = new Date(dateString);
        const day = date.getDay();
        // Friday (5), Saturday (6), Sunday (0) -> +2000 increase
        if (day === 0 || day === 6 || day === 5) {
            return 2000;
        }
        return 0;
    };

    const calculateTotal = () => {
        let total = numericBasePrice * form.guests;

        // Add dynamic pricing
        const seasonalSurge = getDynamicPriceModifier(form.date);
        total += (seasonalSurge * form.guests);

        const hotelPrice = hotels.find(h => h.id === form.hotel)?.price || 0;
        total += hotelPrice;

        form.selectedActivities.forEach(actId => {
            const act = activities.find(a => a.id === actId);
            if (act) total += act.price * form.guests;
        });

        return total;
    };

    // ... (existing logic) ...

    const handleNext = async () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(c => c + 1);
        } else {
            if (!form.fullName || !form.email || !form.phone || !form.date) {
                alert("Please fill in all required fields.");
                return;
            }

            setLoading(true);
            try {
                const totalAmount = calculateTotal();

                // 1. Create Order on Server
                const orderRes = await fetch('/api/payments/create-order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: totalAmount })
                });

                const order = await orderRes.json();

                if (order.error) {
                    alert('Payment initialization failed');
                    setLoading(false);
                    return;
                }

                // 2. Open Razorpay
                const options = {
                    key: "rzp_test_YourKeyHere", // In real app, from env
                    amount: order.amount,
                    currency: order.currency,
                    name: "7 Fold Wonders",
                    description: `Booking for ${tourName}`,
                    image: "/logo.png", // Add logo if available
                    order_id: order.id,
                    handler: async function (response: any) {
                        // Payment Success - Now Create Booking
                        await createBooking(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                    },
                    prefill: {
                        name: form.fullName,
                        email: form.email,
                        contact: form.phone
                    },
                    theme: {
                        color: "#0ea5e9"
                    }
                };

                // 2. Open Razorpay (Simulated for Demo if keys are placeholders)
                if (!options.key || options.key === "rzp_test_YourKeyHere") {
                    console.log("Demo Mode: Simulating Payment Success...");
                    setTimeout(async () => {
                        await createBooking(`pay_${shortid.generate()}`, order.id, "simulated_signature");
                    }, 1500);
                    return;
                }

                const rzp1 = new (window as any).Razorpay(options);
                rzp1.on('payment.failed', function (response: any) {
                    alert("Payment Failed: " + response.error.description);
                    setLoading(false);
                });
                rzp1.open();

            } catch (error) {
                console.error(error);
                alert("An error occurred.");
                setLoading(false);
            }
        }
    };

    const createBooking = async (paymentId: string, orderId: string, signature: string) => {
        try {
            // Get userId from session
            const sessionRes = await fetch('/api/auth/me');
            const sessionData = await sessionRes.json();
            const userId = sessionData.user ? sessionData.user.username : null;

            const totalAmount = calculateTotal();

            const response = await fetch('/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tourName,
                    basePrice,
                    fullName: form.fullName,
                    email: form.email,
                    phone: form.phone,
                    travelers: form.guests,
                    date: form.date,
                    totalAmount,
                    userId,
                    paymentInfo: {
                        paymentId,
                        orderId,
                        signature,
                        status: 'captured'
                    },
                    status: 'confirmed' // Auto-confirm after payment
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setBookingData(data.booking);
                setIsConfirmed(true);
            } else {
                alert("Booking creation failed after payment. Please contact support.");
            }
        } catch (err) {
            console.error(err);
            alert("Booking error.");
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(c => c - 1);
    };

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // ... (existing logic) ...

    if (!isOpen || !mounted) return null;

    const modalContent = isConfirmed && bookingData ? (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-slate-800 border border-white/10 p-8 rounded-3xl max-w-md w-full text-center"
            >
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Bon Voyage!</h2>
                <p className="text-slate-400 mb-4">
                    Your package for <strong>{tourName}</strong> has been booked.
                </p>
                <div className="bg-emerald-500/10 text-emerald-400 p-3 rounded-xl text-sm mb-6">
                    ✓ Confirmation email sent to {form.email}
                </div>

                <div className="space-y-3">
                    <button
                        onClick={() => generateItineraryPDF(bookingData)}
                        className="btn bg-white text-slate-900 hover:bg-slate-200 w-full flex items-center justify-center gap-2"
                    >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Download Itinerary
                    </button>
                    <button onClick={onClose} className="btn btn-primary w-full">Close</button>
                </div>
            </motion.div>
        </div>
    ) : (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex items-center justify-center p-4">
            <motion.div
                layoutId="modal"
                className="bg-slate-900 border border-white/10 w-full max-w-4xl h-[90vh] md:h-[600px] rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
                {/* Visual Side (Image) - Hidden on mobile */}
                <div className="hidden md:block w-1/3 relative bg-slate-800">
                    <Image
                        src="/santorini.png"
                        alt="Destination"
                        fill
                        className="object-cover opacity-60 mix-blend-overlay"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                    <div className="absolute bottom-8 left-8 text-white">
                        <p className="text-primary text-sm font-bold tracking-widest uppercase mb-1">Building Trip</p>
                        <h3 className="text-2xl font-bold">{tourName}</h3>
                        <p className="text-slate-400 text-sm mt-2">Step {currentStep + 1} of {steps.length}</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="flex-1 flex flex-col relative">
                    {/* Header */}
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-900/50 z-10">
                        <div className="flex gap-2">
                            {steps.map((s, i) => (
                                <div key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= currentStep ? "bg-primary" : "bg-slate-700"}`} />
                            ))}
                        </div>
                        <button onClick={onClose} className="text-slate-500 hover:text-white">&times;</button>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 p-8 overflow-y-auto relative">
                        <AnimatePresence mode="wait">
                            {currentStep === 0 && (
                                <motion.div
                                    key="step0"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-white">When are you going?</h2>
                                    <div className="space-y-4">
                                        <label className="block">
                                            <span className="text-slate-400 text-sm mb-2 block">Travel Dates</span>
                                            <input
                                                type="date"
                                                value={form.date}
                                                onChange={(e) => setForm({ ...form, date: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-primary [color-scheme:dark]"
                                            />
                                        </label>
                                        <label className="block">
                                            <span className="text-slate-400 text-sm mb-2 block">Travelers</span>
                                            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-2 w-max">
                                                <button
                                                    onClick={() => setForm({ ...form, guests: Math.max(1, form.guests - 1) })}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-white"
                                                >-</button>
                                                <span className="text-white font-bold w-4 text-center">{form.guests}</span>
                                                <button
                                                    onClick={() => setForm({ ...form, guests: form.guests + 1 })}
                                                    className="w-10 h-10 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded-lg text-white"
                                                >+</button>
                                            </div>
                                        </label>
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 1 && (
                                <motion.div
                                    key="step1"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-white">Choose Your Stay</h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {hotels.map((hotel) => (
                                            <div
                                                key={hotel.id}
                                                onClick={() => setForm({ ...form, hotel: hotel.id })}
                                                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${form.hotel === hotel.id ? "bg-primary/20 border-primary" : "bg-white/5 border-white/10 hover:bg-white/10"}`}
                                            >
                                                <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                                                    <Image src={hotel.image} alt={hotel.name} fill className="object-cover" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-white">{hotel.name}</h3>
                                                    <p className="text-xs text-slate-400">Included in package</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 2 && (
                                <motion.div
                                    key="step2"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-white">Add Experiences</h2>
                                    <div className="space-y-3">
                                        {activities.map((activity) => (
                                            <label
                                                key={activity.id}
                                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${form.selectedActivities.includes(activity.id) ? "bg-primary/10 border-primary" : "bg-white/5 border-white/10"}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        checked={form.selectedActivities.includes(activity.id)}
                                                        onChange={() => toggleActivity(activity.id)}
                                                        className="w-5 h-5 rounded border-slate-600 bg-transparent text-primary focus:ring-primary"
                                                    />
                                                    <span className="text-white font-medium">{activity.name}</span>
                                                </div>
                                                <span className="text-primary font-bold">+₹{activity.price.toLocaleString()}</span>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            )}

                            {currentStep === 3 && (
                                <motion.div
                                    key="step3"
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold text-white">Summary & Contact</h2>

                                    {/* Contact Fields */}
                                    <div className="grid grid-cols-1 gap-4 mb-4">
                                        <div>
                                            <label className="text-slate-400 text-xs uppercase tracking-wider mb-2 block">Full Name</label>
                                            <input
                                                type="text"
                                                placeholder="John Doe"
                                                value={form.fullName}
                                                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                                className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-slate-400 text-xs uppercase tracking-wider mb-2 block">Email</label>
                                                <input
                                                    type="email"
                                                    placeholder="john@example.com"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-slate-400 text-xs uppercase tracking-wider mb-2 block">Phone</label>
                                                <input
                                                    type="tel"
                                                    placeholder="+91 98765 43210"
                                                    value={form.phone}
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                    className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/5 rounded-xl p-6 border border-white/10 space-y-4">
                                        {/* Promo Code Input */}
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                placeholder="Promo Code"
                                                className="bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-white w-full text-sm"
                                            />
                                            <button className="btn bg-white/10 text-white text-sm px-4">Apply</button>
                                        </div>

                                        <div className="flex justify-between text-slate-400">
                                            <span>Base Package ({form.guests}x)</span>
                                            <span>₹{(numericBasePrice * form.guests).toLocaleString()}</span>
                                        </div>
                                        {getDynamicPriceModifier(form.date) > 0 && (
                                            <div className="flex justify-between text-amber-400">
                                                <span>Weekend Surge</span>
                                                <span>+₹{(getDynamicPriceModifier(form.date) * form.guests).toLocaleString()}</span>
                                            </div>
                                        )}
                                        {hotels.find(h => h.id === form.hotel)?.price! > 0 && (
                                            <div className="flex justify-between text-slate-400">
                                                <span>Hotel Upgrade</span>
                                                <span>+₹{hotels.find(h => h.id === form.hotel)?.price.toLocaleString()}</span>
                                            </div>
                                        )}
                                        {form.selectedActivities.length > 0 && (
                                            <div className="flex justify-between text-slate-400">
                                                <span>Activities</span>
                                                <span>+₹{form.selectedActivities.reduce((acc, curr) => acc + (activities.find(a => a.id === curr)?.price || 0) * form.guests, 0).toLocaleString()}</span>
                                            </div>
                                        )}
                                        <div className="h-px bg-white/10 my-2" />
                                        <div className="flex justify-between text-white text-xl font-bold">
                                            <span>Total</span>
                                            <span>₹{calculateTotal().toLocaleString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-white/5 flex justify-between bg-slate-900 z-10">
                        <button
                            onClick={handleBack}
                            disabled={currentStep === 0}
                            className={`text-slate-400 hover:text-white font-medium px-4 py-2 ${currentStep === 0 ? "opacity-0 pointer-events-none" : "opacity-100"}`}
                        >
                            Back
                        </button>
                        <button
                            onClick={handleNext}
                            className="bg-primary hover:bg-sky-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-primary/25"
                        >
                            {currentStep === steps.length - 1 ? (loading ? "Booking..." : "Confirm & Pay") : "Next Step"}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
