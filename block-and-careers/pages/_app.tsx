import "@style/globals.css";
import "@style/variables.css";
import BlockJobLayout from "@components/layouts/layout";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <BlockJobLayout>
          <Component {...pageProps} />
        </BlockJobLayout>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
