/// <reference types="vite/client" />

// environment variables
interface ImportMetaEnv{
  readonly VITE_api_url: string;
  readonly VITE_basename: string;

}

interface ImportMeta{
  readonly env: ImportMetaEnv;
}
