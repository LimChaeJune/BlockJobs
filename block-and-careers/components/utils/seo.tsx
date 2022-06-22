import Head from "next/head";

export interface seo_props {
  title: string;
  description: string;
  image: string;
  url: string;
}

const SEO = ({ title, description, image, url }: seo_props): JSX.Element => {
  return (
    <Head>
      <title>{title || "BlockJobs"}</title>
      <meta
        name="description"
        content={description || "경력을 블록체인으로 영구히 보관하는 BlockJobs"}
      />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta property="og:title" content={title || "BlockJobs"} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url || "https://blockjobs.com"} />
      <meta
        property="og:image"
        content={
          image ||
          "https://blockjobsawsbucket.s3.ap-northeast-2.amazonaws.com/profile/blockjobs_og.png"
        }
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:article:author" content="BlockJobs" />
    </Head>
  );
};

export default SEO;
