import GlobalStyles from "@style/GlobalStyles";
import theme from "@style/theme";
import { ThemeProvider } from "styled-components";
import BlockJobLayout from "@components/layouts/layout";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <RecoilRoot>
        <GlobalStyles />
        <ThemeProvider theme={theme}>
          <BlockJobLayout>
            <Component {...pageProps} />
            <ToastContainer
              hideProgressBar
              position="bottom-right"
              autoClose={2000}
            />
          </BlockJobLayout>
        </ThemeProvider>
      </RecoilRoot>
    </>
  );
}

export default MyApp;
