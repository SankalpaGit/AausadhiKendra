'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Coordinates
const pickupLocation = { lat: 26.6679, lng: 87.2722 }; // Jhumka
const dropLocation = { lat: 26.6667, lng: 87.2833 };   // Itahari

export default function OrderMapPage() {
    const mapRef = useRef<HTMLDivElement>(null);
    const [mapInitialized, setMapInitialized] = useState(false);

    useEffect(() => {
        if (!mapRef.current || mapInitialized) return;

        // Initialize map
        const map = L.map(mapRef.current).setView(
            [pickupLocation.lat, pickupLocation.lng],
            14
        );

        // Esri satellite tiles
        L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            {
                attribution:
                    'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
            }
        ).addTo(map);

        // Markers
        L.marker([pickupLocation.lat, pickupLocation.lng])
            .addTo(map)
            .bindPopup('📍 Pickup: Jhumka')
            .openPopup();

        L.marker([dropLocation.lat, dropLocation.lng])
            .addTo(map)
            .bindPopup('📦 Drop: Itahari');

        // Request driving route from OpenRouteService
        fetch(
            'https://api.openrouteservice.org/v2/directions/driving-car?api_key={``}',
            {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    coordinates: [
                        [pickupLocation.lng, pickupLocation.lat],
                        [dropLocation.lng, dropLocation.lat],
                    ],
                }),
            }
        )
            .then((res) => res.json())
            .then((data) => {
                const coords = data.features[0].geometry.coordinates.map(
                    (c: number[]) => [c[1], c[0]]
                );

                // Draw route polyline
                L.polyline(coords, {
                    color: 'blue',
                    weight: 5,
                    opacity: 0.7,
                }).addTo(map);

                // Fit to route bounds with padding
                const routeBounds = L.latLngBounds(coords);
                map.fitBounds(routeBounds, { padding: [50, 50] });
            })
            .catch((err) => console.error('🚨 Route fetch error:', err));

        setMapInitialized(true);
    }, [mapInitialized]);

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center px-4 py-10">
            <div className="max-w-5xl w-full text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-2">
                    🚚 Delivery Route
                </h1>
                <p className="text-lg md:text-xl text-gray-600">
                    From <span className="font-semibold text-indigo-600">Jhumka</span>{' '}
                    to <span className="font-semibold text-indigo-600">Itahari</span>
                </p>
            </div>

            <div
                ref={mapRef}
                className="w-full h-[70vh] rounded-xl border border-gray-300 shadow-xl overflow-hidden"
            />
        </div>
    );
}
