// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client-image" />
/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly SITE_URL: StringifyOptions;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
