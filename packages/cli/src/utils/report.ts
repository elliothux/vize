import * as Sentry from '@sentry/node';

export function initSentryReport() {
  Sentry.init({
    dsn: 'https://6c8e6de46ce14cf697078b45598c637c@o767302.ingest.sentry.io/5794408',
    tracesSampleRate: 0.7,
  });
}
