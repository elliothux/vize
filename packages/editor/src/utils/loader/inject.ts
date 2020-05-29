import * as R from 'ramda';

export function loadUMDModuleFromString<T>(
    scriptContent: string,
    entryName: string,
    win: Window,
    remove = true,
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const doc = win.document;
        const script = doc.createElement('script');

        script.setAttribute('src', createObjectURLFromString(scriptContent, 'application/text'));
        script.addEventListener('error', reject);
        script.addEventListener('load', () => {
            if (remove) {
                doc.body.removeChild(script);
            }

            const result = (win as any)[entryName];
            if (!result) {
                return reject(`Cannot find UMD modules "${entryName}" with iframe`);
            }

            return resolve(result.default as T);
        });

        doc.body.appendChild(script);
    });
}

export function injectStyle(styleContent: string, win: Window, className?: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const doc = win.document;
        const style = doc.createElement('style');

        style.innerText = styleContent;
        style.setAttribute('type', 'text/css');
        if (className) {
            style.setAttribute('class', className);
        }

        style.addEventListener('error', reject);
        style.addEventListener('load', R.nAry(0, resolve));

        doc.head.appendChild(style);
    });
}

function createObjectURLFromString(content: string, type = ''): string {
    const file = new Blob([content], { type });
    return URL.createObjectURL(file);
}
