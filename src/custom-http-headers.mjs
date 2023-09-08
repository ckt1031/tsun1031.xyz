import contentSecurityPolicyBuilder from 'content-security-policy-builder';

export const headers = {
  'Content-Security-Policy': contentSecurityPolicyBuilder({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: [
        "'report-sample'",
        "'self'",
        'https://static.cloudflareinsights.com/beacon.min.js',
      ],
      styleSrc: ["'report-sample'", "'self'"],
      objectSrc: ["'none'"],
      baseUri: ["'self'"],
      connectSrc: ["'self'", 'https://cloudflareinsights.com', 'https://o1186045.ingest.sentry.io'],
      fontSrc: ["'self'", 'data:'],
      frameSrc: ["'self'"],
      imgSrc: ["'self'", 'https://ckt1031-github-readme-stats.vercel.app'],
      manifestSrc: ["'self'"],
      mediaSrc: ["'self'"],
      reportUri: ["'self'", 'csper.io'],
      workerSrc: ["'self'", 'blob:'],
    },
  }),
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
};
