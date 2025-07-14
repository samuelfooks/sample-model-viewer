import React, { useEffect, useState } from 'react';
import { Viewer, ImageryLayer } from 'resium';
import { UrlTemplateImageryProvider } from 'cesium';
import { getSTACTileUrl } from '../utils/stac';

export default function Globe() {
  const [tileUrl, setTileUrl] = useState(null);

  useEffect(() => {
    (async () => {
      const url = await getSTACTileUrl('sentinel-s2-l2a-cogs', [-180, -90, 180, 90]);
      setTileUrl(url);
    })();
  }, []);

  return (
    <Viewer full>
      {tileUrl && (
        <ImageryLayer imageryProvider={new UrlTemplateImageryProvider({ url: tileUrl })} />
      )}
    </Viewer>
  );
}
