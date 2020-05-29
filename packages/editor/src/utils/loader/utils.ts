import * as R from 'ramda';
import { Maybe } from '../../types';
import { getFileString } from '../request';
import { promiseWrapper } from '../common';

export enum MaterialsFileType {
    Main = 'main',
    Meta = 'meta',
    Entry = 'entry',
    HTML = 'html',
}

interface MaterialsFileInfo {
    url: string;
    styleUrl: Maybe<string>;
    entryName: string;
}

export function getMaterialsFileInfo(
    fileType: MaterialsFileType,
    libName: string,
    debugPort?: number,
): MaterialsFileInfo {
    // TODO
    const name = `http://127.0.0.1:${debugPort!}/@vize-materials-${libName}-${fileType}`;
    return {
        url: `${name}.js`,
        styleUrl: fileType === MaterialsFileType.HTML ? null : `${name}.css`,
        entryName: `@vize-materials-${libName}-${fileType}`,
    };
}

export function loadUMDModule<T>(
    { url, entryName }: MaterialsFileInfo,
    win: Window = window,
    remove = true,
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        const doc = win.document;
        const script = doc.createElement('script');

        script.setAttribute('src', url);
        script.addEventListener('error', reject);
        script.addEventListener('load', () => {
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

export function loadStyle(
    { styleUrl, entryName }: MaterialsFileInfo,
    win: Window = window,
    removeName?: string,
): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const doc = win.document;
        const link = doc.createElement('link');

        link.setAttribute('type', 'text/css');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', styleUrl!);

        if (removeName) {
            const id = `vize-injected-style-${removeName}`;
            const old = doc.getElementById('id');
            if (old) {
                doc.head.removeChild(old);
            }
            link.setAttribute('id', id);
        }

        link.addEventListener('error', reject);
        link.addEventListener('load', R.nAry(0, resolve));

        doc.head.appendChild(link);
    });
}

export interface StringMaterialsFile {
    script: string;
    style: Maybe<string>;
    entryName: string;
}

export async function loadFileAsString(
    type: MaterialsFileType,
    libName: string,
    debugPort?: number,
): Promise<StringMaterialsFile> {
    const { url, styleUrl, entryName } = getMaterialsFileInfo(type, libName, debugPort);
    const [script, [err, style]] = await Promise.all([getFileString(url), promiseWrapper(getFileString(styleUrl!))]);

    if (err) {
        console.warn(`Skip load ${type} style of materials lib "${libName}" with error: `, err);
    }

    return {
        script,
        style,
        entryName,
    };
}
