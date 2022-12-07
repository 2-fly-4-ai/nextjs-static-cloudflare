import React from "react";
import { isEmpty } from "lodash";
import { useState } from "react";
import { sanitize } from "../../../utils/miscellaneous";

export default function ContentAccordion({ data }) {
  const [isMenuVisible, setMenuVisibility] = useState(false);
  const [activeId, setActiveId] = useState();
  // const [open, setOpen] = React.useState(false);
  function activeCategory(id) {
    setActiveId(id);
  }

  function isActive(id) {
    return id === activeId;
  }

  const What_to_consider_test = data?.page?.roundupFields?.whatToConsider;

  if (What_to_consider_test != null) {
    const What_to_consider_heading = data?.page?.roundupFields?.whatToConsider
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
    const What_to_consider_body = data?.page?.roundupFields?.whatToConsider
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
  }

  const types_of_test = data?.page?.roundupFields?.typesOf;
  if (types_of_test != null) {
    const types_of_heading = data?.page?.roundupFields?.typesOf
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
    const types_of_body = data?.page?.roundupFields?.typesOf
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
  }

  const howWeChose_test = data?.page?.roundupFields?.howWeChose;
  if (howWeChose_test != null) {
    const howWeChose_heading = data?.page?.roundupFields?.howWeChose
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
    const howWeChose_body = data?.page?.roundupFields?.howWeChose
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
  }

  const faqs_main_test = data?.page?.roundupFields?.faqs;
  if (faqs_main_test != null) {
    const faqs_main_heading = data?.page?.roundupFields?.faqs
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
    const faqs_main_body = data?.page?.roundupFields?.faqs
      .replace("</h2>", "</h2>[split_here]")
      .split("[split_here]")[0];
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-8 lg:px-4 ">
        {!isEmpty(What_to_consider_test) ? (
          <h2 className="mb-6 lg:mb-4 text-3xl lg:text-3xl tracking-tight font-extrabold text-left text-gray-900 dark:text-white capitalize">
            {" "}
            {data?.page?.name} - Buyer&lsquo;s Guide
          </h2>
        ) : null}

        <div className="mx-auto max-w-screen-2xl">
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
                  className="flex justify-between items-center py-5 w-full font-medium text-left text-gray-900 bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  data-accordion-target="#accordion-flush-body-1"
                  aria-expanded="true"
                  aria-controls="accordion-flush-body-1"
                >
                  <div
                    className="text-2xl"
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
                      isMenuVisible && 1 == activeId ? "rotate-180" : "rotate-0"
                    } w-6 h-6 shrink-0 `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
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
                  className=" border-gray-200 dark:border-gray-700 prose prose-headings:font-medium prose-h3:text-2xl max-w-none prose-li:list-disc"
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
                    className="text-2xl"
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
                      isMenuVisible && 2 == activeId ? "rotate-180" : "rotate-0"
                    } w-6 h-6 shrink-0 `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
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
                  className="prose prose-headings:font-medium prose-h3:text-2xl max-w-none"
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
                    className="text-2xl"
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
                      isMenuVisible && 3 == activeId ? "rotate-180" : "rotate-0"
                    } w-6 h-6 shrink-0 `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
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
                  className="prose prose-headings:font-medium prose-h3:text-2xl max-w-none"
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
                    className="text-2xl"
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
                      isMenuVisible && 4 == activeId ? "rotate-180" : "rotate-0"
                    } w-6 h-6 shrink-0 `}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
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
                  className="prose prose-headings:font-medium prose-h3:text-2xl max-w-none"
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
  );
}
