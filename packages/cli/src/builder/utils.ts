import * as path from 'path';
import * as fs from 'fs-extra';

export function findThumb(entry: string) {
    const svg = path.join(entry, './thumb.svg');
    if (fs.existsSync(svg)) return svg;

    const png = path.join(entry, './thumb.png');
    if (fs.existsSync(png)) return png;

    const jpg = path.join(entry, './thumb.jpg');
    if (fs.existsSync(jpg)) return jpg;

    const jpeg = path.join(entry, './thumb.jpeg');
    if (fs.existsSync(jpeg)) return jpeg;

    return undefined;
}

export function findPreview(entry: string) {
    const png = path.join(entry, './preview.png');
    if (fs.existsSync(png)) return png;

    const jpg = path.join(entry, './preview.jpg');
    if (fs.existsSync(jpg)) return jpg;

    const jpeg = path.join(entry, './preview.jpeg');
    if (fs.existsSync(jpeg)) return jpeg;

    return undefined;
}
