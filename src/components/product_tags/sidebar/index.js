import React from "react";
import Link from "next/link";
import { sanitize } from "../../../utils/miscellaneous";
import { isEmpty } from "lodash";

export default function SideBar({ data }) {
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
  return (
    <aside className="xl:block mt-5 lg:ml-5  ">
      <div className="xl:w-[336px] sticky top-6 ">
        <div className="p-4 mb-6 rounded-none border shadow-lg dark:border-gray-700">
          <h4 className="mb-4 text-sm font-bold text-gray-900 dark:text-white uppercase">
            Related Articles
          </h4>

          <div className=" py-8 text-center lg:py-0  flex ">
            <div className="sm:hidden lg:flex pb-2 w-full mb-5 lg:px-2 flex-col border">
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
                              __html: sanitize(brand?.nodes[0]?.name ?? {}),
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
  );
}
