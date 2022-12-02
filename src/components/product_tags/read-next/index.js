import React from "react";
import Link from "next/link";
import { isEmpty } from "lodash";
import { sanitize } from "../../../utils/miscellaneous";

export default function ReadMore({ data }) {
  let page_tags = [];
  let page_brands = [];
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
                          {!isEmpty(tag?.roundupFields?.roundupFeatureImage) ? (
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
  );
}
