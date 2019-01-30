export interface LoadableAsset<T> {
  id: string;
  load: () => Promise<LoadableAsset<T>>;
  get: () => T;
}
