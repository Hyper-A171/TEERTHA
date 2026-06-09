const cache: Record<string, any> = {};

export function getCachedData(key: string) {
  if (typeof window === 'undefined') return null;
  return cache[key] || null;
}

export function setCachedData(key: string, data: any) {
  if (typeof window === 'undefined') return;
  cache[key] = data;
}

export function clearCachedData(key?: string) {
  if (typeof window === 'undefined') return;
  if (key) {
    delete cache[key];
  } else {
    for (const prop in cache) {
      if (Object.prototype.hasOwnProperty.call(cache, prop)) {
        delete cache[prop];
      }
    }
  }
}
