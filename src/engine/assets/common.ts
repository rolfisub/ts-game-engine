export interface LoadableAsset<T> {
  id: string;
  load: () => LoadableAsset<T>;
  get: () => T;
}
