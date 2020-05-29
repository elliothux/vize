import * as React from 'react';
import { globalStore } from 'states';

export function InjectedStylesRender() {
    const { iframeStyleMap } = globalStore;

    return (
        <>
            {Object.entries(iframeStyleMap).map(([name, style]) => (
                <style type="text/css" key={name} className={`vize-injected-styles ${name}`}>
                    {style}
                </style>
            ))}
        </>
    );
}
