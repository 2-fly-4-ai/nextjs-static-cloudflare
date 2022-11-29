import client from "../../../src/apollo/client";
import { GET_PAGES_URI } from "../../../src/queries/categories-new/get-pages";
import { isEmpty, slice } from "lodash";
import { GET_PAGE } from "../../../src/queries/categories-new/get-page";
import { useRouter } from "next/router";
import Layout from "../../../src/components/layout";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../../src/utils/slug";
import { sanitize } from "../../../src/utils/miscellaneous";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import LoadMoreProducts from "../../../src/components/product_category/load_more_products";
import Products from "../../../src/components/product_category/products";
import { PER_PAGE_FIRST } from "../../../src/utils/pagination";

const Page = ({ data }) => {
  //Router FallBack Loading

  return (
    <Layout data={data}>
      {/* <Products product={data?.page?.nodes[0]?.products} /> */}

      <LoadMoreProducts product={data?.page?.nodes[0]?.products} />
      {/* This is a simplified version and doesn't take the children into account i was just trying to get the pagination to work */}

      {/* If you comment out LoadMoreProducts And show just <Products/> that component seems to work */}
      {/* If you cange name of dep1 to [slug].js that is the original layout i had in mind */}
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
      first: 10, //FIRST NUMBER SHOULD GO HERE. Lazyload should alter variables and keep appending the results. Issue is the children products have different variables to standard products list. The max products per load should be around 80 to keep within the PAYLOAD LIMITS. See how if children, then how many children/80 then that should be the number to request.
      after: null,
    },
  });
  console.warn("XXXXXXXXXXXXXXXXXXXXX", params?.slug.join("/"));

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
 * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
 * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
 *
 * At build time next js will will make an api call get the data and
 * generate a page bar.js inside .next/foo directory, so when the page is served on browser
 * data is already present, unlike getInitialProps which gets the page at build time but makes an api
 * call after page is served on the browser.
 *
 * 
 //Not 100% sure how this works but for catch all routes + ISR it uses the fallback. Hence query always set to last:1 and doesn't actually fetch all paths because that is a bottleneck when working with thousands of posts and not the right way to do it. 

 * @see https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
 *
 * @returns {Promise<{paths: [], fallback: boolean}>}
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
  console.warn("TEST", pathsData);
  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
