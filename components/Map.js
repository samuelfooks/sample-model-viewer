// import { useRef, useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// export default function Map() {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     if (mapRef.current) return;

//     const osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '© OpenStreetMap'
//     });
//     const osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//       attribution: '© OpenStreetMap contributors'
//     });

//     const cities = L.layerGroup([
//       L.marker([39.61, -105.02]).bindPopup('Littleton, CO'),
//       L.marker([39.74, -104.99]).bindPopup('Denver, CO'),
//       L.marker([39.73, -104.80]).bindPopup('Aurora, CO'),
//       L.marker([39.77, -105.23]).bindPopup('Golden, CO')
//     ]);

//     const map = L.map('map', {
//       center: [39.74, -104.99],
//       zoom: 10,
//       layers: [osm, cities]
//     });

//     L.control.layers(
//       { 'OSM Standard': osm, 'OSM Humanitarian': osmHOT },
//       { Cities: cities }
//     ).addTo(map);

//     mapRef.current = map;
//   }, []);

//   return <div id="map" style={{ width: '100%', height: '100%' }} />;
// }
import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import stacLayer from 'stac-layer';

export default function Map() {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map('map', { center: [0, 0], zoom: 2 });

    const osmBase = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 19
    }).addTo(map);

    const hotBase = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution: '© OSM HOT',
      maxZoom: 19
    });

    // STAC overlay placeholder
    let stacLayerRef;

    async function addSTAC() {
      const resp = await fetch(
        'https://earth-search.aws.element84.com/v1/search?collections=s2_l2a-cogs&limit=1'
      );
      const data = await resp.json();
      const item = data.features[0];

      stacLayerRef = await stacLayer(item, {
        tileUrlTemplate: 'https://tiles.rdnt.io/tiles/{z}/{x}/{y}@2x?url={url}',
        useTileLayerAsFallback: true
      });

      stacLayerRef.addTo(map);
      map.fitBounds(stacLayerRef.getBounds());
      overlays['STAC COG'] = stacLayerRef;
      controlRef.addOverlay(stacLayerRef, 'STAC COG');
    }

    addSTAC();

    const baseMaps = { 'OSM': osmBase, 'OSM HOT': hotBase };
    const overlays = { };

    const controlRef = L.control.layers(baseMaps, overlays, { collapsed: false }).addTo(map);

    mapRef.current = map;
  }, []);

  return <div id="map" style={{ width: '100%', height: '100vh' }} />;
}

