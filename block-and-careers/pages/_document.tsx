import React from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { ColorModeScript } from "@chakra-ui/react";

// NEXT.JS CUSTOM DOCUMENT
// https://nextjs.org/docs/advanced-features/custom-document

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://block-jobs.vercel.app/" />
          <meta property="og:title" content="BlockJobs" />
          <meta
            property="og:image"
            content="https://blockjobsawsbucket.s3.ap-northeast-2.amazonaws.com/profile/blockjobs_og.png"
          />
          <meta
            property="og:description"
            content="경력을 블록체인으로 영구히 보관하는 BlockJobs"
          />
          <meta property="og:site_name" content="BlockJobs" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta
            property="description"
            content="경력을 블록체인으로 영구히 보관하는 BlockJobs"
          />
          <meta property="keyword" content="BlockChain" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="True"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
