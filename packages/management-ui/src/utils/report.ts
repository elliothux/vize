import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

export function initSentryReport() {
  Sentry.init({
    dsn: 'https://484c4b7954ed46d9b9f6b048869fa2a3@o767302.ingest.sentry.io/5794401',
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 0.7,
  });
}
