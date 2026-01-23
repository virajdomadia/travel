
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Review {
    _id: string;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
}

export default function ReviewsSection({ destinationId }: { destinationId: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [newRating, setNewRating] = useState(5);
    const [newComment, setNewComment] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        // Fetch User for posting permission
        fetch('/api/auth/me').then(res => res.json()).then(data => setUser(data.user));

        // Fetch Reviews
        fetchReviews();
    }, [destinationId]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`/api/reviews?destinationId=${destinationId}`);
            if (res.ok) {
                const data = await res.json();
                setReviews(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert("Please login to review");
            return;
        }
        setSubmitting(true);
        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    destinationId,
                    rating: newRating,
                    comment: newComment
                })
            });

            if (res.ok) {
                setNewComment("");
                fetchReviews(); // Refresh list
            } else {
                alert("Failed to post review");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mt-12">
            <h2 className="text-3xl font-bold text-white mb-8">Reviews ({reviews.length})</h2>

            {/* Write Review */}
            {user ? (
                <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 mb-12">
                    <h3 className="text-xl font-bold text-white mb-4">Write a review</h3>
                    <div className="flex gap-4 mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                onClick={() => setNewRating(star)}
                                className={`text-2xl transition-colors ${star <= newRating ? "text-amber-400" : "text-slate-600"}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Share your experience..."
                        className="w-full bg-slate-900 border border-white/10 rounded-xl p-4 text-white mb-4 focus:outline-none focus:border-primary"
                        rows={3}
                        required
                    />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn btn-primary px-6 py-2"
                    >
                        {submitting ? "Posting..." : "Post Review"}
                    </button>
                </form>
            ) : (
                <div className="bg-slate-800/50 p-6 rounded-2xl border border-white/10 mb-12 text-center">
                    <p className="text-slate-400 mb-4">Log in to share your experience</p>
                    <a href="/login" className="text-primary hover:underline">Sign In</a>
                </div>
            )}

            {/* List Reviews */}
            <div className="space-y-6">
                {reviews.map((review) => (
                    <div key={review._id} className="bg-slate-800 border border-white/5 p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                                    {review.username.charAt(0).toUpperCase()}
                                </div>
                                <span className="font-bold text-white">{review.username}</span>
                            </div>
                            <span className="text-sm text-slate-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex text-amber-400 mb-3 text-sm">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                            ))}
                        </div>
                        <p className="text-slate-300">{review.comment}</p>
                    </div>
                ))}
                {reviews.length === 0 && !loading && (
                    <p className="text-slate-500 italic">No reviews yet. Be the first!</p>
                )}
            </div>
        </div>
    );
}
