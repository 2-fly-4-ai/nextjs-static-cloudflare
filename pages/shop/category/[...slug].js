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
import LoadMoreBrands from "../../../src/components/product_category/brand/load-more-brands";
import Products from "../../../src/components/product_category/products";
import { PER_PAGE_FIRST } from "../../../src/utils/pagination";
import Subcategory from "../../../src/components/product_category/subcategory";
import SubcategoryReadmore from "../../../src/components/product_category/subcategory_readmore";
import Brands from "../../../src/components/product_category/brand";
import Tags from "../../../src/components/product_category/tags";
import ChildrenProducts from "../../../src/components/product_category/products/get-children-products";
import ChildTags from "../../../src/components/product_category/children-tags";
import Hero from "../../../src/components/product_category/hero";

const Page = ({ data }) => {
  //Router FallBack Loading

  return (
    <Layout data={data}>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-screen-2xl text-center  lg:px-0 flex flex-col-reverse lg:flex-row ">
          {/* Left column - Contiains Brand/Product tags Component*/}
          <div className="lg:flex-col lg:flex border-r  lg:max-w-xs px-8 2xl:px-0 xl:max-w-xs 2xl:max-w-sm my-5 ">
            {!isEmpty(data?.page?.nodes[0]?.children?.nodes) ? (
              <Subcategory data={data} />
            ) : null}
            {!isEmpty(data?.page?.nodes[0]?.children?.nodes) ? (
              <ChildTags data={data} />
            ) : (
              <Tags data={data} />
            )}
            <Brands data={data?.productBrands?.nodes} />
          </div>
          {/* Whole Right Section- Hero & Product Gallery*/}
          <div className="flex-1 flex-col px-3">
            {/* Right-Top Hero Section */}
            <Hero data={data} />
            {/* Product Grid */}
            <div className="flex-1 pb-6">
              {/* Number 1 */}
              {!isEmpty(data?.page?.nodes[0]?.children?.nodes) ? (
                <ChildrenProducts data={data} />
              ) : (
                <LoadMoreProducts
                  product={data?.page?.nodes[0]?.products}
                  slug={data?.page?.nodes[0]?.slug}
                />
              )}
              {!isEmpty(data?.page?.nodes[0]?.children?.nodes) ? (
                <SubcategoryReadmore data={data} />
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

// {/* <Tags data={data} />
//       <ChildTags data={data} />
//       <Brands data={data?.productBrands?.nodes} />
//       <LoadMoreBrands brands={data?.productBrands} />
//       {/* <Products product={data?.page?.nodes[0]?.products} /> */}
//       <ChildrenProducts data={data} />
//       <Subcategory data={data} />
//       <LoadMoreProducts
//         product={data?.page?.nodes[0]?.products}
//         slug={data?.page?.nodes[0]?.slug}
//       />
//       {/* <LoadMoreProductsChildren
//         product={data}
//         slug={data?.page?.nodes[0]?.slug}
//       /> */}
//       {/* This is a simplified version and doesn't take the children into account i was just trying to get the pagination to work */}
//       {/* If you comment out LoadMoreProducts And show just <Products/> that component seems to work */}
//       If you cange name of dep1 to [slug].js that is the original layout i had in mind */}

export default Page;

export async function getStaticProps({ params }) {
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
      first: PER_PAGE_FIRST, //FIRST NUMBER SHOULD GO HERE. Lazyload should alter variables and keep appending the results. Issue is the children products have different variables to standard products list. The max products per load should be around 80 to keep within the PAYLOAD LIMITS. See how if children, then how many children/80 then that should be the number to request.
      after: null,
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

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
