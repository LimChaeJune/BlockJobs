import { Box } from "@chakra-ui/react";
import Head from "next/head";
import colors from "themes/foundations/colors";
import Footer from "./footer";
import NavBar from "./navbar";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const BlockJobLayout = ({ children }: Props): JSX.Element => {
  return (
    <>
      <Head>
        <title>{"BlockJobs"}</title>
        <meta
          name="description"
          content={"경력을 블록체인으로 영구히 보관하는 BlockJobs"}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={"BlockJobs"} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={"https://blockjobs.com"} />
        {/* <meta property="og:image" content={image} /> */}
        <meta property="og:article:author" content="BlockJobs" />
      </Head>
      <Box>
        <NavBar />
        <Box width={"100%"} height={"80px"} />
        <Box
          width={"100%"}
          minHeight={"calc(100vh - 80px)"}
          bg={colors.secondery[100]}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default BlockJobLayout;
