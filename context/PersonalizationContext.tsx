
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface PersonalizationContextType {
    lastCategory: string | null;
    trackView: (category: string) => void;
    preferences: any;
    setPreferences: (prefs: any) => void;
}

const PersonalizationContext = createContext<PersonalizationContextType>({
    lastCategory: null,
    trackView: () => { },
    preferences: null,
    setPreferences: () => { },
});

export const PersonalizationProvider = ({ children }: { children: React.ReactNode }) => {
    const [lastCategory, setLastCategory] = useState<string | null>(null);
    const [preferences, setPreferencesState] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem("last_viewed_category");
        if (stored) setLastCategory(stored);
    }, []);

    const trackView = (category: string) => {
        setLastCategory(category);
        localStorage.setItem("last_viewed_category", category);
    };

    const setPreferences = (prefs: any) => {
        setPreferencesState(prefs);
    };

    return (
        <PersonalizationContext.Provider value={{ lastCategory, trackView, preferences, setPreferences }}>
            {children}
        </PersonalizationContext.Provider>
    );
};

export const usePersonalization = () => useContext(PersonalizationContext);
