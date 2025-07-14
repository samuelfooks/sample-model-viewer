// // pages/index.js
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../components/Map'), { ssr: false });

export default function Home() {
  return <div id="map-container" style={{ height: '100vh' }}><MapComponent /></div>;
}
// const Globe = dynamic(() => import('../components/Globe'), { ssr: false });

// export default function Home() {
//   return <div style={{ width: '100%', height: '100vh' }}><Globe /></div>;
// }

