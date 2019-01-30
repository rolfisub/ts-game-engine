import { LoadableAsset } from "./common";

export class AnimationAsset implements LoadableAsset<HTMLImageElement> {
  private instance: HTMLImageElement;
  private store: HTMLImageElement[] = [];
  constructor(public id: string, private src: string[]) {}

  public load = () => {
    return new Promise<LoadableAsset<HTMLImageElement>>(
      (resolveMain, rejectMain) => {
        if (this.store.length === 0) {
          const ps: Array<Promise<LoadableAsset<HTMLImageElement>>> = [];
          this.src.forEach(src => {
            const p = new Promise<LoadableAsset<HTMLImageElement>>(
              (resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                  resolve(this);
                };
                img.onerror = e => {
                  reject(e);
                };
                img.src = src;
                img.style.display = "none";
                document.body.appendChild(img);
                this.store.push(img);
              }
            );
            ps.push(p);
          });
          Promise.all(ps)
            .then(() => {
              resolveMain(this);
            })
            .catch(e => {
              rejectMain(e);
            });
        } else {
          resolveMain(this);
        }
      }
    );
  };

  public get = (): HTMLImageElement => {
    return this.instance;
  };
}
