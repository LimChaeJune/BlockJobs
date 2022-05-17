import BlockJobLayout from "@components/layouts/layout";
import type { AppContext, AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import themes from "themes";
import App from "next/app";

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
