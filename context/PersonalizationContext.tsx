
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

interface PersonalizationContextType {
    lastCategory: string | null;
    trackView: (category: string) => void;
    preferences: any; // Add preferences
}

const PersonalizationContext = createContext<PersonalizationContextType>({
    lastCategory: null,
    trackView: () => { },
    preferences: null,
});

export const PersonalizationProvider = ({ children }: { children: React.ReactNode }) => {
    const [lastCategory, setLastCategory] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("last_viewed_category");
        if (stored) setLastCategory(stored);
    }, []);

    const trackView = (category: string) => {
        setLastCategory(category);
        localStorage.setItem("last_viewed_category", category);
    };

    return (
        <PersonalizationContext.Provider value={{ lastCategory, trackView, preferences: null }}>
            {children}
        </PersonalizationContext.Provider>
    );
};

export const usePersonalization = () => useContext(PersonalizationContext);
