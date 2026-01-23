"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { destinations } from "@/app/lib/data";
import L from "leaflet";
import Link from "next/link";
import { useEffect } from "react";

// Fix for default marker icon broken in React-Leaflet
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function MapController({ selectedName }: { selectedName?: string }) {
    const map = useMap();

    useEffect(() => {
        if (selectedName) {
            const dest = destinations.find(d => d.name === selectedName);
            if (dest) {
                map.flyTo([dest.lat, dest.lng], 6, { duration: 2 });
            }
        }
    }, [selectedName, map]);

    return null;
}

export default function Map({ selectedDestination }: { selectedDestination?: string }) {
    return (
        <MapContainer
            center={[20, 0] as [number, number]}
            zoom={2}
            className="w-full h-full rounded-2xl z-0"
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", background: "#0f172a" }}
        >
            <MapController selectedName={selectedDestination} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {destinations.map((dest) => (
                <Marker key={dest.id} position={[dest.lat, dest.lng]} icon={icon}>
                    <Popup className="custom-popup">
                        <div className="text-slate-900 min-w-[200px]">
                            <h3 className="font-bold text-lg mb-1">{dest.name}</h3>
                            <p className="text-sm text-slate-600 mb-2">{dest.duration}</p>
                            <div className="flex justify-between items-center mt-2">
                                <span className="font-bold text-primary">{dest.price}</span>
                                <Link
                                    href={`/tours/${dest.id}`}
                                    className="bg-primary text-white text-xs px-3 py-1.5 rounded-full font-bold hover:bg-sky-600 transition-colors"
                                >
                                    View
                                </Link>
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}
