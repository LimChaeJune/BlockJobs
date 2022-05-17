declare global {
  namespace NodeJS {
    interface ProcessEnv {
      HTTP_ONLY: boolean; //
      NODE_ENV: "development" | "production";
      API_SERVER?: string;
      INFURA_PUBLIC_ID: string;
    }
  }
}
