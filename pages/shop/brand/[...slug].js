import client from "../../../src/apollo/client";
import { GET_PAGES_URI } from "../../../src/queries/brand/get-pages";
import { isEmpty, slice } from "lodash";
import { GET_PAGE } from "../../../src/queries/brand/get-page";
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
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Image from "next/image";
import LoadMoreProducts from "../../../src/components/product_category/load_more_products";
import Tags from "../../../src/components/product_category/tags";
import BrandCategories from "../../../src/components/product_category/brand/brandcategory";

const Page = ({ data }) => {
  console.warn(data);
  const router = useRouter();
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [activeId, setActiveId] = useState();

  // const [open, setOpen] = React.useState(false);
  function activeCategory(id) {
    setActiveId(id);
  }

  function isActive(id) {
    return id === activeId;
  }

  let page_tags = [];
  let page_brands = [];

  //Product tags

  //Brand Tags

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout data={data}>
      <section className="bg-white dark:bg-gray-900">
        <div className=" mx-auto max-w-screen-2xl text-center  lg:px-0 flex flex-col-reverse lg:flex-row ">
          {/* Tags + Brand Component */}
          <div className=" lg:flex-col lg:flex border-r lg:max-w-xs px-8 2xl:px-0 my-4 xl:max-w-xs 2xl:max-w-sm">
            <BrandCategories data={data} />
            <Tags data={data} />
          </div>

          <div className="flex-1 flex-col px-3 pb-8">
            <div className="flex flex-col md:items-start rounded-lg my-2 py-4 pb-8 justify-center content-center px-8 ">
              <h1>
                <a
                  className=" text-gray-600 text-5xl px-2  py-1 pb-1.5 border-b-4 border-gray-400"
                  href={data?.page?.nodes[0]?.name}
                >
                  {data?.page?.nodes[0]?.name}
                </a>
              </h1>
            </div>
            <LoadMoreProducts
              product={data?.page?.nodes[0]?.products}
              slug={data?.page?.nodes[0]?.slug}
            />

            {/* PRODUCT BOX */}
          </div>
        </div>
      </section>
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
