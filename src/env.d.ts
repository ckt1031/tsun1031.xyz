/// <reference types="astro/client-image" />

interface ImportMetaEnv {
  readonly SITE_URL: StringifyOptions;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
