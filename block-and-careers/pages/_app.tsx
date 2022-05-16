import BlockJobLayout from "@components/layouts/layout";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import themes from "themes";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <ChakraProvider resetCSS theme={themes}>
          <BlockJobLayout>
            <Component {...pageProps} />
          </BlockJobLayout>
        </ChakraProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
