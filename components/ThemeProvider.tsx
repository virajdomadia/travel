"use client";

import { useEffect } from "react";

interface ThemeProviderProps {
    children: React.ReactNode;
    initialSettings?: any;
}

export function ThemeProvider({ children, initialSettings }: ThemeProviderProps) {
    useEffect(() => {
        if (!initialSettings) return;

        const { theme, branding } = initialSettings;

        if (theme) {
            const root = document.documentElement;

            // Apply Colors
            if (theme.primaryColor) root.style.setProperty("--primary", theme.primaryColor);
            if (theme.secondaryColor) root.style.setProperty("--secondary", theme.secondaryColor);
            if (theme.accentColor) root.style.setProperty("--accent", theme.accentColor);
            if (theme.backgroundColor) root.style.setProperty("--background", theme.backgroundColor);
            if (theme.textColor) root.style.setProperty("--foreground", theme.textColor);
            if (theme.radius) root.style.setProperty("--radius", theme.radius);

            // Apply Fonts
            if (theme.fontHeading || theme.fontBody) {
                const headingFont = theme.fontHeading?.replace(" ", "+");
                const bodyFont = theme.fontBody?.replace(" ", "+");

                const link = document.createElement("link");
                link.href = `https://fonts.googleapis.com/css2?family=${headingFont}:wght@400;700&family=${bodyFont}:wght@400;500;700&display=swap`;
                link.rel = "stylesheet";
                document.head.appendChild(link);

                if (theme.fontHeading) root.style.setProperty("--font-heading", `"${theme.fontHeading}", sans-serif`);
                if (theme.fontBody) root.style.setProperty("--font-body", `"${theme.fontBody}", sans-serif`);
            }
        }

        if (branding) {
            if (branding.siteName) document.title = branding.siteName;

            if (branding.faviconUrl) {
                let favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
                if (!favicon) {
                    favicon = document.createElement("link");
                    favicon.rel = "icon";
                    document.head.appendChild(favicon);
                }
                favicon.href = branding.faviconUrl;
            }
        }

    }, [initialSettings]);

    return <>{children}</>;
}
