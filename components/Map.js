import { useRef, useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    });
    const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    });

    const cities = L.layerGroup([
      L.marker([39.61, -105.02]).bindPopup('Littleton, CO'),
      L.marker([39.74, -104.99]).bindPopup('Denver, CO'),
      L.marker([39.73, -104.80]).bindPopup('Aurora, CO'),
      L.marker([39.77, -105.23]).bindPopup('Golden, CO')
    ]);

    const map = L.map('map', {
      center: [39.74, -104.99],
      zoom: 10,
      layers: [osm, cities]
    });

    L.control.layers(
      { 'OSM Standard': osm, 'OSM Humanitarian': osmHOT },
      { Cities: cities }
    ).addTo(map);

    mapRef.current = map;
  }, []);

  return <div id="map" style={{ width: '100%', height: '100%' }} />;
}
