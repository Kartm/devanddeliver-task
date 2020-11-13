import NodeCache from "node-cache";

export default class CacheService {
  constructor(ttlSeconds: number) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  cache = null;

  get(key: string, storeFunction: Function) {
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then((result: Object) => {
      this.cache.set(key, result);
      return result;
    });
  }

  del(keys: string[]) {
    this.cache.del(keys);
  }

  flush() {
    this.cache.flushAll();
  }
}
