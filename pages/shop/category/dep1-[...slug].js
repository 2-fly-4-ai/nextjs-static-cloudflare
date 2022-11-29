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

const Page = ({ data, query }) => {
  console.warn(query); 
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

  ///// Start Brand/product Tags component /////

  let page_tags = [];
  let page_brands = [];
  let product_list = [];

  //REQUESTED_FEATURES = SHOULD ADD MORE TAGS AS I LOAD MORE PRODUCTS
  // Product Tags - For display purposes
  data?.page?.nodes[0]?.products?.nodes.map((product) => {
    product?.productTags?.nodes.map((product) => {
      let x = product?.name;
      let y = x.split(" ").length;
      let z = x.split("").length;
      if (y > 4 || z > 25) {
        return;
      }
      page_tags.push(product);
    });

    //REQUESTED_FEATURES = LOAD MORE BUTTON ON BRANDS
    // Brand Tags- For display & Search Volume logic
    // Kill all page creation for brand tags under 200SV
    product?.productBrands?.nodes.map((product) => {
      let search_volume = product?.brand_fields?.searchVolume;
      if (search_volume < 200 || search_volume == null) {
        return;

        // Add logic for 404 Here on the Brand template(Reference Outer Scope)
      }
      let x = product?.name;
      let y = x.split(" ").length;
      let z = x.split("").length;
      if (y > 3 || z > 18) {
        return;
      }

      page_brands.push(product);
    });

    // Push Products to Product List- Use this List to Append more
    product_list.push(product);
  });

  ////REQUESTED_FEATURES = LOAD MORE BUTTON SHOULD ALSO CONSIDER THESE. FOR PARENT PAGES THIS IS WHERE THE PRODUCTS ARE ACCESSED FROM AND THE LOADMORE NEEDS TO TAKE THAT INTO ACCOUNT.
  //Child Component For Finding Products in Child Categories
  function readChildren(child) {
    {
      !isEmpty(child?.children?.nodes)
        ? child?.children?.nodes.map((child) => {
            readChildren(child);
          })
        : child?.products?.nodes.map((product) => {
            product_list.push(product);
            product?.productTags?.nodes.map((product) => {
              let x = product?.name;
              let y = x.split(" ").length;
              let z = x.split("").length;
              if (y > 4 || z > 25) {
                return;
              }
              page_tags.push(product);
            });
          });
    }
  }

  {
    !isEmpty(data?.page?.nodes[0]?.children?.nodes)
      ? data?.page?.nodes[0]?.children?.nodes.map((child) => {
          readChildren(child);
        })
      : data?.page?.nodes[0]?.products?.nodes.map((product) => {
          product_list.push(product);
          product?.productTags?.nodes.map((product) => {
            let x = product?.name;
            let y = x.split(" ").length;
            let z = x.split("").length;
            if (y > 4 || z > 25) {
              return;
            }
            page_tags.push(product);
          });

          // Brand Tags- For display & Search Volume logic need to covert to a loadMore Brands Component
          // Kill all page creation for brand tags under 200SV
          product?.productBrands?.nodes.map((product) => {
            let search_volume = product?.brand_fields?.searchVolume;
            if (search_volume < 200 || search_volume == null) {
              return;

              // Add logic for 404 Here on the Brand template(Reference Outer Scope)
            }
            let x = product?.name;
            let y = x.split(" ").length;
            let z = x.split("").length;
            if (y > 3 || z > 18) {
              return;
            }

            page_brands.push(product);
          });
        });
  }

  //REMOVAL OF DUPLICATE TAGS/BRANDS/PRODUCTS. SINCE using Recursive Function seem to have duplicate products appearing.
  page_tags = page_tags
    .filter(
      (v, i, a) =>
        a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
    )
    .sort();

  page_brands = page_brands
    .filter(
      (v, i, a) =>
        a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
    )
    .sort()
    .reverse();

  //THE RECURSIVE FUNCTION SEEMS TO CREATE DUPLICATES
  product_list = product_list.filter(
    (v, i, a) =>
      a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
  );

  ///// End Brand/Product Tags component /////

  //Router FallBack Loading
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout data={data}>
      <section className="bg-white dark:bg-gray-900">
        <div className="py-8 px-4 mx-auto max-w-screen-2xl text-center lg:py-0 lg:px-5 flex ">
          {/* LEFT COLUMN Section - Contiains Sub Categories Brand/Product tags Component */}

          <div className="hidden md:flex w-80 mb-5 flex-col border-r">
            {!isEmpty(data?.page?.nodes[0]?.children?.nodes) ? (
              <div className="space-x-2 mt-2 flex flex-col">
                <span className="text-gray-800 mx-2 my-4 text-left font-semibold">
                  Sub-Categories:{" "}
                </span>
                <div>
                  <ul className="flex flex-wrap align items-start gap-1 p-2">
                    {data?.page?.nodes[0]?.children?.nodes.map((child) => (
                      <li
                        key={child.name}
                        className="text-gray-500 dark:text-gray-400 mb-3"
                      >
                        <Link href={child.uri}>
                          <a
                            className="text-gray-600 border border-gray-500 rounded-full px-2 text-sm py-0.5 pb-1.5 hover:bg-gray-200"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(child.name ?? {}),
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            <div className="space-x-2 mt-2 flex flex-col">
              <span className="text-gray-800 mx-2 my-4 text-left font-semibold">
                Tags:{" "}
              </span>
              <div>
                <ul className="flex flex-wrap align items-start gap-1 p-2">
                  {page_tags.map((tag) => (
                    <li
                      key={tag.name}
                      className="text-gray-500 dark:text-gray-400 mb-3"
                    >
                      <Link href={tag.uri}>
                        <a
                          className="text-gray-600 border border-gray-500 rounded-full px-2 text-sm py-0.5 pb-1.5 hover:bg-gray-200"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(tag?.name ?? {}),
                          }}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="space-x-2 mt-5 flex flex-col">
              <span className="text-gray-800 mx-2 my-4 text-left font-semibold">
                Brands:{" "}
              </span>
              <div>
                <ul className="flex flex-wrap  align items-start gap-1 p-2">
                  {data?.productBrands?.nodes.map((brand) =>
                    brand?.seo?.metaRobotsNoindex != "noindex" ? (
                      <li
                        key={brand?.name}
                        className="text-gray-500 dark:text-gray-400 mb-3"
                      >
                        <Link href={brand.uri}>
                          <a
                            className="text-gray-600 border border-gray-500 rounded-full px-2 overflow-hidden text-sm py-0.5 pb-1.5 hover:bg-gray-200"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(brand?.name ?? {}),
                            }}
                          />
                        </Link>
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN Section- Hero+ Breadcrumb & Product Gallery*/}
          <div className="flex-1 flex-col px-3">
            {/* Right-Top Hero Section */}
            <div className="flex flex-col items-start rounded-lg my-5">
              <h1 className="my-5">
                <a
                  className="m-5 text-gray-600 text-5xl px-2  py-2 pb-1.5"
                  href={data?.page?.nodes[0]?.name}
                >
                  {data?.page?.nodes[0]?.name}
                </a>
              </h1>
              {/* BREADCRUMB */}
              <div className="flex w-full flex-col md:flex-row text-gray-600 font-medium m:m-5  sm:m-0 gap-2 my-5">
                {!isEmpty(
                  data?.page?.nodes[0]?.parent?.node?.parent?.node?.parent?.node
                    ?.name
                ) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={data?.page?.nodes[0]?.parent?.node?.parent?.node?.uri}
                  >
                    {
                      data?.page?.nodes[0]?.parent?.node?.parent?.node?.parent
                        ?.node?.name
                    }
                  </a>
                ) : null}

                {!isEmpty(
                  data?.page?.nodes[0]?.parent?.node?.parent?.node?.name
                ) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={data?.page?.nodes[0]?.parent?.node?.parent?.node?.uri}
                  >
                    {data?.page?.nodes[0]?.parent?.node?.parent?.node?.name}
                  </a>
                ) : null}

                {!isEmpty(data?.page?.nodes[0]?.parent?.node?.name) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={data?.page?.nodes[0]?.parent?.node?.uri}
                  >
                    {data?.page?.nodes[0]?.parent?.node?.name}
                  </a>
                ) : null}

                {!isEmpty(data?.page?.nodes[0]?.name) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={data?.page?.nodes[0]?.name}
                  >
                    {data?.page?.nodes[0]?.name}
                  </a>
                ) : null}
              </div>
            </div>

            {/* PRODUCT GRID OUTTER DIV */}
            <div className="flex-1 pb-6">
              {/* PRODUCT GRID DIV */}
              <div className="grid gap-3  sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
                {/* INDIVIDUAL PRODUCTS. Includes code for quickview MODAL. 
                FEATURE REQUEST: NO SCROLL WHEN CLICKING ON MODAL*/}
                {product_list.map((product, index) => {
                  return (
                    <div className="p-0 pb-3 h-68 max-w-sm bg-white rounded-none  dark:bg-gray-800 dark:border-gray-700">
                      <div className="flex flex-col relative bg-white">
                        <Image
                          src={product?.single_product_acf?.productImageMainUrl}
                          height="256"
                          width="256"
                          objectFit="contain"
                        />
                        <div className="hidden md:flex bg-opacity-0 hover:bg-opacity-20 group bg-black w-full h-full absolute duration-500">
                          <a
                            className="py-1 px-5 opacity-0 hover:bg-gray-300 border-gray-300 border-2 leading-tight font-semibold group-hover:opacity-80 text-black text-sm -mt-8 rounded-full p-1 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white"
                            href={product?.single_product_acf?.productUrl}
                          >
                            View On Amazon
                          </a>
                          <div className="opacity-0 hover:bg-gray-200 font-semibold border-gray-300 border-2 leading-tight group-hover:opacity-80 item mt-10 rounded-full text-black absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  bg-white">
                            <button
                              id="readProductButton"
                              onClick={() => {
                                setMenuVisibility(!isMenuVisible);
                                activeCategory(index);
                              }}
                              className={`${
                                isActive(index) ? "..." : ""
                              } block text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-0.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800`}
                              data-modal-toggle="readProductModal"
                              type="button"
                            >
                              Quick View
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Button */}

                      {/* modal */}
                      <div
                        id="readProductModal"
                        tabIndex="-1"
                        aria-hidden="true"
                        className={`${
                          isMenuVisible && index == activeId ? "flex" : "hidden"
                        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center bg-black bg-opacity-60 w-screen h-screen`}
                      >
                        <div className="relative p-4 w-full max-w-4xl h-full md:h-auto">
                          {/* <!-- Modal content --> */}
                          <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                            {/* <!-- Modal header --> */}
                            <div className="flex overscroll-contain">
                              <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                                <div className="text-lg w-80 justify-center items-center flex text-gray-900 md:text-xl dark:text-white">
                                  <Image
                                    src={
                                      product?.single_product_acf
                                        ?.productImageMainUrl
                                    }
                                    height="256"
                                    width="256"
                                    objectFit="cover"
                                  />
                                </div>
                              </div>
                              <dl className="text-left p-6">
                                <div className="absolute right-3 top-3">
                                  <button
                                    onClick={() => {
                                      setMenuVisibility(!isMenuVisible);
                                      activeCategory(index);
                                    }}
                                    className={`${
                                      isActive(index) ? "..." : ""
                                    } text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white`}
                                    type="button"
                                    data-modal-toggle="readProductModal"
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-5 h-5"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      ></path>
                                    </svg>
                                  </button>
                                </div>
                                <h3 className="font-semibold text-xl ">
                                  {product?.title}
                                </h3>
                                <div
                                  className="mt-4 text-gray-700 prose"
                                  dangerouslySetInnerHTML={{
                                    __html: sanitize(
                                      product?.single_product_acf
                                        ?.productAida ?? {}
                                    ),
                                  }}
                                />
                                <div className="mt-6 flex gap-3 border-b border-gray-200 pb-6 pt-0">
                                  <a
                                    href={
                                      product?.single_product_acf?.productUrl
                                    }
                                    className="text-sm border border-gray-500 bg-green-400 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
                                  >
                                    <i className="fa-solid fa-heart"></i> View
                                    On Amazon
                                  </a>
                                  <a
                                    href={product?.uri}
                                    className="text-sm border border-gray-500 bg-yellow-300 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
                                  >
                                    <i className="fa-solid fa-heart"></i>Product
                                    Details
                                  </a>
                                </div>
                              </dl>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h5 className="py-3 text px-2 tracking-tight text-gray-900 font-semibold dark:text-white uppercase hover:text-blue-500">
                        <a href={product?.uri}>
                          {product?.title.split(" ").slice(0, 8).join(" ")}
                        </a>
                      </h5>
                    </div>
                  );
                })}
              </div>

              {/* Load More Products Button */}
              <div className="my-4">
                <a
                  className="text-sm text-gray-600 border-2 font-bold border-gray-500 rounded-full px-4 py-1 pb-1.5 hover:bg-gray-200"
                  href=""
                >
                  Load More Products{" "}
                  <span className="font-extrabold ">{">"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Page;

export async function getServerSideProps({ params }) {
  const page = params.page;
  const { data, errors } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
      first: (page * 5), //FIRST NUMBER SHOULD GO HERE. Lazyload should alter variables and keep appending the results. Issue is the children products have different variables to standard products list. The max products per load should be around 80 to keep within the PAYLOAD LIMITS. See how if children, then how many children/80 then that should be the number to request.
      after: null,
    },
  });
  // console.warn("XXXXXXXXXXXXXXXXXXXXX", params?.slug.join("/"));

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
