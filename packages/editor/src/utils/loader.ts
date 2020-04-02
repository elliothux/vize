enum MaterialsFileType {
  Main = "main",
  Meta = "meta",
  Entry = "entry",
  HTML = "html"
}

interface MaterialsFileInfo {
  url: string;
  entryName: string;
}

function getFileInfo(
  file: MaterialsFileType,
  libName: string,
  debugPort?: number
): MaterialsFileInfo {
  // TODO
  return {
    url: `http://127.0.0.1:${debugPort!}/@vize-materials-${libName}-${file}.js`,
    entryName: `@vize-materials-${libName}-${file}`
  };
}

function loadUMDModule<T>(
  { url, entryName }: MaterialsFileInfo,
  win: Window,
  remove: boolean
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const doc = win.document;
    const script = doc.createElement("script");
    script.setAttribute("src", url);
    script.addEventListener("load", () => {
      if (remove) {
        doc.body.removeChild(script);
      }

      const result = (win as any)[entryName];
      if (!result) {
        return reject(`Cannot find UMD modules "${entryName}"`);
      }
      return resolve(result);
    });
    doc.body.appendChild(script);
  });
}

function loadMain() {

}

export function loadMaterials(libName: string, debugPort?: number) {}
