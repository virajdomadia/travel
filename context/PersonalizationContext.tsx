"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Preferences {
    travelStyle: string; // 'adventure', 'relax', 'culture', 'luxury'
    companions: string;  // 'solo', 'couple', 'family', 'group'
    budget: string;      // 'budget', 'premium', 'ultra-luxury'
}

interface PersonalizationContextType {
    preferences: Preferences | null;
    setPreferences: (prefs: Preferences) => void;
    hasSetPreferences: boolean;
}

const PersonalizationContext = createContext<PersonalizationContextType | undefined>(undefined);

export function PersonalizationProvider({ children }: { children: ReactNode }) {
    const [preferences, setPreferencesState] = useState<Preferences | null>(null);
    const [hasSetPreferences, setHasSetPreferences] = useState(false);

    useEffect(() => {
        // Load preferences from local storage if available
        const saved = localStorage.getItem("travel_preferences");
        if (saved) {
            setPreferencesState(JSON.parse(saved));
            setHasSetPreferences(true);
        }
    }, []);

    const setPreferences = (prefs: Preferences) => {
        setPreferencesState(prefs);
        setHasSetPreferences(true);
        localStorage.setItem("travel_preferences", JSON.stringify(prefs));
    };

    return (
        <PersonalizationContext.Provider value={{ preferences, setPreferences, hasSetPreferences }}>
            {children}
        </PersonalizationContext.Provider>
    );
}

export function usePersonalization() {
    const context = useContext(PersonalizationContext);
    if (!context) {
        throw new Error("usePersonalization must be used within a PersonalizationProvider");
    }
    return context;
}
