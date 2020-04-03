export enum MaterialsFileType {
  Main = "main",
  Meta = "meta",
  Entry = "entry",
  HTML = "html"
}

interface MaterialsFileInfo {
  url: string;
  entryName: string;
}

export function getMaterialsFileInfo(
  fileType: MaterialsFileType,
  libName: string,
  debugPort?: number
): MaterialsFileInfo {
  // TODO
  return {
    url: `http://127.0.0.1:${debugPort!}/@vize-materials-${libName}-${fileType}.js`,
    entryName: `@vize-materials-${libName}-${fileType}`
  };
}

export function loadUMDModule<T>(
  { url, entryName }: MaterialsFileInfo,
  win: Window = window,
  remove: boolean = true
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const doc = win.document;
    const script = doc.createElement("script");

    script.setAttribute("src", url);
    script.addEventListener("error", reject);
    script.addEventListener("load", () => {
      if (remove) {
        doc.body.removeChild(script);
      }

      const result = (win as any)[entryName];
      if (!result) {
        return reject(`Cannot find UMD modules "${entryName}"`);
      }

      return resolve(result.default as T);
    });

    doc.body.appendChild(script);
  });
}
