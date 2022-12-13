import { isEmpty } from "lodash";
import React from "react";
import { sanitize } from "../../../utils/miscellaneous";

export default function ProductTagsHeader({ data }) {
  return (
    <header className="py-12 bg-gradient-to-r from-gray-100 to-gray-300 mt-5">
      <div className="px-4 mx-auto w-full max-w-screen-xl text-center">
        {!isEmpty(data?.page?.roundupFields?.datepublished) ? (
          <span className="block mb-4 font-semibold text-gray-900 dark:text-white">
            Published{" "}
            <time className="uppercase font-normal text-gray-500 dark:text-gray-400">
              {data?.page?.roundupFields?.datepublished}
            </time>
          </span>
        ) : null}

        {!isEmpty(data?.page?.roundupFields?.hero) ? (
          <div
            className="mx-auto my-6 max-w-2xl text-2xl dark:text-white font-extrabold leading-none text-gray-900 sm:text-3xl lg:text-4xl"
            dangerouslySetInnerHTML={{
              __html: sanitize(data?.page?.roundupFields?.hero ?? {}),
            }}
          />
        ) : null}

        <p className="text-gray-600 font-medium m-5 content-center  justify-center flex flex-wrap gap-2">
          {!isEmpty(
            data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0].parent
              ?.node?.parent?.node?.parent?.node?.name
          ) ? (
            <a
              className="mx-1 text-sm text-gray-600 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
              href={
                data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0]
                  .parent?.node?.parent?.node?.parent?.node?.uri
              }
            >
              {
                data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0]
                  .parent?.node?.parent?.node?.parent?.node?.name
              }
            </a>
          ) : null}

          {!isEmpty(
            data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0].parent
              ?.node?.parent?.node?.name
          ) ? (
            <a
              className="mx-1 text-sm text-gray-600 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
              href={
                data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0]
                  .parent?.node?.parent?.node?.uri
              }
            >
              {
                data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0]
                  .parent?.node?.parent?.node?.name
              }
            </a>
          ) : null}

          {!isEmpty(
            data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0].parent
              ?.node?.name
          ) ? (
            <a
              className="mx-1 text-sm text-gray-600 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
              href={
                data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0]
                  .parent?.node?.uri
              }
            >
              {
                data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0]
                  .parent?.node?.name
              }
            </a>
          ) : null}

          {!isEmpty(
            data?.page?.products?.nodes[0]?.productTaxonomies?.nodes[0].parent
              ?.node?.name
          ) ? (
            <a
              className="mx-1 text-sm text-gray-600 border border-gray-300 rounded-full px-4  py-1 pb-1.5 bg-white hover:bg-gray-200"
              href={data?.page?.name}
            >
              {data?.page?.name}
            </a>
          ) : null}
        </p>

        <p className="text-lg font-normal text-gray-500 dark:text-gray-400"></p>
      </div>
    </header>
  );
}
