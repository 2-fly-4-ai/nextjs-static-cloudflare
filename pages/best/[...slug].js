import client from "../../src/apollo/client";
import { GET_PAGES_URI } from "../../src/queries/tags/get-pages";
import { isEmpty, slice } from "lodash";
import { GET_PAGE } from "../../src/queries/tags/get-page";
import { useRouter } from "next/router";
import Layout from "../../src/components/Layout";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../src/utils/slug";
import React, { useEffect, useRef } from "react";
import ProductTagsHeader from "../../src/components/product_tags/Header";
import AuthorTitleShare from "../../src/components/product_tags/author-title-share";
import IntroFeaturedImage from "../../src/components/product_tags/intro-featuredimg";
import ContentAccordion from "../../src/components/product_tags/accordion";
import Share from "../../src/components/product_tags/share";
import SideBar from "../../src/components/product_tags/sidebar";
import LoadMoreTagProducts from "../../src/components/product_tags/load-more-tag-products";

const Page = ({ data }) => {
  const router = useRouter();
  // NOT USING THIS... Delete in next cleanup
  function handleFocus() {
    searchInput.current.blur(); // removing focus
  }
  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout data={data}>
      <main className="pb-8 lg:pb-16 bg-white lg:max-w-screen-lg xl:max-w-screen-2xl justify-center items-center dark:bg-gray-900 px-4 m-auto">
        <div className="flex flex-col lg:flex-row relative z-20 justify-between px-0 md:px-4 mx-auto max-w-screen-xl  bg-white dark:bg-gray-900 rounded">
          <article className=" xl:w-[1000px] w-full max-w-none format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            <ProductTagsHeader data={data} />
            <AuthorTitleShare data={data} />
            <IntroFeaturedImage data={data} />
            {/* <TagProducts product={data?.page?.products} /> */}
            <LoadMoreTagProducts
              product={data?.page?.products}
              slug={data?.page?.slug}
            />
            <ContentAccordion data={data} />
            <Share data={data} />
          </article>
          <SideBar data={data} />
        </div>
      </main>
      {/*Related Articles Component*/}
      {/* <ReadMore data={data} /> */}
      {/* NEWSLETTER COMPONENT */}
      {/* <NewsLetter data={data} /> */}
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
    },
  });

  const defaultProps = {
    props: {
      data: data || {},
    },
    /**
     * Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */
    revalidate: 1,
  };

  return handleRedirectsAndReturnData(defaultProps, data, errors, "page");
}

/**
 * Since the page name uses catch-all routes,
 * for example [...slug],
 * that's why params would contain slug which is an array.
 * For example, If we need to have dynamic route '/foo/bar'
 * Then we would add paths: [ params: {slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise < { paths: [], fallback: boolean } >}
 */
export async function getStaticPaths() {
  const { data } = await client.query({
    query: GET_PAGES_URI,
  });

  const pathsData = [];

  data?.pages?.nodes &&
    data?.pages?.nodes.map((page) => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        const slugs = page?.uri?.split("/").filter((pageSlug) => pageSlug);
        pathsData.push({ params: { slug: slugs } });
      }
    });

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
