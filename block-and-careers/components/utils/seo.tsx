import Head from "next/head";

const SEO = (title): JSX.Element  => {
    return(
        <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{`BlockJobs | ${title}`}</title>
        </Head>
        </>
    );
};

export default SEO;