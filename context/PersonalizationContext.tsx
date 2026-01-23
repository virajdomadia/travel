
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface PersonalizationContextType {
    lastCategory: string | null;
    recentlyViewed: string[];
    trackView: (category: string, id?: string) => void;
    preferences: any;
    setPreferences: (prefs: any) => void;
}

const PersonalizationContext = createContext<PersonalizationContextType>({
    lastCategory: null,
    recentlyViewed: [],
    trackView: () => { },
    preferences: null,
    setPreferences: () => { },
});

export const PersonalizationProvider = ({ children }: { children: React.ReactNode }) => {
    const [lastCategory, setLastCategory] = useState<string | null>(null);
    const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
    const [preferences, setPreferencesState] = useState<any>(null);

    useEffect(() => {
        const storedCat = localStorage.getItem("last_viewed_category");
        if (storedCat) setLastCategory(storedCat);

        const storedRecent = localStorage.getItem("recently_viewed_ids");
        if (storedRecent) setRecentlyViewed(JSON.parse(storedRecent));
    }, []);

    const trackView = (category: string, id?: string) => {
        setLastCategory(category);
        localStorage.setItem("last_viewed_category", category);

        if (id) {
            setRecentlyViewed(prev => {
                const newRecent = [id, ...prev.filter(p => p !== id)].slice(0, 5); // Keep last 5 unique
                localStorage.setItem("recently_viewed_ids", JSON.stringify(newRecent));
                return newRecent;
            });
        }
    };

    const setPreferences = (prefs: any) => {
        setPreferencesState(prefs);
    };

    return (
        <PersonalizationContext.Provider value={{ lastCategory, recentlyViewed, trackView, preferences, setPreferences }}>
            {children}
        </PersonalizationContext.Provider>
    );
};

export const usePersonalization = () => useContext(PersonalizationContext);
