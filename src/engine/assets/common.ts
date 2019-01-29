export interface LoadableAsset<T> {
  id: string;
  load: () => void;
  get: () => T;
}
