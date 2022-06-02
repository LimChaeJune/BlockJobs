import BlockJobLayout from "@components/layouts/layout";
import type { AppContext, AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ChakraProvider, Spinner } from "@chakra-ui/react";
import themes from "themes";
import App from "next/app";
import { Suspense } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <Suspense
          fallback={
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            ></Spinner>
          }
        >
          <ChakraProvider resetCSS theme={themes}>
            <BlockJobLayout>
              <Component {...pageProps} />
            </BlockJobLayout>
          </ChakraProvider>
        </Suspense>
      </RecoilRoot>
    </>
  );
}

export const getServerSideProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  // const { ctx } = appContext;
  // const allCookies = cookies(ctx);
  // const web3Cookie = allCookies["web3Data"];

  // if (web3Cookie !== undefined) {
  //   web3SetCookie(web3Cookie);
  // }

  return { ...appProps };
};

export default MyApp;
