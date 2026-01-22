"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./Map"), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-500 animate-pulse">
            Loading World Map...
        </div>
    )
});

export default function HomeMap() {
    return <Map />;
}
