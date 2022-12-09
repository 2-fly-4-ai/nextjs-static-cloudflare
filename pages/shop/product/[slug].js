import { isEmpty, isArray } from "lodash";
import client from "../../../src/apollo/client";
import { useRouter } from "next/router";
import Layout from "../../../src/components/layout";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
} from "../../../src/utils/slug";
import { GET_POST } from "../../../src/queries/productsv2/get-post";
import { GET_POST_SLUGS } from "../../../src/queries/productsv2/get-posts";
import { sanitize } from "../../../src/utils/miscellaneous";
import { Tabs } from "flowbite-react";
import { Table } from "flowbite-react";
import Link from "next/link";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import * as React from "react";
import { useState } from "react";
import Image from "next/image";

//FUTURE FEATURE REQUEST. ADD LOAD MORE FOR COMMENTS COMPONENT.

const Post = ({ data }) => {
  const [open, setOpen] = React.useState(false);
  const [activeId, setActiveId] = useState();
  let slides_list = [];
  let related_products = [];

  function activeCategory(id) {
    setActiveId(id);
  }

  function isActive(id) {
    return id === activeId;
  }

  data?.post?.productTags?.nodes.map((test) => {
    related_products.push(test?.products?.nodes);
  });

  related_products = related_products.flat(Infinity);
  const uniqueNames = related_products
    .filter(
      (v, i, a) =>
        a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
    )
    .slice(0, 12);

  {
  }

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running

  return (
    <Layout data={data} isPost>
      {/* The whole page */}
      <div className="px-6 py-4 flex-col">
        {/* Top-box-Whole */}
        <div className="container flex flex-col lg:flex-row gap-10 mx-auto">
          {/* Top-box-left */}
          <div className="">
            <div className="container pt-4 pb-8 flex items-center">
              <a href="" className="text-primary text-base">
                <i className="fa-solid fa-house"></i>
              </a>
              <span className="text-sm text-gray-400">
                <i className="fa-solid fa-chevron-right"></i>
              </span>

              {/* BreadCrumb */}
              <p className="text-gray-600 pt-2 font-medium hidden">
                {!isEmpty(
                  data?.post?.productTaxonomies?.nodes[0]?.parent?.node?.parent
                    ?.node?.parent?.node?.name
                ) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={
                      data?.post?.productTaxonomies?.nodes[0]?.parent?.node
                        ?.parent?.node?.parent?.node?.uri
                    }
                  >
                    {
                      data?.post?.productTaxonomies?.nodes[0]?.parent?.node
                        ?.parent?.node?.parent?.node?.name
                    }
                  </a>
                ) : null}

                {!isEmpty(
                  data?.post?.productTaxonomies?.nodes[0]?.parent?.node?.parent
                    ?.node?.name
                ) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={
                      data?.post?.productTaxonomies?.nodes[0]?.parent?.node
                        ?.parent?.node?.link
                    }
                  >
                    {
                      data?.post?.productTaxonomies?.nodes[0]?.parent?.node
                        ?.parent?.node?.name
                    }
                  </a>
                ) : null}

                {!isEmpty(
                  data?.post?.productTaxonomies?.nodes[0]?.parent?.node?.name
                ) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={
                      data?.post?.productTaxonomies?.nodes[0]?.parent?.node
                        ?.link
                    }
                  >
                    {
                      data?.post?.productTaxonomies?.nodes[0]?.parent?.node
                        ?.name
                    }
                  </a>
                ) : null}

                {!isEmpty(data?.post?.productTaxonomies?.nodes[0]?.name) ? (
                  <a
                    className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                    href={data?.post?.productTaxonomies?.nodes[0]?.uri}
                  >
                    {data?.post?.productTaxonomies?.nodes[0]?.name}
                  </a>
                ) : null}
              </p>
            </div>

            <Image
              src={data?.post?.single_product_acf?.productImageMainUrl}
              alt="product"
              className="max-h-96"
              height="600"
              width="600"
            />
            <div className="grid grid-cols-5 gap-4 mt-4">
              {data?.post?.single_product_acf?.productImageGalleryUrls
                .split(", ")
                .slice(0, 5)
                .map((imageUrl, index) => {
                  return (
                    <Image
                      onClick={() => {
                        setOpen(true);
                        activeCategory(index);
                      }}
                      key={imageUrl}
                      src={imageUrl}
                      alt="product2"
                      width="400"
                      height="400"
                      className={`${
                        isActive(index) ? "..." : ""
                      } justify-center`}
                    />
                  );
                })}

              {data?.post?.single_product_acf?.productImageGalleryUrls
                .split(", ")
                .map((imageUrl) => {
                  slides_list.push({ src: imageUrl });
                })}

              {/* Lightbox  @https://yet-another-react-lightbox.com/*/}
              <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={slides_list}
                index={activeId}
              />
            </div>
          </div>

          {/* Top-box-right */}
          <div className="flex-col w-full">
            <h2 className="text-4xl mb-3 mt-4">{data?.post?.title}</h2>
            <span className="items-center underline flex text-gray-500 border-b text  font-bold py-1 pb-1.5">
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              GET LATEST STAR RATING
              <svg
                className="w-4 h-4 py-4"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            </span>

            <div className="space-y-2">
              {/* <p className="text-gray-800 font-semibold space-x-2">
								<span>Availability: </span>
								<span className="text-green-600">In Stock</span>
							</p> */}
              <p className="space-x-2 mt-4">
                <span className="text-gray-800 font-semibold">Brand: </span>

                {data?.post?.productBrands?.nodes[0]?.seo?.robots[1] ==
                "index" ? (
                  <a
                    href={data?.post?.productBrands?.nodes[0]?.uri}
                    className="text-gray-600 border text-sm border-gray-500 rounded-full px-4  py-1 pb-1.5"
                  >
                    {data?.post?.productBrands?.nodes[0]?.name}
                  </a>
                ) : (
                  <a className="text-gray-600 border text-sm border-gray-500 rounded-full px-4  py-1 pb-1.5">
                    {data?.post?.productBrands?.nodes[0]?.name}
                  </a>
                )}
              </p>

              <p className="space-x-2">
                <span className="text-gray-800 font-semibold">SKU: </span>
                <span className="text-gray-600">BE45VGRT</span>
              </p>
            </div>

            {/* PRODUCT DESCRIPTION*/}

            <div
              className="mt-4 text-gray-700 prose"
              dangerouslySetInnerHTML={{
                __html: sanitize(
                  data?.post?.single_product_acf?.shortDescription ?? {}
                ),
              }}
            />

            <div className="mt-6 flex gap-3 border-b border-gray-200 pb-6 pt-0">
              <a
                href={data?.post?.single_product_acf?.productUrl}
                className="border border-gray-500 bg-green-400 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
              >
                <i className="fa-solid fa-heart"></i> View On Amazon
              </a>
              {/* <a
                href="#"
                className="border border-gray-500 bg-yellow-300 text-gray-600 px-8 py-2 font-medium rounded-full uppercase flex items-center gap-2 hover:text-primary transition"
              >
                <i className="fa-solid fa-heart"></i> View On Ebay
              </a> */}
            </div>

            <div className="space-x-2 mt-5 flex">
              <span className="text-gray-800 font-semibold">Tags: </span>

              {!isEmpty(data?.post?.productTags?.nodes) &&
              isArray(data?.post?.productTags?.nodes) ? (
                <div>
                  <ul className="flex flex-wrap gap-2">
                    {data?.post?.productTags?.nodes.map((tag) => (
                      <li
                        key={tag.name}
                        className="text-gray-500 dark:text-gray-400 mb-3"
                      >
                        <Link href={tag.uri}>
                          <a
                            className="text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(tag?.name ?? {}),
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="space-x-2 mt-5 flex mb-5">
              <span className="text-gray-800 font-semibold">Category: </span>
              {!isEmpty(data?.post?.productTaxonomies?.nodes) &&
              isArray(data?.post?.productTaxonomies?.nodes) ? (
                <div>
                  <ul className="flex gap-2">
                    {data?.post?.productTaxonomies?.nodes.map((category) => (
                      <li
                        key={category.name}
                        className="text-gray-500 dark:text-gray-400"
                      >
                        <Link href={category.uri} key={category.name + 1}>
                          <a
                            className="text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(category?.name ?? {}),
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>

            <div className="font-thin text-sm">
              {data?.header?.siteTitle} is reader-supported, and a participant
              in the Amazon Associate program. When you buy through links on our
              site, we may earn an affiliate commission. Read more about our
              policy.
            </div>
          </div>
        </div>

        {/*tabs-section*/}
        <div className="container pb-16 mx-auto mt-6">
          <Tabs.Group aria-label="Default tabs" style="default">
            <Tabs.Item active={true} title="Features">
              <div
                className="mt-4 text-gray-700 prose"
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    data?.post?.single_product_acf?.productFeatures ?? {}
                  ),
                }}
              />
            </Tabs.Item>
            <Tabs.Item title="Pro's & con's">
              <div
                className="mt-4 text-gray-700 prose"
                dangerouslySetInnerHTML={{
                  __html: sanitize(
                    data?.post?.single_product_acf?.productProsCons ?? {}
                  ),
                }}
              />
            </Tabs.Item>
            <Tabs.Item title="Expert Opinion">
              <div className="max-w-2xl">
                <div className="prose  max-w-none"></div>
              </div>
            </Tabs.Item>
            <Tabs.Item title="Specifications">
              <div className="max-w-2xl">
                <div
                  className="mt-4 text-gray-700 prose "
                  dangerouslySetInnerHTML={{
                    __html: sanitize(
                      data?.post?.single_product_acf?.productSpecs ?? {}
                    ),
                  }}
                />
              </div>
            </Tabs.Item>
          </Tabs.Group>
        </div>

        {/*comments-section*/}
        {/* <div className="flex mx-auto max-w-screen-2xl  px-8 flex-auto">
          <div className="w-96  pb-8">
            <div className="pb-12 border-b w-80">
              <div className="flex items-center mb-3">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-300 dark:text-gray-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <p className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                  4.95 out of 5
                </p>
              </div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-400">
                1,745 global ratings
              </p>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  5 star
                </span>
                <div className="mx-4 w-7/12 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded w-9/12"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  70%
                </span>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  4 star
                </span>
                <div className="mx-4 w-7/12 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded w-9/12"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  17%
                </span>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  3 star
                </span>
                <div className="mx-4 w-7/12 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded w-9/12"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  8%
                </span>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  2 star
                </span>
                <div className="mx-4 w-7/12 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded w-9/12"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  4%
                </span>
              </div>
              <div className="flex items-center mt-4 ">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  1 star
                </span>
                <div className="mx-4 w-7/12 h-5 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-400 rounded w-9/12"></div>
                </div>
                <span className="text-sm font-medium text-blue-600 dark:text-blue-500">
                  1%
                </span>
              </div>
            </div>
          </div>

          <div className="flex-col  max-w-screen-md">
            <article className="mb-8 ">
              <div className="flex items-center mb-4 space-x-4">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="space-y-1 font-medium dark:text-white">
                  <p>
                    Jese Leos{" "}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-700 dark:text-gray-400"
                    >
                      Joined on August 2014
                    </time>
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-1">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Thinking to buy another one!
                </h3>
              </div>
              <footer className="mb-5 text-sm text-gray-700 dark:text-gray-400">
                <p>
                  Reviewed in the United Kingdom on{" "}
                  <time dateTime="2017-03-03 19:00">March 3, 2017</time>
                </p>
              </footer>
              <p className="mb-2  text-gray-700 dark:text-gray-400">
                This is my third Invicta Pro Diver. They are just fantastic
                value for money. This one arrived yesterday and the first thing
                I did was set the time, popped on an identical strap from
                another Invicta and went in the shower with it to test the
                waterproofing.... No problems.
              </p>
              <p className="mb-3  text-gray-700 dark:text-gray-400">
                It is obviously not the same build quality as those very
                expensive watches. But that is like comparing a Citroën to a
                Ferrari. This watch was well under £100! An absolute bargain.
              </p>
              <a
                href="#"
                className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Read more
              </a>
              <aside>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">
                  19 people found this helpful
                </p>
                <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                  <a
                    href="#"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Helpful
                  </a>
                  <a
                    href="#"
                    className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Report abuse
                  </a>
                </div>
              </aside>
            </article>
            <article className="mb-8">
              <div className="flex items-center mb-4 space-x-4">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="space-y-1 font-medium dark:text-white">
                  <p>
                    Jese Leos{" "}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-700 dark:text-gray-400"
                    >
                      Joined on August 2014
                    </time>
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-1">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Thinking to buy another one!
                </h3>
              </div>
              <footer className="mb-5 text-sm text-gray-700 dark:text-gray-400">
                <p>
                  Reviewed in the United Kingdom on{" "}
                  <time dateTime="2017-03-03 19:00">March 3, 2017</time>
                </p>
              </footer>
              <p className="mb-2  text-gray-700 dark:text-gray-400">
                This is my third Invicta Pro Diver. They are just fantastic
                value for money. This one arrived yesterday and the first thing
                I did was set the time, popped on an identical strap from
                another Invicta and went in the shower with it to test the
                waterproofing.... No problems.
              </p>
              <p className="mb-3  text-gray-700 dark:text-gray-400">
                It is obviously not the same build quality as those very
                expensive watches. But that is like comparing a Citroën to a
                Ferrari. This watch was well under £100! An absolute bargain.
              </p>
              <a
                href="#"
                className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Read more
              </a>
              <aside>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">
                  19 people found this helpful
                </p>
                <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                  <a
                    href="#"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Helpful
                  </a>
                  <a
                    href="#"
                    className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Report abuse
                  </a>
                </div>
              </aside>
            </article>
            <article className="mb-8">
              <div className="flex items-center mb-4 space-x-4">
                <svg
                  className="w-10 h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <div className="space-y-1 font-medium dark:text-white">
                  <p>
                    Jese Leos{" "}
                    <time
                      dateTime="2014-08-16 19:00"
                      className="block text-sm text-gray-700 dark:text-gray-400"
                    >
                      Joined on August 2014
                    </time>
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-1">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>First star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Second star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Third star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fourth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Fifth star</title>
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                <h3 className="ml-2 text-sm font-semibold text-gray-900 dark:text-white">
                  Thinking to buy another one!
                </h3>
              </div>
              <footer className="mb-5 text-sm text-gray-700 dark:text-gray-400">
                <p>
                  Reviewed in the United Kingdom on{" "}
                  <time dateTime="2017-03-03 19:00">March 3, 2017</time>
                </p>
              </footer>
              <p className="mb-2  text-gray-700 dark:text-gray-400">
                This is my third Invicta Pro Diver. They are just fantastic
                value for money. This one arrived yesterday and the first thing
                I did was set the time, popped on an identical strap from
                another Invicta and went in the shower with it to test the
                waterproofing.... No problems.
              </p>
              <p className="mb-3  text-gray-700 dark:text-gray-400">
                It is obviously not the same build quality as those very
                expensive watches. But that is like comparing a Citroën to a
                Ferrari. This watch was well under £100! An absolute bargain.
              </p>
              <a
                href="#"
                className="block mb-5 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
              >
                Read more
              </a>
              <aside>
                <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">
                  19 people found this helpful
                </p>
                <div className="flex items-center mt-3 space-x-3 divide-x divide-gray-200 dark:divide-gray-600">
                  <a
                    href="#"
                    className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-xs px-2 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Helpful
                  </a>
                  <a
                    href="#"
                    className="pl-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Report abuse
                  </a>
                </div>
              </aside>
            </article>
            <button
              type="button"
              className=" flex py-2.5 px-5 mr-2 mb-2  font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-500 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Read More Reviews{" "}
              <svg
                className="w-4 h-6 my-auto ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div> */}

        <div className="container py-8 mx-auto">
          <h2 className="text-3xl  text-gray-800  mb-6">Related products</h2>

          <div className="flex flex-wrap gap-3">
            {uniqueNames.map((product) => {
              return (
                <div
                  className="bg-white shadow rounded overflow-hidden group md:w-64"
                  key={product?.title}
                >
                  <div className="relative">
                    <div className="h-45 flex p-2 justify-center">
                      <Image
                        src={product?.single_product_acf?.productImageMainUrl}
                        alt="product 1"
                        className="max-h-56  my-auto"
                        height="200"
                        width="200"
                      />
                    </div>
                  </div>
                  <div className="pt-4 pb-3 px-4">
                    <a href={product?.single_product_acf?.productUrl}>
                      <h4 className="mt-3 uppercase font-medium text-sm mb-2 text-gray-800 hover:text-primary transition">
                        Bed
                        {product?.title}
                      </h4>
                    </a>
                  </div>
                </div>
              );
            })}

            {/* product 1 */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;

export async function getStaticProps({ params }) {
  console.log(params.slug);
  const { data, errors } = await client.query({
    query: GET_POST,
    variables: {
      uri: `/shop/product/${params?.slug}`,
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

  return handleRedirectsAndReturnData(defaultProps, data, errors, "post");
}

/**
 * Since the page name 'does not' use catch-all routes,
 *htmlForexample [slug],
 * that's why params would contain just slug and not an array of slugs , unlike [...slug].
 *htmlForexample, If we need to have dynamic route '/foo/'
 * Then we would add paths: [ params: { slug: 'foo' } } ]
 * Here slug will be 'foo', then Next.js will statically generate the page at /foo/
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
    query: GET_POST_SLUGS,
  });

  const pathsData = [];

  data?.posts?.nodes &&
    data?.posts?.nodes.map((post) => {
      if (!isEmpty(post?.slug)) {
        pathsData.push({ params: { slug: post?.slug } });
      }
    });

  return {
    paths: pathsData,
    fallback: FALLBACK,
  };
}
