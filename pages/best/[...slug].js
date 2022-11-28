import client from "../../src/apollo/client";
import { GET_PAGES_URI } from "../../src/queries/tags/get-pages";
import { isEmpty, slice } from "lodash";
import { GET_PAGE } from "../../src/queries/tags/get-page";
import { useRouter } from "next/router";
import Layout from "../../src/components/layout";
import {
  FALLBACK,
  handleRedirectsAndReturnData,
  isCustomPageUri,
} from "../../src/utils/slug";
import { sanitize } from "../../src/utils/miscellaneous";
import Image from "next/image";
import Link from "next/link";
import { Accordion } from "flowbite-react";
import React, { useEffect, useRef } from "react";
import { useState } from "react";

import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";

const Page = ({ data }) => {
  let faq_index_1 = 1000;
  console.warn({ data });

  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [activeId, setActiveId] = useState();
  // const [open, setOpen] = React.useState(false);
  function activeCategory(id) {
    setActiveId(id);
  }

  function isActive(id) {
    return id === activeId;
  }

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

  let page_tags = [];
  let page_brands = [];

  //TAG CLOUDS FOUND ON RIGHT HAND COLUMN
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
  });

  data?.page?.nodes[0]?.products?.nodes.map((product) => {
    let seo_check = product?.productBrands?.nodes[0]?.seo?.metaRobotsNoindex;
    if (seo_check == "noindex") {
      return;
    }

    let x = product?.productBrands?.nodes[0]?.name;
    let y = x.split(" ").length;
    let z = x.split("").length;
    if (y > 3 || z > 18) {
      return;
    }
    page_brands.push(product?.productBrands);
  });

  page_tags = page_tags
    .filter(
      (v, i, a) =>
        a.findIndex((t) => JSON.stringify(t) === JSON.stringify(v)) === i
    )
    .sort();
  //END OF TAG CLOUD

  // ACCORDION VARIABLES. Needs some consideration and error logic if html markup not correct
  const What_to_consider_test =
    data?.page?.nodes[0]?.roundupFields?.whatToConsider;
  if (What_to_consider_test != null) {
    const What_to_consider_heading =
      data?.page?.nodes[0]?.roundupFields?.whatToConsider
        .replace("</h2>", "</h2>[split_here]")
        .split("[split_here]")[0];
    const What_to_consider_body =
      data?.page?.nodes[0]?.roundupFields?.whatToConsider
        .replace("</h2>", "</h2>[split_here]")
        .split("[split_here]")[0];
  }

  const types_of_test = data?.page?.nodes[0]?.roundupFields?.typesOf;
  if (types_of_test != null) {
    const types_of_heading = data?.page?.nodes[0]?.roundupFields?.typesOf
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
    const types_of_body = data?.page?.nodes[0]?.roundupFields?.typesOf
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
  }

  const howWeChose_test = data?.page?.nodes[0]?.roundupFields?.howWeChose;
  if (howWeChose_test != null) {
    const howWeChose_heading = data?.page?.nodes[0]?.roundupFields?.howWeChose
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
    const howWeChose_body = data?.page?.nodes[0]?.roundupFields?.howWeChose
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
  }

  const faqs_main_test = data?.page?.nodes[0]?.roundupFields?.faqs;
  if (faqs_main_test != null) {
    const faqs_main_heading = data?.page?.nodes[0]?.roundupFields?.faqs
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
    const faqs_main_body = data?.page?.nodes[0]?.roundupFields?.faqs
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
  }
  //END OF ACCORDION VARIABLES

  return (
    <Layout data={data}>
      <main className="pb-8 lg:pb-16 bg-white lg:max-w-screen-lg xl:max-w-screen-2xl  justify-center items-center dark:bg-gray-900 px-4 m-auto">
        <div className="flex relative z-20 justify-between px-4 mx-auto max-w-screen-xl  bg-white dark:bg-gray-900 rounded">
          <article className=" xl:w-[1000px] w-full max-w-none format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
            {/* HEADER/HERO SECTION */}
            <header className="py-12">
              <div className="px-4 mx-auto w-full max-w-screen-xl text-center">
                <span className="block mb-4 font-semibold text-gray-900 dark:text-white">
                  Published{" "}
                  <time className="uppercase font-normal text-gray-500 dark:text-gray-400">
                    {data?.page?.nodes[0]?.roundupFields?.datepublished}
                  </time>
                </span>

                {!isEmpty(data?.page?.nodes[0]?.roundupFields?.hero) ? (
                  <div
                    className="mx-auto my-6  max-w-2xl text-2xl dark:text-white font-extrabold leading-none text-gray-900 sm:text-3xl lg:text-4xl"
                    dangerouslySetInnerHTML={{
                      __html: sanitize(
                        data?.page?.nodes[0]?.roundupFields?.hero ?? {}
                      ),
                    }}
                  />
                ) : null}

                <p className="text-gray-600 font-medium m-5">
                  {!isEmpty(
                    data?.page?.nodes[0]?.products?.nodes[0]?.productTaxonomies
                      ?.nodes[0].parent?.node?.parent?.node?.parent?.node?.name
                  ) ? (
                    <a
                      className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                      href={
                        data?.page?.nodes[0]?.products?.nodes[0]
                          ?.productTaxonomies?.nodes[0].parent?.node?.parent
                          ?.node?.parent?.node?.uri
                      }
                    >
                      {
                        data?.page?.nodes[0]?.products?.nodes[0]
                          ?.productTaxonomies?.nodes[0].parent?.node?.parent
                          ?.node?.parent?.node?.name
                      }
                    </a>
                  ) : null}

                  {!isEmpty(
                    data?.page?.nodes[0]?.products?.nodes[0]?.productTaxonomies
                      ?.nodes[0].parent?.node?.parent?.node?.name
                  ) ? (
                    <a
                      className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                      href={
                        data?.page?.nodes[0]?.products?.nodes[0]
                          ?.productTaxonomies?.nodes[0].parent?.node?.parent
                          ?.node?.uri
                      }
                    >
                      {
                        data?.page?.nodes[0]?.products?.nodes[0]
                          ?.productTaxonomies?.nodes[0].parent?.node?.parent
                          ?.node?.name
                      }
                    </a>
                  ) : null}

                  {!isEmpty(
                    data?.page?.nodes[0]?.products?.nodes[0]?.productTaxonomies
                      ?.nodes[0].parent?.node?.name
                  ) ? (
                    <a
                      className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                      href={
                        data?.page?.nodes[0]?.products?.nodes[0]
                          ?.productTaxonomies?.nodes[0].parent?.node?.uri
                      }
                    >
                      {
                        data?.page?.nodes[0]?.products?.nodes[0]
                          ?.productTaxonomies?.nodes[0].parent?.node?.name
                      }
                    </a>
                  ) : null}

                  {!isEmpty(
                    data?.page?.nodes[0]?.products?.nodes[0]?.productTaxonomies
                      ?.nodes[0].parent?.node?.name
                  ) ? (
                    <a
                      className="mx-1 text-sm text-gray-600 border border-gray-500 rounded-full px-4  py-1 pb-1.5 hover:bg-gray-200"
                      href={data?.page?.nodes[0]?.name}
                    >
                      {data?.page?.nodes[0]?.name}
                    </a>
                  ) : null}
                </p>

                <p className="text-lg font-normal text-gray-500 dark:text-gray-400"></p>
              </div>
            </header>

            {/* h1/author info + Share Buttons */}
            <div className="flex flex-col lg:flex-row justify-between lg:items-center py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <span className="text-base mb-4 lg:mb-0 font-normal text-gray-500 dark:text-gray-400">
                <h1 className="uppercase font-bold text-xl">
                  The best {data?.page?.nodes[0]?.name}
                </h1>{" "}
                By{" "}
                <a
                  href="#"
                  rel="author"
                  className="font-bold text-gray-900 dark:text-white no-underline hover:underline"
                >
                  {data?.page?.nodes[0]?.roundupFields?.author}
                </a>{" "}
                in{" "}
                <a
                  href="#"
                  className="font-normal text-gray-500 dark:text-gray-400 no-underline hover:underline"
                >
                  Our Best Picks
                </a>
              </span>

              <aside aria-label="Share social media">
                <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
                  <FacebookShareButton
                    url={`https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`}
                    quote={"Best Pets Products"}
                    hashtag={`#${data?.page?.nodes[0]?.name.replace(" ", "")}`}
                    description={"aiueo"}
                    className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
                  >
                    <FacebookIcon
                      size={18}
                      iconFillColor="white"
                      round
                      className="mr-2 p-0 "
                      bgStyle={{ fill: "black" }}
                    />{" "}
                    Share
                  </FacebookShareButton>
                </div>
                <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
                  <TwitterShareButton
                    title={"test"}
                    url={`https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`}
                    hashtags={[
                      `#${data?.page?.nodes[0]?.name.replace(" ", "")}`,
                    ]}
                    className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
                  >
                    <TwitterIcon
                      size={18}
                      iconFillColor="white"
                      round
                      className="mr-2 p-0 "
                      bgStyle={{ fill: "black" }}
                    />
                    Tweet
                  </TwitterShareButton>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`
                    )
                  }
                  className="inline-flex items-center py-2 px-6 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-0 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {" "}
                  <svg
                    className="mr-2 w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  Copy link
                </button>
              </aside>
            </div>

            {/* INTRO + Featured Image Section */}
            <div className="px-4">
              {!isEmpty(
                data?.page?.nodes[0]?.roundupFields?.roundupFeatureImage
              ) ? (
                <img
                  className="w-80 float-right p-5 mt-5"
                  src={data?.page?.nodes[0]?.roundupFields?.roundupFeatureImage}
                />
              ) : null}
              {!isEmpty(data?.page?.nodes[0]?.roundupFields?.intro) ? (
                <div
                  className="prose max-w-none py-8"
                  dangerouslySetInnerHTML={{
                    __html: sanitize(
                      data?.page?.nodes[0]?.roundupFields?.intro ?? {}
                    ),
                  }}
                />
              ) : null}
            </div>

            {/* Product List Component*/}
            <div className="w-full ">
              {data?.page?.nodes[0]?.products?.nodes.map((product) => {
                return (
                  <div class="border flex my-5 flex-col lg:max-w-full items-center bg-white rounded-none  shadow-lg md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
                    <div class=" flex justify-between rounded-t my-auto ">
                      <div class="w-80 text-lg justify-center items-center flex text-gray-900 md:text-xl dark:text-white my-auto py-6">
                        <Image
                          src={product?.single_product_acf?.productImageMainUrl}
                          height="256"
                          width="256"
                          objectFit="contain"
                        />
                      </div>
                    </div>

                    <div class="flex flex-col p-4 leading-normal ">
                      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {product?.title}
                      </h5>

                      <div
                        className="text tracking-tight py-2 text-gray-600"
                        dangerouslySetInnerHTML={{
                          __html: sanitize(
                            product?.single_product_acf?.productDescription ??
                              {}
                          ),
                        }}
                      />
                      <div className="flex my-3">
                        <a href={product?.single_product_acf?.productUrl}>
                          <button
                            type="button"
                            className="py-2.5 w-40 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-4 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            View Latest Price
                          </button>
                        </a>

                        <Link href={product?.uri}>
                          <button
                            type="button"
                            className="py-2.5 w-40 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border-4 border-gray-300 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Product Details
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Accordion */}
            <section class="bg-white dark:bg-gray-900">
              <div class="py-8 px-4 mx-auto max-w-screen-2xl sm:py-8 lg:px-4 ">
                {!isEmpty(What_to_consider_test) ? (
                  <h2 class="mb-6 lg:mb-4 text-3xl lg:text-3xl tracking-tight font-extrabold text-left text-gray-900 dark:text-white capitalize">
                    {" "}
                    {data?.page?.nodes[0]?.name} - Buyer's Guide
                  </h2>
                ) : null}

                <div class="mx-auto max-w-screen-2xl">
                  <div
                    id="accordion-flush"
                    data-accordion="collapse"
                    data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    data-inactive-classes="text-gray-500 dark:text-gray-400"
                  >
                    {!isEmpty(What_to_consider_test) ? (
                      <h2
                        id="accordion-flush-heading-1 "
                        onClick={() => {
                          setMenuVisibility(!isMenuVisible);
                          activeCategory(1);
                        }}
                        className={`${isActive(1) ? "..." : ""} `}
                      >
                        <button
                          type="button"
                          class="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                          data-accordion-target="#accordion-flush-body-1"
                          aria-expanded="true"
                          aria-controls="accordion-flush-body-1"
                        >
                          <div
                            class="text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(
                                What_to_consider_test.replace(
                                  "</h2>",
                                  "</h2>[split_here]"
                                ).split("[split_here]")[0] ?? {}
                              ),
                            }}
                          />
                          <svg
                            data-accordion-icon=""
                            className={`${
                              isMenuVisible && 1 == activeId
                                ? "rotate-180"
                                : "rotate-0"
                            } w-6 h-6 shrink-0 `}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </h2>
                    ) : null}

                    {/* body */}
                    {!isEmpty(What_to_consider_test) ? (
                      <div
                        id="accordion-flush-body-1"
                        className={`${
                          isMenuVisible && 1 == activeId ? "flex" : "hidden"
                        } py-8`}
                        aria-labelledby="accordion-flush-heading-1"
                      >
                        <div
                          class=" border-gray-200 dark:border-gray-700 prose prose-headings:font-medium prose-h3:text-2xl max-w-none prose-li:list-disc"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(
                              What_to_consider_test.replace(
                                "</h2>",
                                "</h2>[split_here]"
                              ).split("[split_here]")[1] ?? {}
                            ),
                          }}
                        />
                      </div>
                    ) : null}

                    {/* Issue here with index and className */}
                    {!isEmpty(types_of_test) ? (
                      <h2 id="accordion-flush-heading-2">
                        <button
                          type="button"
                          onClick={() => {
                            setMenuVisibility(!isMenuVisible);
                            activeCategory(2);
                          }}
                          className={`${
                            isActive(2) ? "..." : ""
                          } flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1"`}
                        >
                          <div
                            class="text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(
                                types_of_test
                                  .replace("</h2>", "</h2>[split_here]")
                                  .split("[split_here]")[0] ?? {}
                              ),
                            }}
                          />
                          <svg
                            data-accordion-icon=""
                            className={`${
                              isMenuVisible && 2 == activeId
                                ? "rotate-180"
                                : "rotate-0"
                            } w-6 h-6 shrink-0 `}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </h2>
                    ) : null}

                    {!isEmpty(types_of_test) ? (
                      <div
                        id="accordion-flush-body-2"
                        className={`${
                          isMenuVisible && 2 == activeId ? "flex" : "hidden"
                        } py-8`}
                      >
                        <div
                          class="prose prose-headings:font-medium prose-h3:text-2xl max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(
                              types_of_test
                                .replace("</h2>", "</h2>[split_here]")
                                .split("[split_here]")[1] ?? {}
                            ),
                          }}
                        />
                      </div>
                    ) : null}

                    {!isEmpty(howWeChose_test) ? (
                      <h2 id="accordion-flush-heading-3">
                        <button
                          type="button"
                          onClick={() => {
                            setMenuVisibility(!isMenuVisible);
                            activeCategory(3);
                          }}
                          className={`${
                            isActive(3) ? "..." : ""
                          } flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1"`}
                        >
                          <div
                            class="text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(
                                howWeChose_test
                                  .replace("</h2>", "</h2>[split_here]")
                                  .split("[split_here]")[0] ?? {}
                              ),
                            }}
                          />
                          <svg
                            data-accordion-icon=""
                            className={`${
                              isMenuVisible && 3 == activeId
                                ? "rotate-180"
                                : "rotate-0"
                            } w-6 h-6 shrink-0 `}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </h2>
                    ) : null}

                    {!isEmpty(howWeChose_test) ? (
                      <div
                        id="accordion-flush-body-3"
                        className={`${
                          isMenuVisible && 3 == activeId ? "flex" : "hidden"
                        } py-8`}
                        aria-labelledby="accordion-flush-heading-3"
                      >
                        <div
                          class="prose prose-headings:font-medium prose-h3:text-2xl max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(
                              howWeChose_test
                                .replace("</h2>", "</h2>[split_here]")
                                .split("[split_here]")[1] ?? {}
                            ),
                          }}
                        />
                      </div>
                    ) : null}

                    {!isEmpty(faqs_main_test) ? (
                      <h2 id="accordion-flush-heading-1">
                        <button
                          type="button"
                          onClick={() => {
                            setMenuVisibility(!isMenuVisible);
                            activeCategory(4);
                          }}
                          className={`${
                            isActive(4) ? "..." : ""
                          } flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1"`}
                        >
                          <div
                            class="text-2xl"
                            dangerouslySetInnerHTML={{
                              __html: sanitize(
                                faqs_main_test
                                  .replace("</h2>", "</h2>[split_here]")
                                  .split("[split_here]")[0] ?? {}
                              ),
                            }}
                          />
                          <svg
                            data-accordion-icon=""
                            className={`${
                              isMenuVisible && 4 == activeId
                                ? "rotate-180"
                                : "rotate-0"
                            } w-6 h-6 shrink-0 `}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </button>
                      </h2>
                    ) : null}

                    <div
                      id="accordion-flush-body-1"
                      className={`${
                        isMenuVisible && 4 == activeId ? "flex" : "hidden"
                      } py-8`}
                      aria-labelledby="accordion-flush-heading-1"
                    >
                      {!isEmpty(faqs_main_test) ? (
                        <div
                          class="prose prose-headings:font-medium prose-h3:text-2xl max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: sanitize(
                              faqs_main_test
                                .replace("</h2>", "</h2>[split_here]")
                                .split("[split_here]")[1] ?? {}
                            ),
                          }}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Share Component */}
            <div className="flex justify-between items-center py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <aside aria-label="Share social media">
                <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
                  <FacebookShareButton
                    url={`https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`}
                    quote={"Best Pets Products"}
                    hashtag={`#${data?.page?.nodes[0]?.name.replace(" ", "")}`}
                    description={"aiueo"}
                    className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
                  >
                    <FacebookIcon
                      size={18}
                      iconFillColor="white"
                      round
                      className="mr-2 p-0 "
                      bgStyle={{ fill: "black" }}
                    />{" "}
                    Share
                  </FacebookShareButton>
                </div>
                <div className="inline-flex items-center  mr-2 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600  dark:hover:text-white dark:hover:bg-gray-700">
                  <TwitterShareButton
                    title={"test"}
                    url={`https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`}
                    hashtags={[
                      `#${data?.page?.nodes[0]?.name.replace(" ", "")}`,
                    ]}
                    className="inline-flex items-center  text-xs font-medium w-24 justify-center h-8 border"
                  >
                    <TwitterIcon
                      size={18}
                      iconFillColor="white"
                      round
                      className="mr-2 p-0 "
                      bgStyle={{ fill: "black" }}
                    />
                    Tweet
                  </TwitterShareButton>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      `https://petsmarketplace.com${data?.page?.nodes[0]?.uri}`
                    )
                  }
                  className="inline-flex items-center py-2 px-6 text-xs font-medium text-gray-900 no-underline bg-white rounded-lg border border-gray-200 focus:outline-none hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-0 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  {" "}
                  <svg
                    className="mr-2 w-4 h-4"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>{" "}
                  Copy link
                </button>
              </aside>
              <div className="not-format">
                <button
                  data-tooltip-target="tooltip-save"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    ></path>
                  </svg>
                </button>
                <div
                  id="tooltip-save"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Save this article
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
                <button
                  id="dropdownMenuIconHorizontalButton"
                  data-dropdown-toggle="dropdownDotsHorizontal"
                  className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-gray-400 focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
                  type="button"
                >
                  <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                  </svg>
                </button>

                <div
                  id="dropdownDotsHorizontal"
                  className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                >
                  <ul
                    className="py-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownMenuIconHorizontalButton"
                  >
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Mute this author
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Report
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          {/*RIGHT SIDE BAR WITH TAG CLOUDS AND RELATED ARTICLES 
		FEATURE REQUEST- Make these work on mobile as well*/}
          <aside
            className="xl:block mt-5 w-96 ml-5"
            aria-labelledby="sidebar-label"
          >
            <div className="xl:w-[336px] sticky top-6">
              <h3 id="sidebar-label" className="sr-only">
                Sidebar
              </h3>

              <div className="p-4 mb-6 rounded-none border shadow-lg border-gray-200 dark:border-gray-700">
                <h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">
                  Related Articles
                </h4>

                <div className=" py-8 ptext-center lg:py-0 flex bg-gray-100">
                  <div className="sm:hidden lg:flex pb-2 w-full mb-5 flex-col border">
                    <div className="space-x-2 mt-2 flex flex-col">
                      <span className="text-gray-800 mx-2 my-4 text-left font-semibold">
                        Tags:{" "}
                      </span>
                      <div>
                        <ul className="flex flex-wrap align items-start gap-1">
                          {page_tags.map((tag) => (
                            <li
                              key={tag.name}
                              className="text-gray-500 hover: dark:text-gray-400 mb-3"
                            >
                              <Link href={tag.uri}>
                                <a
                                  className="text-gray-600 border border-gray-500 rounded-full px-2 text-sm py-0.5 pb-1.5 bg-white hover:bg-gray-200"
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
                        <ul className="flex flex-wrap  align items-start gap-1">
                          {page_brands.map((brand) => (
                            <li
                              key={brand?.nodes[0]?.name}
                              className="text-gray-500 dark:text-gray-400 mb-3"
                            >
                              <Link href={brand?.nodes[0]?.uri}>
                                <a
                                  className="text-gray-600 border bg-white border-gray-500 rounded-full px-2 overflow-hidden text-sm py-0.5 pb-1.5 hover:bg-gray-200"
                                  dangerouslySetInnerHTML={{
                                    __html: sanitize(
                                      brand?.nodes[0]?.name ?? {}
                                    ),
                                  }}
                                />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <ul className="flex flex-col align items-start gap-1">
                  {page_tags.map(
                    (tag, index) =>
                      index > 3 &&
                      index < 8 && ( // <= only 5 items
                        <li
                          key={tag.name}
                          className="text-gray-500 dark:text-gray-400 mb-3"
                        >
                          <Link href={tag.uri}>
                            <article className="flex mb-8">
                              <div className="flex flex-col justify-center">
                                <div
                                  className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white"
                                  dangerouslySetInnerHTML={{
                                    __html: sanitize(tag?.name ?? {}),
                                  }}
                                />

                                {!isEmpty(tag?.roundupFields?.hero) ? (
                                  <div
                                    className="text-gray-600 max-w-lg  text-sm py-0.5 pb-1.5 "
                                    dangerouslySetInnerHTML={{
                                      __html: sanitize(
                                        tag?.roundupFields?.hero ?? {}
                                      ),
                                    }}
                                  />
                                ) : null}

                                <a
                                  href="#"
                                  className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                                >
                                  Read in 8 minutes
                                </a>
                              </div>
                            </article>
                          </Link>
                        </li>
                      )
                  )}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/*Related Articles Component*/}
      <aside
        aria-label="Related articles"
        className="lg:max-w-screen-2xl mx-auto bg-white xl:pb-16 dark:bg-gray-800 px-4"
      >
        <div className="px-4 mx-auto max-w-screen-xl">
          <div className="space-x-2 mt-2 flex flex-col">
            <h2 className="mb-8 text-2xl font-bold text-gray-900 dark:text-white">
              Read next
            </h2>
            <div>
              <ul className="flex flex-col align items-start gap-1">
                {page_tags.map(
                  (tag, index) =>
                    index < 3 && ( // <= only 5 items
                      <li
                        key={tag.name}
                        className="text-gray-500 dark:text-gray-400 mb-3"
                      >
                        <Link href={tag.uri}>
                          <article className="flex mb-8">
                            {!isEmpty(
                              tag?.roundupFields?.roundupFeatureImage
                            ) ? (
                              <img
                                src={tag?.roundupFields?.roundupFeatureImage}
                                className="mr-5 w-32 h-32 max-w-fullalign-middle rounded-full"
                                alt="Image 1"
                              />
                            ) : null}

                            <div className="flex flex-col justify-center">
                              <div
                                className="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white"
                                dangerouslySetInnerHTML={{
                                  __html: sanitize(tag?.name ?? {}),
                                }}
                              />

                              {!isEmpty(tag?.roundupFields?.hero) ? (
                                <div
                                  className="text-gray-600 max-w-lg  text py-0.5 pb-1.5 "
                                  dangerouslySetInnerHTML={{
                                    __html: sanitize(
                                      tag?.roundupFields?.hero ?? {}
                                    ),
                                  }}
                                />
                              ) : null}

                              <a
                                href="#"
                                className="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 dark:text-primary-500 hover:no-underline"
                              >
                                Read Article
                              </a>
                            </div>
                          </article>
                        </Link>
                      </li>
                    )
                )}
              </ul>
            </div>
          </div>
        </div>
      </aside>

      {/* NEWSLETTER COMPONENT */}
      <section className="bg-gray-300 dark:bg-gray-900 px-4 lg:max-w-screen-full flex mx-auto items-center">
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md sm:text-center">
            <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
              Sign up for our newsletter
            </h2>
            <p className="mx-auto mb-8 max-w-2xl font-light text-gray-500 md:mb-12 sm:text-xl dark:text-gray-400">
              Stay up to date with the roadmap progress, announcements and
              exclusive discounts feel free to sign up with your email.
            </p>
            <form action="#">
              <div className="items-center mx-auto mb-3 space-y-4 max-w-screen-sm sm:flex sm:space-y-0">
                <div className="relative w-full">
                  <label
                    htmlFor="email"
                    className="hidden mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Email address
                  </label>
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                    </svg>
                  </div>
                  <input
                    className="block p-3 pl-10 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 sm:rounded-none sm:rounded-l-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Enter your email"
                    type="email"
                    id="email"
                    required=""
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="py-3 px-5 w-full text-sm font-medium text-center text-white rounded-lg border cursor-pointer bg-primary-700 border-primary-600 sm:rounded-none sm:rounded-r-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
              <div className="mx-auto max-w-screen-sm text-sm text-left text-gray-500 newsletter-form-footer dark:text-gray-300">
                We care about the protection of your data.{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 dark:text-primary-500 hover:underline"
                >
                  Read our Privacy Policy
                </a>
                .
              </div>
            </form>
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
