import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export function initSentryReport() {
  Sentry.init({
    dsn: 'https://d46da46ab6db4e8ba9bd9ec4e4a1712a@o767302.ingest.sentry.io/5794406',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.7,
  });
}
