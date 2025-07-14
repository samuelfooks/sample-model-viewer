import { StacClient } from '@stac-utils/stac-client';

export async function getSTACTileUrl(collection, bbox) {
  const client = new StacClient({ url: 'https://earth-search.aws.element84.com/v1/' });
  const search = await client.search({ collections: [collection], bbox, limit: 1 }).next();
  const item = search.value;
  return item.links.find((l) => l.rel === 'tile').href;
}